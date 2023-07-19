import React, { useState } from 'react';
import axios from 'axios';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Heading,
  Link,
  VStack,
  useToast,
  Center,
} from '@chakra-ui/react';

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const navigate = useNavigate();
  const toast = useToast();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}api/users/register`, formData);
      toast({
        title: 'Sign up successful',
        description: 'You have successfully signed up, Login to continue!',
        status: 'success',
        position: 'top-right',
        duration: 5000,
        isClosable: true,
      });
      navigate('/login');
    } catch (error) {
      toast({
        title: 'Sign up error',
        description: 'An error occurred while signing up. Please try again later.',
        status: 'error',
        position: 'top-right',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Center m={20}>

    <Box p={4}>
      <Heading mb={4}>Sign Up</Heading>
      <form onSubmit={handleSignup}>
        <VStack spacing={4} align="stretch">
          <FormControl id="name">
            <FormLabel>Name</FormLabel>
            <Input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </FormControl>
          <FormControl id="email">
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </FormControl>
          <FormControl id="password">
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </FormControl>
          <Button type="submit" colorScheme="blue">
            Sign Up
          </Button>
          <Box textAlign="center">
            <Link as={RouterLink} to="/login" color="blue.500">
              Already have an account? Log in here.
            </Link>
          </Box>
        </VStack>
      </form>
    </Box>
    </Center>
  );
};

export default SignUp;
