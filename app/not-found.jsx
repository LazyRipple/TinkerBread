import { Button } from "@/components/Button";
import Link from "next/link";

export default function NotFoundPage() {
	return (
    <div>
        <h1>Page not found</h1>
        <Link href="/">
            <Button text="Back to Home" />
        </Link>
    </div>
    )
}
