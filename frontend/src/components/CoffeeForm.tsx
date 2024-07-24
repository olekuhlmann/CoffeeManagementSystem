import React, { useState } from 'react';
import {
  Box,
  Select,
  IconButton,
  Spinner,
  useToast,
  Collapse,
  Alert,
  AlertIcon,
  AlertDescription
} from '@chakra-ui/react';
import { CheckIcon, CloseIcon, AddIcon } from '@chakra-ui/icons';
import { User } from '../hooks/useUsers';

type CoffeeFormProps = {
  users: User[];
  selectedUser: string;
  setSelectedUser: (name: string) => void;
  selectedReceiver: string;
  setSelectedReceiver: (name: string) => void;
  handleAddCoffee: () => Promise<boolean>;
};

const CoffeeForm: React.FC<CoffeeFormProps> = ({
  users,
  selectedUser,
  setSelectedUser,
  selectedReceiver,
  setSelectedReceiver,
  handleAddCoffee,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const toast = useToast();

  const handleSubmit = async () => {
    setIsLoading(true);
    setStatus('idle');
    const result = await handleAddCoffee();
    setIsLoading(false);

    if (result) {
      setStatus('success');
      toast({
        title: 'Coffee added.',
        description: `${selectedUser} bought a coffee for ${selectedReceiver}.`,
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      setSelectedUser('');
      setSelectedReceiver('');
    } else {
      setStatus('error');
    }
  };

  return (
    <>
      <Box display="flex" alignItems="center" width="100%" justifyContent="center">
        <Select
          placeholder="..."
          value={selectedUser}
          onChange={(e) => setSelectedUser(e.target.value)}
          isDisabled={isLoading}
          mr={2}
          width={"100px"}
        >
          {users.map((user) => (
            <option key={user.name} value={user.name}>
              {user.name}
            </option>
          ))}
        </Select>
        <Box mx={2}>bought a ☕ for</Box>
        <Select
          placeholder="..."
          value={selectedReceiver}
          onChange={(e) => setSelectedReceiver(e.target.value)}
          isDisabled={isLoading}
          width={"100px"}
          mr={2}
        >
          {users.map((user) => (
            <option key={user.name} value={user.name}>
              {user.name}
            </option>
          ))}
        </Select>
        <IconButton
          aria-label="Add Coffee"
          icon={isLoading ? <Spinner /> : status === 'success' ? <CheckIcon /> : status === 'error' ? <CloseIcon /> : <AddIcon />}
          onClick={handleSubmit}
          isDisabled={isLoading}
        />
      </Box>
      <Collapse in={status === 'error'} animateOpacity>
        <Box>
          <Alert status="error" mt={2} rounded="md" marginTop={4}>
            <AlertIcon />
            <AlertDescription>Something went wrong.</AlertDescription>
          </Alert>
        </Box>
      </Collapse>
    </>
  );
};

export default CoffeeForm;
