"use client"
import { useState} from "react";
import { toast, Toaster } from 'react-hot-toast';
import GingerbreadModel from "../signup/gingerbreadModel";
import { signIn } from "next-auth/react";
export default function ChatDialog({
    username, setUsername, thxmessage, setThxMessage, GGBType, setGGBType, email
}) {
    const [currentStep, setCurrentStep] = useState(0);
    const [currentModelIndex, setCurrentModelIndex] = useState(0);

    const handleNext = async () => {        
        if (currentStep === 1 && !username.trim()) {
            toast.dismiss();
            toast.error("Please enter your name 🎀");
            return;
        }
        if (currentStep === 3 && !GGBType) {
            toast.dismiss();
            toast.error("Please choose a gingerbread buddy 🍪");
            return;
        }
        if (currentStep === 7 && !thxmessage.trim()) {
            toast.dismiss();
            toast.error("Please write a thank-you message for your friend ✨");
            return;
        }
        if (currentStep>= 8 ){            
            try {
                const payload = {
                    username,
                    email,
                    thanks_message: thxmessage,
                    GGB_type: GGBType,
                    }

                const res = await (
                    await fetch(`api/auth/signup`, {
                        method: 'POST',
                        headers: {
                        'Content-Type': 'application/json',
                        Origin: window.location.origin,
                        },
                        body: JSON.stringify({payload}),
                    })
                    ).json()

                    if (res.message == 'failed') {
                    throw new Error(res.error)
                    }

                signIn('google')
            } catch (error) {
                toast.error(error.message)
            }
        }
        setCurrentStep(currentStep + 1);
    };

    const ggbType = ["ggb1", "ggb2", "ggb3", "ggb4"];

    const handleNextModel = () => {
        setCurrentModelIndex((prev) => (prev + 1) % ggbType.length);
    };

    const handlePrevModel = () => {
        setCurrentModelIndex((prev) => (prev - 1 + ggbType.length) % ggbType.length);
    };

    const handleConfirmModel = () => {
        setGGBType(ggbType[currentModelIndex]);
        setCurrentStep(currentStep + 1);
    };

    const dialogues = [
        "Let’s whip up some gingerbread magic! 🍪✨",
        <>
            But first... what should I call you? 🎀
            <input
                type="text"
                placeholder="Enter your name"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="mt-4 w-full rounded-md bg-gray-100 px-4 py-2 text-gray-700 shadow-md focus:outline-none focus:ring-2 focus:ring-pink-300"
            />
        </>,
        "Now, let’s get cooking.",
        <>
            Choose your gingerbread buddy!
            <div className="relative h-72 py-0">
                <button
                    onClick={handlePrevModel}
                    className="absolute left-0 top-1/2 z-10 -translate-y-1/2 rounded-full bg-red-200 px-4 py-2 shadow hover:bg-red-300"
                >
                    {"<"}
                </button>
                <GingerbreadModel
                    ggbType={ggbType[currentModelIndex]}
                />
                <button
                    onClick={handleNextModel}
                    className="absolute right-0 top-1/2 z-10 -translate-y-1/2 rounded-full bg-green-200 px-4 py-2 shadow hover:bg-green-300"
                >
                    {">"}
                </button>
            </div>
            <div className="mt-4 text-sm font-medium">{
                ggbType[currentModelIndex] == "ggb1" ? "Joy" : ggbType[currentModelIndex] == "ggb2" ? "Adam" : ggbType[currentModelIndex] == "ggb3" ? "Eve" :  "Holly"
                }</div>
            <button
                onClick={handleConfirmModel}
                className="mt-4 rounded-lg bg-green-800 px-6 py-3 font-medium text-white shadow-lg transition-transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-300"
            >
                Confirm
            </button>
        </>,
        "Hmm… looks like your gingerbread is a bit plain, don’t you think?",
        "But don’t worry—you’ve got just the solution!",
        "Get your friends to sprinkle their magic and decorate it for you!",
        <>
            You can even set a special thank-you message for your friend—it’ll show up after they finish decorating!
            <textarea
                value={thxmessage}
                onChange={(e) => setThxMessage(e.target.value)}
                placeholder="Write your thank-you message"
                className="mt-4 w-full rounded-md bg-gray-100 px-4 py-2 text-gray-700 shadow-md focus:outline-none focus:ring-2 focus:ring-pink-300"
            ></textarea>
        </>,
        "All set! Get ready to decorate and share the holiday magic. 🎄✨",
        "Please Login with your email",
    ];

    return (
        <>
            <div className="gradient-container relative flex size-full min-h-screen flex-col items-center justify-center gap-6 bg-red-900 p-8 text-blue-800 shadow-lg ">
                <Toaster />
                <div className="w-full max-w-lg rounded-lg bg-white p-8 text-center shadow-lg">
                    <div className="text-lg font-semibold">
                        {dialogues[currentStep]}
                    </div>

                    {currentStep != 3 &&
                        <button
                            onClick={handleNext}
                            className="mt-6 rounded-lg bg-green-800 px-6 py-3 font-medium text-white shadow-lg transition-transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-300"
                        >
                            {currentStep < dialogues.length - 1 ? "Next ✨" : "Let’s Start 🎄"}
                        </button>}
                </div>
            </div>
        </>
    );
}
