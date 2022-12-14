import React, { useContext, useEffect, useRef } from "react";
import { AppContext } from "./AppContext";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Offcanvas from "react-bootstrap/Offcanvas";
import "bootstrap/dist/css/bootstrap.min.css";
import Styled from "styled-components";
import Cookies from "js-cookie";
import { ButtonGroup } from "react-bootstrap";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  useNavigate,
} from "react-router-dom";
import Logo from "../images/banner-logo.png";

const NavBarHeader = Styled.div`
display: flex;
justify-content: right;
align-items: center;
height: 8vh;
padding-right: 0.5vw;
background-color: #adabbb;
`;

const BannerImage = Styled.img`
height: 30vh;
display: block;
margin-left: auto;
`;

const LogoImage = Styled.img`
height: 7vh;
display: block;
margin-left: auto;
`;

const Sticky = Styled.div`
 position: sticky; top:0px;

`;

const SignedInAs = Styled.label`
color: white;
font-weight: 100;
font-style: italic;
`;

export const MissionNavBar = () => {
  const navigate = useNavigate();

  const {
    individualMissionDetails,
    setIndividualMissionDetails,
    missionsArray,
    setMissionsArray,
    usersArray,
    setUsersArray,
    searchResultsArray,
    setSearchResultsArray,
    searchBarText,
    setSearchBarText,
    userCredentials,
    isLoggedIn,
    setIsLoggedIn,
    setIsLoggedOut,
  } = useContext(AppContext);

  const logout = () => {
    Cookies.remove("userCredentials");
    Cookies.remove("isLoggedIn");
    setIsLoggedIn(false);
    navigate("/");
  };

  return (
    <>
      <NavBarHeader>
        <Link to="/">
          <BannerImage src={Logo} alt="Whoops" />
        </Link>
      </NavBarHeader>
      {!isLoggedIn ? (
        <></>
      ) : (
        [false].map((expand) => (
          <Navbar
            // collapseOnSelect expand="false"
            key={expand}
            style={{
              backgroundColor: "#514F5A",
              display: "flex",
              flexDirection: "row",
            }}
            collapseOnSelect
            expand="false"
            className="mb-3"
          >
            <Container fluid>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                }}
              >
                <Form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setSearchBarText(e.target.value);
                    console.log(searchBarText);
                    setSearchResultsArray(
                      missionsArray.filter((mission) =>
                        mission.msn_title.toLowerCase().includes(searchBarText)
                      )
                    );
                    console.log("missions Arrays: ", missionsArray);
                    console.log(
                      missionsArray.filter((mission) =>
                        mission.msn_title.toLowerCase().includes(searchBarText)
                      )
                    );
                    console.log("clicked submit!");

                    navigate("/searchresults");
                    setSearchBarText("");
                  }}
                  style={{
                    display: "flex",
                    flexDirection: "row",
                  }}
                >
                  <Form.Control
                    style={{ width: "22vw" }}
                    value={searchBarText}
                    onChange={(e) => {
                      setSearchBarText(e.target.value);
                      // console.log(e.target.value);
                      // console.log(searchBarText)
                    }}
                    type="search"
                    placeholder="Search for an existing mission"
                    className="me-2"
                    aria-label="Search"
                    onSubmit={(e) => {
                      e.preventDefault();
                      console.log("form submitted");
                    }}
                  />

                  <Button
                    variant="outline-success"
                    type="submit"
                    style={{
                      backgroundColor: "rgb(90 74 227)",
                      color: "black",
                      borderColor: "rgb(90 74 227)",
                    }}
                  >
                    Search
                  </Button>
                </Form>
              </div>
              <div>
                <SignedInAs>
                  Signed in as: {userCredentials.username}
                </SignedInAs>
                <Navbar.Brand href="#"></Navbar.Brand>
                <Navbar.Toggle
                  style={{ backgroundColor: "rgb(90 74 227)" }}
                  aria-controls={`offcanvasNavbar-expand-${expand}`}
                />
                <Navbar.Offcanvas
                  id={`offcanvasNavbar-expand-${expand}`}
                  aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
                  placement="end"
                >
                  <Offcanvas.Header closeButton>
                    <Offcanvas.Title
                      id={`offcanvasNavbarLabel-expand-${expand}`}
                    >
                      Online Mission Planning Environment
                    </Offcanvas.Title>
                  </Offcanvas.Header>
                  <Offcanvas.Body>
                    <Nav className="justify-content-end flex-grow-1 pe-3">
                      <Nav.Link as={Link} to="userpage" eventKey="1">
                        Dashboard
                      </Nav.Link>
                      <NavDropdown
                        title="Missions"
                        id={`offcanvasNavbarDropdown-expand-${expand}`}
                      >
                        <NavDropdown.Item>
                          <Nav.Link
                            as={Link}
                            to="/searchresults"
                            eventKey="1"
                            onClick={() => {
                              setSearchResultsArray(
                                missionsArray.filter(
                                  (msn) => msn.msn_type === 1
                                )
                              );
                              navigate("/searchresults");
                            }}
                          >
                            Security Forces
                          </Nav.Link>
                        </NavDropdown.Item>
                        <NavDropdown.Item>
                          <Nav.Link
                            as={Link}
                            to="/searchresults"
                            eventKey="2"
                            onClick={() => {
                              console.log(
                                missionsArray.filter((msn) => msn.msn_id === 2)
                              );
                              setSearchResultsArray(
                                missionsArray.filter(
                                  (msn) => msn.msn_type === 2
                                )
                              );
                              navigate("/searchresults");
                            }}
                          >
                            Anti-Submarine Warfare
                          </Nav.Link>
                        </NavDropdown.Item>
                        <NavDropdown.Item>
                          <Nav.Link
                            as={Link}
                            to="/searchresults"
                            eventKey="3"
                            onClick={() => {
                              console.log(
                                missionsArray.filter((msn) => msn.msn_id === 3)
                              );
                              setSearchResultsArray(
                                missionsArray.filter(
                                  (msn) => msn.msn_type === 3
                                )
                              );
                              navigate("/searchresults");
                            }}
                          >
                            Close Air Support
                          </Nav.Link>
                        </NavDropdown.Item>
                      </NavDropdown>
                      <Nav.Link as={Link} to="help" eventKey="2">
                        Help
                      </Nav.Link>
                      <Nav.Link as={Link} to="about" eventKey="3">
                        About
                      </Nav.Link>
                      <Nav.Link
                        as={Link}
                        to="userpage"
                        eventKey="4"
                        onClick={() => {
                          setIsLoggedOut(true);
                          logout();
                        }}
                      >
                        Log Out
                      </Nav.Link>
                    </Nav>
                    <Form className="d-flex"></Form>
                  </Offcanvas.Body>
                </Navbar.Offcanvas>
              </div>
            </Container>
          </Navbar>
        ))
      )}
    </>
  );
};
