import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { UserContextProvider } from "./context/UserContext";
import { BrowserRouter } from "react-router";
import { Toaster } from "react-hot-toast";
import { TaskContextProvider } from "./context/TaskContext.jsx";

createRoot(document.getElementById("root")).render(
  <UserContextProvider>
    <TaskContextProvider>
      <BrowserRouter>
        <Toaster />
        <App />
      </BrowserRouter>
    </TaskContextProvider>
  </UserContextProvider>
);
