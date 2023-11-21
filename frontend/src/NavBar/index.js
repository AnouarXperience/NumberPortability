import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { useLocalState } from '../util/uselocalStorage';
import { useEffect, useState } from 'react';
// import { filterPortabilityByDateRange } from '../util/portabilityDate';
import ajax from '../Services/fetchService';
import './NavbarStyles.css';



function OffcanvasExample({  startDate,
  endDate,
  handleStartDateChange,
  handleEndDateChange,
  handleSearchDates,}) {
  const [jwt, setJwt] = useLocalState("", "jwt");
  const [portability, setProtability] = useState(null);
  
 
  useEffect(() => {
    ajax("api/portability", "GET", jwt)   
            .then((portabilityData) => {
            setProtability(portabilityData);
        });
    }, [jwt]);

    
  function handleLogout() {
    // Clear JWT from local storage and redirect to login page
    setJwt(null);
    window.location.href = "/login";
}

  return (
    <>
      {["sm"].map((expand) => (
        <Navbar key={expand} expand={expand} className="bg-body-secondary mb-3">
          <Container fluid>
            <Navbar.Brand href="/" className="navbar-brand">Portability App</Navbar.Brand>
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              placement="end"
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                  Portability App
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className="justify-content-end flex-grow-1 pe-3 mt-2">
                  <Nav.Link href="/"><b>Home</b></Nav.Link>
                  <Nav.Link href="/dashboard" target="_self"><b>Analysis</b></Nav.Link>                
                  </Nav>
                {/* Date Range Inputs */}
                <Form className="d-flex ">
                <Form.Control
                    type="date"
                    placeholder="Start Date"
                    className="me-2"
                    value={startDate}
                    onChange={handleStartDateChange}
                  />
                  <Form.Control
                    type="date"
                    placeholder="End Date"
                    className="me-2"
                    value={endDate}
                    onChange={handleEndDateChange}
                  />
                  <Button variant="outline-primary" onClick={handleSearchDates}>
                    Search Dates
                  </Button>
                </Form>
                <Form className="d-flex mx-2">
                  <Button variant="outline-danger" onClick={handleLogout}>logout</Button>
                </Form>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      ))}
    </>
  );
}

export default OffcanvasExample;