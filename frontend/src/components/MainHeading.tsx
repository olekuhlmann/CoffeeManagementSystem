import { Heading } from "@chakra-ui/react";
import { ReactNode } from "react";

interface MainHeadingProps {
  children: ReactNode;
}

const MainHeading = ({ children }: MainHeadingProps) => {
  return (
    <Heading
      letterSpacing={-1}
      textAlign="center"
      fontSize="4xl"
      fontWeight="extrabold"
    >
      {children}
    </Heading>
  );
};

export default MainHeading;
