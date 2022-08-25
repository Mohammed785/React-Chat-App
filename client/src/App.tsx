import React, { Fragment, useMemo } from "react"
import { createTheme, ThemeProvider } from "@mui/material/styles"
import { CssBaseline, useMediaQuery } from "@mui/material"
import Login from "./pages/Login"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Register from "./pages/Register"
import ProtectedRoute from "./components/ProtectedRoute"
import Home from "./pages/Home"
import { ChatProvider } from "./context/chatContext"
import { SocketProvider } from "./context/socketContext"

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
                <ChatProvider>
                    <SocketProvider>
                        <Routes>
                            <Route path="/" element={<ProtectedRoute><Home/></ProtectedRoute>}/>
                        </Routes>
                    </SocketProvider>
                </ChatProvider>
            </BrowserRouter>
        </ThemeProvider>
    </>
}

export default App;