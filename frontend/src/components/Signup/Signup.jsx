import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import "./Signup.css";
import { useNavigate } from 'react-router-dom'

const Signup = () => {
  const navigate = useNavigate()
  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      confirmPass: '',
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Required'),
      email: Yup.string().email('Invalid email address').required('Required'),
      password: Yup.string().required('Required'),
      confirmPass: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .required('Required'),
    }),
    onSubmit: async (values) => {
      try {
        const response = await axios.post('http://localhost:4000/signup', values);
        alert(response.data.msg);
        formik.resetForm();
        navigate("/login")

      } catch (error) {
        alert(error.response.data.error)
        console.error('Error creating user:', error);
      }
    },
  });

  return (
    <div className="container formContainer my-5" style={{border: "1px solid black", padding:"30px"}}>
    <h1 className="heading">SIGNUP</h1>
    <form onSubmit={formik.handleSubmit}>
      <div className="input-group input-group-sm mb-3">
        <span className="input-group-text" id="inputGroup-sizing-sm">Name</span>
        <input
          name="name"
          type="text"
          className="form-control"
          aria-label="Sizing example input"
          aria-describedby="inputGroup-sizing-sm"
          {...formik.getFieldProps('name')}
        />
      </div>
      {formik.touched.name && formik.errors.name ? (
        <div className="error">{formik.errors.name}</div>
      ) : null}

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

      <div className="input-group input-group-sm mb-3">
        <span className="input-group-text" id="inputGroup-sizing-sm">Confirm Password</span>
        <input
          name="confirmPass"
          type="password"
          className="form-control"
          {...formik.getFieldProps('confirmPass')}
        />
      </div>
      {formik.touched.confirmPass && formik.errors.confirmPass ? (
        <div className="error">{formik.errors.confirmPass}</div>
      ) : null}

      <button type="submit" className="btn btn-dark">
        Submit
      </button>
      <p style={{marginTop:"30px"}}>Already have an account? <a href="/login">Click here to Login</a></p>
    </form>
  </div>
  );
};

export default Signup;