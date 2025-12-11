"use client";
import { motion } from "framer-motion";
import NextImage from "next/image";
import styles from "./style.module.scss";
import { opacity } from "../../anim";

export default function Image({ src, isActive }: { src: string; isActive: boolean }) {
  return (
    <motion.div variants={opacity} initial="initial" animate={isActive ? "open" : "closed"} className={styles.imageContainer}>
      <NextImage src={`/images/${src}`} fill alt="image" />
    </motion.div>
  );
}

