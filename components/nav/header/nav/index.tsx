"use client";
import styles from "./style.module.scss";
import { useState } from "react";
import { motion } from "framer-motion";
 
import Body from "./Body";

const links = [
  { title: "Início", href: "/" },
  { title: "Produtos", href: "/products" },
  { title: "Carrinho", href: "/cart" },
];

export default function Nav() {
  const [selectedLink, setSelectedLink] = useState({ isActive: false, index: 0 });

  return (
    <motion.nav
      initial={{ height: 0 }}
      animate={{ height: "auto" }}
      exit={{ height: 0 }}
      className={styles.nav}
      role="navigation"
      aria-label="Menu"
    >
      <div className={styles.wrapper}>
        <div className={styles.container}>
          <Body links={links} selectedLink={selectedLink} setSelectedLink={setSelectedLink} />
        </div>
      </div>
    </motion.nav>
  );
}
