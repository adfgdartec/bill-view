// FloatingPapers.jsx
import React, { useMemo } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import styles from "./floatingPapers.module.css";

export default function FloatingPapers({ count = 12 }) {
    // random
    const papers = useMemo(() => {
    const arr = [];
    for (let i = 0; i < count; i++) {
        const size = Math.round(48 + Math.random() * 160); // px
        const left = Math.random() * 100;                  // %
        const top = Math.random() * 100;                   // %
        const rot = -20 + Math.random() * 40;              // deg
        const sway = -80 + Math.random() * 160;            // px
        const duration = 12 + Math.random() * 18;          // sec
        const delay = 0; // Math.random() * 8                   // sec
        const opacity = 0.55 + Math.random() * 0.45;       // 0.55 - 1
        arr.push({
        id: i,
        size,
        left,
        top,
        rot,
        sway,
        duration,
        delay,
        opacity,
        });
    }
    return arr;
    }, [count]);

    // Circular
    // const papers = useMemo(() => {
    // const arr = [];
    // const total = count;
    // const radius = 40; // % of screen width/height

    // for (let i = 0; i < total; i++) {
    //     const angle = (i / total) * 2 * Math.PI; // spread around circle
    //     const left = 50 + radius * Math.cos(angle); // % from center
    //     const top = 50 + radius * Math.sin(angle);  // % from center
    //     arr.push({
    //     id: i,
    //     size: 80,
    //     left,
    //     top,
    //     rot: angle * (180 / Math.PI), // rotate aligned to circle
    //     sway: 30,
    //     duration: 15,
    //     delay: i * 0.8, // stagger so they follow each other
    //     opacity: 0.9,
    //     });
    // }
    // return arr;
    // }, [count]);

    // Grid
    // const papers = useMemo(() => {
    // const arr = [];
    // const rows = 3;
    // const cols = 4;

    // for (let row = 0; row < rows; row++) {
    //     for (let col = 0; col < cols; col++) {
    //     const size = 100;
    //     const left = (col + 0.5) * (100 / cols); // evenly spaced %
    //     const top = (row + 0.5) * (100 / rows); // evenly spaced %
    //     const rot = 0;                           // no rotation (or fixed)
    //     const sway = (col % 2 === 0 ? -50 : 50); // alternate directions
    //     const duration = 15;
    //     const delay = row * 2 + col * 0.5;       // stagger animation
    //     const opacity = 0.8;

    //     arr.push({
    //         id: row * cols + col,
    //         size,
    //         left,
    //         top,
    //         rot,
    //         sway,
    //         duration,
    //         delay,
    //         opacity,
    //     });
    //     }
    // }
    // return arr;
    // }, []);

    // Wave
    // const papers = useMemo(() => {
    // const arr = [];
    // for (let i = 0; i < count; i++) {
    //     arr.push({
    //     id: i,
    //     size: 90,
    //     left: (i % 5) * 20,   // 5 columns
    //     top: Math.floor(i / 5) * 20, // row spacing
    //     rot: 0,
    //     sway: i % 2 === 0 ? 40 : -40,
    //     duration: 10,
    //     delay: i * 0.5, // one after another
    //     opacity: 0.8,
    //     });
    // }
    // return arr;
    // }, [count]);

    return (
        <div className={styles.container} aria-hidden="true">
        {papers.map((p) => (
            <motion.div
            key={p.id}
            className={styles.paper}
            style={{
                width: p.size,
                height: p.size * 0.66,
                left: `${p.left}%`,
                top: `${p.top}%`,
                rotate: p.rot,
            }}
            initial={{ opacity: 0, y: 0, x: 0 }}
            animate={{
                opacity: [0, p.opacity, p.opacity, 0],
                x: [0, p.sway * 0.35, p.sway, p.sway * -0.35, 0],
                y: [0, -20, -40, -22, 0],
                rotate: p.rot,
            }}
            transition={{
                duration: p.duration,
                delay: p.delay,
                repeat: Infinity,
                ease: "easeInOut",
            }}
            />
        ))}
        </div>
    );
}
