import React, { useEffect, useState } from 'react'
import PageHero from '../../Components/PageHeros/PageHero'
import './Menu.css'
import ThaliMenuListHero from '../../assets/ThaliMenuListHero.png'
import CardSection from '../../Components/CardSection/CardSection'
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import { Button, FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import { LocationsData } from '../../../LocationsData'
import { useNavigate } from 'react-router-dom'


export default function Menu() {
    const PageHeroData = {
        title: 'Menu',
        img: ThaliMenuListHero
      }
      useEffect(() => {
        window.scrollTo(0, 0);
      }, []);

        const [showModal, setShowModal] = useState(true);
        const [selected, setSelected] = useState("");

        useEffect(() => {
          // Page load pe modal open
          setShowModal(true);
        }, []);
      
        const handleContinue = () => {
          if (selected) {
            setShowModal(false);
          }
        };
        const navigate = useNavigate();
    
  return (
    <>
        <div className="MenuMain">
          <PageHero PageHeroData={PageHeroData} />
            
              {showModal && (
                <div className='modal'>
                  <div className='modalContent'>
                    <Button variant="contained" size="small" className='CloseBtn' onClick={() => navigate('/')}>
                      <KeyboardArrowLeftIcon />
                    </Button>
                    <h3>Select City for <span>food Delivery</span></h3>

                    {/* <select
                      value={selected}
                      onChange={(e) => setSelected(e.target.value)}
                    >
                      <option value="">-- Select --</option>
                      <option value="1">Option 1</option>
                      <option value="2">Option 2</option>
                    </select> */}

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

                    <Button variant="contained"
                      onClick={handleContinue}
                      disabled={!selected}
                      style={{ marginTop: "10px" }}
                    >
                      Continue
                    </Button>
                  </div>
                </div>
              )}

              {!showModal && (
                <CardSection />
              )}

                
            
        </div>
    </>
  )
}
