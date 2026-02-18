import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Music, ExternalLink } from 'lucide-react';

interface StreamingLink {
    label: string;
    url: string;
    type: string;
}

interface StreamingModalProps {
    isOpen: boolean;
    onClose: () => void;
    links: StreamingLink[];
}

export default function StreamingModal({ isOpen, onClose, links = [] }: StreamingModalProps) {
    const streamingLinks = links.filter((link: StreamingLink) => link.type === 'streaming');

    React.useEffect(() => {
        if (!isOpen) return;

        const preventScroll = (e: Event) => {
            const target = e.target as HTMLElement;
            // Allow scroll if target is inside our scrollable list
            if (target.closest('#modal-platforms-list')) return;

            // Otherwise block it
            if (e.cancelable) e.preventDefault();
        };

        // { passive: false } is required to be able to preventDefault
        window.addEventListener('wheel', preventScroll, { passive: false });
        window.addEventListener('touchmove', preventScroll, { passive: false });
        // Also block keys like PageDown/Up/Arrows if target is body
        window.addEventListener('keydown', preventScroll, { passive: false });

        return () => {
            window.removeEventListener('wheel', preventScroll);
            window.removeEventListener('touchmove', preventScroll);
            window.removeEventListener('keydown', preventScroll);
        };
    }, [isOpen]);

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[100] flex items-center justify-center p-4"
                >
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        className="absolute inset-0 bg-black/70"
                        onClick={onClose}
                    />

                    {/* Modal Content */}
                    <motion.div
                        initial={{ scale: 0.95, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.95, opacity: 0, y: 20 }}
                        transition={{ duration: 0.25, ease: "easeOut" }}
                        className="relative w-full max-w-5xl rounded-[32px] overflow-hidden shadow-2xl border border-white/20"
                    >
                        {/* Dynamic Gradient Background */}
                        <div className="absolute inset-0 bg-gradient-to-br from-primary via-secondary to-primary bg-[length:400%_400%] animate-gradient-slow opacity-100" />

                        {/* Close Button */}
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                        >
                            <X size={24} />
                        </button>

                        <div className="relative z-10 flex flex-col md:flex-row md:min-h-[500px]">
                            {/* Left Section (1/3) */}
                            <div className="w-full md:w-1/3 p-4 md:p-12 flex flex-col justify-center items-center md:items-start text-center md:text-left bg-black/20">
                                <h2 className="text-3xl md:text-4xl font-black text-white leading-tight mb-4 uppercase">
                                    Escucha <br />
                                    <span className="text-white/80 font-serif font-semibold not-italic">nuestra música</span>
                                </h2>
                                <p className="hidden md:block text-white/70 text-sm md:text-base font-medium max-w-[250px]">
                                    Elegí tu plataforma preferida y adoremos juntos donde sea que estés.
                                </p>
                            </div>

                            {/* Divider */}
                            <div className="w-full h-px md:w-px md:h-auto bg-white/20" />

                            {/* Right Section (2/3) */}
                            <div className="w-full md:w-2/3 p-4 md:p-12 flex flex-col justify-center bg-white/5">
                                <div id="modal-platforms-list" className="max-h-[60vh] md:max-h-none overflow-y-auto overflow-x-hidden overscroll-contain p-1">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
                                        {streamingLinks.map((link, idx) => (
                                            <a
                                                key={idx}
                                                href={link.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="group flex items-center justify-between px-6 py-5 md:py-4 rounded-xl bg-white/10 border border-white/10 hover:bg-white/20 hover:border-white/30 hover:scale-[1.02] transition-all duration-150"
                                            >
                                                <div className="flex items-center gap-4">
                                                    <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white group-hover:bg-primary transition-colors duration-150">
                                                        <Music size={20} />
                                                    </div>
                                                    <span className="text-white font-bold tracking-wide">{link.label}</span>
                                                </div>
                                                <ExternalLink size={16} className="hidden md:block text-white/50 group-hover:text-white transition-colors duration-150" />
                                            </a>
                                        ))}

                                        {streamingLinks.length === 0 && (
                                            <div className="col-span-2 text-white/50 text-center py-8 italic border border-dashed border-white/20 rounded-xl">
                                                Próximamente enlaces disponibles.
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
