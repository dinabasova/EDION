"use client";

import { ReactNode } from "react";
import { motion, Variants } from "framer-motion";

type AosType =
  | "fade-up"
  | "fade-right"
  | "fade-left"
  | "zoom-in"
  | "zoom-in-up"
  | "zoom-in-right";

interface AosWrapperProps {
  children: ReactNode;
  type?: AosType;
  delayMs?: number;
  className?: string;
}


export default function AosWrapper({
  children,
  type = "fade-up",
  delayMs = 0,
  className = "",
}: AosWrapperProps) {
  const delay = (delayMs ?? 0) / 1000;

  const variants: Variants = (() => {
    switch (type) {
      case "fade-up":
        return {
          hidden: { opacity: 0, y: 40 },
          show: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.8, ease: "easeOut", delay },
          },
        };
      case "fade-right":
        return {
          hidden: { opacity: 0, x: -40 },
          show: {
            opacity: 1,
            x: 0,
            transition: { duration: 0.8, ease: "easeOut", delay },
          },
        };
      case "fade-left":
        return {
          hidden: { opacity: 0, x: 40 },
          show: {
            opacity: 1,
            x: 0,
            transition: { duration: 0.8, ease: "easeOut", delay },
          },
        };
      case "zoom-in":
        return {
          hidden: { opacity: 0, scale: 0.8 },
          show: {
            opacity: 1,
            scale: 1,
            transition: { duration: 0.8, ease: "easeOut", delay },
          },
        };
      case "zoom-in-up":
        return {
          hidden: { opacity: 0, scale: 0.8, y: 30 },
          show: {
            opacity: 1,
            scale: 1,
            y: 0,
            transition: { duration: 0.8, ease: "easeOut", delay },
          },
        };
      case "zoom-in-right":
        return {
          hidden: { opacity: 0, scale: 0.8, x: 30 },
          show: {
            opacity: 1,
            scale: 1,
            x: 0,
            transition: { duration: 0.8, ease: "easeOut", delay },
          },
        };
      default:
        return {
          hidden: { opacity: 0 },
          show: {
            opacity: 1,
            transition: { duration: 0.8, ease: "easeOut", delay },
          },
        };
    }
  })();

  return (
    <motion.div
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.3 }}
    >
      {children}
    </motion.div>
  );
}
