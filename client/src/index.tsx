import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AuthProvider } from "./context/authContext";
import { ChatProvider } from "./context/chatContext";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement)

root.render(
    <React.StrictMode>
        <AuthProvider>
            <ChatProvider>
                <App/>
            </ChatProvider>
        </AuthProvider>
    </React.StrictMode>
)