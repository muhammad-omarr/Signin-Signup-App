import React from 'react'
import { useEffect } from "react";
import "./Home.css"
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          // Handle case where token is not available (user is not authenticated)
          alert("No Token Present")
          navigate("/login")
        }
        const response = await axios.get('http://localhost:4000/home', {
          headers: {
            Authorization: `Bearer ${token}` // Send the token in the Authorization header
          }
        });
      } catch (error) {
        // Handle errors, e.g., unauthorized access
        console.error("Error fetching user data:", error);
        localStorage.removeItem("token");
        alert("Token not verified")
        navigate("/login")
      }
    };

    fetchUserData();
  }, []); // Run this effect only once after the initial render

  const handleLogOut = () =>{
    localStorage.removeItem("token");
    navigate("/login");
  }
  return (
    <div className="container cont" style={{border: "1px solid black", padding:"30px"}}>
      <h1>Welcome!</h1>
      <button className="btn-dark" onClick={handleLogOut}>Logout</button>
    </div>
  )
}

export default Home

