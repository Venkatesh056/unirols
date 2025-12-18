import { useEffect, useCallback, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import '../styles/Lightbox.css';

const Lightbox = ({
    images = [],
    currentIndex = 0,
    isOpen = false,
    onClose,
    onNavigate
}) => {
    const [localIndex, setLocalIndex] = useState(currentIndex);

    useEffect(() => {
        setLocalIndex(currentIndex);
    }, [currentIndex]);

    // Handle keyboard navigation
    const handleKeyDown = useCallback((e) => {
        if (!isOpen) return;

        switch (e.key) {
            case 'Escape':
                onClose?.();
                break;
            case 'ArrowLeft':
                goToPrevious();
                break;
            case 'ArrowRight':
                goToNext();
                break;
            default:
                break;
        }
    }, [isOpen, onClose]);

    useEffect(() => {
        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [handleKeyDown]);

    // Lock body scroll when open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [isOpen]);

    const goToPrevious = () => {
        const newIndex = localIndex === 0 ? images.length - 1 : localIndex - 1;
        setLocalIndex(newIndex);
        onNavigate?.(newIndex);
    };

    const goToNext = () => {
        const newIndex = localIndex === images.length - 1 ? 0 : localIndex + 1;
        setLocalIndex(newIndex);
        onNavigate?.(newIndex);
    };

    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose?.();
        }
    };

    if (images.length === 0) return null;

    const currentImage = images[localIndex];
    const imageSrc = typeof currentImage === 'string' ? currentImage : currentImage?.src;
    const imageAlt = typeof currentImage === 'string' ? `Image ${localIndex + 1}` : currentImage?.alt;

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="lightbox active"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    onClick={handleBackdropClick}
                    role="dialog"
                    aria-modal="true"
                    aria-label="Image lightbox"
                >
                    <button
                        className="lightbox-close"
                        onClick={onClose}
                        aria-label="Close lightbox"
                    >
                        &times;
                    </button>

                    {images.length > 1 && (
                        <>
                            <button
                                className="lightbox-prev"
                                onClick={goToPrevious}
                                aria-label="Previous image"
                            >
                                ❮
                            </button>
                            <button
                                className="lightbox-next"
                                onClick={goToNext}
                                aria-label="Next image"
                            >
                                ❯
                            </button>
                        </>
                    )}

                    <motion.img
                        key={localIndex}
                        src={imageSrc}
                        alt={imageAlt}
                        className="lightbox-image"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.3 }}
                    />

                    {images.length > 1 && (
                        <div className="lightbox-counter">
                            {localIndex + 1} / {images.length}
                        </div>
                    )}
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default Lightbox;
