import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom"
import Navbar from './components/ui/Navbar'
import Home from './pages/Home'
 // example page
import { ThemeProvider } from './components/theme/ThemeProvider'
import { useTheme } from './components/theme/ThemeProvider'
import Footer from '@/components/ui/Footer'
import Auth from "./pages/Auth"

function App() {
  return (
    <ThemeProvider>
      <Router>
        <AppShell />
      </Router>
    </ThemeProvider>
  )
}

function AppShell() {
  const location = useLocation()
  const pathname = location.pathname.toLowerCase()
  const isAuthRoute = pathname === "/login" || pathname === "/auth"

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      {!isAuthRoute && <ThemedNavbarWrapper />}

      <main className={isAuthRoute ? "flex-1" : "flex-1 pt-8 pb-24"}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/login" element={<Auth />} />
        </Routes>
      </main>

      {!isAuthRoute && <Footer />}
    </div>
  )
}

function ThemedNavbarWrapper() {
  const { toggleThemeAnimated, resolvedTheme } = useTheme()
  const isDarkMode = resolvedTheme === 'dark'
  return <Navbar onThemeToggle={toggleThemeAnimated} isDarkMode={isDarkMode} />
}

export default App
