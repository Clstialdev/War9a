import React from "react";
import { chakra, Box, Icon, Flex, useColorModeValue } from "@chakra-ui/react";

import { IoMdAlert } from "react-icons/io";

export const InfoAlert = ({title, description}) => {
  return (
    <Flex
      // w="full"
    //   bg="gray.600"
      // p={50}
      // alignItems="center"
      // justifyContent="center"
    >
      <Flex
        // maxW="sm"
        w="full"
        mx="auto"
        bg={useColorModeValue("white", "gray.800")}
        shadow="md"
        rounded="lg"
        overflow="hidden"
      >
        <Flex justifyContent="center" alignItems="center" w={12} bg="#EFF8F3">
          <Icon as={IoMdAlert} color="green.600" boxSize={6} />
        </Flex>

        <Box mx={-3} py={2} px={4}>
          <Box mx={3}>
            <chakra.span
              color={useColorModeValue("black", "gray.400")}
              fontWeight="bold"
            >
                {title}
            </chakra.span>
            <chakra.p
              color={useColorModeValue("gray.600", "gray.200")}
              fontSize="md"
            >
              {description} <br/>{" "}
            </chakra.p>
          </Box>
        </Box>
      </Flex>
    </Flex>
  );
};
