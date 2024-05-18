import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Flex } from '@chakra-ui/react';

const Navbar = () => {
  return (
    <Box bg="blue" p={3} pos={"sticky"} top={0} color="white">
        <Flex justifyContent={"center"} alignItems={"center"}>
            <Flex gap={150} justifyContent={"space-between"} alignItems={'center'}>
                <Link mr={4} to={"/"}>Home</Link>
                <Link mr={4} to={"/dashboard"}>Employee Data</Link>
            </Flex>
        </Flex>
    </Box>
  )
}

export default Navbar