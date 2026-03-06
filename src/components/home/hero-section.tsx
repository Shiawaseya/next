"use client";

import Link from "next/link";
import { motion, Variants } from "framer-motion";
import { CursorBackground } from "@/components/animations/cursor-background";
import { ArrowRight, Sparkles } from "lucide-react";
import { useTheme } from "next-themes";
import { useDir } from "@/components/dir-provider";
import { Sun, Moon, Languages } from "lucide-react";

export function HeroSection() {
    const { theme, setTheme } = useTheme();
    const { isRtl, toggleRtl } = useDir();

    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.2
            }
        }
    };

    const itemVariants: Variants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { type: "spring", stiffness: 100, damping: 20 }
        }
    };

    return (
        <>
            <CursorBackground />

            {/* Top Navigation / Controls */}
            <header className="absolute top-0 w-full p-6 flex justify-between items-center z-20">
                <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center font-bold text-primary text-xl backdrop-blur-sm">
                    B
                </div>

                <div className="flex items-center gap-3">
                    <button
                        onClick={toggleRtl}
                        className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-accent/50 text-muted-foreground hover:text-foreground transition-colors backdrop-blur-sm"
                    >
                        <Languages size={20} />
                    </button>
                    <button
                        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                        className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-accent/50 text-muted-foreground hover:text-foreground transition-colors backdrop-blur-sm relative"
                    >
                        <Sun size={20} className="rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                        <Moon size={20} className="absolute rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                    </button>
                    <Link
                        href="/login"
                        className="hidden sm:inline-flex px-4 py-2 text-sm font-medium rounded-full bg-secondary hover:bg-secondary/80 text-secondary-foreground transition-colors"
                    >
                        Sign in
                    </Link>
                </div>
            </header>

            {/* Main Hero Content */}
            <div className="flex-1 flex items-center justify-center relative z-10 px-4 sm:px-6 lg:px-8 pt-20">
                <motion.div
                    className="max-w-4xl mx-auto text-center"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <motion.div variants={itemVariants} className="flex justify-center mb-6">
                        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium border border-primary/20 backdrop-blur-md">
                            <Sparkles size={16} />
                            <span>Next.js Dashboard Boilerplate</span>
                        </span>
                    </motion.div>

                    <motion.h1 variants={itemVariants} className="text-5xl sm:text-7xl font-extrabold tracking-tight mb-8">
                        Build faster with <br className="hidden sm:block" />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/50">
                            beautiful interfaces
                        </span>
                    </motion.h1>

                    <motion.p variants={itemVariants} className="text-lg sm:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
                        A robust starting point featuring complete authentication, animated layouts, theme switching, RTL support, and gorgeous minimal design out of the box.
                    </motion.p>

                    <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link
                            href="/login"
                            className="group relative inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold text-primary-foreground bg-primary rounded-full overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-xl shadow-primary/20"
                        >
                            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
                            <span>Access Dashboard</span>
                            <ArrowRight size={20} className="transition-transform group-hover:translate-x-1" />
                        </Link>
                        <a
                            href="https://github.com/Gerald/anti"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center px-8 py-4 text-base font-medium rounded-full border border-border bg-background/50 hover:bg-accent/50 backdrop-blur-md transition-colors"
                        >
                            View source
                        </a>
                    </motion.div>
                </motion.div>
            </div>
        </>
    );
}
