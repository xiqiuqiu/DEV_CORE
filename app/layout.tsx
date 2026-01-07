import type { Metadata } from "next";
import { Space_Grotesk, Space_Mono } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryProvider } from "@/components/providers/QueryProvider";
import { I18nProvider } from "@/lib/i18n/context";
import { cn } from "@/lib/utils";

const spaceGrotesk = Space_Grotesk({
    variable: "--font-space-grotesk",
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
});

const spaceMono = Space_Mono({
    variable: "--font-space-mono",
    subsets: ["latin"],
    weight: ["400", "700"],
});

// Local custom font - Ocera
const ocera = localFont({
    src: "../components/fonts/ocerapersonnaluse.otf",
    variable: "--font-ocera",
    display: "swap",
});

export const metadata: Metadata = {
    title: {
        template: "%s | SIGCLR",
        default: "SIGCLR – 澄讯空间",
    },
    description:
        "Signal Over Noise: Systems, Architecture, Tools, & Thoughtful Code. Engineering clarity in complex software systems.",
    keywords: ["software engineer", "full-stack developer", "portfolio", "web development", "TypeScript", "Vue", "React", "Node.js"],
    authors: [{ name: "Qiu" }],
    creator: "Qiu",
    openGraph: {
        title: "SIGCLR – 澄讯空间",
        description:
            "Signal Over Noise: Systems, Architecture, Tools, & Thoughtful Code.",
        type: "website",
        siteName: "SIGCLR",
        locale: "en_US",
        // images: [{ url: "/og-image.png", width: 1200, height: 630 }], // TODO: Add OG image
    },
    twitter: {
        card: "summary_large_image",
        title: "SIGCLR – 澄讯空间",
        description:
            "Signal Over Noise: Systems, Architecture, Tools, & Thoughtful Code.",
        creator: "@logic_zy",
    },
    robots: {
        index: true,
        follow: true,
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html
            lang="en"
            className={cn(
                spaceGrotesk.variable,
                spaceMono.variable,
                ocera.variable
            )}
            suppressHydrationWarning
        >
            <body suppressHydrationWarning>
                <div className="antialiased min-h-screen">
                    <I18nProvider>
                        <QueryProvider>
                            <TooltipProvider>
                                <Toaster />
                                <Sonner />
                                {children}
                            </TooltipProvider>
                        </QueryProvider>
                    </I18nProvider>
                </div>
            </body>
        </html>
    );
}
