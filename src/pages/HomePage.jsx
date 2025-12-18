import { useState } from 'react';
import { motion } from 'framer-motion';
import Hero from '../components/Hero';
import ProductCard from '../components/ProductCard';
import GalleryCarousel from '../components/GalleryCarousel';
import ValuesSection from '../components/ValuesSection';
import AboutSection from '../components/AboutSection';
import ContactSection from '../components/ContactSection';
import Lightbox from '../components/Lightbox';
import { products, galleryImages } from '../data/products';
import '../styles/ProductCard.css';

const HomePage = () => {
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [lightboxImages, setLightboxImages] = useState([]);
    const [lightboxIndex, setLightboxIndex] = useState(0);

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

                    {products.map((product, index) => (
                        <ProductCard
                            key={product.id}
                            title={product.title}
                            description={product.description}
                            images={product.images}
                            specLink={product.specLink}
                            index={index}
                            onImageClick={handleImageClick}
                        />
                    ))}
                </div>
            </section>

            {/* Gallery Section */}
            <GalleryCarousel
                images={galleryImages}
                onImageClick={handleImageClick}
            />

            {/* Values Section */}
            <ValuesSection />

            {/* About Section */}
            <AboutSection />

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
