import Link from "next/link";

export default function NotFound() {
    return (
        <div className="min-h-screen bg-background flex items-center justify-center p-4">
            <div className="text-center space-y-6">
                <h1 className="text-6xl font-bold text-primary">404</h1>
                <h2 className="text-2xl font-semibold text-foreground">
                    Page Not Found
                </h2>
                <p className="text-muted-foreground max-w-md">
                    The page you are looking for doesn&apos;t exist or has been moved.
                </p>
                <Link
                    href="/"
                    className="inline-block px-6 py-3 border-2 border-foreground bg-transparent text-foreground font-bold uppercase tracking-wider transition-all duration-150 ease-out hover:bg-primary hover:text-primary-foreground hover:border-primary"
                >
                    Return Home
                </Link>
            </div>
        </div>
    );
}
