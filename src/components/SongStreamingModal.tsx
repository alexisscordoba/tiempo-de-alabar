import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Music, ExternalLink } from 'lucide-react';

interface SongStreamingData {
    title: string;
    coverArt: string;
    streaming: Record<string, string>;
}

// Platform display config
const PLATFORM_CONFIG: Record<string, { label: string; order: number }> = {
    spotify: { label: 'Spotify', order: 1 },
    apple: { label: 'Apple Music', order: 2 },
    youtubemusic: { label: 'YouTube Music', order: 3 },
    deezer: { label: 'Deezer', order: 4 },
    amazon: { label: 'Amazon Music', order: 5 },
    tidal: { label: 'Tidal', order: 6 },
    soundcloud: { label: 'SoundCloud', order: 7 },
};

export default function SongStreamingModal() {
    const [isOpen, setIsOpen] = useState(false);
    const [songData, setSongData] = useState<SongStreamingData | null>(null);

    const handleOpen = useCallback((e: Event) => {
        const detail = (e as CustomEvent<SongStreamingData>).detail;
        if (detail) {
            setSongData(detail);
            setIsOpen(true);
        }
    }, []);

    const handleClose = useCallback(() => {
        setIsOpen(false);
    }, []);

    // Listen for the global custom event
    useEffect(() => {
        window.addEventListener('open-song-modal', handleOpen);
        return () => window.removeEventListener('open-song-modal', handleOpen);
    }, [handleOpen]);

    // Escape key
    useEffect(() => {
        if (!isOpen) return;
        const onKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') handleClose();
        };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [isOpen, handleClose]);

    // Scroll lock
    useEffect(() => {
        if (!isOpen) return;

        const preventScroll = (e: Event) => {
            const target = e.target as HTMLElement;
            if (target.closest('#song-modal-platforms-list')) return;
            if (e.cancelable) e.preventDefault();
        };

        window.addEventListener('wheel', preventScroll, { passive: false });
        window.addEventListener('touchmove', preventScroll, { passive: false });

        return () => {
            window.removeEventListener('wheel', preventScroll);
            window.removeEventListener('touchmove', preventScroll);
        };
    }, [isOpen]);

    // Build valid platform links
    const platforms = songData?.streaming
        ? Object.entries(songData.streaming)
            .filter(
                ([key, url]) =>
                    key !== 'youtube_clip' &&
                    url &&
                    typeof url === 'string' &&
                    url.startsWith('http')
            )
            .map(([key, url]) => ({
                key,
                url,
                label: PLATFORM_CONFIG[key]?.label || key,
                order: PLATFORM_CONFIG[key]?.order ?? 99,
            }))
            .sort((a, b) => a.order - b.order)
        : [];

    return (
        <AnimatePresence>
            {isOpen && songData && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[100] flex items-center justify-center p-4 pt-14 md:pt-4"
                >
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeOut' }}
                        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
                        onClick={handleClose}
                    />

                    {/* Modal Content */}
                    <motion.div
                        initial={{ scale: 0.95, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.95, opacity: 0, y: 20 }}
                        transition={{ duration: 0.25, ease: 'easeOut' }}
                        className="relative w-full max-w-4xl max-h-[90vh] md:max-h-none rounded-[32px] overflow-hidden shadow-2xl border border-white/20"
                    >
                        {/* Background */}
                        <div className="absolute inset-0 bg-gradient-to-br from-primary via-secondary to-primary bg-[length:400%_400%] opacity-100" />

                        {/* Close Button */}
                        <button
                            onClick={handleClose}
                            className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                            aria-label="Cerrar modal"
                        >
                            <X size={24} />
                        </button>

                        <div className="relative z-10 flex flex-col md:flex-row md:min-h-[420px] max-h-[85vh] md:max-h-none overflow-y-auto md:overflow-visible">
                            {/* Left: Cover Art */}
                            <div className="w-full md:w-2/5 p-6 pt-12 md:pt-10 md:p-10 flex flex-col items-center justify-center bg-black/20">
                                <div className="w-full max-w-[180px] md:max-w-[280px] aspect-square rounded-2xl overflow-hidden shadow-2xl mb-4 md:mb-6 shrink-0 isolate">
                                    <img
                                        src={songData.coverArt}
                                        alt={`Portada de ${songData.title}`}
                                        className="w-full h-full object-cover block scale-[1.01]"
                                        loading="lazy"
                                    />
                                </div>
                                <h3 className="text-lg md:text-2xl font-black text-white uppercase text-center leading-tight tracking-tight">
                                    {songData.title}
                                </h3>
                                <p className="hidden md:block text-white/60 text-xs md:text-sm font-medium mt-1 uppercase tracking-widest">
                                    Disponible ahora
                                </p>
                            </div>

                            {/* Divider */}
                            <div className="w-full h-px md:w-px md:h-auto bg-white/20" />

                            {/* Right: Platforms */}
                            <div className="w-full md:w-3/5 p-6 md:p-10 flex flex-col justify-center bg-white/5">
                                <p className="text-white/80 text-sm font-medium mb-4 md:mb-6 uppercase tracking-widest">
                                    Escuchá en tu plataforma
                                </p>
                                <div
                                    id="song-modal-platforms-list"
                                    className="max-h-[50vh] md:max-h-none overflow-y-auto overflow-x-hidden overscroll-contain pr-1"
                                >
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full">
                                        {platforms.map((platform) => (
                                            <a
                                                key={platform.key}
                                                href={platform.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="group flex items-center justify-between px-5 py-4 rounded-xl bg-white/10 border border-white/10 hover:bg-white/20 hover:border-white/30 hover:scale-[1.02] transition-all duration-150"
                                            >
                                                <div className="flex items-center gap-3">
                                                    <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center text-white group-hover:bg-primary transition-colors duration-150">
                                                        <Music size={18} />
                                                    </div>
                                                    <span className="text-white font-bold text-sm tracking-wide">
                                                        {platform.label}
                                                    </span>
                                                </div>
                                                <ExternalLink
                                                    size={14}
                                                    className="hidden md:block text-white/50 group-hover:text-white transition-colors duration-150"
                                                />
                                            </a>
                                        ))}

                                        {platforms.length === 0 && (
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
