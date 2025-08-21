import React, { useContext } from "react";
import { AuthContext } from "../../common/helper/AuthContext.jsx";

export default function RefreshConfirmationModal() {

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-lg z-5">
            <div className="loginModal rounded-2xl p-3 h-[46%] w-[22%] flex flex-col items-center justify-center">
                <div className="flex flex-row items-start justify-between h-1/10 w-[100%]">
                    <div></div>
                    <div></div>
                </div>
                <div className="flex flex-col items-center justify-center h-9/10 pb-[10%]">
                    <p className="text-base font-extrabold py-4">Do you want to refresh the page ?</p>
                    <button>yes</button>
                    <button>no</button>
                </div>
            </div>
        </div>
    );
}
