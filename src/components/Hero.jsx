import { motion } from 'framer-motion';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import '../styles/Hero.css';

const Hero = ({
    imageSrc = '/Hero.jpg',
    imageAlt = 'UNIROLS Textile Machinery',
    tagline = 'We provide cost-effective, high quality textile machineries for spinning and weaving mills, globally'
}) => {
    const { ref: taglineRef, isVisible: taglineVisible } = useScrollAnimation({
        threshold: 0.3,
    });

    const scrollToProducts = () => {
        const productsSection = document.getElementById('products');
        if (productsSection) {
            productsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    return (
        <>
            <section className="hero">
                <motion.div
                    className="hero-image-wrapper"
                    initial={{ scale: 1.1, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 1.2, ease: 'easeOut' }}
                >
                    <img
                        src={imageSrc}
                        alt={imageAlt}
                        className="hero-image"
                        loading="eager"
                    />
                    <div className="hero-overlay" />
                </motion.div>

                {/* Hero Content Overlay */}
                <div className="hero-content">
                    <motion.div
                        className="hero-text"
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.5 }}
                    >
                        <motion.span
                            className="hero-badge"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5, delay: 0.8 }}
                        >
                            <i className="fas fa-industry" />
                            Since 1992
                        </motion.span>
                        <h1 className="hero-headline">
                            <span className="headline-main">Textile Machinery</span>
                            <span className="headline-sub">Excellence</span>
                        </h1>
                        <p className="hero-description">
                            Innovative solutions for spinning and weaving mills worldwide
                        </p>
                        <motion.button
                            className="hero-cta"
                            onClick={scrollToProducts}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <span>Explore Our Products</span>
                            <i className="fas fa-arrow-down" />
                        </motion.button>
                    </motion.div>
                </div>
            </section>

            <section className="tagline" ref={taglineRef}>
                <div className="container">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        animate={taglineVisible ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        {tagline}
                    </motion.h2>
                </div>
            </section>
        </>
    );
};

export default Hero;

