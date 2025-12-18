import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import ImageSlider from './ImageSlider';
import '../styles/ProductCard.css';

const ProductCard = ({
    title,
    description,
    images = [],
    specLink,
    index = 0,
    onImageClick
}) => {
    const { ref, isVisible } = useScrollAnimation({
        threshold: 0.15,
        rootMargin: '0px 0px -100px 0px',
    });

    return (
        <motion.div
            ref={ref}
            className="product-item"
            initial={{ opacity: 0, y: 50 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{
                duration: 0.6,
                delay: index * 0.1,
                ease: 'easeOut'
            }}
        >
            <div className="product-content">
                <h3>{title}</h3>
                <p>{description}</p>
                <Link to={specLink} className="btn-specifications">
                    View specifications
                </Link>
            </div>

            <div className="product-slider">
                <ImageSlider
                    images={images}
                    showCounter={true}
                    showDots={true}
                    onImageClick={onImageClick}
                />
            </div>
        </motion.div>
    );
};

export default ProductCard;
