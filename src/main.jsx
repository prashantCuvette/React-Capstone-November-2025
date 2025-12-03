import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { UserContextProvider } from "./context/UserContext";
import { BrowserRouter } from "react-router";
import { Toaster } from "react-hot-toast";

createRoot(document.getElementById("root")).render(
  <UserContextProvider>
    <BrowserRouter>
      <Toaster />
      <App />
    </BrowserRouter>
  </UserContextProvider>
);
