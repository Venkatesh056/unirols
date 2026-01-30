import { motion } from 'framer-motion';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import '../styles/AboutSection.css';

const AboutSection = () => {
    const { ref, isVisible } = useScrollAnimation({
        threshold: 0.2,
    });

    return (
        <section id="about" className="about" ref={ref}>
            <div className="container">
                <motion.h2
                    className="section-title about-title"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isVisible ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5 }}
                >
                    About Us
                </motion.h2>

                <div className="about-content">
                    <motion.div
                        className="about-text floating-card"
                        initial={{ opacity: 0, x: -30 }}
                        animate={isVisible ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <p>
                            Unirols Airtex is a distinguished textile machinery manufacturing company in the market,
                            providing high quality and innovative solutions to the industry since 1992. We engage in the
                            design, development, and production of innovative equipments to enhance productivity and assist
                            in achieving the highest quality standards. At Unirols Airtex, we prioritize efficiency,
                            reliability, and durability of our products, ensuring our customers receive exceptional value
                            for their investment.
                        </p>
                        <p>
                            Unirols Airtex takes pride in our dedication towards delivering the best possible solutions to
                            our customers. With a deep understanding of the textile industry and a commitment to excellence,
                            Unirols Airtex has become a trusted partner for textile manufacturers around the world for over
                            30 years.
                        </p>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default AboutSection;
