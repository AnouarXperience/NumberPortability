import React, { useEffect, useState } from 'react';
import { useLocalState } from '../util/uselocalStorage';
// import { Link } from 'react-router-dom';
import ajax from '../Services/fetchService';
import { Button, Container, Card, Form } from 'react-bootstrap';
import OffcanvasExample from '../NavBar';
import StatusBadge from '../StatusBadge';
import { filterPortabilityByDateRange } from '../util/portabilityDate';




const Dashboard = () => {
    const [jwt, setJwt] = useLocalState("", "jwt");
    const [portability, setProtability] = useState(null);
    const [originalPortability, setOriginalPortability] = useState(null);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

useEffect(() => {
    ajax("api/portability", "GET", jwt)   
            .then((portabilityData) => {
            setProtability(portabilityData);
            setOriginalPortability(portabilityData); // Store the original data
        });
    }, [jwt]);
 

    function createportability() {
        ajax("api/portability", "POST", jwt)
            .then((portability) => {
            window.location.href = `/portability/${portability.id}`;
          
        });
    }
    const handleStartDateChange = (event) => {
      setStartDate(event.target.value);
    };
  
    const handleEndDateChange = (event) => {
      setEndDate(event.target.value);
    };
  
    const handleSearchDates = () => {
      if (originalPortability) {
        const filteredData = filterPortabilityByDateRange(
          originalPortability,
          new Date(startDate),
          new Date(endDate)
        );
        setProtability(filteredData);
      }
    };

    return (
      <>
      <OffcanvasExample
      startDate={startDate}
      endDate={endDate}
      handleStartDateChange={handleStartDateChange}
      handleEndDateChange={handleEndDateChange}
      handleSearchDates={handleSearchDates} />
        <Container className="mt-5">
        {/* <Form className="d-flex mb-3">
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
        </Form>          */}
      <h3>Dashboard Admin</h3>
      <div  style={{ margin: "2em"}}>
      <div className='mb-5 text-right'>
      <Button id="portability" onClick={() => createportability()} variant="primary">
            Submit New Portability
          </Button>
          </div>
      <Card className="mt-3">
        <Card.Body>
          {portability ? (
            <div
            className="d-grid gap-5"
            style={{ gridTemplateColumns: "repeat(auto-fit, 18rem)" }}
          >
            {portability.map((portability) => (
              // <div key={portability.id} className="mb-2">
              //   {/* <Link to={`/portability/${portability.id}`}>
              //     Portability : {portability.id}
              //   </Link> */}
                <Card 
                key={portability.id}
                style={{ width: '18rem' }}>
                <Card.Body className="d-flex flex-column justify-content-around">
                <Card.Title>Portability #{portability.id}</Card.Title>
                <Card.Subtitle className="mb-2 mt-1 text-muted"><StatusBadge  text={portability.status} /></Card.Subtitle>
                <Card.Text style={{marginTop: "1em"}}>
                <p><b>MSISDN : </b>{portability.msisdn}</p>
                <p><b>Portage Date : </b> {portability.pdate.substring(0, 10)}</p> {/* Or split("T")[0] */}
                </Card.Text>
                <Button variant="secondary" onClick={() =>{ window.location.href = `/portability/${portability.id}`;}}>Consult</Button>
                </Card.Body>
                </Card>               
            ))}
            </div>
          ) : (
            <p>No portability data available.</p>
          )}
          
        </Card.Body>
      </Card>
      </div>
    </Container>
    </>        

        // <div>
        // <h3>Dashboard Admin</h3>
        // <div style={{marginTop: "2em"}}> 
        // {portability ? portability.map((portability) => <div key={portability.id}><Link to={`/portability/${portability.id}`}>Portability ID : {portability.id}</Link></div>) : <></>}
        // <button id='Protability' onClick={() => createportability() }>Submit Portability</button></div> 
        // </div> 
            
    );
};

export default Dashboard;