import React, { Fragment, useEffect, useState  } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Alert } from "react-bootstrap";
import { Hero, Content } from "../components";
import * as qs from 'query-string';


const Home = () => {
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
  const [userMetadata, setUserMetadata] = useState(null);
  const parsed = qs.parse(window.location.search);

  const audience = process.env.REACT_APP_AUDIENCE;
  const domain = process.env.REACT_APP_AUTH0_DOMAIN;
  

  useEffect(() => {
    const updateUserMetadata = async () => {
      try {
        const userDetailsByIdUrl = `https://${domain}/api/v2/users/${user.sub}`;

        const accessToken = await getAccessTokenSilently({
          audience: `${audience}`,
          scope: "read:current_user",
        });
        const updateMetadataResponse = await fetch(userDetailsByIdUrl, {
					method: 'PATCH',
          headers: {
            Authorization: `Bearer ${accessToken}`,
						'content-type': 'application/json'
          },
					body: JSON.stringify({
						user_metadata: {profile_picture: user.picture}
					}),
        });
        const { user_metadata } = await updateMetadataResponse.json();
        setUserMetadata(user_metadata);
      } catch (e) {
        console.log(e.message);
      }
    };
    if(isAuthenticated){
      updateUserMetadata();
    }
  }, []);

  return (
  <Fragment>
    {parsed.error && parsed.error !== ""  && <Alert variant={"danger"}>
      {parsed.error_description}
    </Alert>}
    { isAuthenticated && (
        <div>
          <div>
            {userMetadata && <img src={userMetadata.profile_picture} alt={user.name} />}
          </div>
          <h3>User Metadata</h3>
          {userMetadata ? (
            <pre>{JSON.stringify(userMetadata, null, 2)}</pre>
          ) : (
            "No user metadata defined"
          )}
        </div>
      )
          }
    <Hero />
    <hr />
    <Content />
  </Fragment>
)};

export default Home;
