import { useState, useEffect } from "react";
import "./Navbar.css";
import Logo from '../../assets/BrotherByteLOGO.png'
import { NavLink } from "react-router-dom";

const NAV_LINKS = [
    { label: "Home", href: "/" },
    { label: "Menu", href: "/menu" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
];

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [progress, setProgress] = useState(0);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;

            // Navbar background toggle
            setScrolled(scrollY > 40);

            // Scroll progress bar
            const pct = docHeight > 0 ? (scrollY / docHeight) * 100 : 0;
            setProgress(pct);
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Lock body scroll when mobile menu is open
    useEffect(() => {
        document.body.style.overflow = menuOpen ? "hidden" : "";
        return () => { document.body.style.overflow = ""; };
    }, [menuOpen]);

    return (
        <>
            {/* ===== NAVBAR ===== */}
            <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
                {/* Scroll Progress Bar */}
                <div
                    className="nav-progress"
                    style={{ width: `${progress}%` }}
                />

                <div className="nav-inner">
                    {/* Logo */}
                    <a href="#" className="nav-logo" aria-label="Go to home">
                        <img src={Logo} alt="" />
                    </a>

                    {/* Desktop Nav Links */}
                    <div className="nav-links">
                        {NAV_LINKS.map(({ label, href }) => (
                            <NavLink key={label} to={href}>
                                <span className="link-dot" />
                                    {label}
                            </NavLink>
                        ))}
                    </div>

                    {/* Right Side */}
                    <div className="nav-right">
                        {/* Search Icon */}
                        <button className="nav-search" aria-label="Search">
                            <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                                <circle cx="6.5" cy="6.5" r="5" stroke="currentColor" strokeWidth="1.5" />
                                <path d="M10.5 10.5L13.5 13.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                            </svg>
                        </button>

                        {/* CTA Button */}
                        <a href="#" className="nav-cta">
                            Get Started
                            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                                <path d="M2 10L10 2M10 2H4M10 2V8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </a>

                        {/* Hamburger (mobile) */}
                        <button
                            className={`nav-hamburger ${menuOpen ? "open" : ""}`}
                            onClick={() => setMenuOpen((v) => !v)}
                            aria-label="Toggle menu"
                            aria-expanded={menuOpen}
                        >
                            <span />
                            <span />
                            <span />
                        </button>
                    </div>
                </div>
            </nav>

            {/* ===== MOBILE MENU ===== */}
            <div className={`nav-mobile-menu ${menuOpen ? "open" : ""}`} role="dialog" aria-modal="true">
                {NAV_LINKS.map(({ label, href }) => (
                    <NavLink
                        key={label}
                        to={href}
                        onClick={() => {setMenuOpen(false);}}>
                        {label}
                    </NavLink>
                ))}
                <a href="#" className="mobile-cta" onClick={() => setMenuOpen(false)}>
                    Get Started ↗
                </a>
            </div>
        </>
    );
}