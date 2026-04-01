import React, { useEffect } from 'react'
import Hero from '../../Components/Hero/Hero'
import Discount from '../../Components/Discount/Discount'
import WhyUs from '../../Components/WhyUs/WhyUs'
import OurClient from '../../Components/OurClient/OurClient'
import MenuHome from '../../Components/MenuHome/MenuHome'

export default function Home() {
        useEffect(() => {
          window.scrollTo(0, 0);
        }, []);
  return (
    <div>
      <Hero/>
      <div className="common_width">
        <Discount/>
        <WhyUs/>
        <MenuHome/>
        <OurClient />
      </div>
    </div>
  )
}
