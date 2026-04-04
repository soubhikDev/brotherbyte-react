import React, { useState } from 'react'
import './SignUp.css'
import { Button, Checkbox, FormControlLabel, TextField } from '@mui/material'
import BrotherByteLOGO from '../../assets/BrotherByteLOGO.png'
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import { NavLink, useNavigate } from 'react-router-dom';



export default function SignUp() {
  // Password visibility toggle **************************************************
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleClickShowPasswordConfirm = () => setShowPasswordConfirm((show) => !show);


  const navigate = useNavigate();

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

    const handleChange = (e) => {
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


  // password validation **************************************************

  const [form, setForm] = useState({
  password: "",
  confirmPassword: "",
});

const [errors, setErrors] = useState({});

const handleChangePass = (e) => {

  const { name, value } = e.target;
  setForm({ ...form, [name]: value });
};
const validate = () => {
  
  

  let tempErrors = {};

  // Password validation
  if (!form.password) {
    tempErrors.password = "Password is required";
  } else if (form.password.length < 6) {
    tempErrors.password = "Password must be at least 6 characters";
  }

  // Confirm Password validation
  if (!form.confirmPassword) {
    tempErrors.confirmPassword = "Confirm Password is required";
  } else if (form.password !== form.confirmPassword) {
    tempErrors.confirmPassword = "Passwords do not match";
  }
  
//   else if (!/(?=.*[A-Z])(?=.*[0-9]).{6,}/.test(form.password)) {
//   tempErrors.password = "Must include uppercase & number";
// }

  setErrors(tempErrors);

  return Object.keys(tempErrors).length === 0;
  
};
const handleSubmit = () => {
  if (validate()) {
    console.log("Form submitted", form);
  }
  
};

  return (
    <>
      <div className="SigninWrpr">
        <div className="signInForm">
          <Button variant="contained" size="small" className='SigninBackHomeBTN' onClick={() => navigate('/sign-in')}>
            <KeyboardArrowLeftIcon />
          </Button>
          <img src={BrotherByteLOGO} alt="Logo" />
          <h2>Sign Up</h2>
          <TextField fullWidth id="outlined-basic" label="User Name" type='text' variant="outlined" />
          <TextField fullWidth id="outlined-basic" label="Email" type='email' variant="outlined" />
          <TextField fullWidth id="outlined-basic" label="Number" variant="outlined" 
            value={value}
            onChange={handleChange}
            error={error}
            helperText={error ? "Enter valid 10-digit number" : ""}
          />
          <TextField
            fullWidth
            label="Password"
            name="password"
            value={form.password}
            onChange={handleChangePass}
            error={!!errors.password}
            helperText={errors.password}
            type={showPassword ? "text" : "password"}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleClickShowPassword} edge="end">
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <TextField
            fullWidth
            label="Confirm Password"
            name="confirmPassword"
            value={form.confirmPassword}
            onChange={handleChangePass}
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword}
            type={showPasswordConfirm ? "text" : "password"}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleClickShowPasswordConfirm} edge="end">
                    {showPasswordConfirm ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Button fullWidth variant="contained" onClick={handleSubmit}>
            Sign Up
          </Button>
        </div>
      </div>
    </>
  )
}
