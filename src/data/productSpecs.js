// Product specification data for all products
export const productSpecs = {
    'overhead-travelling-cleaner-spinning': {
        title: 'Overhead Travelling Cleaner',
        subtitle: 'for spinning units',
        intro: 'A belt is used for both lo-and-fro movement as well as the impeller rotation. The collected waste is sucked away by a Central waste collection system from a group of travelling cleaners to a central location. We offer two types of Overhead Travelling Cleaner (OTC) for Spinning Units.',
        types: [
            {
                id: 'type1',
                name: 'Type 1 - Bus bar travelling cleaner',
                description: 'Bus bar travelling cleaner has independent fan motor and a travelling gear motor. Power is conducted by a current conductor rail via carbon brushes. A control panel with PLC system drives the cleaner to-and-fro, facilitates stopping and starting at any point on the tracks. It can be integrated with bobbin transport system on link winder.',
                images: [
                    '/Overhead travelling cleaner - for spinning units/Type 1 - Bus bar travelling cleaner/1.webp',
                    '/Overhead travelling cleaner - for spinning units/Type 1 - Bus bar travelling cleaner/2.webp',
                    '/Overhead travelling cleaner - for spinning units/Type 1 - Bus bar travelling cleaner/3.webp',
                ],
                technicalData: {
                    headers: ['Technical data', 'S-SD 1.5', 'S-SD 2.2', 'S-SD 3.0'],
                    rows: [
                        ['Power (fan motor) kW', '1.5', '2.2', '3'],
                        ['Power (driver motor) kW', '0.15', '0.15', '0.15'],
                        ['Travelling speed M/mm', '10/12/18', '', ''],
                        ['Air volume cu m/hr', '1850', '2600', '3000'],
                        ['Suction pressure (total) max', '1750', '2450', '2950'],
                        ['No. of blowing hoses mm', '2x125mm', '2x125mm', '2x125mm'],
                        ['No. of suction hoses mm', '4x100mm', '4x100mm', '4x100mm'],
                        ['Filter surface sq cm', '3800/2000', '3800/2000', '2000'],
                        ['Travelling path', 'Straight line / U path / S path', 'Straight line / U path / S path', 'Straight line / U path / S path'],
                    ]
                },
                advantages: [
                    'More reliability',
                    'Designed for higher performance',
                    'Less maintenance',
                    'Can adopt to any machinery needs and contour',
                    'Built-in automatic waste collection systems',
                    'User friendly',
                ],
                optionalFeatures: [
                    'Elite blowing facility',
                    'Auto-parking facility',
                    'Link corner attachment and probes',
                    'Obstacle reversing mechanism - mechanical or optical',
                    'Power saving options',
                    'Suitable for bobbin transport systems',
                ],
                galleryImages: [
                    '/Overhead travelling cleaner - for spinning units/Type 1 - Bus bar travelling cleaner/1.webp',
                    '/Overhead travelling cleaner - for spinning units/Type 1 - Bus bar travelling cleaner/2.webp',
                    '/Overhead travelling cleaner - for spinning units/Type 1 - Bus bar travelling cleaner/3.webp',
                ],
            },
            {
                id: 'type2',
                name: 'Type 2 - Belt driven travelling cleaner',
                description: 'A belt is used for both lo-and-fro movement as well as the impeller rotation. The collected waste is sucked away by a Central waste collection system from a group of travelling cleaners to a central location.',
                images: [
                    '/Overhead travelling cleaner - for spinning units/Type 2 - Belt driven travelling cleaner/1.webp',
                    '/Overhead travelling cleaner - for spinning units/Type 2 - Belt driven travelling cleaner/2.webp',
                    '/Overhead travelling cleaner - for spinning units/Type 2 - Belt driven travelling cleaner/3.webp',
                    '/Overhead travelling cleaner - for spinning units/Type 2 - Belt driven travelling cleaner/4.webp',
                ],
                technicalData: {
                    headers: ['Technical data', 'S-SD 1.5', 'S-SD 2.2'],
                    rows: [
                        ['Installed power kW', '1.5', '2.2'],
                        ['Air volume cu m/hr', '1800', '2250'],
                        ['Suction pressure (total) max', '2250', '2750'],
                        ['Nozzle dia mm min/max', '8/35', '8/35'],
                        ['Filter surface sq cm', '1600', '1600/3200'],
                        ['Travelling speed mtr/min', '12/15', '12/15'],
                        ['No. of blowing hoses mm', '2x125mm', '2x125mm'],
                        ['No. of suction hoses mm', '4x100mm', '4x100mm'],
                    ]
                },
                optionalFeatures: [
                    'Auto parking control',
                    'Link corner blowing systems for spinning and auto-coner',
                    'Elite blowing arrangement',
                    'Suitable for bobbin transport system',
                    'Custom built features as per individual requirements',
                ],
                galleryImages: [
                    '/Overhead travelling cleaner - for spinning units/Type 2 - Belt driven travelling cleaner/1.webp',
                    '/Overhead travelling cleaner - for spinning units/Type 2 - Belt driven travelling cleaner/2.webp',
                    '/Overhead travelling cleaner - for spinning units/Type 2 - Belt driven travelling cleaner/3.webp',
                    '/Overhead travelling cleaner - for spinning units/Type 2 - Belt driven travelling cleaner/4.webp',
                ],
            },
        ],
    },
    'overhead-travelling-cleaner-weaving': {
        title: 'Overhead Travelling Cleaner',
        subtitle: 'for weaving units',
        intro: 'Our Overhead Travelling Cleaners for weaving units are designed for efficient cleaning in weaving sheds. The system effectively removes fly waste, dust and lint from looms and surrounding areas.',
        types: [
            {
                id: 'weaving-cleaner',
                name: 'Belt Driven OTC for Weaving',
                description: 'Specially designed for weaving units with optimized airflow patterns for loom cleaning. The cleaner travels along overhead rails and provides thorough cleaning of weaving machinery.',
                images: [
                    '/Overhead travelling cleaner - for weaving units/1.webp',
                    '/Overhead travelling cleaner - for weaving units/2.webp',
                    '/Overhead travelling cleaner - for weaving units/3.webp',
                ],
                technicalData: {
                    headers: ['Technical data', 'W-SD 1.5', 'W-SD 2.2'],
                    rows: [
                        ['Installed power kW', '1.5', '2.2'],
                        ['Air volume cu m/hr', '2000', '2500'],
                        ['Suction pressure (total) max', '2100', '2600'],
                        ['Travelling speed mtr/min', '10/15', '10/15'],
                    ]
                },
                advantages: [
                    'Optimized for weaving shed conditions',
                    'Effective lint and fly waste removal',
                    'Low maintenance design',
                    'Energy efficient operation',
                ],
                galleryImages: [
                    '/Overhead travelling cleaner - for weaving units/1.webp',
                    '/Overhead travelling cleaner - for weaving units/2.webp',
                    '/Overhead travelling cleaner - for weaving units/3.webp',
                ],
            },
        ],
    },
    'bobbin-transport-system': {
        title: 'Bobbin Transport System',
        subtitle: '',
        intro: 'Our bobbin transport system helps to move bobbins from ROVING machines to individual spinning machines. Our system works on overhead rails and are tailor-made to suit individual requirements.',
        types: [
            {
                id: 'bobbin-system',
                name: 'Bobbin Transport System',
                description: 'An automated system for transporting bobbins from roving frames to ring spinning machines. The system reduces manual labour and improves efficiency in fabric production.',
                images: [
                    '/product 3/image-1 (2).webp',
                    '/product 3/image-2.webp',
                    '/product 3/image-3.webp',
                ],
                advantages: [
                    'Reduces manual bobbin handling',
                    'Improves production efficiency',
                    'Integrates with existing machinery',
                    'Customizable track layouts',
                    'Low maintenance design',
                    'Reduces bobbin damage during transport',
                ],
                optionalFeatures: [
                    'RFID bobbin tracking',
                    'Automatic bobbin counting',
                    'Integration with factory MES systems',
                    'Variable speed control',
                ],
                galleryImages: [
                    '/product 3/image-1 (2).webp',
                    '/product 3/image-2.webp',
                    '/product 3/image-3.webp',
                ],
            },
        ],
    },
    'central-vacuum-system': {
        title: 'Central Vacuum System',
        subtitle: '',
        intro: 'The Central Vacuum System collects waste from multiple travelling cleaners and transports it to a central location for easy disposal. This system enhances overall efficiency of the cleaning process.',
        types: [
            {
                id: 'cvs',
                name: 'Central Vacuum System',
                description: 'A centralized waste collection system that works in conjunction with overhead travelling cleaners. The collected waste from multiple cleaners is sucked through ducts to a central filter unit.',
                images: [
                    '/product 4/image-1.webp',
                    '/product 4/image-2.webp',
                    '/product 4/image-3.webp',
                    '/product 4/image-4.webp',
                ],
                advantages: [
                    'Centralized waste collection',
                    'Reduces individual waste handling',
                    'High capacity filtering',
                    'Easy waste disposal',
                    'Integrated with OTC systems',
                ],
                galleryImages: [
                    '/product 4/image-1.webp',
                    '/product 4/image-2.webp',
                    '/product 4/image-3.webp',
                    '/product 4/image-4.webp',
                ],
            },
        ],
    },
};
