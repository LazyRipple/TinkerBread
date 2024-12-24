import { Button } from "@/components/Button";
import Link from "next/link";

export default function NotFoundPage() {
	return (
    <div className="flex size-full flex-col items-center justify-center space-y-4">
        
        <video autoPlay muted loop playsInline className="bg-video">
            <source src="/Tinkerbread_home.mp4" type="video/mp4" />
        </video>
        <div className="flex max-w-[80vw] flex-col items-center justify-center space-y-6 rounded-xl bg-black bg-opacity-80 p-8">
        <div
            className="my-3 animate-bounce text-2xl font-bold tracking-wider text-white"
            style={{ animationDuration: '1.5s' }}
        >
           This TinkerBread can&apos;t be found !!
        </div>
        <p className="text-white">please check the correction of your url and make sure you are login</p>
        <Link className="w-44" href="/">
            <Button text="Back to Home" />
        </Link></div>
    </div>
    )
}
