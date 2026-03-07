// ============================================================
//  SPENDSMART — NotFound.jsx
//  404 page
//  Author  : Hassan Javed
//  © 2026 Hassan Javed — All Rights Reserved
// ============================================================

import { Link } from "react-router-dom";

const NotFound = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-[#080f0a] gap-4">
            <h1 className="text-7xl font-bold text-emerald-400">404</h1>
            <p className="text-gray-500">Page not found</p>
            <Link to="/dashboard" className="text-emerald-400 border border-emerald-400 px-5 py-2 rounded-lg text-sm hover:bg-emerald-400 hover:text-black transition-all">
                Go to Dashboard
            </Link>
        </div>
    );
};

export default NotFound;

// © 2026 Hassan Javed — All Rights Reserved