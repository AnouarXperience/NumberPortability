import React, { useEffect, useRef, useState } from 'react';
import { useLocalState } from '../util/uselocalStorage';
import ajax from '../Services/fetchService';
import { Alert, Badge, Button, ButtonGroup, Col, Container, Dropdown, DropdownButton, Form, Row } from 'react-bootstrap';
import OffcanvasExample from '../NavBar';
import StatusBadge from '../StatusBadge';



const PortabilityView = () => {
    const portabilityId = window.location.href.split("/portability/")[1];
    const [portability, setPortability] = useState({

        msisdn: "",  // Initialize with empty string or some default value
        cdate: "", 
        pdate: "", 
        ccode: "",
        status: null,
        number: null,

    });
    const [jwt, setJwt] = useLocalState("", "jwt");
    const [portabilityEnums, setPortabilityEnums] = useState([]);
    const [portabilityStatuses, setPortabilityStatuses] = useState([]);
    const [alertMessage, setAlertMessage] = useState("");;
    const [alertVariant, setAlertVariant] = useState("");
    const [showAlert, setShowAlert] = useState(false);
    const prevPortabilityValue = useRef(portability);
    

    const isWithin24Hours = (date) => {
      const now = new Date();
      const diff = now - new Date(date);
      return diff < 24 * 60 * 60 * 1000; // Check if the difference is less than 24 hours
    };
  
    const handleCancel = () => {
      if (isWithin24Hours(portability.cdate)) {
        updatePortability("status", portabilityStatuses[4].status); // Change to "CANCELED"
        persist();
        setAlertMessage("Portability Canceled :("); // Update the alert message
        setAlertVariant("danger"); // Set the variant to success
        setShowAlert(true);
        setTimeout(() => {
          setShowAlert(false);
        }, 3000);
      } else {
        // Show an error message or perform some action to indicate the button can't be clicked
      }
    };

    //Take new current date with format {yyyy/mm/dd}
    const currentDate = new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });

    const comp = (pdate, cdate) => {
      const now = new Date();
      const pdateFormatted = new Date(pdate).toLocaleDateString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
      });
    
      // Check if at least 7 days have passed from the current date or if it's the day of pdate
      return (now - new Date(cdate)) >= 7 * 24 * 60 * 60 * 1000 || currentDate === pdateFormatted;
    };

    const handleComplete = () => {
    
      if (comp(portability.pdate)) {
        updatePortability("status", portabilityStatuses[5].status); // Change to "COMPLETED"
        persist();
        setAlertMessage("Portability Completed successfully"); // Update the alert message
        setAlertVariant("success"); // Set the variant to success
        setShowAlert(true);
        setTimeout(() => {
          setShowAlert(false);
        }, 3000);
      } else {
        console.log("pdate is less than the current date");
        // Show an error message or perform some action to indicate the button can't be clicked
      }
    };
    

    const handleReview = () => {
      if (portability.status === portabilityStatuses[1].status) {
        // Change to "IN_REVIEW" after 3 seconds
        setTimeout(() => {
          updatePortability("status", portabilityStatuses[2].status); // Change to "IN_REVIEW"
          setAlertMessage("Portability In Review!");
          setAlertVariant("info");
          setShowAlert(true);
          setTimeout(() => {
          setShowAlert(false);
            // Adding navigation logic here
            window.location.href = '/dashboard';
          }, 3000);
        }, 3000);
      } else {
        // Show an error message or perform some action to indicate the button can't be clicked
      }
    };

      function formatDateForCDate(date) {
        if (!date) return ''; // Handle null or empty value
      
        const localDate = new Date(date); // Convert UTC date string to local date object
      
        const year = localDate.getFullYear();
        const month = String(localDate.getMonth() + 1).padStart(2, '0'); // Adding 1 because months are 0-based
        const day = String(localDate.getDate()).padStart(2, '0');
        const hours = String(localDate.getHours()).padStart(2, '0');
        const minutes = String(localDate.getMinutes()).padStart(2, '0');
      
        const formattedDateTime = `${year}-${month}-${day}T${hours}:${minutes}`;
        return formattedDateTime;
      }

      
      
      function formatDateForInput(date) {
        if (!date) return ''; // Return empty string for undefined/null values
      
        const dateObject = new Date(date);
        const year = dateObject.getFullYear();
        const month = String(dateObject.getMonth() + 1).padStart(2, '0'); // Adding 1 because months are 0-based
        const day = String(dateObject.getDate()).padStart(2, '0');
      
        const formattedDate = `${year}-${month}-${day}`;
        return formattedDate;
      }
      


