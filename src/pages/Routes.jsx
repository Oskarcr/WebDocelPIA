import NotFound from "./NotFound.jsx"
import App from "../App.jsx";
import Home from "./Home.jsx";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Shopping from "./Shopping.jsx";

export default function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/not_found" element= {<NotFound/>} />
                <Route path="/template" element={<App />} />
                <Route path="/" element= {<Home />} />
                <Route path="/shopping" element={<Shopping/>} />
            </Routes>
        </BrowserRouter>
    )
}