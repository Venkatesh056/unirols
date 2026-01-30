import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Hero from '../components/Hero';
import ProductTile from '../components/ProductTile';
import ProductFilter from '../components/ProductFilter';
import GalleryCarousel from '../components/GalleryCarousel';
import ValuesSection from '../components/ValuesSection';
import AboutSection from '../components/AboutSection';
import ContactSection from '../components/ContactSection';
import FAQSection from '../components/FAQSection';
import Lightbox from '../components/Lightbox';
import { products, galleryImages } from '../data/products';

const HomePage = () => {
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [lightboxImages, setLightboxImages] = useState([]);
    const [lightboxIndex, setLightboxIndex] = useState(0);

    // Filter state
    const [activeCategory, setActiveCategory] = useState('all');

    // Filter products based on category
    const filteredProducts = useMemo(() => {
        return products.filter(product => {
            return activeCategory === 'all' || product.category === activeCategory;
        });
    }, [activeCategory]);

    const handleImageClick = (index, images) => {
        setLightboxImages(images);
        setLightboxIndex(index);
        setLightboxOpen(true);
    };

    const handleLightboxClose = () => {
        setLightboxOpen(false);
    };

    const handleLightboxNavigate = (newIndex) => {
        setLightboxIndex(newIndex);
    };

    return (
        <main>
            {/* Hero Section */}
            <Hero />

            {/* Products Section */}
            <section id="products" className="products">
                <div className="container">
                    <motion.h2
                        className="section-title"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        Our Products
                    </motion.h2>

                    {/* Guidance Text */}
                    <motion.p
                        className="section-subtitle"
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        style={{
                            textAlign: 'center',
                            color: 'var(--text-muted)',
                            fontSize: '18px',
                            marginBottom: '30px',
                            marginTop: '-20px'
                        }}
                    >
                        Choose a system based on your production needs
                    </motion.p>

                    {/* Product Filter */}
                    <ProductFilter
                        activeCategory={activeCategory}
                        onFilterChange={setActiveCategory}
                    />

                    <AnimatePresence mode="wait">
                        <motion.div
                            className="product-tiles"
                            key={activeCategory}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                        >
                            {filteredProducts.map((product, index) => (
                                <ProductTile
                                    key={product.id}
                                    title={product.title}
                                    description={product.description}
                                    images={product.images}
                                    specLink={product.specLink}
                                    category={product.category}
                                    icon={product.icon}
                                    features={product.features}
                                    overlayText={product.overlayText}
                                    recommended={product.recommended}
                                    index={index}
                                    onImageClick={handleImageClick}
                                />
                            ))}
                        </motion.div>
                    </AnimatePresence>

                    {/* No results message */}
                    {filteredProducts.length === 0 && (
                        <motion.div
                            className="no-results"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            style={{
                                textAlign: 'center',
                                padding: '60px 20px',
                                color: 'var(--text-muted)'
                            }}
                        >
                            <i className="fas fa-search" style={{ fontSize: '48px', marginBottom: '20px', opacity: 0.5 }} />
                            <p style={{ fontSize: '18px' }}>No products found matching your criteria.</p>
                            <button
                                onClick={() => { setActiveCategory('all'); setSearchQuery(''); }}
                                style={{
                                    marginTop: '16px',
                                    padding: '12px 24px',
                                    background: 'var(--navy-dark)',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '8px',
                                    cursor: 'pointer'
                                }}
                            >
                                Clear Filters
                            </button>
                        </motion.div>
                    )}
                </div>
            </section>

            {/* Gallery Section */}
            <GalleryCarousel
                images={filteredProducts.flatMap(product => product.galleryImages || [])}
                onImageClick={handleImageClick}
            />

            {/* Values Section */}
            <ValuesSection />

            {/* About Section */}
            <AboutSection />

            {/* FAQ Section */}
            <FAQSection />

            {/* Contact Section */}
            <ContactSection />

            {/* Lightbox */}
            <Lightbox
                images={lightboxImages}
                currentIndex={lightboxIndex}
                isOpen={lightboxOpen}
                onClose={handleLightboxClose}
                onNavigate={handleLightboxNavigate}
            />
        </main>
    );
};

export default HomePage;

