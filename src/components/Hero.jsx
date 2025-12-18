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
                </motion.div>
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
