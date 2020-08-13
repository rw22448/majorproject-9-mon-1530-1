import React from 'react'
import { Grid, Button } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import logo from '../media/logo.png';
import construction from '../media/undraw_under_construction_46pa-2 1.png';
import { withStyles } from "@material-ui/core/styles";
import styled from 'styled-components';



const CssTextFieldGreen = withStyles({
  root: {
    "& label.Mui-focused": {
      color: "green"
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "green"
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "green"
      },
      "&:hover fieldset": {
        borderColor: "light green"
      },
      "&.Mui-focused fieldset": {
        borderColor: "green"
      }
    }
  }
})(TextField);

const Heading = styled.div`
  font-family: Nunito Sans;
  font-style: normal;
  font-weight: bold;
  font-size: 20px;
  line-height: 34px;
  letter-spacing: -0.05em;
  color: #000000;
  margin: 10px;
`
const Bold = styled.div`
  font-family: 'Nunito Sans';
  font-style: normal;
  font-weight: 800;
  font-size: 35px;
  line-height: 48px;
  letter-spacing: -0.05em;
  color: #000000;
`
const TopRight = styled.div`
  font-family: 'Nunito Sans';
  font-style: normal;
  font-weight: 600;
  font-size: 20px;
  line-height: 27px;
  letter-spacing: -0.05em;
  position: absolute;
  top: 2%;
  right: 5%;
  padding-top: 2%;
`
const Right = styled.div`
  padding: 10px; 
  margin: 80px;
  flex-grow: 1;
  color : black;
  background-color: white;
`
const Construction = styled.img`
  width: 100%;
  height: auto;
  padding-top: 10%;
  background-repeat: no-repeat;
  background-size: contain;
`
const Left = styled.div`
  height:100vh;
  padding-top: 3%;
  /* flex-grow: 1 ; */
  background-color: black;
  color:white;
`

const Logo = styled.img`
  width: 50%;
  height: auto;
  background-repeat: no-repeat;
  background-size: contain;
  /* padding-left: 10%; */
`

const ColorButton = withStyles((theme) => ({
  root: {
    margin: '10px',
    color: theme.palette.getContrastText('#000000'),
    backgroundColor: '#5AC490',
    '&:hover': {
      backgroundColor: '#60BF90',
    },
  },
}))(Button);

const CssTextField = withStyles({
  root: {
    "& label.Mui-focused": {
      color: "green"
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "green"
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "red"
      },
      "&:hover fieldset": {
        borderColor: "light green"
      },
      "&.Mui-focused fieldset": {
        borderColor: "green"
      }
    }
  }
})(TextField);

// this is the signup page, 
// items are allocated evenly using a Grid function in material ui library 
// we use normal routing in order to move between pages 

const form = (props) => {
  return (
    <Grid container alignItems="center" justify="center" spacing={0}>
      <Grid item xs={7} >
        <Left>
          <Grid container direction="column" justify="center" alignItems="center">
            <Grid item xs={12}>
              <a href="http://localhost:3000/"> <Logo src={logo} alt="logo" /> </a>
              <Grid item xs={12}>
                <Construction src={construction} alt="contact" />
              </Grid>
            </Grid>
          </Grid>
        </Left>
      </Grid>

      <Grid item xs={5} >
        <Right>
          <TopRight>Already  a member? <a href="http://localhost:3000/login"> Log-in</a> </TopRight>
          <Grid container direction="row" container spacing={1}>
            <Grid item xs={12}>
              <Bold> Sign Up to Agem </Bold>
            </Grid>
            <Grid item xs={6}>
              <Heading>Full Name  </Heading>
              <CssTextFieldGreen id="outlined-full-width" style={{ margin: 8 }} helperText="Full width!" fullWidth margin="normal"
                InputLabelProps={{ shrink: true, }} variant="outlined" />
            </Grid>
            <Grid item xs={6}>
              <Heading>Username  </Heading>
              <CssTextFieldGreen id="outlined-full-width" style={{ margin: 8 }} helperText="Full width!" fullWidth margin="normal"
                InputLabelProps={{ shrink: true, }} variant="outlined" />
            </Grid>

            <Grid item xs={12}>
              <Heading>Full Address </Heading>
              <CssTextFieldGreen id="outlined-full-width" style={{ margin: 8 }} helperText="Full width!" fullWidth margin="normal"
                InputLabelProps={{ shrink: true, }} variant="outlined" />
            </Grid>

            <Grid item xs={12}>
              <Heading>Contact Number </Heading>
              <CssTextFieldGreen id="outlined-full-width" style={{ margin: 8 }} helperText="Full width!" fullWidth margin="normal"
                InputLabelProps={{ shrink: true, }} variant="outlined" />
            </Grid>

            <Grid item xs={12}>
              <Heading>Password</Heading>
              <CssTextField id="outlined-full-width" style={{ margin: 8 }} helperText="Full width!" fullWidth margin="normal"
                InputLabelProps={{ shrink: true, }} variant="outlined" />
            </Grid>
            <Grid item xs={12}>
              <ColorButton variant="contained" color="#ffffff" > Submit</ColorButton>
            </Grid>
          </Grid>
        </Right>
      </Grid>
    </Grid>
  )
}

export default form; 