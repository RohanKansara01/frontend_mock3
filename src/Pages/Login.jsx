import React, { useState } from 'react';
import { Box, Button, FormControl, Input, Stack, Heading, Alert, AlertIcon, Center } from '@chakra-ui/react';
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [isLoggedIn, setIsLoggedIn]=useState(true);
  const [error, setError]=useState('');
  const navigate=useNavigate();

  const handleFormSubmit=async (event) => {
    event.preventDefault();
  
    const credential={
      email:event.target.email.value,
      password:event.target.password.value,
    };
  
    const Url=isLoggedIn ? '/login' : '/signup';
  
    try {
      const res=await fetch("https://kind-jade-panther-belt.cyclic.app/login", {
        method:'POST',
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify(credential)
      });
      if(res.ok){
        const data=await res.json();
        localStorage.setItem('token', data.token); 
        navigate('/dashboard');
      }else{
        const errorMessage=res.statusText || 'Unknown error';
        throw new Error(errorMessage);
      }
    } catch (error) {
      setError(error.message);
    }
  };
  
  return (
    <Center h="50vh">
      <Box textAlign="center" mt={10} width="300px">
        <Heading>{isLoggedIn ? 'Login Page' : 'Sign Up Page'}</Heading>
        <Button mt={4} onClick={()=>setIsLoggedIn(!isLoggedIn)}>
          {isLoggedIn ? 'Login' : 'Sign Up'}
        </Button>
        {error && (
          <Alert status="error" mt={4}>
            <AlertIcon />
            {error}
          </Alert>
        )}
        <form onSubmit={handleFormSubmit}>
          <Stack spacing={6} mt={4}>
            <FormControl isRequired>
              <Input type="email" name="email" placeholder='Email'/>
            </FormControl>
            <FormControl isRequired>
              <Input type="password" name="password" placeholder='Password'/>
            </FormControl>
            {!isLoggedIn && (
              <FormControl isRequired>
                <Input type="password" name="confirmPassword" placeholder='Confirm Password'/>
              </FormControl>
            )}
            <Button type="submit" bg="blue" color={'white'}>{isLoggedIn ? 'Login' : 'Sign Up'}</Button>
          </Stack>
        </form>
        {isLoggedIn ? (
          <Button variant="link" mt={4} onClick={()=>console.log('Forgot password')}>Forgot Password?</Button>
        ) : (
          <Button variant="link" mt={4} onClick={()=>console.log('Redirecting to signup page')}>Not a member? Sign Up</Button>
        )}
      </Box>
    </Center>
  );
};

export default Login;
