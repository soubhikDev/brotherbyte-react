import React, { useEffect } from 'react'
import PageHero from '../../Components/PageHeros/PageHero'
import ContactHero from '../../assets/ContactHero.png'
import LakhnoiBiriyani from '../../assets/LakhnoiBiriyani.jpg'
import ContactBlock1 from '../../assets/ContactBlock1.png'
import './Contact.css'




const WebIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <line x1="2" y1="12" x2="22" y2="12" />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>
)
 
const PhoneIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.18h3a2 2 0 0 1 2 1.72c.13.97.36 1.92.7 2.84a2 2 0 0 1-.45 2.11L7.91 8.91a16 16 0 0 0 6.29 6.29l.96-.96a2 2 0 0 1 2.11-.45c.92.34 1.87.57 2.84.7A2 2 0 0 1 22 16.92z" />
  </svg>
)
 
const MailIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
)
 
const rows = [
  {
    label: 'Website',
    value: 'www.brotherbyte.com',
    href: 'https://www.brotherbyte.com',
    icon: <WebIcon />,
  },
  {
    label: 'Phone',
    value: '+91-97798-89516',
    href: 'tel:+919779889516',
    icon: <PhoneIcon />,
  },
  {
    label: 'Email',
    value: 'contact@brotherbyte.com',
    href: 'mailto:contact@brotherbyte.com',
    icon: <MailIcon />,
  },
]



export default function Contact() {
        useEffect(() => {
          window.scrollTo(0, 0);
        }, []);
  return (
    <>
        <div className="ContactMain">
          <PageHero PageHeroData={{title: 'Contact Us', img: ContactHero}} />
          <div className="common_width">
            <div className="contactSub">
              <h2>Get in <span>Touch</span></h2>
              <p>We'd love to hear from you! Whether you have a question about our menu, want to provide feedback, or just want to say hello, feel free to reach out to us.</p>
              <div className="ContactWrpr">
                <div className="ContactImG">
                  <img src={ContactBlock1} alt="Contact Us" />
                </div>
                <div className="ContactItem">
      <div className="ContactItem-header">
        <div className="ContactItem-icon-wrap">
          <PhoneIcon />
        </div>
        <h3>Contact Information</h3>
      </div>
 
      <div className="ContactItem-rows">
        {rows.map((row) => (
          <div className="ContactItem-row" key={row.label}>
            <div className="ContactItem-row-icon">
              {row.icon}
            </div>
            <div className="ContactItem-row-content">
              <span className="ContactItem-row-label">{row.label}</span>
              <a
                className="ContactItem-row-value is-link"
                href={row.href}
                target={row.label === 'Website' ? '_blank' : undefined}
                rel="noreferrer"
              >
                {row.value}
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
              </div>
            </div>
          </div>
        </div>
    </>
  )
}
