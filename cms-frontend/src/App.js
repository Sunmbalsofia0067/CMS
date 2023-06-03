import "./App.css";
import { Fragment } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as routes from "./constants/routePaths.js";
import Dashboard from "./pages/Dashboard";
import RegisterUser from "./pages/RegisterUser";
import LoginUser from "./pages/LoginUser";
import HandleAuth from "./components/HandleAuth";
import { AppContextProvider } from "./contexts/AppContext";
import Article from "./pages/Article";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <div className="app">
      <AppContextProvider>
        <BrowserRouter>
          <Routes>
            <Route
              path={routes.homePage}
              element={
                <HandleAuth type="PROTECTED">
                  <Dashboard />
                </HandleAuth>
              }
            />
            <Route
              path={routes.registerUserPage}
              element={
                <HandleAuth>
                  <RegisterUser />
                </HandleAuth>
              }
            />
            <Route
              path={routes.loginUserPage}
              element={
                <HandleAuth>
                  <LoginUser />
                </HandleAuth>
              }
            />

            <Route path="/articles/:id" element={<Article />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AppContextProvider>
      <ToastContainer />
    </div>
  );
}
export default App;
