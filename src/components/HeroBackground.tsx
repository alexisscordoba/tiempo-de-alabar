import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Props {
    images: string[];
    interval?: number;
}

export default function HeroBackground({ images, interval = 10000 }: Props) {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        if (images.length <= 1) return;

        const timer = setInterval(() => {
            setIndex((prev) => (prev + 1) % images.length);
        }, interval);

        return () => clearInterval(timer);
    }, [images.length, interval]);

    return (
        <div className="absolute inset-0 z-0 bg-secondary">
            <AnimatePresence mode="popLayout" initial={false}>
                <motion.img
                    key={index}
                    src={images[index]}
                    alt="Hero Background"
                    className="absolute inset-0 w-full h-full object-cover object-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.5, ease: "easeInOut" }}
                />
            </AnimatePresence>

            {/* Preload next image to avoid flicker */}
            <div className="hidden">
                {images.map(img => <img key={img} src={img} alt="preload" />)}
            </div>
        </div>
    );
}
