import React from 'react'
import './Discount.css'
import DiscountImg from '../../assets/DiscountImg.png'
import { Button, TextField } from '@mui/material'

export default function Discount() {
  return (
    <>
        <div className="DiscountMain">
            <div className="imageDiscountSection">
                <img src={DiscountImg} alt="" />
            </div>
            <div className="textDiscountSection">
                <h1>Latest Discount</h1>
                <h2>Please Enter Your E-Mail</h2>
                <div className="inputSection">
                    <TextField id="outlined-basic" label="Email" variant="outlined" />
                    <Button variant="contained">Submit</Button>
                </div>
            </div>
        </div>
    </>
  )
}
