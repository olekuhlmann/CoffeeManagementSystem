import React, { useState } from 'react';
import {
  Box,
  Input,
  IconButton,
  Spinner,
  useToast,
} from '@chakra-ui/react';
import { AddIcon, CheckIcon } from "@chakra-ui/icons";
import StatusAlert from './StatusAlert';

type UserFormProps = {
  userName: string;
  setUserName: (name: string) => void;
  handleAddUser: () => Promise<boolean>;
};

const UserForm: React.FC<UserFormProps> = ({ userName, setUserName, handleAddUser }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const toast = useToast();

  const handleSubmit = async () => {
    setIsLoading(true);
    setStatus('idle');
    const result = await handleAddUser();
    setIsLoading(false);

    if (result) {
      setStatus('success');
      toast({
        title: 'User added.',
        description: `User ${userName} has been added.`,
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      setUserName('');
    } else {
      setStatus('error');
    }
  };

  return (
    <>
      <Box display="flex" alignItems="center" width="100%">
        <Input
          placeholder="Add a new user"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          isDisabled={isLoading}
          mr={2}
        />
        <IconButton
          aria-label="Add User"
          icon={isLoading ? <Spinner /> : status === 'success' ? <CheckIcon /> : <AddIcon />}
          onClick={handleSubmit}
          isDisabled={isLoading}
        />
      </Box>
      <StatusAlert status={status} message="Failed to add user." />
    </>
  );
};

export default UserForm;
