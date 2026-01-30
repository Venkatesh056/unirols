import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ProductCard from './ProductCard';
import '../styles/ProductsCarousel.css';

const ProductsCarousel = ({ products, onImageClick }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isMobile, setIsMobile] = useState(false);

    // Check if mobile/tablet view
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth <= 1024);
        };
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const visibleCount = 2; // Show 2 products at a time on mobile
    const maxIndex = products.length - visibleCount;

    const handlePrev = () => {
        setCurrentIndex(prev => (prev > 0 ? prev - 1 : maxIndex));
    };

    const handleNext = () => {
        setCurrentIndex(prev => (prev < maxIndex ? prev + 1 : 0));
    };

    // Desktop view - show all 4 products
    if (!isMobile) {
        return (
            <div className="products-grid">
                {products.map((product, index) => (
                    <ProductCard
                        key={product.id}
                        title={product.title}
                        description={product.description}
                        images={product.images}
                        specLink={product.specLink}
                        index={index}
                        onImageClick={onImageClick}
                    />
                ))}
            </div>
        );
    }

    // Mobile/Tablet view - carousel with 2 visible
    return (
        <div className="products-carousel">
            <button className="carousel-nav carousel-prev" onClick={handlePrev}>
                <i className="fas fa-chevron-left" />
            </button>

            <div className="products-carousel-track">
                {products.map((product, index) => {
                    const isVisible = index >= currentIndex && index < currentIndex + visibleCount;
                    return (
                        <motion.div
                            key={product.id}
                            className={`carousel-item ${isVisible ? 'visible' : 'hidden'}`}
                            initial={false}
                            animate={{
                                opacity: isVisible ? 1 : 0.3,
                                scale: isVisible ? 1 : 0.85,
                                x: isVisible ? 0 : (index < currentIndex ? -50 : 50)
                            }}
                            transition={{ duration: 0.4, ease: 'easeOut' }}
                        >
                            <ProductCard
                                title={product.title}
                                description={product.description}
                                images={product.images}
                                specLink={product.specLink}
                                index={index}
                                onImageClick={onImageClick}
                            />
                        </motion.div>
                    );
                })}
            </div>

            <button className="carousel-nav carousel-next" onClick={handleNext}>
                <i className="fas fa-chevron-right" />
            </button>

            {/* Dots indicator */}
            <div className="carousel-dots">
                {Array.from({ length: maxIndex + 1 }).map((_, i) => (
                    <button
                        key={i}
                        className={`carousel-dot ${i === currentIndex ? 'active' : ''}`}
                        onClick={() => setCurrentIndex(i)}
                    />
                ))}
            </div>
        </div>
    );
};

export default ProductsCarousel;
