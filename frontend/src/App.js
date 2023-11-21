// import { useEffect } from 'react';
import './App.css';
import { useLocalState } from './util/uselocalStorage';
import { Route, Routes } from 'react-router-dom';
import Dashboard from './Dashboard';
import HommePage from './Homepage';
import Login from './Login';
import PrivateRoute from './PrivateRoute';
import PortabilityView from './PortabilityView';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  // console.log("Dashboard Admin");
  const [jwt, setJwt] = useLocalState("", "jwt");
 
  //const [someValue, setSomeValue] = useState("");
  //const [jwt, setJwt] = useState("");

  //localStorage.getItem()
  //localStorage.setItem()

  //   useEffect(() => {
  //     if(!jwt) {
  //   const reqBody = {
  //     username: "lanwaros",
  //     password: "anouar",
  //   };

  //   fetch("api/log/login", {
  //     headers: {
  //        "Content-Type": "application/json",
  //     },
  //     method: "post",
  //     body: JSON.stringify(reqBody),
  //   })
  //     .then((response) => Promise.all([response.json(), response.headers])) 
  //     .then(([body, headers]) => { 
  //       setJwt(headers.get("authorization"));
  //      // const jwt = headers.get("authorization");
  //      // console.log(jwt);
  //      // console.log(body);
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching data:", error);
  //     });
  //   }
  // }, [jwt]);

  // useEffect(() => {
  //   console.log(`JWT is: ${jwt}`);
  // }, [jwt]);



  return (

        <Routes>
      <Route path="dashboard" element={
        <PrivateRoute>
          <Dashboard />
        </PrivateRoute>
      } />

      <Route
      path="portability/:id"
      element={<PrivateRoute>
        <PortabilityView/>
        </PrivateRoute>}
      />



      <Route path="login" element={<Login />} />
      <Route path="/" element={<HommePage />} />
      
      </Routes>

  );
}

export default App;
