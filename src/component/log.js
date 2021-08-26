import React , {useState} from "react";
import Bg from "../Assets/Bg";
import Navbar from "./navbar";

function Log() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [contact, setContact] = useState("");
    const [password, setPassword] = useState("");

    function login() {
        
    }

  return (
    <>
      <Bg />
      <Navbar />
      <div className="container mt-3" style={{zIndex : '5'}}>
        <h2>Fill the form</h2>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input type="text" id="name" name="name" className="form-control" />
          <label htmlFor="email">Email</label>
          <input type="text" id="email" name="email" className="form-control" />
          <label htmlFor="contact">Contact</label>
          <input type="text" id="contact" name="contact" className="form-control" />
          <label htmlFor="password">Password</label>
          <input type="text" id="password" name="password" className="form-control" />
          <button className="btn btn-success btn-lg mt-3" onClick={login}>LogIn</button>
        </div>
              
      </div>
    </>
  );
}

export default Log;
