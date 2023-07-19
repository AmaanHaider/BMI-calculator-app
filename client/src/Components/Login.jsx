import React, { useEffect ,useState} from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Link as RouterLink } from 'react-router-dom';
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
  Text,
} from '@chakra-ui/react';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
    const navigate = useNavigate();
    const toast = useToast();
    const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}api/users/login`, formData);
      const token = response.data;
      // console.log(token);
      toast({
        title: 'Login successful',
        description: 'You have successfully logged in!',
        status: 'success',
        position: 'top-right',
        duration: 5000,
        isClosable: true,
      });
      localStorage.setItem('accessToken', token);
      navigate('/bmi-calculator');
    } catch (error) {
      toast({
        title: 'Login error',
        description: 'Invalid email or password. Please try again.',
        status: 'error',
        position: 'top-right',
        duration: 5000,
        isClosable: true,
      });
    }
  };
  return (
    <Center m={5}>
    <Box m={5} p={4}>
      <Heading mb={4}>Log In</Heading>
      <form onSubmit={handleLogin}>
        <VStack spacing={4} align="stretch">
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
            Log In
          </Button>
          <Box textAlign="center">
            <Link as={RouterLink} to="/" color="blue.500">
              Don't have an account? Sign up here.
            </Link>
          </Box>
        </VStack>
      </form>
    </Box>
    </Center>
  )
}

export default Login