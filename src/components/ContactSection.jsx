import { useState } from 'react';
import { motion } from 'framer-motion';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import '../styles/ContactSection.css';

const ContactSection = () => {
    const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 });

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: '',
        products: {
            spinningCleaner: false,
            weavingCleaner: false,
            bobbinTransport: false,
            centralVacuum: false,
        },
        captcha: false,
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null);

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        if (type === 'checkbox') {
            if (name === 'captcha') {
                setFormData(prev => ({ ...prev, captcha: checked }));
            } else {
                setFormData(prev => ({
                    ...prev,
                    products: { ...prev.products, [name]: checked }
                }));
            }
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate form submission
        try {
            await new Promise(resolve => setTimeout(resolve, 1500));
            setSubmitStatus('success');
            setFormData({
                name: '',
                email: '',
                phone: '',
                message: '',
                products: {
                    spinningCleaner: false,
                    weavingCleaner: false,
                    bobbinTransport: false,
                    centralVacuum: false,
                },
                captcha: false,
            });
        } catch {
            setSubmitStatus('error');
        } finally {
            setIsSubmitting(false);
            setTimeout(() => setSubmitStatus(null), 5000);
        }
    };

    const contactInfo = [
        { title: 'Sales', phone: '+91 93629 06631', email: 'sales@unirolsairtex.com' },
        { title: 'Spares', phone: '+91 96002 25031', email: 'spares@unirolsairtex.com' },
        { title: 'Accounts', email: 'accounts@unirolsairtex.com' },
        { title: 'Admin', phone: '+91 98947 02231', email: 'admin@unirolsairtex.com', whatsapp: '+91 98947 02231' },
    ];

    const productCheckboxes = [
        { key: 'spinningCleaner', label: 'Overhead Travelling Cleaner (for Spinning)' },
        { key: 'weavingCleaner', label: 'Overhead Travelling Cleaner (for Weaving)' },
        { key: 'bobbinTransport', label: 'Bobbin Transport System' },
        { key: 'centralVacuum', label: 'Central Vacuum System' },
    ];

    return (
        <section id="contact" className="contact" ref={ref}>
            <div className="container">
                <motion.h2
                    className="section-title"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isVisible ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5 }}
                >
                    Contact Us
                </motion.h2>

                <div className="contact-content">
                    {/* Contact Info */}
                    <motion.div
                        className="contact-info"
                        initial={{ opacity: 0, x: -30 }}
                        animate={isVisible ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        {contactInfo.map((info, index) => (
                            <div className="contact-group" key={info.title}>
                                <h4>{info.title}</h4>
                                {info.phone && (
                                    <p>
                                        <i className="fas fa-phone" />
                                        <a href={`tel:${info.phone.replace(/\s/g, '')}`}>{info.phone}</a>
                                    </p>
                                )}
                                {info.email && (
                                    <p>
                                        <i className="fas fa-envelope" />
                                        <a href={`mailto:${info.email}`}>{info.email}</a>
                                    </p>
                                )}
                                {info.whatsapp && (
                                    <p>
                                        <i className="fab fa-whatsapp" />
                                        <a href={`https://wa.me/${info.whatsapp.replace(/\s/g, '').replace('+', '')}`} target="_blank" rel="noopener noreferrer">
                                            {info.whatsapp}
                                        </a>
                                    </p>
                                )}
                            </div>
                        ))}

                        <div className="contact-group">
                            <h4>Address</h4>
                            <p>
                                <i className="fas fa-map-marker-alt" />
                                <span>
                                    2/20, Meenan Thottam, Kurumpalayam Link Road<br />
                                    A.G Pudur, Irugur<br />
                                    Coimbatore-641103<br />
                                    Tamilnadu, India
                                </span>
                            </p>
                        </div>
                    </motion.div>

                    {/* Contact Form */}
                    <motion.div
                        className="contact-form"
                        initial={{ opacity: 0, x: 30 }}
                        animate={isVisible ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.3 }}
                    >
                        <h4>Send us a message</h4>
                        <form onSubmit={handleSubmit}>
                            <input
                                type="text"
                                name="name"
                                placeholder="Full name"
                                value={formData.name}
                                onChange={handleInputChange}
                                required
                            />
                            <input
                                type="email"
                                name="email"
                                placeholder="Email address"
                                value={formData.email}
                                onChange={handleInputChange}
                                required
                            />
                            <input
                                type="tel"
                                name="phone"
                                placeholder="Phone number"
                                value={formData.phone}
                                onChange={handleInputChange}
                            />

                            <div className="checkbox-group">
                                {productCheckboxes.map(product => (
                                    <label key={product.key}>
                                        <input
                                            type="checkbox"
                                            name={product.key}
                                            checked={formData.products[product.key]}
                                            onChange={handleInputChange}
                                        />
                                        {product.label}
                                    </label>
                                ))}
                            </div>

                            <textarea
                                name="message"
                                placeholder="Message"
                                rows={4}
                                value={formData.message}
                                onChange={handleInputChange}
                            />

                            <div className="recaptcha-placeholder">
                                <div className="recaptcha-box">
                                    <input
                                        type="checkbox"
                                        name="captcha"
                                        checked={formData.captcha}
                                        onChange={handleInputChange}
                                    />
                                    <span>I'm not a robot</span>
                                    <div className="recaptcha-logo">
                                        <small>reCAPTCHA</small>
                                    </div>
                                </div>
                            </div>

                            <motion.button
                                type="submit"
                                className="btn-submit"
                                disabled={isSubmitting}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                {isSubmitting ? (
                                    <>
                                        <i className="fas fa-spinner fa-spin" />
                                        Sending...
                                    </>
                                ) : (
                                    'Submit'
                                )}
                            </motion.button>

                            {submitStatus && (
                                <motion.div
                                    className={`submit-message ${submitStatus}`}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                >
                                    {submitStatus === 'success'
                                        ? '✅ Message sent successfully!'
                                        : '❌ Error sending message. Please try again.'}
                                </motion.div>
                            )}
                        </form>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default ContactSection;
