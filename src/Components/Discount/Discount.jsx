import React from 'react'
import './Discount.css'
import DiscountImg from '../../assets/DiscountImg.png'
import { Button, TextField } from '@mui/material'

export default function Discount() {
    const Coupon = [
        {
            name: 'FIRSTBITE',
            discount: '200',
            orderAmount: '2999'
        },
        {
            name: 'BRO5',
            discount: '400',
            orderAmount: '3999'
        },
        {
            name: 'BRO10',
            discount: '500',
            orderAmount: '4999'
        },
    ]
  return (
    <>
        <div className="DiscountMain">
            <div className="imageDiscountSection">
                <img src={DiscountImg} alt="" />
            </div>
            <div className="textDiscountSection">
                <h1>Latest Discount</h1>
                {/* <h2>Please Enter Your E-Mail</h2>
                <div className="inputSection">
                    <TextField id="outlined-basic" label="Email" variant="outlined" />
                    <Button variant="contained">Submit</Button>
                </div> */}
                <div className="coponesWrpr">
                    {Coupon.map((item, index) => (
                        <div className="couponsMapWrpr">
                            <h1>OFF</h1>
                            <div className="couponsSubWrpr">
                                <h2>Flat Rs - {item.discount}</h2>
                                <h3>Code - {item.name}</h3>
                                <h4>on order above {item.orderAmount}</h4>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </>
  )
}
