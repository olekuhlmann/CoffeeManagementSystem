// src/components/UserForm.tsx
import React from 'react';
import { Box, Input, Button } from '@chakra-ui/react';

type UserFormProps = {
  userName: string;
  setUserName: (name: string) => void;
  handleAddUser: () => void;
};

const UserForm: React.FC<UserFormProps> = ({ userName, setUserName, handleAddUser }) => (
  <Box>
    <Input
      placeholder="Add a new user"
      value={userName}
      onChange={(e) => setUserName(e.target.value)}
    />
    <Button onClick={handleAddUser} ml={2}>
      Add User
    </Button>
  </Box>
);

export default UserForm;
