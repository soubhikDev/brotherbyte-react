import React, { useEffect, useRef } from 'react'
import "../../Components/CardSection/CardSection.css";
import { FoodData } from '../../../FoodData'
import { NavLink, useParams } from 'react-router-dom';

export default function MenuList() {
  console.log(FoodData);


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
      window.scrollTo(0, 0); // Scroll to top on component mount
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
  
    const handleAdd = (e) => {
      e.stopPropagation();
      const btn = e.currentTarget;
      if (window.gsap) {
        window.gsap.fromTo(
          btn,
          { scale: 1 },
          { scale: 1.35, yoyo: true, repeat: 1, duration: 0.18, ease: "power2.out" }
        );
      }
    };
  


    const { id } = useParams();

    const Food = FoodData.find(item => item.id === Number(id));

    if (!Food) {
        return  <>
                    <h1>Food not found</h1>
                </>
    }
  
  return (
    <>
    <section className="fs-section" ref={sectionRef}>
        <div className="fs-grid">
        {FoodData.map((menu) =>
        menu.FoodList.map((food, idx) => (
          <NavLink
            key={food.food_id}
            className={`fs-card${food.featured ? " featured" : ""}`}
            ref={(el) => (cardRefs.current[idx] = el)}
          >
            {/* Image */}
            <div className="fs-card-img-wrap">
              <img
                className="fs-card-img"
                src={food.img}
                alt={food.food_name}
                loading="lazy"
              />
              <div className="fs-card-overlay" />
              {food.badge && <span className="fs-card-badge">{food.badge}</span>}
              <button className="fs-card-fav" onClick={(e) => handleFav(e, food.food_id)}>
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
              <h2 className="fs-card-name">{food.food_name}</h2>
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
                <button className="fs-add-btn" onClick={handleAdd} aria-label="Add to cart">
                  +
                </button>
              </div>
            </div>
          </NavLink>
        )))}
      </div>
      </section>
    </>
  )
}
