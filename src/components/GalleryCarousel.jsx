import { motion } from 'framer-motion';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import '../styles/GalleryCarousel.css';

const GalleryCarousel = ({
    images = [],
    onImageClick,
    maxItems = 12
}) => {
    const { ref: containerRef, isVisible } = useScrollAnimation({
        threshold: 0.2,
    });

    const displayImages = images.slice(0, maxItems);

    if (displayImages.length === 0) return null;

    return (
        <section className="gallery" ref={containerRef}>
            <div className="container">
                <motion.div
                    className="gallery-grid"
                    initial={{ opacity: 0 }}
                    animate={isVisible ? { opacity: 1 } : {}}
                    transition={{ duration: 0.6 }}
                    role="region"
                    aria-label="Image gallery grid"
                >
                    {displayImages.map((image, index) => (
                        <motion.button
                            key={index}
                            type="button"
                            className="gallery-tile"
                            initial={{ opacity: 0, y: 10 }}
                            animate={isVisible ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.35, delay: index * 0.03 }}
                            onClick={() => onImageClick?.(index, displayImages)}
                            onDoubleClick={() => onImageClick?.(index, displayImages)}
                            aria-label={image.alt || `Open gallery image ${index + 1}`}
                        >
                            <img
                                src={image.src || image}
                                alt={image.alt || `Gallery ${index + 1}`}
                                className="gallery-grid-img"
                                loading="lazy"
                            />
                        </motion.button>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default GalleryCarousel;
