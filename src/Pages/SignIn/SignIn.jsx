import React from 'react'
import './SignIn.css'
import { Button, Checkbox, FormControlLabel, TextField } from '@mui/material'
import BrotherByteLOGO from '../../assets/BrotherByteLOGO.png'
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import { NavLink, useNavigate } from 'react-router-dom';

export default function SignIn() {
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const handleMouseUpPassword = (event) => {
    event.preventDefault();
  };

  const navigate = useNavigate();


  return (
    <>
      <div className="SigninWrpr">
        <div className="signInForm">
          <Button variant="contained" size="small" className='SigninBackHomeBTN' onClick={() => navigate('/')}>
            <KeyboardArrowLeftIcon />
          </Button>
          <img src={BrotherByteLOGO} alt="Logo" />
          <h2>Sign In</h2>
          <TextField fullWidth id="outlined-basic" label="User Name" variant="outlined" />
          <TextField
            fullWidth
            label="Password"
            variant="outlined"
            type={showPassword ? 'text' : 'password'}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label={showPassword ? 'hide the password' : 'display the password'}
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    onMouseUp={handleMouseUpPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <FormControlLabel control={<Checkbox defaultChecked />} label="Remember me" />
          <Button fullWidth variant="contained">Sign In</Button>
          <NavLink className="sign-up-link" to="/sign-up">
            Don't have an account? <span>Sign Up</span>
          </NavLink>
        </div>
      </div>
    </>
  )
}
