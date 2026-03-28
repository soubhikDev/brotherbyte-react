import { useEffect, useRef } from "react";
import "./CardSection.css";


// ─── Data ───────────────────────────────────────────────────────────────────
const FOODS = [
  {
    id: 1,
    name: "Truffle Risotto",
    tag: "Italian",
    time: "35 min",
    desc: "Creamy arborio rice with black truffle shavings, aged parmesan, and a drizzle of truffle oil.",
    price: "28",
    rating: "4.9",
    reviews: "214",
    badge: "Chef's Pick",
    img: "https://images.unsplash.com/photo-1673430847705-0d42aef1c7f7?w=800&q=80",
    featured: true,
  },
  {
    id: 2,
    name: "Wagyu Burger",
    tag: "American",
    time: "20 min",
    desc: "A5 wagyu patty, aged cheddar, caramelized onions, truffle aioli on a brioche bun.",
    price: "34",
    rating: "4.8",
    reviews: "189",
    badge: "Bestseller",
    img: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&q=80",
  },
  {
    id: 3,
    name: "Salmon Tartare",
    tag: "Seafood",
    time: "15 min",
    desc: "Fresh Atlantic salmon, citrus ponzu, avocado cream, crispy capers and sesame.",
    price: "22",
    rating: "4.7",
    reviews: "97",
    img: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=800&q=80",
  },
  {
    id: 4,
    name: "Duck Confit",
    tag: "French",
    time: "45 min",
    desc: "Slow-cooked duck leg, lentil cassoulet, cherry gastrique and microgreens.",
    price: "31",
    rating: "4.9",
    reviews: "143",
    badge: "New",
    img: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80",
  },
  {
    id: 5,
    name: "Matcha Lava Cake",
    tag: "Dessert",
    time: "12 min",
    desc: "Warm matcha sponge with a molten white chocolate center, yuzu cream and gold dust.",
    price: "14",
    rating: "4.8",
    reviews: "231",
    img: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800&q=80",
  },
];

const FILTERS = ["All", "Italian", "American", "Seafood", "French", "Dessert"];

// ─── Component ───────────────────────────────────────────────────────────────
export default function CardSection() {
  const sectionRef = useRef(null);
  const eyebrowRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const filtersRef = useRef(null);
  const ctaRef = useRef(null);
  const cardRefs = useRef([]);
  const favStates = useRef({});

//   // Inject CSS
//   useEffect(() => {
//     const id = "food-card-css";
//     if (!document.getElementById(id)) {
//       const style = document.createElement("style");
//       style.id = id;
//       style.textContent = CSS;
//       document.head.appendChild(style);
//     }
//     return () => {
//       const el = document.getElementById(id);
//       if (el) el.remove();
//     };
//   }, []);

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

  return (
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

      {/* ── Filters ── */}
      <div className="fs-filters" ref={filtersRef}>
        {FILTERS.map((f, i) => (
          <button
            key={f}
            className={`fs-filter-btn${i === 0 ? " active" : ""}`}
            onClick={(e) => {
              document.querySelectorAll(".fs-filter-btn").forEach((b) => b.classList.remove("active"));
              e.currentTarget.classList.add("active");
            }}
          >
            {f}
          </button>
        ))}
      </div>

      {/* ── Grid ── */}
      <div className="fs-grid">
        {FOODS.map((food, idx) => (
          <article
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
              <h2 className="fs-card-name">{food.name}</h2>
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
          </article>
        ))}
      </div>

      {/* ── CTA ── */}
      <div className="fs-cta" ref={ctaRef}>
        <button className="fs-cta-btn">
          View Full Menu
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </section>
  );
}