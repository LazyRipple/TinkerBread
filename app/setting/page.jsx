"use client";
import "../style/setting.css";
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
    <div className="gradient-container relative flex flex-col items-center justify-center h-full min-h-screen w-full text-white shadow-lg p-8">
      {/* Back Button */}
      <button className="absolute border-2 border-white top-3 left-3 bg-red-800 hover:bg-red-900 text-white w-12 h-12 p-3 rounded-full shadow-lg transition duration-300"
        onClick={handleBack}>
        <img src='/icon/back.webp' alt="Back" className='w-full h-full' />
      </button>

      <div>
        <h1 className="text-4xl font-bold text-center text-white">Settings</h1>
        <div className="flex flex-col gap-6 mt-6 w-full max-w-md">
          <label className="flex flex-col gap-2">
            <span className="text-lg font-medium text-white">Name:</span>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="max-w-md w-[90%] border-2 border-white rounded-lg px-4 py-3 shadow-lg focus:outline-none focus:ring-2 focus:ring-[#FFD889] bg-[#FFD889] placeholder-white text-red-800 transition-transform duration-300 hover:scale-105"
              placeholder="Enter your name"
            />
          </label>
          <label className="flex flex-col gap-2">
            <span className="text-lg font-medium text-white">Thank You Message:</span>
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="max-w-md w-[90%] border-2 border-white rounded-lg px-4 py-3 shadow-lg focus:outline-none focus:ring-2 focus:ring-[#FFD889] bg-[#FFD889] placeholder-white text-red-800 transition-transform duration-300 hover:scale-105"
              placeholder="Enter your message"
            />
          </label>
          <div className="flex gap-4">
            <button
              onClick={handleSave}
              className="border-2 border-white bg-green-800 text-white px-6 py-3 rounded-full font-medium shadow-lg hover:bg-[#FFD889] hover:text-green-800 focus:outline-none focus:ring-2 focus:ring-[#FFD889]"
            >
              Save
            </button>
          </div>
        </div>
      </div>

    </div>
  );
}
