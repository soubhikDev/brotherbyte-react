import React, { useEffect } from 'react'
import PageHero from '../../Components/PageHeros/PageHero'
import AboutHero from '../../assets/AboutHero.png'
import './About.css'

export default function About() {
        useEffect(() => {
          window.scrollTo(0, 0);
        }, []);
  const PageHeroData = {
    title: 'About',
    img: AboutHero
  }

  const sections = [
    {
      icon: '🌟',
      title: 'Our Vision',
      text: 'To revolutionize food delivery by offering a diverse range of food that cater to the tastes and preferences of passengers across India while maintaining the highest standards of quality and service.',
    },
    {
      icon: '🎯',
      title: 'Our Mission',
      text: 'We aim to provide convenient and reliable food delivery services to passengers, ensuring that every food is fresh, tasty, and prepared in FSSAI-approved restaurants. Our goal is to make bus journeys enjoyable by offering a variety of cuisines to suit every palate and dietary preference.',
    },
    {
      icon: '🍜',
      title: 'What We Offer',
      text: 'At BrotherByte, we deliver a wide variety of foods from over 145 trusted and FSSAI-approved restaurants across India. From North Indian and South Indian delicacies to Mughlai, Chinese, and Continental dishes, our menu is designed to satisfy every craving.',
    },
    {
      icon: '👨‍👩‍👧‍👦',
      title: 'Group Orders',
      text: 'Traveling with family, friends, or colleagues? BrotherByte makes group orders effortless. Choose from our extensive menu and enjoy delicious foods delivered in bulk, tailored to suit your group\'s preferences with customized menus for a memorable experience.',
    },
    {
      icon: '🌿',
      title: 'Jain Food',
      text: 'We understand the dietary needs of our Jain customers. BrotherByte offers pure Jain food prepared with care to meet your requirements. Our Jain food is satvik, fresh, and sourced from trusted restaurants to ensure your satisfaction and peace of mind.',
    },
  ]

  const whyUs = [
    { label: 'Fresh & Hygienic Food', desc: 'Every meal is prepared in clean, FSSAI-certified kitchens to ensure hygiene and quality.' },
    { label: 'Timely Delivery', desc: 'We guarantee prompt service, delivering food on time at your destination.' },
    { label: 'Variety of Choices', desc: 'From regional delicacies to international cuisines, our menu caters to diverse tastes.' },
  ]

  return (
    <>
      <div className="AboutMain">
        <PageHero PageHeroData={PageHeroData} />

        <div className="about-wrapper">

          {/* ── Intro ── */}
          <p className="about-eyebrow">Who We Are</p>
          <h1 className="about-title">
            India's Premier<br />
            <span>Bus Journey</span> Food Partner
          </h1>
          <p className="about-lead">
            Welcome to BrotherByte — dedicated to making your bus journeys more
            enjoyable and flavorful. With a commitment to quality, hygiene, and
            customer satisfaction, we ensure every meal we deliver enhances your
            travel experience.
          </p>

        

          {/* ── Section Cards ── */}
          <div className="about-sections">
            {sections.map((sec) => (
              <div className="about-card" key={sec.title}>
                <div className="card-icon">{sec.icon}</div>
                <h2>{sec.title}</h2>
                <p>{sec.text}</p>
              </div>
            ))}

            {/* Why Choose Us — special card */}
            <div className="about-card">
              <div className="card-icon">🏆</div>
              <h2>Why Choose Us?</h2>
              <div className="why-grid">
                {whyUs.map((w) => (
                  <div className="why-item" key={w.label}>
                    <div className="why-dot" />
                    <p><strong>{w.label}:</strong> {w.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── Closing Banner ── */}
          <div className="about-closing">
            <h2>Experience the BrotherByte Difference</h2>
            <p>
              Whether you're craving a hot cup of tea, a refreshing summer drink,
              or a full-course meal — BrotherByte is here to serve you. Let us
              add flavor to your travel!
            </p>
          </div>

        </div>
      </div>
    </>
  )
}