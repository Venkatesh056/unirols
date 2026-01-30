// Product data for the homepage
export const products = [
    {
        id: 'overhead-travelling-cleaner-spinning',
        title: 'Overhead Travelling Cleaner (for Spinning units)',
        description: 'Maximize spinning efficiency with our automated overhead cleaner. Features continuous to-and-fro movement with powerful impeller rotation for thorough dust removal, integrated with central waste collection for zero floor contamination.',
        shortDesc: 'Automated dust removal for spinning mills',
        specLink: '/products/overhead-travelling-cleaner-spinning',
        category: 'spinning',
        icon: 'fa-cog',
        features: ['Non-stop cleaning', 'Cleaner floors', 'Low maintenance'],
        overlayText: 'Industry Leading Efficiency',
        recommended: true,
        images: [
            '/product 1/image-1.webp',
            '/product 1/image-1 (1).webp',
            '/product 1/image-2.webp',
            '/product 1/image-2 (1).webp',
        ],
    },
    {
        id: 'overhead-travelling-cleaner-weaving',
        title: 'Overhead Travelling Cleaner (for Weaving units)',
        description: 'Purpose-built for weaving environments with higher lint density. Our weaving-specific cleaner features enhanced suction power and wider coverage area, ensuring pristine loom conditions and improved fabric quality.',
        shortDesc: 'High-capacity cleaning for weaving looms',
        specLink: '/products/overhead-travelling-cleaner-weaving',
        category: 'weaving',
        icon: 'fa-th-large',
        features: ['Higher yarn quality', 'Wide coverage', 'Better fabric output'],
        overlayText: 'High-lint environment',
        recommended: false,
        images: [
            '/product 2/image-1.webp',
            '/product 2/image-1 (1).webp',
            '/product 2/image-2.webp',
            '/product 2/image-2 (1).webp',
        ],
    },
    {
        id: 'bobbin-transport-system',
        title: 'Bobbin Transport System',
        description: 'Streamline your production flow with our overhead rail bobbin transport. Custom-engineered to seamlessly move bobbins from roving to spinning machines, reducing manual handling and increasing operational efficiency by up to 40%.',
        shortDesc: 'Automated bobbin handling system',
        specLink: '/products/bobbin-transport-system',
        category: 'spinning',
        icon: 'fa-exchange-alt',
        features: ['40% faster handling', 'Custom fit', 'Less manual work'],
        overlayText: 'Boosts efficiency 40%',
        recommended: false,
        images: [
            '/product 3/image-1 (2).webp',
            '/product 3/image-2.webp',
            '/product 3/image-3.webp',
        ],
    },
    {
        id: 'central-vacuum-system',
        title: 'Central Vacuum System',
        description: 'The backbone of clean mill operations. Our central vacuum system collects waste from multiple cleaning units to a single location, dramatically reducing energy consumption while maintaining consistent suction power across your entire facility.',
        shortDesc: 'Centralized waste collection hub',
        specLink: '/products/central-vacuum-system',
        category: 'general',
        icon: 'fa-wind',
        features: ['Lower power cost', 'One-point collection', 'Consistent suction'],
        overlayText: 'Energy-saving system',
        recommended: false,
        images: [
            '/product 4/image-1.webp',
            '/product 4/image-2.webp',
            '/product 4/image-3.webp',
            '/product 4/image-4.webp',
        ],
    },
];

// Product categories for filtering
export const productCategories = [
    { id: 'all', label: 'All Products', icon: 'fa-th' },
    { id: 'spinning', label: 'Spinning Units', icon: 'fa-cog' },
    { id: 'weaving', label: 'Weaving Units', icon: 'fa-th-large' },
    { id: 'general', label: 'General Systems', icon: 'fa-wind' },
];

// Gallery images
export const galleryImages = [
    'gallery/gallery 1.webp',
    'gallery/gallery 2.webp',
    'gallery/gallery 3.webp',
    'gallery/gallery 4.webp',
    'gallery/gallery 5.webp',
    'gallery/gallery 6.webp',
    'gallery/gallery 7.webp',
    'gallery/gallery 8.webp',
    'gallery/gallery 9.webp',
    'gallery/gallery 10.webp',
    'gallery/gallery 11.webp',
    'gallery/gallery 12.webp',
];
