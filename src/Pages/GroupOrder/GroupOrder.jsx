import React, { useState } from 'react'
import PageHero from '../../Components/PageHeros/PageHero'
import GroupOrderHero from '../../assets/GroupOrderHero.png'
import './GroupOrder.css'
import { useEffect } from 'react'
import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import { LocationsData } from '../../../LocationsData'

export default function GroupOrder() {
    const [selected, setSelected] = useState("");
    const PageHeroData = {
        title: 'Bulk Order',
        img: GroupOrderHero
      }
      useEffect(() => {
        window.scrollTo(0, 0);
      }, []);

        const [formData, setFormData] = useState({
          name: "",
          email: "",
          phone: "",
          product: "",
          Number_of_guests: "",
          message: "",
        });
    
        const handleChange = (e) => {
          setFormData({
            ...formData,
            [e.target.name]: e.target.value,
          });
        };
    
        const handleSubmit = (e) => {
          e.preventDefault();
          console.log("Form Submitted:", formData);
          alert("Bulk order request submitted!");
        };


        
          // Phone number state and validation **************************************************
        
          const [value, setValue] = useState("");
          const [error, setError] = useState(false);
        
            const formatPhone = (input) => {
            // Remove non-digits
            let digits = input.replace(/\D/g, "");
        
            // Limit to 10 digits
            digits = digits.slice(0, 10);
        
            // Format: (123) 456-7890
            if (digits.length <= 3) {
              return digits;
            } else if (digits.length <= 6) {
              return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
            } else {
              return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
            }
          };
        
            const handleChangeNumber = (e) => {
            let input = e.target.value.replace(/\D/g, "");
                
            const formatted = formatPhone(e.target.value);
            setValue(formatted);
        
            // Validation: must be exactly 10 digits
            const digits = formatted.replace(/\D/g, "");
            setError(digits.length !== 10);

              // ❗ First digit validation
            if (input.length > 0 && input[0] < 6) {
              setError(true);
            } else {
              setError(false);
            }
            setValue(formatPhone(input));
          };
        

  return (
    <>
        <div className="groupOrder">
            {/* <PageHero PageHeroData={PageHeroData} /> */}
            <div className="groupOrderSub">
                <div className="bulk-container">
                  <h2>Bulk Order Request</h2>

                  <form className="bulk-form" onSubmit={handleSubmit}>
                    <TextField
                      label="Your Name" 
                      variant="outlined" 
                      type="text"
                      name="name"
                      required
                      onChange={handleChange}
                    />

                    <TextField
                      label="Email Address" 
                      variant="outlined" 
                      type="email"
                      name="email"
                      required
                      onChange={handleChange}
                    />

                    <TextField
                      label="Number" 
                      variant="outlined" 
                      name="phone"
                      required
                      value={value}
                      error={error}
                      onChange={handleChangeNumber}
                      helperText={error ? "Enter valid 10-digit number" : ""}
                    />

                    <TextField
                      label="Number of Guests" 
                      variant="outlined" 
                      type="number"
                      name="Number_of_guests"
                      required
                      onChange={handleChange}
                    />

                    
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">Select Location</InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={selected}
                        label="Select Location"
                        onChange={(e) => setSelected(e.target.value)}
                      >
                       {LocationsData.map((item, index) => (
                        <MenuItem key={index} value={item.name}>
                          {item.name}
                        </MenuItem>
                       ))}
                      </Select>
                    </FormControl>

                    <TextField
                      name="message"
                      label="Additional Details"
                      multiline
                      rows={4}
                      onChange={handleChange}
                   />

                    <Button variant="contained"type="submit">Submit Order</Button>
                  </form>
                </div>
                <div className="bulkFoodTEXT">
                    <h1>Group Food Order in Traveling Request From</h1>
                    <p>Are you traveling with family, friends, or colleagues and looking for fresh, hygienic, and tasty meals in bulk for your group? Order group meals with BrotherByte! Simply fill out the Group Food Order Form to get discounts on bulk food orders in the Traveling. We’ll get back to you with special offers based on your requirements.</p>
                </div>
            </div>
        </div>
    </>
  )
}
