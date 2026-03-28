import gsap from 'gsap';
import React, { useEffect, useRef } from 'react'
import './OurClient.css'

export default function OurClient() {
    const sectionRef = useRef(null);
    const statRefs = useRef([]);
    const countRefs = useRef([]);
    const dividerRefs = useRef([]);
    const animatedRef = useRef(false);


      useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
 
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !animatedRef.current) {
            animatedRef.current = true;
            runAnimation();
            observer.disconnect();
          }
        });
      },
      { threshold: 0.4 }
    );
 
    observer.observe(section);
    return () => observer.disconnect();
  }, []);
    const Clients = [
        {
            id:1,
            img: '',
            text: 'Total Restaurant',
            num: 100,
        },
        {
            id:1,
            img: '',
            text: 'Happy Client',
            num: 41985,
        },
        {
            id:1,
            img: '',
            text: 'Order Delivered',
            num: 74515,
        }
    ]
   function runAnimation() {
        // ✅ FIX 2: Filter out null refs before passing to gsap
        const validStats = statRefs.current.filter(Boolean);
        const validDividers = dividerRefs.current.filter(Boolean);
 
        gsap.to(validStats, {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.2,
            ease: "power3.out",
        });
 
        gsap.to(validDividers, {
            scaleX: 1,
            duration: 0.5,
            delay: 0.4,
            stagger: 0.2,
            ease: "power2.out",
        });
 
        Clients.forEach((t, i) => {
            const el = countRefs.current[i];
            if (!el) return; // ✅ FIX 3: null check
            const obj = { val: 0 };
 
            gsap.to(obj, {
                val: t.num,
                duration: 2.2,
                delay: 0.3 + i * 0.2,
                ease: "power2.out",
                onUpdate() {
                    el.innerHTML = `${Math.round(obj.val)}<span style="font-size:0.75em">+</span>`;
                },
            });
        });
    }


  return (
    
    <>
        <div className="resultSection" ref={sectionRef}>
            <h1>Our Happy <span>Customer</span></h1>
            <div className="stats-grid">
                {Clients.map((item, index) => (
                <div
                    key={index}
                    className="stat-item"
                    ref={(el) => (statRefs.current[index] = el)}
                >
                    <div className="stat-number" ref={(el) => (countRefs.current[index] = el)} style={{color: item.co
                        
                    }}>
                        <span style={{ fontSize: "0.75em" }}>{item.num}+</span>
                    </div>
                    <div
                        className="stat-divider"
                        ref={(el) => (dividerRefs.current[index] = el)}
                    />
                    <div className="stat-label">{item.text}</div>
                </div>
            ))}
            </div>
        </div>
    </>
  )
}
