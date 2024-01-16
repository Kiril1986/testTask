import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Unauthorized() {
  const navigate = useNavigate();
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      navigate('/');
    }, 2000);
    return () => clearTimeout(timeoutId);
  }, [navigate]);
  return (
    <>
      <p>You are unauthorized. Redirecting in 2 seconds...</p>
      </>
  );
}

export default Unauthorized;
