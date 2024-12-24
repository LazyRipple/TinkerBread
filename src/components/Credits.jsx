export function CreditsModal({ onClose }) {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="w-[90%] max-w-md rounded-2xl border-2 border-white bg-green-800 p-8 text-center shadow-lg">
                <h2 className="mb-4 text-2xl font-bold text-[#FFD889]">Credits</h2>
                <p className="text-white">This project made by <strong>LazyRipple</strong></p>
                <p className="text-xl font-medium text-white">
                    <a
                        href="https://github.com/neennera"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline-none text-pink-300 hover:text-pink-500"
                    >
                        neennera <span className="inline">🌊</span>
                    </a>
                    &nbsp;and&nbsp;
                    <a
                        href="https://github.com/Brnn043"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline-none text-pink-300 hover:text-pink-500"
                    >
                        Brnn043 <span className="inline">💫</span>
                    </a>
                </p>
                <p className="mb-4 text-white">
                    Visit our repo{" "}
                    <a
                        href="https://github.com/LazyRipple/TinkerBread"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline-none text-pink-300 hover:text-pink-500"
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
                        className="underline-none text-pink-300 hover:text-pink-800"
                    >
                        here
                    </a>
                </p>
                <p className="border-white text-lg font-bold text-[#FFD889]">Merry Christmas!</p>
                <button
                    onClick={onClose}
                    className="mt-6 w-32 rounded-xl border-2 border-white bg-red-800 px-4 py-2 text-white shadow-lg transition duration-300 hover:bg-[#FFD889] hover:text-red-800"
                >
                    Close
                </button>
            </div>
        </div>
    );
}
