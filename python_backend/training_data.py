"""
UNIROLS AI CHATBOT - Training Data
All website content structured for NLP training
"""

TRAINING_DATA = {
    "intents": [
        {
            "tag": "greeting",
            "patterns": [
                "Hi", "Hello", "Hey", "Good morning", "Good afternoon",
                "Greetings", "What's up", "How are you", "Hi there"
            ],
            "responses": [
                "Hello! Welcome to Unirols Airtex. How can I help you with our textile machinery today?",
                "Hi there! I'm here to help you learn about our products. What would you like to know?",
                "Greetings! Looking for textile machinery solutions? I'm here to assist you."
            ]
        },
        {
            "tag": "products_overview",
            "patterns": [
                "What products do you offer",
                "What do you sell",
                "Show me your products",
                "What machinery do you have",
                "Tell me about your equipment",
                "What solutions do you provide",
                "Product catalog",
                "List of products"
            ],
            "responses": [
                "We offer three main product lines:\n\n1. Overhead Travelling Cleaner (for Spinning & Weaving units)\n2. Bobbin Transport System\n3. Central Vacuum System\n\nAll systems are custom-built to suit your specific requirements. Which one would you like to know more about?"
            ]
        },
        {
            "tag": "overhead_cleaner_spinning",
            "patterns": [
                "Overhead travelling cleaner",
                "Spinning cleaner",
                "OTC for spinning",
                "Cleaner for spinning unit",
                "Tell me about overhead cleaner",
                "Spinning waste collection",
                "Type 1 cleaner",
                "Type 2 cleaner",
                "Bus bar cleaner",
                "Belt driven cleaner"
            ],
            "responses": [
                "Our Overhead Travelling Cleaner for Spinning uses a belt-driven system for movement and impeller rotation. It collects waste from spinning machines and transports it to a central location.\n\nWe offer two types:\n\n**Type 1 - Bus Bar Travelling Cleaner**\n- Independent fan motor and travelling gear motor\n- Current conductor rail and carbon brush\n- Micro switch control panel with PLC option\n- 5.5 HP + 0.5 HP motors\n\n**Type 2 - Belt Driven Travelling Cleaner**\n- Belt-driven movement system\n- Integrated waste collection\n- Energy efficient design\n\nKey advantages: Labor saving, higher performance, less maintenance, user-friendly operation."
            ]
        },
        {
            "tag": "overhead_cleaner_weaving",
            "patterns": [
                "Weaving cleaner",
                "OTC for weaving",
                "Cleaner for weaving unit",
                "Weaving waste collection",
                "Fly waste collector"
            ],
            "responses": [
                "Our Overhead Travelling Cleaner for Weaving units is specifically designed for weaving environments. It efficiently collects fly waste and maintains clean working conditions.\n\nFeatures:\n- Designed for weaving environment\n- Automated fly waste collection\n- Clean working conditions\n- Minimal maintenance required\n\nWould you like technical specifications or a quote?"
            ]
        },
        {
            "tag": "bobbin_transport",
            "patterns": [
                "Bobbin transport system",
                "Bobbin conveyor",
                "Bobbin handling",
                "Material handling",
                "Roving to spinning transport",
                "Overhead bobbin system"
            ],
            "responses": [
                "Our Bobbin Transport System moves bobbins from ROVING machines to individual spinning machines using overhead rails.\n\nKey Features:\n- Overhead rail movement system\n- Custom layouts tailored to your facility\n- Labor-saving automation\n- International standard components\n- Flexible routing options\n\nBenefits:\n✓ Reduces manual labor\n✓ Improves production efficiency\n✓ Minimizes bobbin damage\n✓ Custom-built to your requirements\n\nInterested in a customized solution?"
            ]
        },
        {
            "tag": "central_vacuum",
            "patterns": [
                "Central vacuum system",
                "Vacuum cleaner",
                "Suction system",
                "Waste collection system",
                "Central suction"
            ],
            "responses": [
                "Our Central Vacuum System provides powerful centralized waste collection throughout your production facility.\n\nSpecifications:\n- Installed Power: 11 kW\n- Waste Capacity: 300 liters\n- Air Volume: 1100 cubic meters\n- Blower Type: Regenerative blower\n\nSafety Features:\n✓ Proximity sensors for automatic operation\n✓ Automatic shut-off systems\n✓ Safety interlocks\n✓ Overload protection\n\nAdvantages: Centralized collection, high suction power, energy efficient, low maintenance."
            ]
        },
        {
            "tag": "contact_sales",
            "patterns": [
                "Contact sales",
                "Talk to sales",
                "Sales number",
                "Sales email",
                "I want to buy",
                "Get a quote",
                "Price",
                "Quotation",
                "How much",
                "Cost"
            ],
            "responses": [
                "For product inquiries, quotations, and new orders, please contact our sales team:\n\n📞 Phone: +91 93629 06631\n📧 Email: sales@unirolsairtex.com\n\nOur sales team will discuss your specific requirements and provide a customized quote."
            ]
        },
        {
            "tag": "contact_spares",
            "patterns": [
                "Spare parts",
                "Replacement parts",
                "Spares contact",
                "Maintenance parts",
                "Need spare",
                "Parts email"
            ],
            "responses": [
                "For spare parts and replacements, please contact our spares department:\n\n📞 Phone: +91 96002 25031\n📧 Email: spares@unirolsairtex.com\n\nThey'll help you with all maintenance items and replacement parts."
            ]
        },
        {
            "tag": "contact_general",
            "patterns": [
                "Contact",
                "How to reach you",
                "Phone number",
                "Email address",
                "Get in touch",
                "Contact details"
            ],
            "responses": [
                "You can reach us through:\n\n**Sales** (Products & Quotes):\n📞 +91 93629 06631\n📧 sales@unirolsairtex.com\n\n**Spares** (Parts & Maintenance):\n📞 +91 96002 25031\n📧 spares@unirolsairtex.com\n\n**Admin** (General Inquiries):\n📞 +91 98947 02231\n📧 admin@unirolsairtex.com"
            ]
        },
        {
            "tag": "location",
            "patterns": [
                "Where are you located",
                "Your address",
                "Location",
                "Office address",
                "Factory location",
                "Coimbatore"
            ],
            "responses": [
                "📍 **Our Location:**\n\n2/20, Meenan Thottam\nKurumpalayam Link Road\nA.G Pudur, Irugur\nCoimbatore - 641103\nTamil Nadu, India\n\nWe're located in Coimbatore, Tamil Nadu. Feel free to visit or contact us for directions!"
            ]
        },
        {
            "tag": "advantages",
            "patterns": [
                "Why choose you",
                "Advantages",
                "Benefits",
                "What makes you better",
                "Product advantages",
                "Why Unirols"
            ],
            "responses": [
                "Our products offer distinct advantages:\n\n✅ Labor Saving - Automated operation reduces manual work\n✅ Higher Performance - Designed for optimal efficiency\n✅ Less Maintenance - Reliable, low-maintenance design\n✅ Adaptable - Can adapt to any machinery layout\n✅ Automatic Waste Collection - Built-in intelligent systems\n✅ User Friendly - Easy to operate and maintain\n✅ Custom Built - Tailored to your specific needs"
            ]
        },
        {
            "tag": "customization",
            "patterns": [
                "Can you customize",
                "Custom solution",
                "Tailor made",
                "Specific requirements",
                "Custom design",
                "Made to order"
            ],
            "responses": [
                "Yes! All our systems are tailor-made to suit your individual requirements. We design and build solutions based on:\n\n- Your specific machinery layout\n- Production capacity\n- Floor space\n- Operational needs\n\nContact our sales team at +91 93629 06631 or sales@unirolsairtex.com to discuss your custom requirements."
            ]
        },
        {
            "tag": "industries",
            "patterns": [
                "Which industries",
                "Who do you serve",
                "Target market",
                "Textile industry",
                "Spinning weaving"
            ],
            "responses": [
                "We serve the **textile industry**, specifically:\n\n🏭 Spinning Units\n🏭 Weaving Units\n🏭 Textile Manufacturing Facilities\n\nOur solutions include cleaning systems, material handling, and vacuum systems designed specifically for textile production environments."
            ]
        },
        {
            "tag": "installation",
            "patterns": [
                "Do you install",
                "Installation service",
                "Setup",
                "Implementation",
                "Will you install"
            ],
            "responses": [
                "Yes, we provide complete installation services. Our systems are custom-built and professionally installed by our expert team to ensure optimal performance.\n\nInstallation includes:\n- Site assessment\n- Custom design implementation\n- Professional installation\n- Testing and commissioning\n- Training for your operators\n\nContact us to discuss your installation needs!"
            ]
        },
        {
            "tag": "technical_support",
            "patterns": [
                "Technical support",
                "Help",
                "Support",
                "Technical query",
                "Need assistance"
            ],
            "responses": [
                "For technical support and queries, please contact:\n\n📞 Phone: +91 98947 02231\n📧 Email: admin@unirolsairtex.com\n\nOur team is ready to assist you with any technical questions or support needs."
            ]
        },
        {
            "tag": "thanks",
            "patterns": [
                "Thanks", "Thank you", "Thanks a lot",
                "Appreciate it", "Thank you very much"
            ],
            "responses": [
                "You're welcome! Is there anything else you'd like to know about our products or services?",
                "Happy to help! Feel free to ask if you have more questions.",
                "My pleasure! Let me know if you need any other information."
            ]
        }
    ],
    
    "context_data": {
        "company_name": "Unirols Airtex",
        "industry": "Textile Machinery Manufacturing",
        "products_count": 3,
        "location": "Coimbatore, Tamil Nadu, India",
        "specialization": ["Overhead Travelling Cleaners", "Bobbin Transport Systems", "Central Vacuum Systems"]
    }
}
