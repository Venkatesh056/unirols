import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import ImageSlider from '../components/ImageSlider';
import MarqueeGallery from '../components/MarqueeGallery';
import Lightbox from '../components/Lightbox';
import ContactSection from '../components/ContactSection';
import { productSpecs } from '../data/productSpecs';
import '../styles/ProductPage.css';

// Product Type Card Component
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
            <h3 className="product-type-title">
                <i className="fas fa-cog" />
                {type.name}
            </h3>

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
                            <h4 className="specs-table-title">
                                <i className="fas fa-clipboard-list" />
                                Technical Data
                            </h4>
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
                                <h4>
                                    Advantages
                                </h4>
                                <ul>
                                    {type.advantages.map((item, idx) => (
                                        <li key={idx}>
                                            <i className="fas fa-check-circle" />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {/* Optional Features */}
                        {type.optionalFeatures && (
                            <div className="features-section">
                                <h4>
                                    <i className="fas fa-plus-circle" />
                                    Optional Features
                                </h4>
                                <div className="feature-badges">
                                    {type.optionalFeatures.map((item, idx) => (
                                        <span key={idx} className="feature-badge">
                                            {item}
                                        </span>
                                    ))}
                                </div>
                                {/* Unique, product-relevant images for Optional Features */}
                                {type.galleryImages && type.galleryImages.length > 0 && (
                                    <div className="optional-feature-images" style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', marginTop: '16px' }}>
                                        {Array.from(
                                            new Set(
                                                type.galleryImages.filter(img => {
                                                    // Only include images that are in an 'optional features' or 'advantage' folder, or are unique to this product
                                                    const lower = img.toLowerCase();
                                                    return (
                                                        lower.includes('optional feature') ||
                                                        lower.includes('optional featues') ||
                                                        lower.includes('advantage')
                                                    );
                                                })
                                            )
                                        ).map((img, idx) => (
                                            <img
                                                key={img}
                                                src={img}
                                                alt={`Optional Feature ${idx + 1}`}
                                                style={{ width: '120px', height: '120px', objectFit: 'cover', borderRadius: '8px' }}
                                            />
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Product Gallery - Auto-scrolling */}
                    {/* Gallery now shows the same images as Optional Features */}
                    <MarqueeGallery
                        images={(() => {
                            let folder = '';
                            if (type.id === 'type1') {
                                folder = '/Overhead travelling cleaner - for spinning units/Type 1 - Bus bar travelling cleaner under advantage/';
                            } else if (type.id === 'type2') {
                                folder = '/Overhead travelling cleaner - for spinning units/Type 2 - Belt driven travelling cleaner under optional features/';
                            } else if (type.id === 'weaving-cleaner') {
                                folder = '/Overhead travelling cleaner - for weaving units/Type 2 - Belt driven travelling cleaner under optional featues/';
                            }
                            let images = [];
                            if (folder.includes('Type 1 - Bus bar travelling cleaner under advantage')) {
                                images = ['1.webp','2.webp','3.webp','4.png','5.png','6.png'];
                            } else if (folder.includes('Type 2 - Belt driven travelling cleaner under optional features')) {
                                images = ['1.webp','2.webp','3.webp','4.webp','5.webp','6.webp','7.webp','8.webp','9.webp','10.webp','11.webp','12.webp','13.webp','14.webp','15.webp','16.webp','17.webp','18.webp','19.webp','20.webp','21.webp','22.webp','23.webp'];
                            } else if (folder.includes('Type 2 - Belt driven travelling cleaner under optional featues')) {
                                images = ['1.webp','2.webp'];
                            }
                            return images.map(img => folder + img);
                        })()}
                        onImageClick={onImageClick}
                    />
                </div>

                {/* Show Less Button (when expanded) */}
                {isExpanded && (
                    <div className="show-less-container">
                        <button className="btn-show-less" onClick={onToggle}>
                            <i className="fas fa-chevron-up" />
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
                                <i className="fas fa-chevron-down" />
                                Show More
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.div>
    );
};

// Related Product Card Component
const RelatedProductCard = ({ productId }) => {
    const product = productSpecs[productId];
    if (!product) return null;

    return (
        <Link to={`/products/${productId}`} className="related-product-card">
            <div className="related-product-image">
                <img src={product.heroImage} alt={product.title} loading="lazy" />
            </div>
            <div className="related-product-info">
                <h4>{product.title}</h4>
                {product.subtitle && <span className="related-subtitle">{product.subtitle}</span>}
            </div>
        </Link>
    );
};

const ProductPage = () => {
    const { productId } = useParams();
    const product = productSpecs[productId];

    const [expandedTypes, setExpandedTypes] = useState({});
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [lightboxImages, setLightboxImages] = useState([]);
    const [lightboxIndex, setLightboxIndex] = useState(0);
    const [showStickyCTA, setShowStickyCTA] = useState(false);

    const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation({
        threshold: 0.2,
    });

    // Track scroll for sticky CTA
    useEffect(() => {
        const handleScroll = () => {
            setShowStickyCTA(window.scrollY > 400);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

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

    const scrollToContact = () => {
        document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
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
        <>
            <main className="specs-page">
                {/* Breadcrumb */}
                <div className="container">
                    <nav className="breadcrumb">
                        <Link to="/">Home</Link>
                        <span className="breadcrumb-separator">/</span>
                        <Link to="/#products">Products</Link>
                        <span className="breadcrumb-separator">/</span>
                        <span className="breadcrumb-current">{product.title}</span>
                    </nav>
                </div>

                {/* Hero Section */}
                <section className="product-hero">
                    <div className="container">
                        <div className="product-hero-content">
                            <div className="product-hero-image">
                                <img src={product.heroImage} alt={product.title} onDoubleClick={() => handleImageClick(0, [product.heroImage])} />
                                {product.trustBadge && (
                                    <div className="trust-badge">
                                        <i className="fas fa-check-circle" />
                                        {product.trustBadge}
                                    </div>
                                )}
                            </div>
                            <motion.div
                                ref={headerRef}
                                className="product-hero-info"
                                initial={{ opacity: 0, x: 30 }}
                                animate={headerVisible ? { opacity: 1, x: 0 } : {}}
                                transition={{ duration: 0.6 }}
                            >
                                {product.category && (
                                    <span className={`category-badge category-${product.category}`}>
                                        <i className={`fas ${product.category === 'spinning' ? 'fa-cog' : product.category === 'weaving' ? 'fa-th-large' : 'fa-wind'}`} />
                                        {getCategoryLabel(product.category)}
                                    </span>
                                )}
                                <h1>
                                    {product.title}
                                    {product.subtitle && (
                                        <span className="hero-subtitle">{product.subtitle}</span>
                                    )}
                                </h1>
                                <p className="hero-intro">{product.intro}</p>

                                {/* Key Benefits */}
                                {product.keyBenefits && (
                                    <div className="hero-benefits">
                                        {product.keyBenefits.map((benefit, idx) => (
                                            <span key={idx} className="benefit-pill">
                                                <i className="fas fa-check" />
                                                {benefit}
                                            </span>
                                        ))}
                                    </div>
                                )}
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* Product Types */}
                <section className="product-types-section">
                    <div className="container">
                        <h2 className="section-title">Product Variants</h2>
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
                </section>

                {/* Related Products */}
                {product.relatedProducts && product.relatedProducts.length > 0 && (
                    <section className="related-products-section">
                        <div className="container">
                            <h2 className="section-title">You May Also Need</h2>
                            <div className="related-products-grid">
                                {product.relatedProducts.map((relatedId) => (
                                    <RelatedProductCard key={relatedId} productId={relatedId} />
                                ))}
                            </div>
                        </div>
                    </section>
                )}
            </main>

            {/* Sticky CTA */}
            <AnimatePresence>
                {showStickyCTA && (
                    <motion.div
                        className="sticky-cta"
                        initial={{ y: 100, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 100, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <div className="sticky-cta-content">
                            <span className="sticky-cta-text">
                                Interested in {product.title}?
                            </span>
                            <button className="sticky-cta-btn" onClick={scrollToContact}>
                                <i className="fas fa-envelope" />
                                Get a Quote
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

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
