import { useState, useCallback, useRef } from 'react';
import { motion } from 'framer-motion';
import '../styles/ProductGallery.css';

const ProductGallery = ({ images = [], onImageClick }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const containerRef = useRef(null);
    const touchStartX = useRef(0);

    const totalSlides = images.length;

    const goToPrevious = useCallback(() => {
        setCurrentIndex(prev => prev === 0 ? totalSlides - 1 : prev - 1);
    }, [totalSlides]);

    const goToNext = useCallback(() => {
        setCurrentIndex(prev => prev === totalSlides - 1 ? 0 : prev + 1);
    }, [totalSlides]);

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

    // Touch handlers
    const handleTouchStart = (e) => {
        touchStartX.current = e.touches[0].clientX;
    };

    const handleTouchEnd = (e) => {
        const diff = touchStartX.current - e.changedTouches[0].clientX;
        if (Math.abs(diff) > 50) {
            diff > 0 ? goToNext() : goToPrevious();
        }
    };

    if (totalSlides === 0) return null;

    // Calculate visible range (show 4 images centered on current)
    const slideWidth = 165; // 150px + 15px gap
    const getTransform = () => {
        const containerWidth = containerRef.current?.offsetWidth || 600;
        return -currentIndex * slideWidth + (containerWidth / 2) - 75;
    };

    return (
        <div
            className="product-gallery-carousel"
            onKeyDown={handleKeyDown}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            tabIndex={0}
            role="region"
            aria-label="Product gallery"
        >
            <button
                className="product-gallery-nav product-gallery-prev"
                onClick={goToPrevious}
                aria-label="Previous image"
            >
                <i className="fas fa-chevron-left" />
            </button>

            <div
                className="product-gallery-track"
                ref={containerRef}
                style={{ transform: `translateX(${getTransform()}px)` }}
            >
                {images.map((img, idx) => (
                    <motion.div
                        key={idx}
                        className={`product-gallery-slide ${idx === currentIndex ? 'active' : ''}`}
                        animate={{
                            scale: idx === currentIndex ? 1 : 0.85,
                            opacity: idx === currentIndex ? 1 : 0.5
                        }}
                        transition={{ duration: 0.3 }}
                        onClick={() => {
                            if (idx === currentIndex && onImageClick) {
                                onImageClick(idx, images);
                            } else {
                                setCurrentIndex(idx);
                            }
                        }}
                    >
                        <img
                            src={img}
                            alt={`Gallery ${idx + 1}`}
                            className="product-gallery-img"
                            loading="lazy"
                        />
                    </motion.div>
                ))}
            </div>

            <button
                className="product-gallery-nav product-gallery-next"
                onClick={goToNext}
                aria-label="Next image"
            >
                <i className="fas fa-chevron-right" />
            </button>

            <div className="product-gallery-counter">
                {currentIndex + 1} / {totalSlides}
            </div>
        </div>
    );
};

export default ProductGallery;
