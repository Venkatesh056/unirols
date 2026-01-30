import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import '../styles/TestimonialsCarousel.css';

const TestimonialsCarousel = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);

    const testimonials = [
        {
            quote: "UNIROLS has transformed our spinning mill's cleanliness standards. The overhead travelling cleaner works flawlessly 24/7 with minimal maintenance.",
            author: "Rajesh Kumar",
            position: "Plant Manager",
            company: "Sri Lakshmi Spinning Mills, Coimbatore",
            rating: 5
        },
        {
            quote: "We've seen a 35% reduction in waste handling costs since installing the Central Vacuum System. Excellent ROI and outstanding service support.",
            author: "Mohammed Farooq",
            position: "Operations Director",
            company: "Al Ameen Textiles, Gujarat",
            rating: 5
        },
        {
            quote: "The bobbin transport system has eliminated manual handling errors and improved our production efficiency significantly. Highly recommend UNIROLS.",
            author: "Priya Sharma",
            position: "Technical Head",
            company: "Vardhman Textiles, Punjab",
            rating: 5
        },
        {
            quote: "After 15 years, our first UNIROLS cleaner is still running strong. That speaks volumes about their build quality and engineering excellence.",
            author: "Suresh Patel",
            position: "Factory Owner",
            company: "Patel Weaving Industries, Surat",
            rating: 5
        }
    ];

    // Auto-play carousel
    useEffect(() => {
        if (isPaused) return;

        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % testimonials.length);
        }, 5000);

        return () => clearInterval(interval);
    }, [isPaused, testimonials.length]);

    const goToSlide = (index) => {
        setCurrentIndex(index);
    };

    const goToPrev = () => {
        setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
    };

    const goToNext = () => {
        setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    };

    const renderStars = (rating) => {
        return Array.from({ length: 5 }, (_, i) => (
            <i key={i} className={`fas fa-star ${i < rating ? 'filled' : ''}`} />
        ));
    };

    return (
        <section className="testimonials-section">
            <div className="container">
                <motion.h2
                    className="section-title testimonials-title"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    What Our Clients Say
                </motion.h2>

                <div
                    className="testimonials-carousel"
                    onMouseEnter={() => setIsPaused(true)}
                    onMouseLeave={() => setIsPaused(false)}
                >
                    {/* Navigation Arrows */}
                    <button
                        className="carousel-nav carousel-prev"
                        onClick={goToPrev}
                        aria-label="Previous testimonial"
                    >
                        <i className="fas fa-chevron-left" />
                    </button>

                    <div className="testimonials-track">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentIndex}
                                className="testimonial-card"
                                initial={{ opacity: 0, x: 50 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -50 }}
                                transition={{ duration: 0.4, ease: 'easeOut' }}
                            >
                                <div className="quote-icon">
                                    <i className="fas fa-quote-left" />
                                </div>

                                <div className="testimonial-rating">
                                    {renderStars(testimonials[currentIndex].rating)}
                                </div>

                                <blockquote className="testimonial-quote">
                                    "{testimonials[currentIndex].quote}"
                                </blockquote>

                                <div className="testimonial-author">
                                    <div className="author-avatar">
                                        <i className="fas fa-user" />
                                    </div>
                                    <div className="author-info">
                                        <h4 className="author-name">{testimonials[currentIndex].author}</h4>
                                        <p className="author-position">{testimonials[currentIndex].position}</p>
                                        <p className="author-company">{testimonials[currentIndex].company}</p>
                                    </div>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    <button
                        className="carousel-nav carousel-next"
                        onClick={goToNext}
                        aria-label="Next testimonial"
                    >
                        <i className="fas fa-chevron-right" />
                    </button>
                </div>

                {/* Dots Navigation */}
                <div className="testimonials-dots">
                    {testimonials.map((_, index) => (
                        <button
                            key={index}
                            className={`dot ${index === currentIndex ? 'active' : ''}`}
                            onClick={() => goToSlide(index)}
                            aria-label={`Go to testimonial ${index + 1}`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TestimonialsCarousel;
