import { useState, useEffect, useRef, useCallback } from 'react';

/**
 * Custom hook for scroll-triggered animations using Intersection Observer
 * @param {Object} options - Configuration options
 * @param {number} options.threshold - Visibility threshold (0-1)
 * @param {string} options.rootMargin - Margin around root element
 * @param {boolean} options.triggerOnce - Only trigger animation once
 * @returns {Object} - { ref, isVisible }
 */
export function useScrollAnimation(options = {}) {
    const {
        threshold = 0.1,
        rootMargin = '0px 0px -50px 0px',
        triggerOnce = true,
    } = options;

    const ref = useRef(null);
    const [isVisible, setIsVisible] = useState(false);
    const hasTriggered = useRef(false);

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        // Skip if already triggered and triggerOnce is true
        if (triggerOnce && hasTriggered.current) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    hasTriggered.current = true;

                    if (triggerOnce) {
                        observer.unobserve(element);
                    }
                } else if (!triggerOnce) {
                    setIsVisible(false);
                }
            },
            { threshold, rootMargin }
        );

        observer.observe(element);

        return () => {
            observer.disconnect();
        };
    }, [threshold, rootMargin, triggerOnce]);

    return { ref, isVisible };
}

/**
 * Custom hook for multiple elements with staggered animations
 * @param {number} count - Number of elements
 * @param {Object} options - Configuration options
 * @returns {Array} - Array of { ref, isVisible } for each element
 */
export function useStaggeredAnimation(count, options = {}) {
    const { staggerDelay = 100, ...restOptions } = options;

    const containerRef = useRef(null);
    const [isContainerVisible, setIsContainerVisible] = useState(false);
    const hasTriggered = useRef(false);

    useEffect(() => {
        const element = containerRef.current;
        if (!element) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !hasTriggered.current) {
                    setIsContainerVisible(true);
                    hasTriggered.current = true;
                    observer.unobserve(element);
                }
            },
            { threshold: 0.1, rootMargin: '0px 0px -30px 0px' }
        );

        observer.observe(element);

        return () => observer.disconnect();
    }, []);

    const getItemStyle = useCallback(
        (index) => ({
            transitionDelay: isContainerVisible ? `${index * staggerDelay}ms` : '0ms',
        }),
        [isContainerVisible, staggerDelay]
    );

    return { containerRef, isContainerVisible, getItemStyle };
}

/**
 * Custom hook for scroll position tracking
 * @returns {Object} - { scrollY, scrollDirection, isScrolled }
 */
export function useScrollPosition() {
    const [scrollState, setScrollState] = useState({
        scrollY: 0,
        scrollDirection: 'up',
        isScrolled: false,
    });

    const lastScrollY = useRef(0);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            const direction = currentScrollY > lastScrollY.current ? 'down' : 'up';

            setScrollState({
                scrollY: currentScrollY,
                scrollDirection: direction,
                isScrolled: currentScrollY > 50,
            });

            lastScrollY.current = currentScrollY;
        };

        // Throttle scroll events for performance
        let ticking = false;
        const onScroll = () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    handleScroll();
                    ticking = false;
                });
                ticking = true;
            }
        };

        window.addEventListener('scroll', onScroll, { passive: true });

        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    return scrollState;
}

export default useScrollAnimation;
