"use client";
import '../style/setting.css';
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function SettingPage() {
    const [name, setName] = useState("");
    const [message, setMessage] = useState("");
    const router = useRouter();

    useEffect(() => {
        const savedName = localStorage.getItem("name") || "";
        const savedMessage = localStorage.getItem("thankYouMessage") || "";
        setName(savedName);
        setMessage(savedMessage);
    }, []);

    const handleSave = () => {
        localStorage.setItem("name", name);
        localStorage.setItem("thankYouMessage", message);
        alert("Settings saved!");
        router.push("/bake");
    };

    const handleBack = () => {
        router.push("/bake");
    };

    return (
        <div className="relative flex flex-col h-full min-h-screen w-full gap-6 px-6 py-8 md:mx-auto md:max-w-[25rem] bg-blue-50 text-blue-800 shadow-lg">
            {/* Back Button */}
            <button
                onClick={handleBack}
                className="absolute top-4 left-4 bg-blue-300 text-white rounded-full p-2 shadow-lg hover:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
                🡄
            </button>

            <h1 className="text-4xl font-bold text-center text-blue-600">Settings</h1>
            <div className="flex flex-col gap-6 mt-6">
                <label className="flex flex-col gap-2">
                    <span className="text-lg font-medium text-blue-600">Name:</span>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="border border-blue-300 rounded-lg px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 bg-blue-100 placeholder-blue-300 text-blue-800"
                        placeholder="Enter your name"
                    />
                </label>
                <label className="flex flex-col gap-2">
                    <span className="text-lg font-medium text-blue-600">Thank You Message:</span>
                    <input
                        type="text"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className="border border-blue-300 rounded-lg px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 bg-blue-100 placeholder-blue-300 text-blue-800"
                        placeholder="Enter your message"
                    />
                </label>
                <div className="flex gap-4">
                    <button
                        onClick={handleSave}
                        className="bg-blue-400 text-white px-6 py-3 rounded-full font-medium shadow-lg hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-300"
                    >
                        Save & Go Back
                    </button>
                </div>
            </div>
        </div>
    );
}
