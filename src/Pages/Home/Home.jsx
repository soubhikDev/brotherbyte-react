import React from 'react'
import Hero from '../../Components/Hero/Hero'
import Discount from '../../Components/Discount/Discount'
import WhyUs from '../../Components/WhyUs/WhyUs'
import CardSection from '../../Components/CardSection/CardSection'
import OurClient from '../../Components/OurClient/OurClient'

export default function Home() {
  return (
    <div>
      <Hero/>
      <div className="common_width">
        <Discount/>
        <WhyUs/>
        <CardSection/>
        <OurClient />
      </div>
    </div>
  )
}
