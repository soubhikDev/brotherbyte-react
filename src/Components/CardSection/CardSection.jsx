import { useEffect, useRef, useState } from "react";
import "./CardSection.css";
import { FoodData } from "../../../FoodData";
import { useLocation, useNavigate } from "react-router-dom";
import Modal from "@mui/material/Modal";
import { Avatar, AvatarGroup } from "@mui/material";

// ─── Data ───────────────────────────────────────────────────────────────────

const FILTERS = [
  "All",
  "Thali",
  "Biriyani",
  "Pizza",
  "Chinese",
  "South Indian",
  "Sweets",
];

// ─── Component ───────────────────────────────────────────────────────────────
export default function CardSection() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [triggerAnimation, setTriggerAnimation] = useState(0);
  const [items, setItems] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const sectionRef = useRef(null);
  const eyebrowRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const filtersRef = useRef(null);
  const ctaRef = useRef(null);
  const cardRefs = useRef([]);
  const favStates = useRef({});
  const navigate = useNavigate();

  // filtered FoodData Base
  const filteredData =
    activeFilter === "All"
      ? FoodData
      : FoodData.filter(
          (item) => item.FTag.toLowerCase() === activeFilter.toLowerCase()
        );

  // GSAP animations
  useEffect(() => {
    cardRefs.current.forEach((card) => {
      if (card) {
        card.style.opacity = 0;
        card.style.transform = "translateY(20px)";
      }
    });
    let gsap, ScrollTrigger;

    const loadGSAP = async () => {
      if (!window.gsap) {
        await new Promise((res) => {
          const s = document.createElement("script");
          s.src =
            "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js";
          s.onload = res;
          document.head.appendChild(s);
        });
      }
      if (!window.ScrollTrigger) {
        await new Promise((res) => {
          const s = document.createElement("script");
          s.src =
            "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js";
          s.onload = res;
          document.head.appendChild(s);
        });
      }

      gsap = window.gsap;
      ScrollTrigger = window.ScrollTrigger;
      gsap.registerPlugin(ScrollTrigger);

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.to(eyebrowRef.current, { opacity: 1, y: 0, duration: 0.7 }, 0)
        .from(eyebrowRef.current, { y: 20 }, 0)
        .to(titleRef.current, { opacity: 1, y: 0, duration: 0.9 }, 0.15)
        .from(titleRef.current, { y: 40 }, 0.15)
        .to(subtitleRef.current, { opacity: 1, y: 0, duration: 0.7 }, 0.3)
        .from(subtitleRef.current, { y: 20 }, 0.3)
        .to(filtersRef.current, { opacity: 1, y: 0, duration: 0.6 }, 0.45)
        .from(filtersRef.current, { y: 15 }, 0.45);

      gsap.to(cardRefs.current, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        stagger: 0.12,
        ease: "power3.out",
        delay: 0.5,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      });

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
      if (window.ScrollTrigger)
        window.ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [triggerAnimation]);

  const handleFav = (e, id) => {
    e.stopPropagation();
    const btn = e.currentTarget;
    const icon = btn.querySelector("span");
    const isFav = favStates.current[id];
    favStates.current[id] = !isFav;
    if (icon) icon.textContent = isFav ? "♡" : "♥";
    if (window.gsap) {
      window.gsap.fromTo(
        btn,
        { scale: 1 },
        { scale: 1.3, yoyo: true, repeat: 1, duration: 0.15 }
      );
    }
  };

  const handleAdd = (food) => {
    const existingItem = items.find((item) => item.id === food.id);
    if (existingItem) {
      setItems(
        items.map((item) =>
          item.id === food.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      );
    } else {
      setItems([...items, { id: food.id, quantity: 1 }]);
    }
  };

  const handleDecrease = (id) => {
    const existingItem = items.find((item) => item.id === id);
    if (existingItem.quantity === 1) {
      setItems(items.filter((item) => item.id !== id));
    } else {
      setItems(
        items.map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        )
      );
    }
  };

  // Enrich cart items with full food data
  const cartItems = items.map((cartItem) => {
    const food = FoodData.find((f) => f.id === cartItem.id);
    return { ...food, quantity: cartItem.quantity };
  });

  const totalAmount = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const AvaterImg = cartItems.map((item) => item.img);
  

  const totalQty = items.reduce((sum, item) => sum + item.quantity, 0);

  const location = useLocation();
  const hideLayout = ["/menu"].includes(location.pathname);

  return (
    <section className="fs-section" ref={sectionRef}>
      {/* ── Header ── */}
      <header className="fs-header">
        <p className="fs-eyebrow" ref={eyebrowRef}>
          Curated for you
        </p>
        <h1 className="fs-title" ref={titleRef}>
          Taste the <span>Extraordinary</span>
        </h1>
        <p className="fs-subtitle" ref={subtitleRef}>
          Each dish is crafted with obsession. Seasonal ingredients, bold ideas,
          unforgettable memory.
        </p>
      </header>

      {/* ── Filters ── */}
      <div className="fs-filters" ref={filtersRef}>
        {FILTERS.map((f) => (
          <button
            key={f}
            className={`fs-filter-btn ${activeFilter === f ? "active" : ""}`}
            onClick={() => {setActiveFilter(f); setTriggerAnimation((prev) => prev + 1);}}
          >
            {f}
          </button>
        ))}
      </div>

      {/* ── Grid ── */}
      <div className="fs-grid">
        {filteredData.map((food, idx) => (
          <div
            key={food.id}
            className={`fs-card${food.featured ? " featured" : ""}`}
            ref={(el) => (cardRefs.current[idx] = el)}
          >
            <div className="fs-card-img-wrap">
              <img
                className="fs-card-img"
                src={food.img}
                alt={food.name}
                loading="lazy"
              />
              <div className="fs-card-overlay" />
              {food.badge && (
                <span className="fs-card-badge">{food.badge}</span>
              )}
              <button
                className="fs-card-fav"
                onClick={(e) => handleFav(e, food.id)}
              >
                <span>♡</span>
              </button>
            </div>

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
                    <sup>₹</sup>
                    {food.price}
                  </div>
                  <div className="fs-card-stars">
                    ★★★★★ <span>({food.reviews})</span>
                  </div>
                </div>
                {items.some((item) => item.id === food.id) ? (
                  <div className="INDCbuttons">
                    <button
                      className="btn increase"
                      onClick={() => handleDecrease(food.id)}
                    >
                      -
                    </button>
                    <span className="count">
                      {items.find((item) => item.id === food.id)?.quantity}
                    </span>
                    <button
                      className="btn decrease"
                      onClick={() => handleAdd(food)}
                    >
                      +
                    </button>
                  </div>
                ) : (
                  <button
                    className="fs-add-btn"
                    onClick={() => handleAdd(food)}
                    aria-label="Add to cart"
                  >
                    +
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {!hideLayout && (
        <div className="fs-cta" ref={ctaRef}>
          <button className="fs-cta-btn">
            View Full Menu
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      )}

      {/* ── Cart Floating Button (items hone par dikhega) ── */}
      {items.length > 0 && (
        <>
            <div className="menuMoal">
              <div className="menuModalItemView">
                <AvatarGroup spacing={14} max={4} className="avatarGroup">
                  {AvaterImg.map((img, index) => (
                    <Avatar key={index} alt="Remy Sharp" src={img} />
                  ))}
                </AvatarGroup>
                <h1>{totalQty} items · ₹{totalAmount}</h1>
              </div>
              
              <button className="menuModalBTN" onClick={() => setCartOpen(true)}> View Cart </button>
            </div>
        </>
        
      )}

      {/* ── MUI Modal (Cart) ── */}
      <Modal
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        aria-labelledby="cart-modal-title"
      >
        <div className="fs-cart-modal">
          {/* Modal Header */}
          <div className="fs-cart-modal-header">
            <h2 id="cart-modal-title">🛒 Your Cart</h2>
            <button
              className="fs-cart-close-btn"
              onClick={() => setCartOpen(false)}
            >
              ✕
            </button>
          </div>

          {/* Cart Items List */}
          <div className="fs-cart-items-list">
            {cartItems.map((item) => (
              <div key={item.id} className="fs-cart-item">
                <img
                  src={item.img}
                  alt={item.MenuName}
                  className="fs-cart-item-img"
                />
                <div className="fs-cart-item-info">
                  <h3 className="fs-cart-item-name">{item.MenuName}</h3>
                  <span className="fs-cart-item-tag">{item.tag}</span>
                  <div className="fs-cart-item-price-row">
                    <span className="fs-cart-item-unit-price">
                      ₹{item.price} × {item.quantity}
                    </span>
                    <span className="fs-cart-item-subtotal">
                      ₹{item.price * item.quantity}
                    </span>
                  </div>
                </div>
                <div className="fs-cart-item-controls">
                  <button
                    className="fs-cart-qty-btn"
                    onClick={() => handleAdd(item)}
                  >
                    +
                  </button>
                  <span className="fs-cart-qty">{item.quantity}</span>
                  <button
                    className="fs-cart-qty-btn"
                    onClick={() => handleDecrease(item.id)}
                  >
                    −
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Modal Footer */}
          <div className="fs-cart-modal-footer">
            <div className="fs-cart-total-row">
              <span>Total ({totalQty} items)</span>
              <span className="fs-cart-grand-total">₹{totalAmount}</span>
            </div>
            <button className="fs-cart-checkout-btn" onClick={() => navigate('/payment', { state: { cartItems } })}>
              Proceed to Checkout →
            </button>
          </div>
        </div>
      </Modal>
    </section>
  );
}