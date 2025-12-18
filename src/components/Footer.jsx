import '../styles/Footer.css';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="footer">
            <div className="container">
                <p>© Unirols Airtex {currentYear}. All Rights Reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
