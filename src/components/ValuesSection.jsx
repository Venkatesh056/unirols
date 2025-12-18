import { motion } from 'framer-motion';
import { useStaggeredAnimation } from '../hooks/useScrollAnimation';
import '../styles/ValuesSection.css';

const ValuesSection = () => {
    const { containerRef, isContainerVisible, getItemStyle } = useStaggeredAnimation(4, {
        staggerDelay: 150,
    });

    const values = [
        { icon: 'fa-plug', text: 'Low Power Consumption' },
        { icon: 'fa-rupee-sign', text: 'Low Operational Cost' },
        { icon: 'fa-tools', text: 'Low Maintenance' },
        { icon: 'fa-th', text: 'Longer Machine Life' },
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.2,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5, ease: 'easeOut' }
        },
    };

    const circleVariants = {
        hidden: { opacity: 0, scale: 0.8 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: { duration: 0.6, delay: 0.1 }
        },
    };

    return (
        <section className="values" ref={containerRef}>
            <div className="container">
                <motion.div
                    className="values-container"
                    variants={containerVariants}
                    initial="hidden"
                    animate={isContainerVisible ? "visible" : "hidden"}
                >
                    {/* First two values */}
                    {values.slice(0, 2).map((value, index) => (
                        <motion.div
                            key={index}
                            className="value-item"
                            variants={itemVariants}
                        >
                            <div className="value-icon">
                                <i className={`fas ${value.icon}`} />
                            </div>
                            <p>{value.text}</p>
                        </motion.div>
                    ))}

                    {/* Center Circle */}
                    <motion.div
                        className="values-center"
                        variants={circleVariants}
                    >
                        <div className="values-circle">
                            <span>Our</span>
                            <span>Values</span>
                        </div>
                    </motion.div>

                    {/* Last two values */}
                    {values.slice(2).map((value, index) => (
                        <motion.div
                            key={index + 2}
                            className="value-item"
                            variants={itemVariants}
                        >
                            <div className="value-icon">
                                <i className={`fas ${value.icon}`} />
                            </div>
                            <p>{value.text}</p>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default ValuesSection;
