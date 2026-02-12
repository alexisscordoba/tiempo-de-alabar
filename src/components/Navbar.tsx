import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Play, Music, Calendar, Info, Mail, Heart, HandHelping } from 'lucide-react';
import { cn } from '../lib/utils';



import StreamingModal from './StreamingModal';

// --- Data ---
const NAV_LINKS = [
    { label: 'INICIO', href: '/' },
    { label: 'ACERCA DE', href: '/acerca-de' },
    { label: 'MÚSICA', href: '/musica' },
    { label: 'AGENDA', href: '/agenda' },
    { label: 'CONTACTO', href: '/contacto' },
];

interface Props {
    streamingLinks?: { label: string; url: string; type: string }[];
}

const SOCIAL_LINKS = [
    { icon: Music, href: '#', label: 'Spotify' },
    { icon: Play, href: '#', label: 'YouTube' },
    { icon: Heart, href: '/apoyo', label: 'Apoyo' },
];


// --- Main Component ---
export default function Navbar({ streamingLinks = [] }: Props) {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [showMobileNav, setShowMobileNav] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);

    const [logoGlow, setLogoGlow] = useState(false);
    const handleLogoClick = () => {
        if (isScrolled) return;
        setLogoGlow(true);
        setTimeout(() => setLogoGlow(false), 600);
    };

    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const handleMouseMove = (e: React.MouseEvent) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setMousePos({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
        });
    };

    // Scroll Handling Logic
    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            // Update scrolled state for styling
            setIsScrolled(currentScrollY > 100);

            // Intelligent Scroll Behavior for Mobile
            if (currentScrollY > lastScrollY && currentScrollY > 100) {
                // Scrolling DOWN -> Hide Navbar
                setShowMobileNav(false);
            } else {
                // Scrolling UP -> Show Navbar
                setShowMobileNav(true);
            }

            setLastScrollY(currentScrollY);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [lastScrollY]);

    const [currentPath, setCurrentPath] = useState('/');

    useEffect(() => {
        setCurrentPath(window.location.pathname);
    }, []);


    return (
        <>
            {/* =========================================
          DESKTOP NAVBAR (md:flex)
         ========================================= */}
            <nav
                className={cn(
                    "hidden md:flex fixed top-0 left-0 right-0 z-50 justify-center items-center px-4 desktop:px-8 transition-all duration-1000 [transition-timing-function:cubic-bezier(0.4,0,0.2,1)]",
                    isScrolled ? "py-2" : "py-5"
                )}
            >
                <div
                    onMouseMove={handleMouseMove}
                    className={cn(
                        "flex items-center transition-all duration-1000 [transition-timing-function:cubic-bezier(0.4,0,0.2,1)] rounded-full gap-4 desktop:gap-20 py-1.5 relative group overflow-hidden",
                        isScrolled ? "px-4 desktop:px-6 py-1" : "px-5 desktop:px-8 py-1.5"
                    )}
                >
                    {/* Independent Glass Background Layer */}
                    <div className={cn(
                        "absolute inset-0 -z-10 transition-all duration-1000 [transition-timing-function:cubic-bezier(0.4,0,0.2,1)] rounded-full",
                        isScrolled
                            ? "bg-white/40 backdrop-blur-2xl shadow-lg border border-white/20"
                            : "bg-transparent border border-transparent shadow-none backdrop-blur-[0px]"
                    )} />

                    {/* Mouse Glow (General Navbar) */}
                    <div
                        className="pointer-events-none absolute -inset-px opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"
                        style={{
                            background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(255,255,255,0.12), transparent 40%)`
                        }}
                    />
                    {/* Left: Logo + Text */}
                    <div className="flex items-center gap-2.5 shrink-0 select-none" draggable={false}>
                        <div
                            onClick={handleLogoClick}
                            className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white text-sm font-bold shadow-lg shadow-primary/20 cursor-pointer transition-all duration-300 active:shadow-[0_0_18px_rgba(62,141,139,0.6)] active:scale-95"
                        >
                            ♫
                        </div>
                        <span
                            className={cn(
                                "font-black text-lg tracking-tighter flex items-baseline whitespace-nowrap pointer-events-none transition-all duration-500",
                                isScrolled ? "text-secondary" : "text-white"
                            )}
                            style={{
                                textShadow: logoGlow && !isScrolled
                                    ? '0 0 12px rgba(62,141,139,0.7), 0 0 24px rgba(62,141,139,0.3)'
                                    : '0 0 0px transparent',
                                transform: logoGlow && !isScrolled ? 'translateX(2px)' : 'translateX(0)',
                            }}
                        >
                            <span
                                className="inline-block overflow-hidden transition-all duration-700 [transition-timing-function:cubic-bezier(0.4,0,0.2,1)]"
                                style={{
                                    maxWidth: isScrolled ? '0px' : '7em',
                                    opacity: isScrolled ? 0 : 1,
                                }}
                            >
                                Tiempo de{'\u00A0'}
                            </span>
                            <span className="italic">Alabar</span>
                        </span>
                    </div>

                    {/* Center: Navigation Links (Inner Pill) */}
                    <div className={cn(
                        "flex items-center gap-0.5 p-0.5 rounded-full border transition-all duration-1000 [transition-timing-function:cubic-bezier(0.4,0,0.2,1)] relative group/mini overflow-hidden backdrop-blur-md",
                        isScrolled
                            ? "bg-white/50 border-white/40 shadow-sm"
                            : "bg-white/0 border-white/30 shadow-none"
                    )}>
                        {/* Mouse-driven Reflection (Mini Navbar) */}
                        <div
                            className="pointer-events-none absolute inset-0 opacity-0 group-hover/mini:opacity-100 transition-opacity duration-500 z-0"
                            style={{
                                background: `radial-gradient(150px circle at ${mousePos.x - 200}px ${mousePos.y}px, rgba(255,255,255,0.15), transparent 80%)`
                            }}
                        />
                        {NAV_LINKS.map((link) => {
                            // Simple active logic for demo / implementation
                            // In a full Astro app, you'd use current path
                            const isActive = typeof window !== 'undefined' && window.location.pathname === link.href;

                            return (
                                <a
                                    key={link.label}
                                    href={link.href}
                                    className={cn(
                                        "px-2.5 desktop:px-4 py-1.5 rounded-full text-[10px] font-black tracking-[0.05em] transition-all duration-300 relative group/link overflow-hidden",
                                        isActive
                                            ? "text-white shadow-md shadow-primary/20"
                                            : isScrolled ? "text-secondary/70 hover:text-secondary" : "text-white/80 hover:text-white"
                                    )}
                                >
                                    {isActive && (
                                        <motion.div
                                            layoutId="active-pill"
                                            className="absolute inset-0 bg-primary z-0"
                                            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                        />
                                    )}
                                    <span className="relative z-10">{link.label}</span>

                                    {/* Hover Underline / Glow placeholder */}
                                    {!isActive && (
                                        <div className={cn(
                                            "absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 transition-all duration-300 group-hover/link:w-1/3",
                                            isScrolled ? "bg-primary/40" : "bg-white/80"
                                        )} />
                                    )}
                                </a>
                            );
                        })}
                    </div>

                    {/* Right: Play Button */}
                    <div className="shrink-0 flex items-center">
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className={cn(
                                "w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 shadow-xl hover:scale-110 active:scale-95 group",
                                "bg-primary text-white",
                                !isScrolled && "border border-white/20"
                            )}
                        >
                            <Play size={16} fill="currentColor" className="ml-0.5 group-hover:scale-110 transition-transform" />
                        </button>
                    </div>
                </div>
            </nav>

            <style dangerouslySetInnerHTML={{
                __html: `
                /* Removed looping shine animation */
            `}} />

            <StreamingModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                links={streamingLinks}
            />


            {/* =========================================
          MOBILE NAVBAR (md:hidden)
         ========================================= */}

            {/* Left Pill: Identity */}
            <AnimatePresence>
                {showMobileNav && !isMenuOpen && (
                    <motion.div
                        initial={{ y: -100, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -100, opacity: 0 }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        className={cn(
                            "md:hidden fixed top-4 left-4 z-50 flex items-center gap-2 px-2.5 py-1.5 rounded-full backdrop-blur-md border border-white/10 shadow-lg",
                            isScrolled ? "bg-black/20" : "bg-black/30"
                        )}
                    >
                        <div className="w-7 h-7 rounded-full bg-primary flex items-center justify-center text-white text-[10px] font-bold">
                            ♫
                        </div>
                        {/* Extended Logic: Show text if at top */}
                        {!isScrolled && (
                            <span className="text-white font-black text-sm pr-2 tracking-tighter">Alabar</span>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Right Pill: Morphing Menu */}
            <motion.div
                className="md:hidden fixed top-4 right-4 z-[60]"
                initial={false}
                animate={isMenuOpen ? "open" : "closed"}
            >
                <motion.div
                    className={cn(
                        "bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl overflow-hidden",
                        isMenuOpen ? "rounded-3xl" : "rounded-full"
                    )}
                    variants={{
                        closed: {
                            width: isScrolled ? 44 : 100, // Compact vs Extended
                            height: 44,
                            backgroundColor: isScrolled ? "rgba(0, 0, 0, 0.2)" : "rgba(0, 0, 0, 0.3)"
                        },
                        open: {
                            width: 300,
                            height: 450,
                            backgroundColor: "rgba(30, 41, 59, 0.95)", // Detailed menu background
                            borderColor: "rgba(255,255,255,0.1)"
                        }
                    }}
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                >
                    {/* --- CLOSED STATE CONTENT --- */}
                    {!isMenuOpen && (
                        <div className="w-full h-full flex items-center justify-center px-1">
                            {/* Extended State: Show Play Button */}
                            {!isScrolled && (
                                <div className="flex items-center mr-2 border-r border-white/20 pr-2">
                                    <Play size={18} className="text-white" fill="currentColor" />
                                </div>
                            )}
                            <button onClick={() => setIsMenuOpen(true)} className="p-2 text-white">
                                <Menu size={24} />
                            </button>
                        </div>
                    )}

                    {/* --- OPEN STATE CONTENT --- */}
                    {isMenuOpen && (
                        <div className="flex flex-col w-full h-full p-6 relative">
                            {/* Close Button */}
                            <button
                                onClick={() => setIsMenuOpen(false)}
                                className="absolute top-6 right-6 text-white/70 hover:text-white"
                            >
                                <X size={28} />
                            </button>

                            {/* Navigation Links */}
                            <nav className="mt-12 flex flex-col gap-4">
                                {NAV_LINKS.map((link, index) => (
                                    <motion.a
                                        key={link.label}
                                        href={link.href}
                                        className="text-2xl font-bold text-white hover:text-primary transition-colors"
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.1 + index * 0.05 }}
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        {link.label}
                                    </motion.a>
                                ))}
                            </nav>

                            {/* Footer / Socials */}
                            <div className="mt-auto pt-6 border-t border-white/10">
                                <div className="flex gap-6 justify-center">
                                    {SOCIAL_LINKS.map((social, index) => (
                                        <motion.a
                                            key={index}
                                            href={social.href}
                                            className="text-white/60 hover:text-white transition-colors"
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.4 + index * 0.05 }}
                                        >
                                            <social.icon size={24} />
                                        </motion.a>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                </motion.div>
            </motion.div >
        </>
    );
}
