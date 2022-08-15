import { useMemo } from "react"
import { createTheme, ThemeProvider } from "@mui/material/styles"
import { CssBaseline, useMediaQuery } from "@mui/material"
import Login from "./pages/Login"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Register from "./pages/Register"

function App() {
    const prefersDarkMode = useMediaQuery('(prefers-color-schema: dark)')
    const theme = useMemo(() => createTheme({
        palette: {
            mode: prefersDarkMode ? 'dark' : 'light'
        }
    }), [prefersDarkMode])

    return <>
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <BrowserRouter>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                </Routes>
            </BrowserRouter>
        </ThemeProvider>
    </>
}

export default App;