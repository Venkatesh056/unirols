import { useState, useRef, useCallback, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import '../styles/GalleryCarousel.css';

const GalleryCarousel = ({
    images = [],
    onImageClick,
    autoPlay = false,
    autoPlayInterval = 4000
}) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const trackRef = useRef(null);
    const touchStartX = useRef(0);
    const autoPlayRef = useRef(null);

    const { ref: containerRef, isVisible } = useScrollAnimation({
        threshold: 0.2,
    });

    const totalSlides = images.length;
    const slideWidth = 240; // 220px + 20px gap

    const goToSlide = useCallback((index) => {
        setCurrentIndex(index);
    }, []);

    const goToPrevious = useCallback(() => {
        const newIndex = currentIndex === 0 ? totalSlides - 1 : currentIndex - 1;
        goToSlide(newIndex);
    }, [currentIndex, totalSlides, goToSlide]);

    const goToNext = useCallback(() => {
        const newIndex = currentIndex === totalSlides - 1 ? 0 : currentIndex + 1;
        goToSlide(newIndex);
    }, [currentIndex, totalSlides, goToSlide]);

    // Auto-play
    useEffect(() => {
        if (autoPlay && isVisible && totalSlides > 1) {
            autoPlayRef.current = setInterval(goToNext, autoPlayInterval);
        }
        return () => {
            if (autoPlayRef.current) {
                clearInterval(autoPlayRef.current);
            }
        };
    }, [autoPlay, autoPlayInterval, goToNext, isVisible, totalSlides]);

    // Keyboard navigation
    const handleKeyDown = useCallback((e) => {
        if (e.key === 'ArrowLeft') {
            e.preventDefault();
            goToPrevious();
        } else if (e.key === 'ArrowRight') {
            e.preventDefault();
            goToNext();
        }
    }, [goToPrevious, goToNext]);

    // Calculate transform
    const getTransform = () => {
        if (!trackRef.current) return 0;
        const containerWidth = trackRef.current.parentElement?.offsetWidth || 740;
        return -currentIndex * slideWidth + (containerWidth / 2) - 110;
    };

    // Touch handlers
    const handleTouchStart = (e) => {
        touchStartX.current = e.touches[0].clientX;
        if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };

    const handleTouchEnd = (e) => {
        const diff = touchStartX.current - e.changedTouches[0].clientX;
        if (Math.abs(diff) > 50) {
            diff > 0 ? goToNext() : goToPrevious();
        }
        if (autoPlay) {
            autoPlayRef.current = setInterval(goToNext, autoPlayInterval);
        }
    };

    if (totalSlides === 0) return null;

    return (
        <section className="gallery" ref={containerRef}>
            <div className="container">
                <motion.div
                    className="gallery-carousel"
                    initial={{ opacity: 0 }}
                    animate={isVisible ? { opacity: 1 } : {}}
                    transition={{ duration: 0.6 }}
                    onTouchStart={handleTouchStart}
                    onTouchEnd={handleTouchEnd}
                    onKeyDown={handleKeyDown}
                    tabIndex={0}
                    role="region"
                    aria-label="Image gallery"
                >
                    <button
                        className="gallery-nav gallery-prev"
                        onClick={goToPrevious}
                        aria-label="Previous image"
                    >
                        <i className="fas fa-chevron-left" />
                    </button>

                    <div
                        className="gallery-carousel-track"
                        ref={trackRef}
                        style={{ transform: `translateX(${getTransform()}px)` }}
                    >
                        {images.map((image, index) => (
                            <motion.div
                                key={index}
                                className={`gallery-carousel-slide ${index === currentIndex ? 'active' : ''}`}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={isVisible ? {
                                    opacity: index === currentIndex ? 1 : 0.5,
                                    scale: index === currentIndex ? 1 : 0.85
                                } : {}}
                                transition={{ duration: 0.4 }}
                            >
                                <img
                                    src={image.src || image}
                                    alt={image.alt || `Gallery ${index + 1}`}
                                    className="gallery-carousel-img"
                                    onClick={() => goToSlide(index)}
                                    onDoubleClick={() => onImageClick?.(index, images)}
                                    loading="lazy"
                                />
                            </motion.div>
                        ))}
                    </div>

                    <button
                        className="gallery-nav gallery-next"
                        onClick={goToNext}
                        aria-label="Next image"
                    >
                        <i className="fas fa-chevron-right" />
                    </button>

                    <div className="gallery-counter">
                        {currentIndex + 1} / {totalSlides}
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default GalleryCarousel;
