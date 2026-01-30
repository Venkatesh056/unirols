import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import '../styles/MarqueeGallery.css';

const MarqueeGallery = ({ images, onImageClick }) => {
    const [isPaused, setIsPaused] = useState(false);
    const [zoomedImage, setZoomedImage] = useState(null);
    const [lastTap, setLastTap] = useState(0);
    const trackRef = useRef(null);

    // Create seamless loop by duplicating images
    const loopImages = [...images, ...images];

    // Handle hover pause
    const handleMouseEnter = () => setIsPaused(true);
    const handleMouseLeave = () => setIsPaused(false);

    // Handle touch interactions
    const handleTouchStart = (idx, img) => {
        const now = Date.now();
        const DOUBLE_TAP_DELAY = 300;

        if (now - lastTap < DOUBLE_TAP_DELAY) {
            // Double tap - zoom
            setZoomedImage(img);
            setIsPaused(true);
        } else {
            // Single tap - toggle pause
            setIsPaused(prev => !prev);
        }
        setLastTap(now);
    };

    // Handle image click (desktop)
    const handleImageClick = (idx, img) => {
        const actualIdx = idx % images.length;
        if (onImageClick) {
            onImageClick(actualIdx, images);
        }
    };

    // Close zoom view
    const closeZoom = () => {
        setZoomedImage(null);
        setIsPaused(false);
    };

    // Calculate animation duration based on number of images
    const animationDuration = images.length * 5; // 5 seconds per image

    return (
        <div className="marquee-gallery">
            <h4 className="marquee-gallery-title">
                <i className="fas fa-images" />
                Gallery
            </h4>

            <div
                className="marquee-container"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                <div
                    ref={trackRef}
                    className={`marquee-track ${isPaused ? 'paused' : ''}`}
                    style={{
                        '--animation-duration': `${animationDuration}s`,
                        '--image-count': images.length
                    }}
                >
                    {loopImages.map((img, idx) => (
                        <div
                            key={idx}
                            className="marquee-slide"
                            onClick={() => handleImageClick(idx, img)}
                            onDoubleClick={() => handleImageClick(idx, img)}
                            onTouchStart={() => handleTouchStart(idx, img)}
                        >
                            <img
                                src={img}
                                alt={`Gallery ${(idx % images.length) + 1}`}
                                loading="lazy"
                                draggable="false"
                            />
                        </div>
                    ))}
                </div>
            </div>

            {/* Zoom Overlay */}
            <AnimatePresence>
                {zoomedImage && (
                    <motion.div
                        className="zoom-overlay"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={closeZoom}
                    >
                        <motion.img
                            src={zoomedImage}
                            alt="Zoomed view"
                            className="zoom-image"
                            initial={{ scale: 0.5, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.5, opacity: 0 }}
                            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                        />
                        <button className="zoom-close" onClick={closeZoom}>
                            <i className="fas fa-times" />
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default MarqueeGallery;
