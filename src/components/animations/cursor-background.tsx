"use client";

import { useEffect, useState } from "react";
import { motion, useSpring } from "framer-motion";

export function CursorBackground() {
    const [isMounted, setIsMounted] = useState(false);

    const mouseX = useSpring(0, { stiffness: 50, damping: 20 });
    const mouseY = useSpring(0, { stiffness: 50, damping: 20 });

    useEffect(() => {
        setIsMounted(true);
        const handleMouseMove = (e: MouseEvent) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, [mouseX, mouseY]);

    if (!isMounted) return null;

    return (
        <motion.div
            className="pointer-events-none fixed inset-0 z-0 h-full w-full overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
        >
            <motion.div
                className="absolute w-[600px] h-[600px] rounded-full blur-[100px] bg-primary/20 dark:bg-primary/10 -translate-x-1/2 -translate-y-1/2 will-change-transform mix-blend-screen"
                style={{
                    x: mouseX,
                    y: mouseY,
                    left: "-300px",
                    top: "-300px",
                }}
            />
            {/* Secondary atmospheric glow */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full blur-[120px] bg-accent/30 -z-10" />
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] rounded-full blur-[150px] bg-secondary/20 -z-10" />
        </motion.div>
    );
}
