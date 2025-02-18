import { Container, Box, VStack } from '@chakra-ui/react'
import React from 'react'
import CoffeeIcon from './components/CoffeeIcon'
import MainHeading from './components/MainHeading'

type LayoutProps = {
    children: React.ReactNode
}

const Layout: React.FC<LayoutProps> = ({children} ) => {
  return (
    <Container maxW="container.md" p={4} mb={20}>
      <Box textAlign="center" fontSize="xl">
        <MainHeading>
          Coffee Management System (CMS) <CoffeeIcon />
        </MainHeading>
        <VStack spacing={4} mt={10}>
            {children}
        </VStack>
      </Box>
    </Container>
  )
}

export default Layout