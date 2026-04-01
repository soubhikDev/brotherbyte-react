import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import BrotherByteLOGO from '../../assets/BrotherByteLOGO.png';
import './Footer.css';

gsap.registerPlugin(ScrollTrigger);

/* ── helpers ── */
function animIn(el, vars, trigger) {
  if (!el) return;
  gsap.fromTo(
    el,
    { opacity: 0, ...vars.from },
    {
      opacity: 1,
      ...vars.to,
      duration: vars.duration ?? 0.8,
      ease: vars.ease ?? 'power3.out',
      delay: vars.delay ?? 0,
      scrollTrigger: {
        trigger: trigger ?? el,
        start: 'top 88%',
        toggleActions: 'play none none none',
      },
    }
  );
}

const MARQUEE_ITEMS = [
  'Farm to Table',
  'Artisan Kitchen',
  'Seasonal Flavours',
  'Heritage Recipes',
  'Open Fire Cooking',
  'Hand-crafted Desserts',
  'Natural Wine Cellar',
  'Zero Waste Kitchen',
];

const SOCIAL_ICONS = [
  { label: 'Instagram', icon: '📸' },
  { label: 'Twitter/X', icon: '𝕏' },
  { label: 'Facebook', icon: 'f' },
  { label: 'TikTok', icon: '♪' },
];

export default function Footer() {
  const footerRef       = useRef(null);
  const marqueeRef      = useRef(null);
  const ctaHeadRef      = useRef(null);
  const ctaActionsRef   = useRef(null);
  const brandRef        = useRef(null);
  const colRefs         = useRef([]);
  const hoursRef        = useRef(null);
  const bottomRef       = useRef(null);
  const separatorRef    = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {

      /* — marquee band — */
      animIn(marqueeRef.current, { from: { y: 20 }, to: { y: 0 } });

      /* — CTA headline words — */
      const words = ctaHeadRef.current?.querySelectorAll('.cta-word');
      if (words?.length) {
        gsap.fromTo(
          words,
          { y: '110%', opacity: 0 },
          {
            y: '0%',
            opacity: 1,
            duration: 0.9,
            stagger: 0.07,
            ease: 'power4.out',
            scrollTrigger: {
              trigger: ctaHeadRef.current,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      /* — CTA actions — */
      animIn(ctaActionsRef.current, {
        from: { x: 40 },
        to: { x: 0 },
        delay: 0.3,
        duration: 0.7,
      });

      /* — brand column — */
      animIn(brandRef.current, {
        from: { y: 30 },
        to: { y: 0 },
        duration: 0.8,
        ease: 'power3.out',
      });

      /* — nav columns staggered — */
      colRefs.current.forEach((col, i) => {
        if (!col) return;
        animIn(col, {
          from: { y: 35 },
          to: { y: 0 },
          duration: 0.75,
          delay: 0.1 * i,
          ease: 'power3.out',
        });

        /* links stagger within each col */
        const links = col.querySelectorAll('.col-links li');
        gsap.fromTo(
          links,
          { x: -12, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.5,
            stagger: 0.06,
            ease: 'power2.out',
            delay: 0.2 + 0.08 * i,
            scrollTrigger: {
              trigger: col,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );
      });

      /* — separator line draws across — */
      if (separatorRef.current) {
        gsap.fromTo(
          separatorRef.current,
          { scaleX: 0, transformOrigin: 'left' },
          {
            scaleX: 1,
            duration: 1.2,
            ease: 'power2.inOut',
            scrollTrigger: {
              trigger: separatorRef.current,
              start: 'top 90%',
            },
          }
        );
      }

      /* — hours strip — */
      if (hoursRef.current) {
        const items = hoursRef.current.querySelectorAll('.hours-item');
        gsap.fromTo(
          items,
          { y: 20, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.08,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: hoursRef.current,
              start: 'top 90%',
            },
          }
        );
      }

      /* — bottom bar — */
      animIn(bottomRef.current, {
        from: { y: 20 },
        to: { y: 0 },
        duration: 0.7,
        ease: 'power2.out',
        opacity: 1,
      });

    }, footerRef);

    return () => ctx.revert();
  }, []);

  /* Build doubled marquee items for seamless loop */
  const allItems = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS];

  return (
    <footer className="site-footer" ref={footerRef}>
      {/* ── MAIN GRID ── */}
      <div className="footer-grid">

        {/* Brand */}
        <div className="footer-brand" ref={brandRef}>
          <div>
            <div className="brand-logo">
              <img src={BrotherByteLOGO} />
            </div>
            <p className="brand-tagline">
              Where every dish is a love letter to seasonal ingredients,
              ancient technique, and the joy of gathering around good food.
            </p>
          </div>
          <div className="social-row">
            {SOCIAL_ICONS.map((s) => (
              <a key={s.label} href="#" className="social-btn" aria-label={s.label} title={s.label}>
                {s.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Explore */}
        <div className="footer-col" ref={el => colRefs.current[0] = el}>
          <h3 className="col-title">Explore</h3>
          <ul className="col-links">
            {['Our Menu', 'Chef\'s Table', 'Wine Cellar', 'Private Dining', 'Seasonal Specials', 'Cooking Classes'].map(l => (
              <li key={l}>
                <a href="#">
                  <span className="link-arrow">›</span>
                  {l}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Visit */}
        <div className="footer-col" ref={el => colRefs.current[1] = el}>
          <h3 className="col-title">Visit</h3>
          <ul className="col-links">
            {['Make a Reservation', 'Gift Vouchers', 'Events & Catering', 'Group Bookings', 'Takeaway Orders', 'Find Us'].map(l => (
              <li key={l}>
                <a href="#">
                  <span className="link-arrow">›</span>
                  {l}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Newsletter */}
        <div className="footer-col footer-newsletter-inline" ref={el => colRefs.current[2] = el}>
          <h3 className="col-title">Stay in Touch</h3>
          <div className="newsletter-form">
            <input
              type="email"
              className="newsletter-input"
              placeholder="your@email.com"
            />
            <button className="newsletter-submit">Subscribe</button>
          </div>
          <p className="newsletter-note">
            Monthly specials, seasonal menus &amp; table offers. No spam, ever.
          </p>
        </div>

      </div>

      {/* ── BOTTOM BAR ── */}
      <div className="footer-bottom" ref={bottomRef}>
        <p className="footer-copy">
          © 2026 <a href="#">BrotherBytes</a>. All rights reserved.
        </p>
        <ul className="footer-legal">
          {['Privacy Policy', 'Cookie Policy', 'Accessibility', 'Terms'].map(l => (
            <li key={l}><a href="#">{l}</a></li>
          ))}
        </ul>
        <div className="footer-location">
          <span className="location-dot" />
          42 Ember Lane, London EC1A 1BB
        </div>
      </div>

    </footer>
  );
}