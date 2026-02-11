import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Play, Music, ExternalLink } from 'lucide-react';

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
                        initial={{ backdropFilter: "blur(0px)" }}
                        animate={{ backdropFilter: "blur(20px)" }}
                        exit={{ backdropFilter: "blur(0px)" }}
                        className="absolute inset-0 bg-secondary/80"
                        onClick={onClose}
                    />

                    {/* Modal Content */}
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.9, opacity: 0, y: 20 }}
                        transition={{ type: "spring", damping: 25, stiffness: 300 }}
                        className="relative w-full max-w-4xl bg-white/10 backdrop-blur-2xl border border-white/20 rounded-[40px] p-8 md:p-16 overflow-hidden shadow-2xl"
                    >
                        {/* Grain Texture */}
                        <div className="grain-overlay opacity-10" />

                        {/* Decoration */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-[100px] -mr-32 -mt-32" />
                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/20 rounded-full blur-[100px] -ml-32 -mb-32" />

                        {/* Close Button */}
                        <button
                            onClick={onClose}
                            className="absolute top-8 right-8 text-white/50 hover:text-white transition-colors"
                        >
                            <X size={32} />
                        </button>

                        <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
                            <div>
                                <h2 className="text-4xl md:text-5xl font-black text-white leading-tight tracking-tighter mb-6 uppercase">
                                    Escucha <span className="text-primary italic">nuestra música</span>
                                </h2>
                                <p className="text-white/60 text-lg leading-relaxed mb-8">
                                    Estamos en las principales plataformas. Elegí tu preferida y adoremos juntos.
                                </p>
                                <div className="flex items-center gap-4 text-white/40">
                                    <div className="w-12 h-[1px] bg-white/20" />
                                    <span className="text-sm font-bold uppercase tracking-widest">Tiempo de Alabar</span>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                {streamingLinks.map((link, idx) => (
                                    <a
                                        key={idx}
                                        href={link.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="group flex flex-col items-center justify-center gap-3 p-6 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300"
                                    >
                                        <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white group-hover:bg-primary group-hover:scale-110 transition-all duration-500">
                                            <ExternalLink size={20} />
                                        </div>
                                        <span className="text-white font-bold text-sm tracking-wide uppercase">{link.label}</span>
                                    </a>
                                ))}

                                {streamingLinks.length === 0 && (
                                    <div className="col-span-2 text-white/40 text-center py-12 border border-dashed border-white/10 rounded-3xl">
                                        Links no configurados aún.
                                    </div>
                                )}
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
