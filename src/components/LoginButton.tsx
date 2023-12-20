import React from 'react';
import { Button } from '@mui/material';

interface ButtonProps {
  onClick: () => void;
}

const LoginButton: React.FC<ButtonProps> = ({ onClick }) => {
  return (
    <Button variant="contained" color="primary" onClick={onClick}>
      Login
    </Button>
  );
};

export default LoginButton;