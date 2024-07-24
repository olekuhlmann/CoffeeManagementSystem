import { Image } from '@chakra-ui/react';
import coffeeImage from '../assets/coffee.png';

const CoffeeIcon = () => {
  return (
    <Image src={coffeeImage} alt="coffee" boxSize="1em" display="inline" />
  )
}

export default CoffeeIcon