// Console log : Saving portability + Response Status + Update portability data (Function Save that puted in comment)
function updatePortability(prop, value) {
    setPortability((prevPortability) => ({
        ...prevPortability,
        [prop]: value, // Directly update the state with the input value
    }));
}



 




    function save(){
      // this implies that the customer is submitting the portability in the frist time
      if (portability.status === portabilityStatuses[0].status){
        updatePortability("status", portabilityStatuses[1].status);
        setAlertMessage("Portability submitted successfully!");
        setAlertVariant("success"); 
        setShowAlert(true);
        setTimeout(() => {
            setShowAlert(false); // Hide the alert after a few seconds
        }, 3000); // Adjust the time as needed
      }else if (portability.status === portabilityStatuses[1].status) {
        // Change to "IN_REVIEW" after 3 seconds
        setTimeout(() => {
          updatePortability("status", portabilityStatuses[2].status); // Change to "IN_REVIEW"
          setAlertMessage("Portability In Review!");
          setAlertVariant("info"); 
          setShowAlert(true);
          setTimeout(() => {
            setShowAlert(false);
          }, 3000);
        }, 3000);
        }else {
          // Calculate the time difference between PDate and CDate
          const compNeed = (pdate, cdate) => {
            const now = new Date();
            const pdateFormatted = new Date(pdate).toLocaleDateString('en-US', {
              year: 'numeric',
              month: '2-digit',
              day: '2-digit'
            });
          
            // Check if at least 7 days have passed from the current date or if it's the day of pdate
            return (now - new Date(cdate)) >= 7 * 24 * 60 * 60 * 1000 || currentDate >= pdateFormatted;
          };
          
          if (compNeed(portability.pdate)) {
            // Change to "Needs Update"
            updatePortability("status", portabilityStatuses[3].status);
          } 
          persist();
          setAlertMessage("Portability Needs Update!");
          setAlertVariant("warning"); 
          setShowAlert(true);
          setTimeout(() => {
            setShowAlert(false);
          }, 3000);
        }
    }

    function persist() {
      ajax(`/api/portability/${portabilityId}`,"PUT", jwt, portability)
        .then((portabilityData) => {
                console.log("Save portability data:", portabilityData);
                setPortability(portabilityData);   
                });
    }

    useEffect(() => {
      if (prevPortabilityValue.current.status !== portability.status) { 
        persist();
      }
      prevPortabilityValue.current = portability;

    },[portability]);
    



    useEffect(() =>{
        ajax(`/api/portability/${portabilityId}`,"GET", jwt)
            .then((portabilityResponse) => {
              let portabilityData  = portabilityResponse.portability;
              if (portabilityData.msisdn === null) portabilityData.msisdn = "";
              if (portabilityData.cdate === null) portabilityData.cdate = "";
              if (portabilityData.pdate === null) portabilityData.pdate = "";
              if (portabilityData.ccode === null) portabilityData.ccode = "";
                setPortability(portabilityData);
                if (portabilityResponse.portabilityEnums) {
                  setPortabilityEnums(portabilityResponse.portabilityEnums);
                }
                setPortabilityStatuses(portabilityResponse.statusEnums);
            });
    }, []);



  //   useEffect(() =>{
  //     ajax(`/api/portability/${portabilityId}`,"GET", jwt)
  //         .then((portabilityData) => {
  //             setPortability(portabilityData);
  //         });
  // }, []);


    // const navigateToPortability = (portabilityId) => {
    //   window.location.href = `/portability/${portabilityId}`;
    // };

     return (
      <>
      <OffcanvasExample />
        <Container className="mt-5">
          {/* <Row>
            <Col>
              <h1 className="mb-4">Portability {portabilityId}</h1>  
            </Col>
            <Col>                  
                  <Badge pill bg="info" style={{fontSize:"1em"}}>{portability.status}</Badge>
                </Col>
          </Row> */}
           <Row className="d-flex align-items-center">
          <Col>
            {portability && portability.number && portabilityEnums.length > 0 ? (
              <>
                <h1>Poratbility {portability.number}</h1>
                <h4>{portabilityEnums[portability.number - 1].portabilityName}</h4>
              </>
            ) : (
              <></>
            )}
          </Col>
          <Col>{portability ? <StatusBadge text={portability.status} /> : <></>}</Col>
        </Row>
          {/* <Row>
          <Col>
            <DropdownButton id="dropdown-basic-button" title="Select Portability">
                <Dropdown.Item
                  onClick={() => navigateToPortability(portability.id)}>
                  {`Portability : ${portability.id}`}
                </Dropdown.Item>
            </DropdownButton>
          </Col>
        </Row> */}
        {portability ? (
          <>
           <Form.Group as={Row} className="my-3" controlId="portabilityName">
              <Form.Label column sm="3" md="2">
                Portability Number:
              </Form.Label>
              <Col sm="9" md="8" lg="6">
                <DropdownButton
                  as={ButtonGroup}
                  variant={"info"}
                  title={
                    portability.number
                      ? `Poratbility ${portability.number}`
                      : "Select an Portability"
                  }
                  onSelect={(selectedElement) => {
                    updatePortability("number", selectedElement);
                  }}
                >
                  {portabilityEnums.map((portabilityEnum) => (
                    <Dropdown.Item
                      key={portabilityEnum.portabilityNum}
                      eventKey={portabilityEnum.portabilityNum}
                    >
                      {portabilityEnum.portabilityNum}
                    </Dropdown.Item>
                  ))}
                </DropdownButton>
              </Col>
            </Form.Group>
          <Form>
            <Form.Group controlId="msisdn">
              <Form.Label className="mb-2">msisdn:</Form.Label>
              <Form.Control
                type="tel"
                placeholder="99417296"
                pattern="[0-9]{8}"
                required
                value={portability.msisdn}
                onChange={(e) => updatePortability("msisdn", Number(e.target.value))}
              />
            </Form.Group>
            <Form.Group controlId="cdate">
              <Form.Label className="mb-2 mt-2">Creation Date:</Form.Label>
              <Form.Control
                type="datetime-local"
                value={formatDateForCDate(portability.cdate)}
                onChange={(e) => updatePortability("cdate", e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="pdate">
              <Form.Label className="mb-2 mt-2">Portage Date:</Form.Label>
              <Form.Control
                type="date"
                value={formatDateForInput(portability.pdate)}
                onChange={(e) => updatePortability("pdate", e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="ccode">
              <Form.Label className="mb-2 mt-2">Contract Code:</Form.Label>
              <Form.Control
                type="text"
                value={portability.ccode}
                readOnly
              />
            </Form.Group>
            <Row className="align-items-center mb-5">
              <Col>
                <Button variant="primary" type="button" onClick={() => save()} style={{ marginTop: "2em" }}>
                  Submit Portability
                </Button>
                <div style={{ position: "fixed", width:"480px", top: "24%", left: "55%", transform: "translateX(-50%)" }}>
    {showAlert && (
        <Alert
            variant={alertVariant}
            onClose={() => setShowAlert(false)}
            dismissible
        >
             {alertMessage}
        </Alert>
    )}
</div>
              </Col>
          <Col className="text-end">
          <Button variant="secondary" onClick={() => {if (portability.status !== portabilityStatuses[2].status) {handleReview();} else {  window.location.href = '/dashboard'; }}} style={{ marginTop: "2em", marginRight:"1em" }}>
              Back to Dashboard
            </Button>  
          <Button
            variant="success"
            onClick={handleComplete}
            disabled={!comp(portability.pdate,portability.cdate)} 
  style={{ marginTop: "2em", marginRight:"1em"}}
          >Complete</Button>
          <Button variant="danger" onClick={handleCancel} disabled={!isWithin24Hours(portability.cdate)}  style={{ marginTop: "2em" }}>
            Cancel
          </Button>          
          </Col>
            </Row>
          </Form>
          </>
        ) : null}
      </Container>
      </>      
     );
};

export default PortabilityView;