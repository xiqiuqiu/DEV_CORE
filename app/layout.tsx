import type { Metadata } from "next";
import { Space_Grotesk, Space_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryProvider } from "@/components/providers/QueryProvider";
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

export const metadata: Metadata = {
    title: {
        template: "%s | DEV_CORE",
        default: "DEV_CORE | Design. Code. Deploy.",
    },
    description:
        "UI Designer by eye, Full-stack Dev by logic. 4Y Design + 3Y Vue. From Figma prototypes to Docker deployments—handling the complete product lifecycle.",
    openGraph: {
        title: "DEV_CORE | Design. Code. Deploy.",
        description:
            "UI Designer by eye, Full-stack Dev by logic. 4Y Design + 3Y Vue. From Figma prototypes to Docker deployments—handling the complete product lifecycle.",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "DEV_CORE | Design. Code. Deploy.",
        description:
            "UI Designer by eye, Full-stack Dev by logic. 4Y Design + 3Y Vue. From Figma prototypes to Docker deployments—handling the complete product lifecycle.",
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
            className={cn(spaceGrotesk.variable, spaceMono.variable)}
            suppressHydrationWarning
        >
            <body suppressHydrationWarning>
                <div className="antialiased min-h-screen">
                    <QueryProvider>
                        <TooltipProvider>
                            <Toaster />
                            <Sonner />
                            {children}
                        </TooltipProvider>
                    </QueryProvider>
                </div>
            </body>
        </html>
    );
}
