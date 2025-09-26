import Navbar from './components/ui/Navbar'
import Home from './pages/Home'
import { ThemeProvider } from './components/theme/ThemeProvider'
import { useTheme } from './components/theme/ThemeProvider'
import Footer from '@/components/ui/Footer'
function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-background text-foreground flex flex-col">
        <ThemedNavbarWrapper />
        <main className="flex-1 pt-8 pb-24">{/* spacing for bottom navbar and footer */}
          {/* <Auth/>  */}
          <Home />
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  )
}

function ThemedNavbarWrapper() {
  const { toggleThemeAnimated, resolvedTheme } = useTheme()
  const isDarkMode = resolvedTheme === 'dark'
  return <Navbar onThemeToggle={toggleThemeAnimated} isDarkMode={isDarkMode} />
}

export default App
