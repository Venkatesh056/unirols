import { useState, useCallback, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import '../styles/ImageSlider.css';

const ImageSlider = ({
    images = [],
    autoPlay = false,
    autoPlayInterval = 5000,
    showCounter = true,
    showDots = true,
    onImageClick,
    className = ''
}) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState(0);
    const touchStartX = useRef(0);
    const touchEndX = useRef(0);
    const autoPlayRef = useRef(null);

    const totalSlides = images.length;

    const goToSlide = useCallback((index, dir = 0) => {
        setDirection(dir);
        setCurrentIndex(index);
    }, []);

    const goToPrevious = useCallback(() => {
        const newIndex = currentIndex === 0 ? totalSlides - 1 : currentIndex - 1;
        goToSlide(newIndex, -1);
    }, [currentIndex, totalSlides, goToSlide]);

    const goToNext = useCallback(() => {
        const newIndex = currentIndex === totalSlides - 1 ? 0 : currentIndex + 1;
        goToSlide(newIndex, 1);
    }, [currentIndex, totalSlides, goToSlide]);

    // Auto-play functionality
    useEffect(() => {
        if (autoPlay && totalSlides > 1) {
            autoPlayRef.current = setInterval(goToNext, autoPlayInterval);
        }
        return () => {
            if (autoPlayRef.current) {
                clearInterval(autoPlayRef.current);
            }
        };
    }, [autoPlay, autoPlayInterval, goToNext, totalSlides]);

    // Pause autoplay on hover
    const pauseAutoPlay = () => {
        if (autoPlayRef.current) {
            clearInterval(autoPlayRef.current);
        }
    };

    const resumeAutoPlay = () => {
        if (autoPlay && totalSlides > 1) {
            autoPlayRef.current = setInterval(goToNext, autoPlayInterval);
        }
    };

    // Touch handlers for swipe support
    const handleTouchStart = (e) => {
        touchStartX.current = e.touches[0].clientX;
    };

    const handleTouchMove = (e) => {
        touchEndX.current = e.touches[0].clientX;
    };

    const handleTouchEnd = () => {
        const diff = touchStartX.current - touchEndX.current;
        const minSwipeDistance = 50;

        if (Math.abs(diff) > minSwipeDistance) {
            if (diff > 0) {
                goToNext();
            } else {
                goToPrevious();
            }
        }
    };

    // Keyboard navigation
    const handleKeyDown = (e) => {
        if (e.key === 'ArrowLeft') {
            goToPrevious();
        } else if (e.key === 'ArrowRight') {
            goToNext();
        }
    };

    const handleImageClick = (index) => {
        if (onImageClick) {
            onImageClick(index, images);
        }
    };

    if (totalSlides === 0) return null;

    const slideVariants = {
        enter: (direction) => ({
            x: direction > 0 ? 100 : -100,
            opacity: 0,
        }),
        center: {
            x: 0,
            opacity: 1,
        },
        exit: (direction) => ({
            x: direction < 0 ? 100 : -100,
            opacity: 0,
        }),
    };

    return (
        <div
            className={`image-slider ${className}`}
            onMouseEnter={pauseAutoPlay}
            onMouseLeave={resumeAutoPlay}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onKeyDown={handleKeyDown}
            tabIndex={0}
            role="region"
            aria-label="Image Slider"
        >
            <div className="slider-container">
                <AnimatePresence initial={false} custom={direction} mode="wait">
                    <motion.img
                        key={currentIndex}
                        src={images[currentIndex]?.src || images[currentIndex]}
                        alt={images[currentIndex]?.alt || `Slide ${currentIndex + 1}`}
                        className="slide-image"
                        custom={direction}
                        variants={slideVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        onClick={() => handleImageClick(currentIndex)}
                        loading="lazy"
                    />
                </AnimatePresence>

                {totalSlides > 1 && (
                    <>
                        <button
                            className="slider-btn prev"
                            onClick={goToPrevious}
                            aria-label="Previous slide"
                        >
                            <i className="fas fa-chevron-left" />
                        </button>
                        <button
                            className="slider-btn next"
                            onClick={goToNext}
                            aria-label="Next slide"
                        >
                            <i className="fas fa-chevron-right" />
                        </button>
                    </>
                )}

                {showCounter && totalSlides > 1 && (
                    <div className="slider-counter">
                        {currentIndex + 1}/{totalSlides}
                    </div>
                )}
            </div>

            {showDots && totalSlides > 1 && (
                <div className="slider-dots">
                    {images.map((_, index) => (
                        <button
                            key={index}
                            className={`dot ${index === currentIndex ? 'active' : ''}`}
                            onClick={() => goToSlide(index, index > currentIndex ? 1 : -1)}
                            aria-label={`Go to slide ${index + 1}`}
                            aria-current={index === currentIndex}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default ImageSlider;
