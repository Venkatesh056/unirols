import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useScrollPosition } from '../hooks/useScrollAnimation';
import '../styles/Header.css';

const Header = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const { isScrolled } = useScrollPosition();
    const location = useLocation();

    // Close mobile menu on route change
    useEffect(() => {
        setIsMobileMenuOpen(false);
        setIsDropdownOpen(false);
    }, [location.pathname]);

    // Close mobile menu on escape key
    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === 'Escape') {
                setIsMobileMenuOpen(false);
                setIsDropdownOpen(false);
            }
        };
        document.addEventListener('keydown', handleEscape);
        return () => document.removeEventListener('keydown', handleEscape);
    }, []);

    // Prevent body scroll when mobile menu is open
    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [isMobileMenuOpen]);

    const isActive = (path) => {
        if (path === '/') return location.pathname === '/';
        return location.pathname.startsWith(path);
    };

    const navItems = [
        { path: '/', label: 'Home' },
        {
            path: '/products',
            label: 'Our Products',
            dropdown: [
                {
                    header: 'Overhead Travelling Cleaner',
                    items: [
                        { path: '/products/overhead-travelling-cleaner-spinning', label: 'For spinning units' },
                        { path: '/products/overhead-travelling-cleaner-weaving', label: 'For weaving units' },
                    ]
                },
                { path: '/products/bobbin-transport-system', label: 'Bobbin Transport System' },
                { path: '/products/central-vacuum-system', label: 'Central Vacuum System' },
            ]
        },
        { path: '/#about', label: 'Who we are' },
        { path: '/#contact', label: 'Contact Us' },
    ];

    const handleNavClick = (e, path) => {
        // Handle hash links
        if (path.includes('#')) {
            const hash = path.split('#')[1];
            const element = document.getElementById(hash);
            if (element) {
                e.preventDefault();
                element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                setIsMobileMenuOpen(false);
            }
        }
    };

    return (
        <motion.header
            className={`header ${isScrolled ? 'scrolled' : ''}`}
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
        >
            <div className="header-content">
                {/* Logo */}
                <Link to="/" className="logo">
                    <div className="logo-icon">
                        <img src="/unirols  logo.png" alt="Unirols Logo" />
                    </div>
                    <div className="logo-text">
                        <span className="logo-title">UNIROLS</span>
                        <span className="logo-subtitle">AIRTEX</span>
                    </div>
                </Link>

                {/* Desktop Navigation */}
                <nav className={`nav ${isMobileMenuOpen ? 'open' : ''}`}>
                    <ul className="nav-list">
                        {navItems.map((item, index) => (
                            <li
                                key={item.path}
                                className={item.dropdown ? `dropdown ${isDropdownOpen ? 'open' : ''}` : ''}
                                onMouseEnter={() => item.dropdown && setIsDropdownOpen(true)}
                                onMouseLeave={() => item.dropdown && setIsDropdownOpen(false)}
                            >
                                {item.dropdown ? (
                                    <>
                                        <button
                                            className={`nav-link ${isActive('/products') ? 'active' : ''}`}
                                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                            aria-expanded={isDropdownOpen}
                                            aria-haspopup="true"
                                        >
                                            {item.label} <i className="fas fa-caret-down" />
                                        </button>
                                        <AnimatePresence>
                                            {(isDropdownOpen || window.innerWidth <= 768) && (
                                                <motion.ul
                                                    className="dropdown-menu"
                                                    initial={{ opacity: 0, y: 10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    exit={{ opacity: 0, y: 10 }}
                                                    transition={{ duration: 0.2 }}
                                                >
                                                    {item.dropdown.map((dropItem, idx) => (
                                                        dropItem.header ? (
                                                            <li key={dropItem.header}>
                                                                <span className="dropdown-item dropdown-header">
                                                                    {dropItem.header}
                                                                </span>
                                                                {dropItem.items.map((subItem) => (
                                                                    <Link
                                                                        key={subItem.path}
                                                                        to={subItem.path}
                                                                        className="dropdown-item dropdown-subitem"
                                                                        onClick={() => setIsMobileMenuOpen(false)}
                                                                    >
                                                                        {subItem.label}
                                                                    </Link>
                                                                ))}
                                                            </li>
                                                        ) : (
                                                            <li key={dropItem.path}>
                                                                <Link
                                                                    to={dropItem.path}
                                                                    className="dropdown-item"
                                                                    onClick={() => setIsMobileMenuOpen(false)}
                                                                >
                                                                    {dropItem.label}
                                                                </Link>
                                                            </li>
                                                        )
                                                    ))}
                                                </motion.ul>
                                            )}
                                        </AnimatePresence>
                                    </>
                                ) : (
                                    <Link
                                        to={item.path}
                                        className={`nav-link ${isActive(item.path) ? 'active' : ''}`}
                                        onClick={(e) => handleNavClick(e, item.path)}
                                    >
                                        {item.label}
                                    </Link>
                                )}
                            </li>
                        ))}
                    </ul>

                    {/* WhatsApp Button */}
                    <a
                        href="https://wa.me/919894702231"
                        className="whatsapp-btn"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Contact us on WhatsApp"
                    >
                        <i className="fab fa-whatsapp" />
                    </a>
                </nav>

                {/* Mobile Menu Button */}
                <button
                    className="mobile-menu-btn"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
                    aria-expanded={isMobileMenuOpen}
                >
                    <i className={`fas ${isMobileMenuOpen ? 'fa-times' : 'fa-bars'}`} />
                </button>
            </div>
        </motion.header>
    );
};

export default Header;
