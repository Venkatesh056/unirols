import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import '../styles/FAQSection.css';

const FAQSection = () => {
    const [openIndex, setOpenIndex] = useState(null);

    const faqs = [
        {
            question: 'What types of textile mills are your products suitable for?',
            answer: 'Our products are designed for both spinning and weaving mills. We offer specialized overhead travelling cleaners for each type, as well as universal systems like our Central Vacuum System and Bobbin Transport System that can be customized for any textile manufacturing setup.'
        },
        {
            question: 'How long does installation typically take?',
            answer: 'Installation time varies based on the system and mill size. Typically, an Overhead Travelling Cleaner can be installed in 3-5 days, while a complete Central Vacuum System may take 7-14 days. Our team ensures minimal disruption to your operations during installation.'
        },
        {
            question: 'What kind of maintenance do your systems require?',
            answer: 'Our systems are designed for minimal maintenance. Regular maintenance includes monthly belt inspections, quarterly impeller cleaning, and annual comprehensive servicing. We provide detailed maintenance guides and offer annual maintenance contracts for hassle-free operation.'
        },
        {
            question: 'Do you provide after-sales support and spare parts?',
            answer: 'Yes! We have a dedicated spares department (spares@unirolsairtex.com) that maintains inventory of all critical components. We typically ship spare parts within 24-48 hours. Our service team is available for on-site support across India and can arrange international support as needed.'
        },
        {
            question: 'Can your systems be customized for our specific requirements?',
            answer: 'Absolutely. Every textile mill has unique requirements based on machinery layout, production capacity, and environmental conditions. We conduct detailed site surveys and design custom solutions that perfectly match your operational needs.'
        },
        {
            question: 'What is the typical lifespan of your equipment?',
            answer: 'With proper maintenance, our equipment is designed to last 15-20 years. Many of our installations from the 1990s are still operational today. We use high-quality materials and components to ensure maximum durability and reliability.'
        }
    ];

    const toggleFAQ = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section id="faq" className="faq-section">
            <div className="container">
                <motion.h2
                    className="section-title"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    Frequently Asked Questions
                </motion.h2>

                <div className="faq-container">
                    {faqs.map((faq, index) => (
                        <motion.div
                            key={index}
                            className={`faq-item ${openIndex === index ? 'open' : ''}`}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: index * 0.1 }}
                        >
                            <button
                                className="faq-question"
                                onClick={() => toggleFAQ(index)}
                                aria-expanded={openIndex === index}
                            >
                                <span className="faq-icon">
                                    <i className={`fas fa-${openIndex === index ? 'minus' : 'plus'}`} />
                                </span>
                                <span className="faq-question-text">{faq.question}</span>
                                <span className="faq-chevron">
                                    <i className={`fas fa-chevron-${openIndex === index ? 'up' : 'down'}`} />
                                </span>
                            </button>

                            <AnimatePresence>
                                {openIndex === index && (
                                    <motion.div
                                        className="faq-answer"
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                                    >
                                        <p>{faq.answer}</p>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FAQSection;
