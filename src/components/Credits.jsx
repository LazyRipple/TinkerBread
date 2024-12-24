export function CreditsModal({ onClose }) {
    return (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
            <div className="bg-green-800 border-white border-2 p-8 rounded-2xl shadow-lg text-center max-w-md w-[90%]">
                <h2 className="text-[#FFD889] text-2xl mb-4 font-bold">Credits</h2>
                <p className="text-white">This project made by <strong>LazyRipple</strong></p>
                <p className="text-xl font-medium text-white">
                    <a
                        href="https://github.com/neennera"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-pink-300 underline-none hover:text-pink-500"
                    >
                        neennera <span className="inline">🌊</span>
                    </a>
                    &nbsp;and&nbsp;
                    <a
                        href="https://github.com/Brnn043"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-pink-300 underline-none hover:text-pink-500"
                    >
                        Brnn043 <span className="inline">💫</span>
                    </a>
                </p>
                <p className="mb-4 text-white">
                    Visit our repo{" "}
                    <a
                        href=""
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-pink-300 underline-none hover:text-pink-500"
                    >
                        here
                    </a>
                </p>
                <p className="mb-4 text-white">
                    Feel free to share your feedback{" "}
                    <a
                        href="https://forms.gle/99UeMnN3zmXJjoAD9"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-pink-300 underline-none hover:text-pink-800"
                    >
                        here
                    </a>
                </p>
                <p className="text-[#FFD889] text-lg font-bold border-white">Merry Christmas!</p>
                <button
                    onClick={onClose}
                    className="mt-6 w-32 border-2 border-white bg-red-800 hover:bg-[#FFD889] hover:text-red-800 text-white py-2 px-4 rounded-xl shadow-lg transition duration-300"
                >
                    Close
                </button>
            </div>
        </div>
    );
}
