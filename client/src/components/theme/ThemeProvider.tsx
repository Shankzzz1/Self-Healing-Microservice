import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export type Theme = 'light' | 'dark' | 'system';

interface ThemeContextValue {
	theme: Theme;
	resolvedTheme: 'light' | 'dark';
	setTheme: (theme: Theme) => void;
	toggleTheme: () => void;
	/** Toggle with an expanding circular reveal animation starting from top-right */
	toggleThemeAnimated: () => void;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

interface ThemeProviderProps {
	children: React.ReactNode;
	defaultTheme?: Theme;
	storageKey?: string;
}

function getSystemPrefersDark(): boolean {
	if (typeof window === 'undefined' || !window.matchMedia) return false;
	return window.matchMedia('(prefers-color-scheme: dark)').matches;
}

function applyThemeClass(resolved: 'light' | 'dark') {
	const root = document.documentElement; // <html>
	if (resolved === 'dark') {
		root.classList.add('dark');
	} else {
		root.classList.remove('dark');
	}
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({
	children,
	defaultTheme = 'system',
	storageKey = 'theme',
}) => {
	const [theme, setThemeState] = useState<Theme>(() => {
		if (typeof window === 'undefined') return defaultTheme;
		const stored = window.localStorage.getItem(storageKey) as Theme | null;
		return stored ?? defaultTheme;
	});

	const resolvedTheme = useMemo<'light' | 'dark'>(() => {
		if (theme === 'system') return getSystemPrefersDark() ? 'dark' : 'light';
		return theme;
	}, [theme]);

	useEffect(() => {
		applyThemeClass(resolvedTheme);
		try {
			window.localStorage.setItem(storageKey, theme);
		} catch {}
	}, [resolvedTheme, storageKey, theme]);

	useEffect(() => {
		if (typeof window === 'undefined') return;
		const mq = window.matchMedia('(prefers-color-scheme: dark)');
		const handler = () => {
			if (theme === 'system') {
				applyThemeClass(getSystemPrefersDark() ? 'dark' : 'light');
			}
		};
		mq.addEventListener?.('change', handler);
		return () => mq.removeEventListener?.('change', handler);
	}, [theme]);

	const setTheme = useCallback((next: Theme) => {
		setThemeState(next);
	}, []);

	const toggleTheme = useCallback(() => {
		setThemeState(prev => {
			const next = (prev === 'dark' ? 'light' : 'dark') as Theme;
			return next;
		});
	}, []);

	// Animated toggle state
	const [isAnimating, setIsAnimating] = useState(false);
	const [animatingTo, setAnimatingTo] = useState<'light' | 'dark' | null>(null);
	const [phase, setPhase] = useState<'idle' | 'expanding' | 'fading'>('idle');
	const [maxRadius, setMaxRadius] = useState<number>(0);

	const toggleThemeAnimated = useCallback(() => {
		if (isAnimating) return;
		const target: 'light' | 'dark' = resolvedTheme === 'dark' ? 'light' : 'dark';
		// compute diagonal radius to guarantee full coverage from top-right
		const radius = typeof window !== 'undefined' ? Math.hypot(window.innerWidth, window.innerHeight) : 3000;
		setMaxRadius(radius);
		setAnimatingTo(target);
		setIsAnimating(true);
		setPhase('expanding');
	}, [isAnimating, resolvedTheme]);

	const value = useMemo<ThemeContextValue>(() => ({ theme, resolvedTheme, setTheme, toggleTheme, toggleThemeAnimated }), [theme, resolvedTheme, setTheme, toggleTheme, toggleThemeAnimated]);

	// Match CSS variable values for background for smooth overlay color
	const LIGHT_BG = 'oklch(1 0 0)';
	const DARK_BG = 'oklch(0.129 0.042 264.695)';

	return (
		<ThemeContext.Provider value={value}>
			{children}
			{/* Animated circular reveal overlay via clip-path circle from top-right */}
			<AnimatePresence>
				{isAnimating && animatingTo && (
					<motion.div
						key={animatingTo + phase}
						initial={phase === 'expanding' ? { clipPath: 'circle(0px at 100% 0%)', opacity: 1 } : { opacity: 1 }}
						animate={
							phase === 'expanding'
								? { clipPath: `circle(${maxRadius}px at 100% 0%)` }
								: { opacity: 0 }
						}
						transition={phase === 'expanding' ? { duration: 0.55, ease: [0.4, 0, 0.2, 1] } : { duration: 0.18, ease: 'easeOut' }}
						style={{
							position: 'fixed',
							top: 0,
							left: 0,
							right: 0,
							bottom: 0,
							zIndex: 9999,
							pointerEvents: 'none',
							background: animatingTo === 'dark' ? DARK_BG : LIGHT_BG,
						}}
						onAnimationComplete={() => {
							if (phase === 'expanding') {
								// fully covered; switch theme underneath and then fade the overlay away
								setThemeState(prev => (prev === 'dark' ? 'light' : 'dark'));
								applyThemeClass(animatingTo);
								setPhase('fading');
							} else {
								setAnimatingTo(null);
								setIsAnimating(false);
								setPhase('idle');
							}
						}}
					/>
				)}
			</AnimatePresence>
		</ThemeContext.Provider>
	);
};

export function useTheme(): ThemeContextValue {
	const ctx = useContext(ThemeContext);
	if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
	return ctx;
}
