import { useState, useEffect } from 'react';
import "./styles.css";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from './useForm';
import  Swal from 'sweetalert2';


export default function Signup() {
  const [name, setName] = useForm();
  const [surname, setSurname] = useForm();
  const [email, setEmail] = useForm();
  const [username, setUsername] = useForm();
  const [password, setPassword] = useForm();
  const strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
  const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;


  const addUser = () => {
    fetch("http://192.168.70.108:8080/CreateUser/" + name + "/" + surname + "/" + email + "/" + username + "/" + password, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        surname: surname,
        email: email,
        username: username,
        password: password
      }),
    })
      .then((res) => {
        if (!res.ok) {
          Swal.fire({
            icon: 'error',
            title: 'Existing username or e-mail!',
            text: '',
          });
          //throw new Error(res.status);
        }
        else if (res.ok) {
          res.json();
          Swal.fire(
            'Success!',
            'You have signed up successfully! Please go to the login page.',
            'success'
          );
        }
      })
  };

  const submit = () => {

    if (name === '' || email === '' || password === '' || surname === '' || username === '') {
      Swal.fire(
        'One or more fields are empty!',
        "",
        'question'
      );
    }
    else if (!strongRegex.test(password)) {
      Swal.fire({
        icon: 'error',
        title: 'Password does not meet the conditions!',
        text: '',
      });
    }
    else if (!email.match(mailformat)) {
      Swal.fire({
        icon: 'error',
        title: 'Invalid email address!',
        text: '',
      });
    }
    else {
      addUser();

    }
  };

  let navigate = useNavigate();
  const routeChange = () => {
    let path = `/login`;
    navigate(path);
  }


  return (
    <div>
      <header className='header'>
        <a href="/" className="home">Whistleblowing</a>
        <div className='header-right'>
          <a className="login-btn" href="/login">Log in</a>
          <a className="signup-btn" href="/signup">Sign up</a>

        </div>
      </header>

      <div className='form-content'>


        <form onSubmit={e => e.preventDefault()} className='form'>
          <h1>Sign up</h1>
          <div className='form-inputs'>
            <label className='form-label'>Name </label>
            <input className='form-input'
              type="text"
              placeholder="Enter your name"
              onChange={setName}
              value={name}

            />
          </div>
          <div className='form-inputs'>
            <label className='form-label'>Surname </label>
            <input className='form-input'
              type="text"
              placeholder="Enter your surname"
              onChange={setSurname}
              value={surname}

            />
          </div>
          <div className='form-inputs'>
            <label className='form-label'>E-mail </label>
            <input className='form-input'
              type="text"
              placeholder="Enter your e-mail"
              onChange={setEmail}
              value={email}

            />
          </div>
          <div className='form-inputs'>
            <label className='form-label'>Username </label>
            <input className='form-input'
              type="text"
              placeholder="Enter a username"
              onChange={setUsername}
              value={username}

            />
          </div>
          <div className='form-inputs'>
            <label className='form-label'>Password </label>
            <input className='form-input'
              type="password"
              placeholder="Create a password"
              onChange={setPassword}
              value={password}
            />
          </div>
          <p className='explanation' style={{ "color": "red" }}>*Password must contain at least: 8 characters, an uppercase letter, a number and a special character</p>
          <button className='signup-btn' type="submit" onClick={submit} >Sign up</button>
          <p>
            Already have an account?
            <Link to="/login" className='login-link-at-signup'>Log in</Link>
          </p>
        </form>

      </div>
    </div>
  );
}