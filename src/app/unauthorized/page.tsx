"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ShieldAlert, ArrowLeft, LogIn } from "lucide-react";
import { StarsBackground } from "@/components/animations/stars-background";

export default function UnauthorizedPage() {
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute inset-0 w-full h-full pointer-events-none">
        <StarsBackground />
      </div>

      <motion.div
        className="w-full max-w-md space-y-8 bg-card/60 backdrop-blur-xl p-8 sm:p-10 rounded-3xl shadow-2xl border border-white/10 dark:border-white/5 relative z-10 text-center"
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{
            duration: 0.5,
            delay: 0.2,
            type: "spring",
            bounce: 0.5,
          }}
          className="mx-auto w-20 h-20 bg-destructive/10 text-destructive rounded-full flex items-center justify-center mb-6 ring-1 ring-destructive/20"
        >
          <ShieldAlert size={40} />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.4 }}
          className="text-3xl font-bold tracking-tight text-foreground"
        >
          Unauthorized Access
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.4 }}
          className="mt-4 text-muted-foreground"
        >
          You need to be logged in to access this page. Please sign in to
          continue.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.4 }}
          className="mt-8 flex flex-col sm:flex-row gap-3"
        >
          <button
            onClick={() => router.push("/login")}
            className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-primary/20"
          >
            <LogIn size={18} />
            Sign In
          </button>

          <button
            onClick={() => router.back()}
            className="flex-1 flex items-center justify-center gap-2 rounded-xl border border-border bg-background/50 px-4 py-3 text-sm font-semibold text-foreground hover:bg-accent transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <ArrowLeft size={18} />
            Go Back
          </button>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.4 }}
          className="mt-6 text-xs text-muted-foreground"
        >
          If you believe this is an error, please contact your system
          administrator.
        </motion.p>
      </motion.div>
    </div>
  );
}
