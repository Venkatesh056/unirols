import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import ImageSlider from '../components/ImageSlider';
import ProductGallery from '../components/ProductGallery';
import Lightbox from '../components/Lightbox';
import ContactSection from '../components/ContactSection';
import { productSpecs } from '../data/productSpecs';
import '../styles/ProductPage.css';

const ProductTypCard = ({ type, isExpanded, onToggle, onImageClick }) => {
    const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 });

    return (
        <motion.div
            ref={ref}
            className="product-type-card"
            initial={{ opacity: 0, y: 30 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
        >
            <h3 className="product-type-title">{type.name}</h3>

            <div className={`product-type-body ${isExpanded ? '' : 'collapsed'}`}>
                {/* Top Section: Image + Description */}
                <div className="product-intro">
                    <div className="product-type-image">
                        <ImageSlider
                            images={type.images}
                            showCounter={true}
                            showDots={true}
                            onImageClick={onImageClick}
                            className="specs-slider"
                        />
                    </div>
                    <div className="product-type-desc-container">
                        <p className="product-type-desc">{type.description}</p>
                    </div>
                </div>

                {/* Bottom Section: Details */}
                <div className="product-details">
                    {/* Technical Data Table */}
                    {type.technicalData && (
                        <div className="specs-table-container">
                            <h4 className="specs-table-title">Technical Data</h4>
                            <table className="specs-table">
                                <thead>
                                    <tr>
                                        {type.technicalData.headers.map((header, idx) => (
                                            <th key={idx}>{header}</th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {type.technicalData.rows.map((row, rowIdx) => (
                                        <tr key={rowIdx}>
                                            {row.map((cell, cellIdx) => (
                                                <td key={cellIdx}>{cell}</td>
                                            ))}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}

                    <div className="two-column-section">
                        {/* Advantages */}
                        {type.advantages && (
                            <div className="advantages-section">
                                <h4>Advantages</h4>
                                <ul>
                                    {type.advantages.map((item, idx) => (
                                        <li key={idx}>{item}</li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {/* Optional Features */}
                        {type.optionalFeatures && (
                            <div className="features-section">
                                <h4>Optional Features</h4>
                                <ul>
                                    {type.optionalFeatures.map((item, idx) => (
                                        <li key={idx}>{item}</li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>

                    {/* Product Gallery */}
                    {type.galleryImages && type.galleryImages.length > 0 && (
                        <ProductGallery
                            images={type.galleryImages}
                            onImageClick={onImageClick}
                        />
                    )}
                </div>

                {/* Show Less Button (when expanded) */}
                {isExpanded && (
                    <div className="show-less-container">
                        <button className="btn-show-less" onClick={onToggle}>
                            Show Less
                        </button>
                    </div>
                )}

                {/* Show More Overlay (when collapsed) */}
                <AnimatePresence>
                    {!isExpanded && (
                        <motion.div
                            className="show-more-overlay"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        >
                            <button className="btn-show-more" onClick={onToggle}>
                                Show More
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.div>
    );
};

const ProductPage = () => {
    const { productId } = useParams();
    const product = productSpecs[productId];

    const [expandedTypes, setExpandedTypes] = useState({});
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [lightboxImages, setLightboxImages] = useState([]);
    const [lightboxIndex, setLightboxIndex] = useState(0);

    const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation({
        threshold: 0.2,
    });

    if (!product) {
        return (
            <main className="specs-page">
                <div className="container">
                    <div className="specs-header">
                        <h1>Product Not Found</h1>
                        <p>The product you're looking for doesn't exist.</p>
                        <Link to="/" className="btn-specifications">
                            Return to Home
                        </Link>
                    </div>
                </div>
            </main>
        );
    }

    const toggleExpanded = (typeId) => {
        setExpandedTypes(prev => ({
            ...prev,
            [typeId]: !prev[typeId]
        }));
    };

    const handleImageClick = (index, images) => {
        setLightboxImages(images);
        setLightboxIndex(index);
        setLightboxOpen(true);
    };

    return (
        <>
            <main className="specs-page">
                <div className="container">
                    {/* Page Header */}
                    <motion.div
                        ref={headerRef}
                        className="specs-header"
                        initial={{ opacity: 0, y: 20 }}
                        animate={headerVisible ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.5 }}
                    >
                        <h1>
                            {product.title}
                            {product.subtitle && (
                                <> - for <span className="highlight">{product.subtitle}</span></>
                            )}
                        </h1>
                        <p className="specs-intro">{product.intro}</p>
                    </motion.div>

                    {/* Product Types */}
                    {product.types.map((type) => (
                        <ProductTypCard
                            key={type.id}
                            type={type}
                            isExpanded={expandedTypes[type.id] || false}
                            onToggle={() => toggleExpanded(type.id)}
                            onImageClick={handleImageClick}
                        />
                    ))}
                </div>
            </main>

            {/* Contact Section */}
            <ContactSection />

            {/* Lightbox */}
            <Lightbox
                images={lightboxImages}
                currentIndex={lightboxIndex}
                isOpen={lightboxOpen}
                onClose={() => setLightboxOpen(false)}
                onNavigate={setLightboxIndex}
            />
        </>
    );
};

export default ProductPage;
