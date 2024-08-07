import React, { useState } from 'react';
import {
  Box,
  Input,
  Button,
  Container,
  VStack,
  Heading,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  FormControl,
} from '@chakra-ui/react';
import { login } from '../services/authService';

type LoginProps = {
  onLoginSuccess: () => void;
};

const Login: React.FC<LoginProps> = ({ onLoginSuccess }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent form from submitting the traditional way
    const result = await login(password);
    if (result.success) {
      onLoginSuccess();
    } else {
      setError(result.error || 'An unexpected error occurred');
    }
  };

  return (
    <Container maxW="container.sm" centerContent>
      <Box p={8} mt={20} borderWidth={1} borderRadius="md" boxShadow="md">
        <form onSubmit={handleLogin}>
          <VStack spacing={4}>
            <Heading>Password Required</Heading>
            <FormControl>
              <Input
                placeholder="Enter password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormControl>
            <Button type="submit" colorScheme="blue">
              Login
            </Button>
            {error && (
              <Alert status="error">
                <AlertIcon />
                <AlertTitle mr={2}>Error!</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
          </VStack>
        </form>
      </Box>
    </Container>
  );
};

export default Login;