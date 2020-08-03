import React from 'react'
import './Main.css'
import styled from 'styled-components';
import { Button, Grid } from '@material-ui/core';
import big from '../media/big.png';
import book from '../media/book.png';
import hairdres from '../media/hairdres.png';
import Toolbar from '../Toolbar/Toolbar.js';
import TextLoop from "react-text-loop";

const GreenButton = styled(Button)`
.MuiButton-label{
  font-family:'Nunito sans';
  color:#5AC490;
font-style: normal;
// font-weight: bold;
font-size: 30px;
line-height: 41px;
letter-spacing: -0.05em;
}
`
const WhiteButton = styled(Button)`

.MuiButton-label{
  font-family:'Nunito sans';
  color:#fff;
font-style: normal;
font-weight: bold;
font-size: 28px;
line-height: 41px;
letter-spacing: -0.05em;

}
`
const MainWrapper = styled.div`
  background-color:black!important;
  height: 100vh;
  flex-grow: 1;
  background-color: black;
  color: white;
padding :1%;

`
const BigFont = styled.div`
  font-family: Nunito Sans;
  font-style: normal;
  font-weight: bold;
  font-size: 40px;
  line-height: 95px;
  letter-spacing: -0.05em;
  color: #FFFFFF;
  margin: 1%;
  margin-left: 5%;

`
const SmallerFont = styled.div`
  font-family: Nunito Sans;
  font-style: normal;
  font-weight: bold;
  font-size: 26px;
  line-height: 35px;
  letter-spacing: -0.05em;
  color: white;
  margin: 1%;
  margin-left: 5%;
}

`
const main = (props) => {
  return (
    <MainWrapper>
      <Grid container container direction="row" alignItems="center" justify="space-between" spacing={5} >
        <Grid item xs={12}>
          <Toolbar />
        </Grid>
        <Grid item xs={12}>
          <Grid container container direction="row" alignItems="center" justify="space-between" spacing={5} >
            <Grid item xs={6}>
              <BigFont>Find Best Sevices Near You</BigFont>
              <SmallerFont> All of our services are done by licenced experts in their fields.</SmallerFont>
              <SmallerFont> Our services{" "}                 
              <TextLoop interval={350} >
                <span> Barbers </span>
                <span> Nail technicians </span>
                <span> Dentists </span>
                <span> Gyms </span>
                <span> Fitness Coaches </span>
              </TextLoop>{" "} And Much more .
              </SmallerFont>
            </Grid>
            <Grid item xs={6}>
              <img className="hairdres" src={hairdres} alt="hairdres" />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid container container direction="row" alignItems="baseline" justify="flex-start" spacing={5} >
            <Grid item xs={3}>
              <a href="http://localhost:3000/form"> <img className="big" src={big} alt="big" /> </a>
            </Grid>
            <Grid item xs={3}>
              <img src={book} alt="big" href="http://localhost:3000/form" />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </MainWrapper>
  )
}
export default main; 