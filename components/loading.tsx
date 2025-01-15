"use client";

import { motion } from "framer-motion";

export default function LoadingComponent() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center w-full">
      <div className="flex flex-col items-center justify-center min-h-screen w-full bg-gradient-to-br from-purple-600 to-blue-500">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="w-32 h-32 mb-8 rounded-full bg-white/30 flex items-center justify-center"
          >
            <div className="w-24 h-24 rounded-full bg-white/60" />
          </motion.div>
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-4xl font-bold text-white mb-4"
          >
            Loading
          </motion.h1>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ duration: 2, repeat: Infinity }}
            className="h-1 bg-white/50 rounded-full overflow-hidden"
          >
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: "100%" }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="h-full bg-white"
            />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
