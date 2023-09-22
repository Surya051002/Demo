import { useRef,useState } from 'react';
import './App.css';
import img1 from './static/bg.jpg';
import axios from 'axios'

const App = () => {
  const userId = useRef();
  const userEmail = useRef();
  const userPassword = useRef();
  const [Data,SetData]=useState([]);

  async function handleSubmit(e) {
    e.preventDefault();
    
    const userData = {
      userId: userId.current.value,
      email: userEmail.current.value,
      password: userPassword.current.value,
    };

    try {
      await axios.post("http://localhost:3030/rr",userData).catch(()=>{alert("Check Details")});

     
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  }
  async function fun(){
    const data=await axios.get("http://localhost:3030/r").then((res)=>res.data[0].username).catch((err)=>console.log(err));
    SetData(data);
  }

  return (
    <section>
      <div className="login-box">
        <form id="login-form" onSubmit={handleSubmit}>
          {/* ... Your form content ... */}
          <h2>Login</h2>
          <div className="input-box">
            <span className="icon">
              <ion-icon name=""></ion-icon>
            </span>
            <input ref={userId} type="text" name='userid' id="userid" />
            <label>Id</label>
          </div>
          <div className="input-box">
            <span className="icon">
              <ion-icon name="mail"></ion-icon>
            </span>
            <input ref={userEmail} type="email" name='email' id="email" />
            <label>Email</label>
          </div>
          {/* ... Rest of your HTML form ... */}
          <div className="remember">
            <label>
              <input type="checkbox" />Remember me
            </label>
            <a href="#">Forgot Password?</a>
          </div>
          <button type="submit" id="login-button">
            Login
          </button>
          <button type="button" onClick={fun} id="register-button">
            Register
          </button>
          <div className="register">
            <p>Don't have an account? <a href="#">Register</a></p>
          </div>
          {Data}
        </form>
      </div>
    </section>
  );
}

export default App;
