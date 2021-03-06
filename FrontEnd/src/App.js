import React from 'react';
import './App.css';
import About from './Components/About/About';
import Form from './Components/Form/Form';
import Main from './Components/Main/Main';
import Login from './Components/Login/Login';
import Contact from './Components/Contact/Contact';
import User from './Components/Dashboard/User/User';
import Admin from './Components/Dashboard/Admin/Admin';

import { BrowserRouter as Router, Route } from 'react-router-dom';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import BrowserContext from './Contexts/BrowserContext';
import BookingContext from './Contexts/BookingContext';
import { ProtectedRoute } from './Components/Auth/ProtectedRoute.js';
import Unauthorized from './Components/Auth/Unauthorized';
import Authorized from './Components/Auth/Authorized';

const GlobalStyle = createGlobalStyle`
  body, html{
    font-family: Nunito Sans;
  }

  .menuIcon {
    margin: 20px 0px;
    transition: stroke ${(props) => props.theme.transition.short};

    &:hover {
      cursor: pointer;
      stroke: ${(props) => props.theme.colours.green.primary};
    }

    &:active {
      stroke: ${(props) => props.theme.colours.green.tertiary};
    }
  }

  .upcomingAppointmentsCardIcon {
    position: relative;
    right: 2px;
    top: 3px;
    margin-right: 4px;
  }
`;

const theme = {
  colours: {
    green: {
      primary: '#5ac490',
      secondary: '#369668',
      tertiary: '#1b4b34',
    },
    grey: {
      primary: '#707070',
    },
  },
  dashboard: {
    defaultWidth: '1304px',
  },
  transition: {
    short: '0.15s',
  },
  font: {
    primary: 'Nunito Sans',
  },
  fontWeight: {
    semiBold: '550',
  },
  shadow: {
    defaultBoxShadow: '0px 4px 8px rgba(0, 0, 0, 0.25)',
  },
  icons: {
    size: {
      small: '16px',
      medium: '40px',
    },
  },
};

function App() {
  console.log('Environment', process.env.REACT_APP_ENVIRONMENT);

  return (
    <>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <div className="App">
          <BrowserContext>
            <BookingContext>
              <Router>
                <Route exact path="/" component={Main} />
                <Route exact path="/form" component={Form} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/about" component={About} />
                <Route exact path="/contactus" component={Contact} />
                <Route exact path="/user" component={User} />
                <Route exact path="/admin" component={Admin} />
                <Route exact path="/unauthorized" component={Unauthorized} />
                <ProtectedRoute
                  exact
                  path="/authorized"
                  component={Authorized}
                />
              </Router>
            </BookingContext>
          </BrowserContext>
        </div>
      </ThemeProvider>
    </>
  );
}

export default App;
export { theme };
