// --- Core React Modules ---
import { useState, useEffect } from 'react'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Container } from 'react-bootstrap';

// --- UX/UI Components ---
import HomePage from './pages/HomePage';
const  App = () => {

  return (
    <Container>
      <HomePage />
    </Container>
  )
}

export default App
