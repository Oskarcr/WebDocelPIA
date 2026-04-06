import { Pages } from "@/DocelCore";
import App from "../App.jsx";
import { Routes, Route, BrowserRouter } from "react-router-dom";

export default function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/not_found" element= {<Pages.NotFound/>} />
                <Route path="/template" element={<App />} />
                <Route path="/" element= {<Pages.Home />} />
                <Route path="/shopping" element={<Pages.Shopping/>} />
                <Route path="/login" element={<Pages.Login/>}/>
            </Routes>
        </BrowserRouter>
    )
}