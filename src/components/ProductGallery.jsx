import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import '../styles/ProductGallery.css';

const ProductGallery = ({ images = [], onImageClick }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const totalSlides = images.length;

    const goToPrevious = useCallback(() => {
        setCurrentIndex(prev => prev === 0 ? totalSlides - 1 : prev - 1);
    }, [totalSlides]);

    const goToNext = useCallback(() => {
        setCurrentIndex(prev => prev === totalSlides - 1 ? 0 : prev + 1);
    }, [totalSlides]);

    if (totalSlides === 0) return null;

    // Get the indices for the stacked cards
    const getStackedIndices = () => {
        const indices = [];
        // Show current and 2 cards behind
        for (let i = 0; i < Math.min(3, totalSlides); i++) {
            const index = (currentIndex + i) % totalSlides;
            indices.push(index);
        }
        return indices;
    };

    const stackedIndices = getStackedIndices();

    return (
        <div className="product-gallery-carousel" role="region" aria-label="Product gallery">
            <button
                className="product-gallery-nav product-gallery-prev"
                onClick={goToPrevious}
                aria-label="Previous image"
            >
                <i className="fas fa-chevron-left" />
            </button>

            <div className="product-gallery-stack-container">
                <AnimatePresence mode="popLayout">
                    {stackedIndices.map((imgIndex, stackPosition) => {
                        const isActive = stackPosition === 0;
                        const zIndex = 10 - stackPosition;
                        
                        // Calculate transforms for stacked effect
                        const scale = 1 - (stackPosition * 0.08);
                        const yOffset = stackPosition * 15;
                        const rotation = stackPosition === 1 ? -4 : stackPosition === 2 ? 4 : 0;
                        const opacity = stackPosition === 0 ? 1 : 0.6 - (stackPosition * 0.15);

                        return (
                            <motion.div
                                key={`${imgIndex}-${stackPosition}`}
                                className={`product-gallery-card ${isActive ? 'active' : ''}`}
                                style={{ zIndex }}
                                initial={{ scale: 0.8, opacity: 0, rotateZ: 0 }}
                                animate={{
                                    scale,
                                    y: yOffset,
                                    rotateZ: rotation,
                                    opacity
                                }}
                                exit={{ scale: 0.7, opacity: 0, rotateZ: -10 }}
                                transition={{ duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
                                onClick={() => isActive && onImageClick && onImageClick(imgIndex, images)}
                                onDoubleClick={() => isActive && onImageClick && onImageClick(imgIndex, images)}
                            >
                                <img
                                    src={images[imgIndex]}
                                    alt={`Gallery ${imgIndex + 1}`}
                                    className="product-gallery-img"
                                    loading="lazy"
                                />
                            </motion.div>
                        );
                    })}
                </AnimatePresence>
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