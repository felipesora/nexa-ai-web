import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "../pages/Login";

export default function AppRoutes() {
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/auth/login" element={<Login />} />
            </Routes>
        </BrowserRouter>
    );
}