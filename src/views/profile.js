import React, { Fragment, useEffect, useState  } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Highlight } from "../components";
import { useAuth0 } from "@auth0/auth0-react";
import ReactCountryFlag from "react-country-flag";

export const Profile = () => {
	const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
	const geoip = user["https://example.com/geoip"];

	return (
    <Container className="mb-5">
      <h1>Profile</h1>
      <p>
        Demonstration for the use of ID Token to populate specific information of a
        logged-in user. <strong>This route should be private</strong>.
      </p>
	  <Row className="align-items-center profile-header mb-5 text-center text-md-left">
	  <Col md={2}>
		  <img
		  src={user.picture}
		  alt="Profile"
		  className="rounded-circle img-fluid profile-picture mb-3 mb-md-0"
		  />
	  </Col>
	  <Col>
		  <h2>{user.name}</h2>
		  <h3 className="lead text-muted">{user.email}</h3>
		  <h3 className="lead text-muted">{geoip.country_name}</h3>
		  <ReactCountryFlag countryCode={geoip.country_code} svg />
	  </Col>
	  </Row>
	  <Row>
		<Highlight>{JSON.stringify(user, null, 2)}</Highlight>
	  </Row>
    </Container>
  );
};

export default Profile;
