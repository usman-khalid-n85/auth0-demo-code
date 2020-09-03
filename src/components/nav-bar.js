import React, { useReducer } from "react";
import { NavLink as RouterNavLink } from "react-router-dom";
import { Container, Row, Col, Nav, Navbar, Image} from "react-bootstrap";
import { useAuth0 } from "@auth0/auth0-react";
import LogoutButton from "./logout-button";
import LoginButton from "./login-button";
import ReactCountryFlag from "react-country-flag";
const MainNav = () => (
  <Nav className="mr-auto">
    <Nav.Link
      as={RouterNavLink}
      to="/"
      exact
      activeClassName="router-link-exact-active"
    >
      Home
    </Nav.Link>
    <Nav.Link
      as={RouterNavLink}
      to="/profile"
      exact
      activeClassName="router-link-exact-active"
    >
      Profile
    </Nav.Link>
  </Nav>
);

const AuthNav = () => {
	const { user, isAuthenticated } = useAuth0();
	return(
	<Nav className="justify-content-end">
    <Row>
      <Col md={4}>{isAuthenticated && 
        <Image src={user.picture} alt={user.name} className={"nav-profile-picture"} roundedCircle />}
      </Col>
      <Col md={4}>{isAuthenticated && 
        <ReactCountryFlag className={"nav-flag"} countryCode={user["https://example.com/geoip"].country_code} svg  style={{
              fontSize: '45px',
              lineHeight: '2em',
          }}/>}
      </Col>
      <Col md={4}>
        {isAuthenticated ? <LogoutButton /> : <LoginButton />}
      </Col>
    </Row>
	</Nav>
	)
};

const NavBar = () => {
  return (
    <Navbar bg="light" expand="md">
      <Container>
        <Navbar.Brand as={RouterNavLink} className="logo" to="/" />
        <MainNav />
        <AuthNav />
      </Container>
    </Navbar>
  );
};

export default NavBar;
