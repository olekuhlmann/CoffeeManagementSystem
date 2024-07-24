import React from 'react';
import { Box, Collapse, Alert, AlertIcon, AlertDescription } from '@chakra-ui/react';

type StatusAlertProps = {
  status: 'idle' | 'success' | 'error';
  message: string;
};

const StatusAlert: React.FC<StatusAlertProps> = ({ status, message }) => {
  return (
    <Collapse in={status === 'error'} animateOpacity>
      <Box>
        <Alert status="error" mt={2} rounded="md" marginTop={4}>
          <AlertIcon />
          <AlertDescription>{message}</AlertDescription>
        </Alert>
      </Box>
    </Collapse>
  );
};

export default StatusAlert;
