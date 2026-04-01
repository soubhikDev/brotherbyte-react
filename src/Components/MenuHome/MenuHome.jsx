import React from 'react'
import { FoodData } from "../../../FoodData";
import { NavLink, useLocation, useNavigate, useNavigation } from "react-router-dom";
import { useEffect, useRef } from "react";


export default function MenuHome() {

    const sectionRef = useRef(null);
    const eyebrowRef = useRef(null);
    const titleRef = useRef(null);
    const subtitleRef = useRef(null);
    const filtersRef = useRef(null);
    const ctaRef = useRef(null);
    const cardRefs = useRef([]);
    const favStates = useRef({});
  
  
    // GSAP animations
    useEffect(() => {
      let gsap, ScrollTrigger;
  
      const loadGSAP = async () => {
        // Load GSAP from CDN
        if (!window.gsap) {
          await new Promise((res) => {
            const s = document.createElement("script");
            s.src = "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js";
            s.onload = res;
            document.head.appendChild(s);
          });
        }
        if (!window.ScrollTrigger) {
          await new Promise((res) => {
            const s = document.createElement("script");
            s.src = "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js";
            s.onload = res;
            document.head.appendChild(s);
          });
        }
  
        gsap = window.gsap;
        ScrollTrigger = window.ScrollTrigger;
        gsap.registerPlugin(ScrollTrigger);
  
        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
  
        // Header sequence
        tl.to(eyebrowRef.current, { opacity: 1, y: 0, duration: 0.7 }, 0)
          .from(eyebrowRef.current, { y: 20 }, 0)
          .to(titleRef.current, { opacity: 1, y: 0, duration: 0.9 }, 0.15)
          .from(titleRef.current, { y: 40 }, 0.15)
          .to(subtitleRef.current, { opacity: 1, y: 0, duration: 0.7 }, 0.3)
          .from(subtitleRef.current, { y: 20 }, 0.3)
          .to(filtersRef.current, { opacity: 1, y: 0, duration: 0.6 }, 0.45)
          .from(filtersRef.current, { y: 15 }, 0.45);
  
        // Cards stagger
        gsap.to(cardRefs.current, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.12,
          ease: "power3.out",
          delay: 0.5,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          },
        });
  
        // CTA
        gsap.to(ctaRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power3.out",
          delay: 1.2,
          scrollTrigger: {
            trigger: ctaRef.current,
            start: "top 90%",
          },
        });
        gsap.from(ctaRef.current, { y: 20 });
  
        // Hover tilt effect on cards
        cardRefs.current.forEach((card) => {
          if (!card) return;
          card.addEventListener("mousemove", (e) => {
            const rect = card.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width - 0.5;
            const y = (e.clientY - rect.top) / rect.height - 0.5;
            gsap.to(card, {
              rotateY: x * 8,
              rotateX: -y * 8,
              transformPerspective: 800,
              duration: 0.4,
              ease: "power2.out",
            });
          });
          card.addEventListener("mouseleave", () => {
            gsap.to(card, {
              rotateY: 0,
              rotateX: 0,
              duration: 0.5,
              ease: "power2.out",
            });
          });
        });
      };
  
      loadGSAP();
  
      return () => {
        if (window.ScrollTrigger) window.ScrollTrigger.getAll().forEach((t) => t.kill());
      };
    }, []);
  
    const handleFav = (e, id) => {
      e.stopPropagation();
      const btn = e.currentTarget;
      const icon = btn.querySelector("span");
      const isFav = favStates.current[id];
      favStates.current[id] = !isFav;
      if (icon) icon.textContent = isFav ? "♡" : "♥";
      if (window.gsap) {
        window.gsap.fromTo(btn, { scale: 1 }, { scale: 1.3, yoyo: true, repeat: 1, duration: 0.15 });
      }
    };  
    const location = useNavigate()
  return (
    <>
            <section className="fs-section" ref={sectionRef}>
      {/* ── Header ── */}
      <header className="fs-header">
        <p className="fs-eyebrow" ref={eyebrowRef}>Curated for you</p>
        <h1 className="fs-title" ref={titleRef}>
          Taste the <span>Extraordinary</span>
        </h1>
        <p className="fs-subtitle" ref={subtitleRef}>
          Each dish is crafted with obsession. Seasonal ingredients, bold ideas, unforgettable memory.
        </p>
      </header>


      {/* ── Grid ── */}
      <div className="fs-grid">
        {FoodData.map((food, idx) => (
          <NavLink
            to={'/menu'}
            key={food.id}
            className={`fs-card${food.featured ? " featured" : ""}`}
            ref={(el) => (cardRefs.current[idx] = el)}
          >
            {/* Image */}
            <div className="fs-card-img-wrap">
              <img
                className="fs-card-img"
                src={food.img}
                alt={food.name}
                loading="lazy"
              />
              <div className="fs-card-overlay" />
              {food.badge && <span className="fs-card-badge">{food.badge}</span>}
              <button className="fs-card-fav" onClick={(e) => handleFav(e, food.id)}>
                <span>♡</span>
              </button>
            </div>

            {/* Body */}
            <div className="fs-card-body">
              <div className="fs-card-meta">
                <span className="fs-card-tag">{food.tag}</span>
                <span className="fs-card-dot" />
                <span className="fs-card-time">⏱ {food.time}</span>
              </div>
              <h2 className="fs-card-name">{food.MenuName}</h2>
              <p className="fs-card-desc">{food.desc}</p>
              <div className="fs-card-footer">
                <div>
                  <div className="fs-card-price">
                    <sup>₹</sup>{food.price}
                  </div>
                  <div className="fs-card-stars">
                    ★★★★★ <span>({food.reviews})</span>
                  </div>
                </div>
                
              </div>
            </div>
          </NavLink>
        ))}
      </div>


      {/* ── CTA ── */}
      <div className="fs-cta" ref={ctaRef}>
        <button className="fs-cta-btn" onClick={() => location("/menu")}>
          View Full Menu
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </button>
      </div>

    </section>
    </>
  )
}
