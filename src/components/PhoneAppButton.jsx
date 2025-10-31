// App.jsx
import React from "react";
import { FaPhone } from "react-icons/fa";

const PhoneAppButton = () => {
    const phoneNumber = "9079001762";

    return (
        <div>
            <a
                href={`tel:${phoneNumber}`}
                className="fixed bottom-[7rem] right-6 z-50 bg-red-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg animate-bounce"
            >
                <FaPhone size={28} />
            </a>
        </div>
    );
};

export default PhoneAppButton;
