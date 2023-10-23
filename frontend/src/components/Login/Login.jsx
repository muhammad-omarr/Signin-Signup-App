import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import "./Login.css";
import { useNavigate } from 'react-router-dom';

const Login = () => {
  
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email address').required('Required'),
      password: Yup.string().required('Required'),
    }),
    onSubmit: async (values) => {
      try {
        const response = await axios.post('http://localhost:4000/login', values);
        alert(response.data.msg);
        formik.resetForm();
        if (response.status === 200) {
          const { token } = response.data
          localStorage.setItem("token" , token)
          navigate("/home");
        }
      } catch (error) {
        console.error("Error during login:", error);
        alert("Invalid credentials. Please try again.");
      }
    },
  });

  return (
    <div className="container formContainer my-5" style={{border: "1px solid black", padding:"30px"}}>
    <h1 className="heading">LOGIN</h1>
    <form onSubmit={formik.handleSubmit}>
      <div className="input-group input-group-sm mb-3">
        <span className="input-group-text" id="inputGroup-sizing-sm">Email</span>
        <input
          name="email"
          type="email"
          className="form-control"
          {...formik.getFieldProps('email')}
        />
      </div>
      {formik.touched.email && formik.errors.email ? (
        <div className="error">{formik.errors.email}</div>
      ) : null}

      <div className="input-group input-group-sm mb-3">
        <span className="input-group-text" id="inputGroup-sizing-sm">Password</span>
        <input
          name="password"
          type="password"
          className="form-control"
          {...formik.getFieldProps('password')}
        />
      </div>
      {formik.touched.password && formik.errors.password ? (
        <div className="error">{formik.errors.password}</div>
      ) : null}

      <button type="submit" className="btn btn-dark">
        Submit
      </button>
      <p style={{marginTop:"30px"}}>Don't have an account? <a href="/signup">Click here to Signup</a></p>
    </form>
  </div>
  );
};

export default Login;