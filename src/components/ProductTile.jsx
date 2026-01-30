import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import '../styles/ProductTile.css';

const ProductTile = ({
  title,
  description,
  images = [],
  specLink,
  index = 0,
  onImageClick,
  category,
  icon,
  features = [],
  overlayText,
  recommended = false
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const imageArray = Array.isArray(images) ? images : [images];
  const hasMultipleImages = imageArray.length > 1;

  const handlePrevImage = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev === 0 ? imageArray.length - 1 : prev - 1));
  };

  const handleNextImage = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev === imageArray.length - 1 ? 0 : prev + 1));
  };

  const handleImageClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (onImageClick) {
      onImageClick(currentImageIndex, imageArray);
    }
  };

  const getCategoryLabel = (cat) => {
    const labels = {
      spinning: 'Spinning',
      weaving: 'Weaving',
      general: 'General'
    };
    return labels[cat] || cat;
  };

  return (
    <motion.div
      className={`product-tile ${recommended ? 'product-tile-recommended' : ''}`}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.45, delay: index * 0.05, ease: 'easeOut' }}
    >
      <Link to={specLink} className="product-tile-link" aria-label={`View specifications: ${title}`}>
        {/* Recommended Badge */}


        {/* Category Badge */}
        {category && (
          <div className={`product-tile-badge badge-${category}`}>
            <i className={`fas ${icon}`} />
            <span>{getCategoryLabel(category)}</span>
          </div>
        )}

        <div
          className="product-tile-media"
          aria-hidden="true"
          onClick={handleImageClick}
          style={{ cursor: 'pointer' }}
        >
          {imageArray[currentImageIndex] ? (
            <img className="product-tile-image" src={imageArray[currentImageIndex]} alt="" loading="lazy" />
          ) : (
            <div className="product-tile-image product-tile-placeholder" />
          )}
          <div className="product-tile-overlay" />

          {/* Image Overlay Text */}
          {overlayText && (
            <div className="product-tile-overlay-text">
              <i className="fas fa-check-circle" />
              <span>{overlayText}</span>
            </div>
          )}

          {hasMultipleImages && (
            <>
              <button
                className="product-tile-nav product-tile-nav-prev"
                onClick={handlePrevImage}
                aria-label="Previous image"
              >
                ‹
              </button>
              <button
                className="product-tile-nav product-tile-nav-next"
                onClick={handleNextImage}
                aria-label="Next image"
              >
                ›
              </button>

              {/* Progress Dots instead of counter */}
              <div className="product-tile-dots">
                {imageArray.map((_, idx) => (
                  <span
                    key={idx}
                    className={`dot ${idx === currentImageIndex ? 'active' : ''}`}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        <div className="product-tile-footer">
          <h3 className="product-tile-title">{title}</h3>
          {description ? (
            <p className="product-tile-desc">{description}</p>
          ) : null}

          {/* Feature Pills */}
          {features.length > 0 && (
            <div className="product-tile-features">
              {features.slice(0, 3).map((feature, idx) => (
                <span key={idx} className="feature-pill">
                  <i className="fas fa-check" />
                  {feature}
                </span>
              ))}
            </div>
          )}

          <motion.span
            className="product-tile-cta"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span>Explore System Details</span>
            <i className="fas fa-arrow-right" />
          </motion.span>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProductTile;
