import React, { useState } from 'react'
import styles from './Login.module.css';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Login = () => {
  const [user, setUser] = useState({
    email : "",
    password : "",
  })
  const [error, setError] = useState("")

  const onChangeInput = (e) => {
    const {name, value} = e.target
    setUser({...user, [name]:value})
  }
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("/user/login",
        {...user}
      )
      localStorage.setItem("firstLogin", true)
      window.location.href = "/"
    } catch (err) {
      alert(err.response.data.msg)
    }
  };
  return (
     <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <h2 className={styles.title}>Login</h2>
        
        {error && <p className={styles.error}>{error}</p>}

        <div className={styles.inputGroup}>
          <label htmlFor="email">Email</label>
          <input 
            type="email"
            id="email"
            name='email'
            value={user.email}
            onChange={onChangeInput}
            placeholder="Enter your email"
            required
          />
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="password">Password</label>
          <input 
            type="password"
            id="password"
            name='password'
            value={user.password}
            onChange={onChangeInput}
            placeholder="Enter your password"
            required
          />
        </div>

        <button type="submit" className={styles.button}>Login</button>
        <span className={styles.span}>Do not have an account?</span><Link className={styles.link} to="/register">Register Now!</Link>
      </form>
    </div>
  )
}

export default Login