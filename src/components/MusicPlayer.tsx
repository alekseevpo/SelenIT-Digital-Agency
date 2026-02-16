'use client';

import { useState, useEffect, useRef } from 'react';
import {
    X,
    Music,
    Volume2,
    VolumeX,
    Play,
    Pause,
    SkipBack,
    SkipForward,
    ExternalLink,
} from 'lucide-react';

interface Track {
    title: string;
    artist: string;
    url: string;
    duration: string;
}

export default function MusicPlayer() {
    const [isPlaying, setIsPlaying] = useState(false);
    const [showPlayer, setShowPlayer] = useState(false);
    const [showNotification, setShowNotification] = useState(false);
    const [userChoice, setUserChoice] = useState<boolean | null>(null);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [currentTrackIndex, setCurrentTrackIndex] = useState(0);

    const audioRef = useRef<HTMLAudioElement>(null);

    const tracks: Track[] = [
        {
            title: 'Best Tracks - Vinyl Mix',
            artist: 'ProleteR',
            url: '/music/ProleteR - Best Tracks - Vinyl Mix.mp3',
            duration: '∞',
        },
    ];

    const currentTrack = tracks[currentTrackIndex];

    useEffect(() => {
        // Показываем уведомление при первой загрузке
        const hasSeenNotification = localStorage.getItem('music-notification-seen');
        if (!hasSeenNotification) {
            setShowNotification(true);
        } else {
            const savedChoice = localStorage.getItem('music-user-choice');
            if (savedChoice === 'true') {
                setUserChoice(true);
                // Автоматически воспроизводим музыку при загрузке страницы
                setTimeout(() => {
                    if (audioRef.current) {
                        audioRef.current.load();
                        const playPromise = audioRef.current.play();
                        if (playPromise !== undefined) {
                            playPromise
                                .then(() => {
                                    setIsPlaying(true);
                                })
                                .catch((error) => {
                                    console.log('Autoplay was prevented on load:', error);
                                    setIsPlaying(false);
                                });
                        }
                    }
                }, 1000); // Задержка в 1 секунду для загрузки страницы
            }
        }
    }, []);

    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        const updateTime = () => setCurrentTime(audio.currentTime);
        const updateDuration = () => setDuration(audio.duration);

        audio.addEventListener('timeupdate', updateTime);
        audio.addEventListener('loadedmetadata', updateDuration);

        return () => {
            audio.removeEventListener('timeupdate', updateTime);
            audio.removeEventListener('loadedmetadata', updateDuration);
        };
    }, []);

    const handleMusicChoice = (choice: boolean) => {
        setUserChoice(choice);
        localStorage.setItem('music-notification-seen', 'true');
        localStorage.setItem('music-user-choice', choice.toString());
        setShowNotification(false);

        if (choice && audioRef.current) {
            // Загружаем и автоматически воспроизводим музыку
            audioRef.current.load();
            // Автоматически запускаем воспроизведение
            const playPromise = audioRef.current.play();
            if (playPromise !== undefined) {
                playPromise
                    .then(() => {
                        setIsPlaying(true);
                    })
                    .catch((error) => {
                        console.log('Autoplay was prevented:', error);
                        setIsPlaying(false);
                    });
            }
        }
    };

    const togglePlayer = () => {
        setShowPlayer(!showPlayer);
    };

    const togglePlay = () => {
        if (!audioRef.current) return;

        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play();
        }
        setIsPlaying(!isPlaying);
    };

    const formatTime = (time: number) => {
        if (isNaN(time)) return '0:00';
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    };

    const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newTime = parseFloat(e.target.value);
        if (audioRef.current) {
            audioRef.current.currentTime = newTime;
            setCurrentTime(newTime);
        }
    };

    const nextTrack = () => {
        // Не нужно для одного трека
    };

    const prevTrack = () => {
        // Не нужно для одного трека
    };

    return (
        <>
            {/* Audio element */}
            <audio ref={audioRef} src={currentTrack.url} onEnded={nextTrack} />

            {/* Уведомление о музыке */}
            {showNotification && (
                <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 animate-slideDown">
                    <div className="bg-white/20 dark:bg-black/20 backdrop-blur-sm border border-slate-200/30 dark:border-white/10 rounded-xl shadow-lg p-3 min-w-[240px]">
                        <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-1.5">
                                <Music className="w-3.5 h-3.5 text-primary-600 dark:text-primary-400" />
                                <span className="text-xs font-medium text-slate-900 dark:text-white">
                                    Включить музыку?
                                </span>
                            </div>
                            <button
                                onClick={() => handleMusicChoice(false)}
                                className="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-white/5 transition-colors"
                            >
                                <X className="w-2.5 h-2.5 text-slate-500 dark:text-slate-400" />
                            </button>
                        </div>
                        <div className="flex gap-1.5">
                            <button
                                onClick={() => handleMusicChoice(true)}
                                className="flex-1 px-2.5 py-1.5 bg-primary-600 hover:bg-primary-700 text-white text-xs font-medium rounded-lg transition-colors"
                            >
                                Да
                            </button>
                            <button
                                onClick={() => handleMusicChoice(false)}
                                className="flex-1 px-2.5 py-1.5 bg-slate-100 dark:bg-white/10 hover:bg-slate-200 dark:hover:bg-white/20 text-slate-700 dark:text-slate-300 text-xs font-medium rounded-lg transition-colors"
                            >
                                Нет
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Кнопка плеера под кнопкой чата */}
            {userChoice !== false && (
                <button
                    onClick={togglePlayer}
                    className="fixed bottom-6 right-6 w-12 h-12 bg-white/20 dark:bg-black/20 backdrop-blur-sm hover:bg-white/30 dark:hover:bg-black/30 text-white rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110 z-40"
                    title="Музыкальный плеер"
                >
                    {isPlaying ? (
                        <Volume2 className="w-5 h-5 text-white" />
                    ) : (
                        <VolumeX className="w-5 h-5 text-white" />
                    )}
                </button>
            )}

            {/* Мини проигрыватель */}
            {showPlayer && userChoice !== false && (
                <div className="fixed bottom-16 right-24 w-64 bg-white/20 dark:bg-black/20 backdrop-blur-sm border border-slate-200/20 dark:border-white/10 rounded-2xl shadow-2xl p-3 z-40 animate-slideUp">
                    <div className="flex items-center justify-between mb-3">
                        <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                            ProleteR
                        </h3>
                        <button
                            onClick={togglePlayer}
                            className="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-white/5 transition-colors"
                        >
                            <X className="w-3 h-3 text-slate-500 dark:text-slate-400" />
                        </button>
                    </div>

                    {/* Элементы управления */}
                    <div className="flex items-center gap-2 mb-3">
                        <button
                            onClick={togglePlay}
                            className="w-10 h-10 bg-white/30 dark:bg-black/30 hover:bg-white/40 dark:hover:bg-black/40 text-white rounded-full flex items-center justify-center transition-all duration-300 hover:scale-105 shadow-lg -mt-2"
                        >
                            {isPlaying ? (
                                <Pause className="w-4 h-4 text-white" />
                            ) : (
                                <Play className="w-4 h-4 text-white" />
                            )}
                        </button>

                        {/* Прогресс-бар */}
                        <div className="flex-1">
                            <input
                                type="range"
                                min="0"
                                max={duration || 0}
                                value={currentTime}
                                onChange={handleProgressChange}
                                className="w-full h-1.5 bg-slate-200 dark:bg-white/20 rounded-full appearance-none cursor-pointer slider"
                                style={{
                                    background: `linear-gradient(to right, rgb(220 38 38) 0%, rgb(220 38 38) ${(currentTime / duration) * 100}%, rgb(226 232 240) ${(currentTime / duration) * 100}%, rgb(226 232 240) 100%)`,
                                }}
                            />
                            <div className="flex justify-between mt-1">
                                <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                                    {formatTime(currentTime)}
                                </span>
                                <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                                    {formatTime(duration)}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Дополнительные кнопки */}
                    <div className="flex items-center justify-between pt-2 border-t border-slate-200/50 dark:border-white/10">
                        <a
                            href="https://www.youtube.com/@BenProleteR"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-white/5 transition-colors group"
                            title="Слушать на YouTube"
                        >
                            <ExternalLink className="w-3 h-3 text-slate-600 dark:text-slate-400 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors" />
                        </a>
                        <div className="flex-1 text-center">
                            <p className="text-xs font-bold text-red-500 dark:text-red-400">
                                Best Tracks - Vinyl Mix
                            </p>
                        </div>
                        <div className="w-8"></div>
                    </div>
                </div>
            )}

            {/* Анимации и стили */}
            <style jsx>{`
                @keyframes slideDown {
                    from {
                        opacity: 0;
                        transform: translate(-50%, -20px);
                    }
                    to {
                        opacity: 1;
                        transform: translate(-50%, 0);
                    }
                }

                @keyframes slideUp {
                    from {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                .animate-slideDown {
                    animation: slideDown 0.3s ease-out;
                }

                .animate-slideUp {
                    animation: slideUp 0.3s ease-out;
                }

                .slider::-webkit-slider-thumb {
                    appearance: none;
                    width: 16px;
                    height: 16px;
                    background: linear-gradient(135deg, rgb(220 38 38), rgb(239 68 68));
                    border-radius: 50%;
                    cursor: pointer;
                    box-shadow: 0 2px 8px rgba(220, 38, 38, 0.3);
                    transition: all 0.2s ease;
                }

                .slider::-webkit-slider-thumb:hover {
                    transform: scale(1.2);
                    box-shadow: 0 4px 12px rgba(220, 38, 38, 0.4);
                }

                .slider::-moz-range-thumb {
                    width: 16px;
                    height: 16px;
                    background: linear-gradient(135deg, rgb(220 38 38), rgb(239 68 68));
                    border-radius: 50%;
                    cursor: pointer;
                    border: none;
                    box-shadow: 0 2px 8px rgba(220, 38, 38, 0.3);
                    transition: all 0.2s ease;
                }

                .slider::-moz-range-thumb:hover {
                    transform: scale(1.2);
                    box-shadow: 0 4px 12px rgba(220, 38, 38, 0.4);
                }
            `}</style>
        </>
    );
}
