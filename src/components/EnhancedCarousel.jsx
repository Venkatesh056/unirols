import { useState, useCallback, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import '../styles/EnhancedCarousel.css';

const EnhancedCarousel = ({
    images = [],
    autoPlay = false,
    autoPlayInterval = 5000,
    showCounter = true,
    showDots = true,
    onImageClick,
    className = ''
}) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(false);
    
    const touchStartX = useRef(0);
    const touchEndX = useRef(0);
    const autoPlayRef = useRef(null);

    const totalSlides = images.length;

    const goToSlide = useCallback((index) => {
        if (isTransitioning) return;
        
        setIsTransitioning(true);
        setCurrentIndex(index);
        
        setTimeout(() => {
            setIsTransitioning(false);
        }, 400);
    }, [isTransitioning]);

    const goToPrevious = useCallback(() => {
        const newIndex = currentIndex === 0 ? totalSlides - 1 : currentIndex - 1;
        goToSlide(newIndex);
    }, [currentIndex, totalSlides, goToSlide]);

    const goToNext = useCallback(() => {
        const newIndex = currentIndex === totalSlides - 1 ? 0 : currentIndex + 1;
        goToSlide(newIndex);
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
            e.preventDefault();
            goToPrevious();
        } else if (e.key === 'ArrowRight') {
            e.preventDefault();
            goToNext();
        }
    };

    const handleImageClick = (index) => {
        if (onImageClick) {
            onImageClick(index, images);
        }
    };

    // Get position for each image in the stack
    const getCardPosition = (index) => {
        const diff = index - currentIndex;
        
        // Handle circular positioning
        let position = diff;
        if (diff > totalSlides / 2) position = diff - totalSlides;
        if (diff < -totalSlides / 2) position = diff + totalSlides;

        return position;
    };

    const getCardStyle = (position) => {
        // Center card (active)
        if (position === 0) {
            return {
                transform: 'translateX(0) scale(1)',
                zIndex: 10,
                opacity: 1,
                filter: 'none'
            };
        }
        
        // Left card (-1)
        if (position === -1) {
            return {
                transform: 'translateX(-70%) scale(0.85)',
                zIndex: 5,
                opacity: 0.6,
                filter: 'blur(2px)'
            };
        }
        
        // Right card (+1)
        if (position === 1) {
            return {
                transform: 'translateX(70%) scale(0.85)',
                zIndex: 5,
                opacity: 0.6,
                filter: 'blur(2px)'
            };
        }
        
        // Far left card (-2)
        if (position === -2) {
            return {
                transform: 'translateX(-120%) scale(0.7)',
                zIndex: 2,
                opacity: 0.3,
                filter: 'blur(3px)'
            };
        }
        
        // Far right card (+2)
        if (position === 2) {
            return {
                transform: 'translateX(120%) scale(0.7)',
                zIndex: 2,
                opacity: 0.3,
                filter: 'blur(3px)'
            };
        }
        
        // Hidden cards
        return {
            transform: position < 0 ? 'translateX(-150%) scale(0.5)' : 'translateX(150%) scale(0.5)',
            zIndex: 1,
            opacity: 0,
            filter: 'blur(4px)'
        };
    };

    if (totalSlides === 0) return null;

    return (
        <div
            className={`enhanced-carousel ${className}`}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onKeyDown={handleKeyDown}
            tabIndex={0}
            role="region"
            aria-label="Image Carousel"
        >
            <div className="carousel-main">
                {/* Left Navigation Button */}
                {totalSlides > 1 && (
                    <motion.button
                        className="carousel-nav-btn carousel-nav-prev"
                        onClick={goToPrevious}
                        disabled={isTransitioning}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        aria-label="Previous image"
                    >
                        <i className="fas fa-chevron-left" />
                    </motion.button>
                )}

                {/* Stacked Cards Container */}
                <div className="carousel-cards-container">
                    <div className="carousel-cards-wrapper">
                        {images.map((image, index) => {
                            const imageSrc = image?.src || image;
                            const imageAlt = image?.alt || `Product image ${index + 1}`;
                            const position = getCardPosition(index);
                            const style = getCardStyle(position);
                            
                            // Only render visible cards (within range of -2 to +2)
                            if (Math.abs(position) > 2) return null;
                            
                            return (
                                <div
                                    key={index}
                                    className={`carousel-card ${position === 0 ? 'active' : ''}`}
                                    style={{
                                        transform: style.transform,
                                        zIndex: style.zIndex,
                                        opacity: style.opacity,
                                        filter: style.filter
                                    }}
                                    onClick={() => position === 0 && handleImageClick(index)}
                                >
                                    <img
                                        src={imageSrc}
                                        alt={imageAlt}
                                        className="carousel-card-image"
                                        loading="lazy"
                                        draggable={false}
                                    />
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Right Navigation Button */}
                {totalSlides > 1 && (
                    <motion.button
                        className="carousel-nav-btn carousel-nav-next"
                        onClick={goToNext}
                        disabled={isTransitioning}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        aria-label="Next image"
                    >
                        <i className="fas fa-chevron-right" />
                    </motion.button>
                )}
            </div>

            {/* Counter */}
            {showCounter && totalSlides > 1 && (
                <div className="carousel-counter">
                    {currentIndex + 1} / {totalSlides}
                </div>
            )}

            {/* Dots */}
            {showDots && totalSlides > 1 && (
                <div className="carousel-dots">
                    {images.map((_, index) => (
                        <button
                            key={index}
                            className={`carousel-dot ${index === currentIndex ? 'active' : ''}`}
                            onClick={() => goToSlide(index)}
                            aria-label={`Go to image ${index + 1}`}
                            disabled={isTransitioning}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default EnhancedCarousel;