import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import Login from "./Login";
import Signup from "./Signup";
import Recoverpassword from "./PasswordRecovery";
import Recover from "./RecoverPage";
import Admin from "./admin";
import ChangeUserPass from "./adminchangepassword";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route
          path="respas/:token"
          element={
            <>
              <Recover />
            </>
          }
        />
        <Route
          path="admin"
          element={
            <>
              <Admin />
            </>
          }
        />
        <Route
          path="/"
          element={
            <>
              <App />
            </>
          }
        />
        <Route
          path="signup"
          element={
            <>
              <Signup />
            </>
          }
        />
        <Route
          path="login"
          element={
            <>
              <Login />
            </>
          }
        />
        <Route
          path="recover"
          element={
            <>
              <Recoverpassword />
            </>
          }
        />
        <Route
          path="admin/reset/:username/:admin"
          element={
            <>
              <ChangeUserPass />
            </>} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
