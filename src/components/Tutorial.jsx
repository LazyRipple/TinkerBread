import React, { useState } from 'react';

export function TutorialModal({ isVisible, onClose, tutorialPages }) {
    const [currentPage, setCurrentPage] = useState(0);

    if (!isVisible) return null;

    const goToNext = () => {
        if (currentPage < tutorialPages.length - 1) setCurrentPage(currentPage + 1);
    };

    const goToPrevious = () => {
        if (currentPage > 0) setCurrentPage(currentPage - 1);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="relative border-2 border-white bg-green-700 rounded-2xl shadow-xl p-6 max-w-md w-[90%]">
                {/* Close Button */}
                <button
                    className="absolute top-4 right-4 text-white font-bold hover:text-red-700 focus:outline-none"
                    onClick={onClose}
                >
                    X
                </button>

                {/* Modal Content */}
                <h2 className="text-2xl font-bold text-center text-white mb-4">
                    {tutorialPages[currentPage].topic}
                </h2>
                <img
                    src={tutorialPages[currentPage].image}
                    alt={tutorialPages[currentPage].topic}
                    className="w-full h-48 object-cover rounded-md mb-4 shadow-md text-[#FFD889]"
                />
                <p className="text-center text-[#FFD889] text-lg mb-6">
                    {tutorialPages[currentPage].description}
                </p>

                {/* Navigation Buttons */}
                <div className="flex justify-between">
                    <button
                        onClick={goToPrevious}
                        disabled={currentPage === 0}
                        className="w-24 border-2 border-white bg-red-800 hover:bg-[#FFD889] hover:text-red-800 text-white py-2 px-4 rounded-xl shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-xl focus:outline-none 
  disabled:bg-gray-400 disabled:border-gray-400 disabled:text-gray-300 disabled:hover:scale-100 disabled:hover:shadow-none"
                    >
                        Previous
                    </button>
                    <button
                        onClick={goToNext}
                        disabled={currentPage === tutorialPages.length - 1}
                        className="w-24 border-2 border-white bg-red-800 hover:bg-[#FFD889] hover:text-red-800 text-white py-2 px-4 rounded-xl shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-xl focus:outline-none 
  disabled:bg-gray-400 disabled:border-gray-400 disabled:text-gray-300 disabled:hover:scale-100 disabled:hover:shadow-none"
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
}
