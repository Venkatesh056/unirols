import { motion } from 'framer-motion';
import { productCategories } from '../data/products';
import '../styles/ProductFilter.css';

const ProductFilter = ({ activeCategory, onFilterChange }) => {
    return (
        <div className="product-filter">
            <div className="filter-container">
                {/* Category Filters */}
                <div className="category-filters">
                    {productCategories.map((category) => (
                        <motion.button
                            key={category.id}
                            className={`filter-btn ${activeCategory === category.id ? 'active' : ''}`}
                            onClick={() => onFilterChange(category.id)}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <i className={`fas ${category.icon}`} />
                            <span>{category.label}</span>
                        </motion.button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProductFilter;
