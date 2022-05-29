import React from "react";
import {
  chakra,
  Box,
  Image,
  Flex,
  useColorModeValue,
  Link,
} from "@chakra-ui/react";

export const ArticleCard = () => {
  return (
    
      <Box
        mx={5}
        px={8}
        py={4}
        rounded="lg"
        shadow="lg"
        bg={useColorModeValue("white", "gray.800")}
        maxW="2xl"
      >
        <Flex justifyContent="space-between" alignItems="center">
          <chakra.span
            fontSize="sm"
            color={useColorModeValue("gray.600", "gray.400")}
          >
            Feb 28, 2022
          </chakra.span>
          <Link
            px={3}
            py={1}
            bg="gray.600"
            color="gray.100"
            fontSize="sm"
            fontWeight="700"
            rounded="md"
            _hover={{ bg: "gray.500" }}
          >
            Dev
          </Link>
        </Flex>

        <Box mt={2}>
          <Link
            fontSize="2xl"
            color={useColorModeValue("gray.700", "white")}
            fontWeight="700"
            _hover={{
              color: useColorModeValue("gray.600", "gray.200"),
            //   textDecor: "underline",
            }}
          >
            Software Queuing Solution 
          </Link>
          <chakra.p mt={2} color={useColorModeValue("gray.600", "gray.300")}>
            We're working on a mobile app that will make your daily queueing more enjoyable by solving all the related problems.
            We give you more control over your appointements, while also ridding you of unnecessary wait time!
          </chakra.p>
        </Box>

        <Flex justifyContent="space-between" alignItems="center" mt={4}>
          <chakra.h3
            color={useColorModeValue("brand.600", "purple.200")}
            // _hover={{ textDecor: "underline" }}
          >
            A Post
          </chakra.h3>

          <Flex alignItems="center">
            <Image
              mx={4}
              w={10}
              h={10}
              rounded="full"
              fit="cover"
              display={{ base: "none", sm: "block" }}
              src="https://avatars.githubusercontent.com/u/34142464?v=4"
              alt="avatar"
            />
            <Link
              color={useColorModeValue("gray.700", "gray.200")}
              fontWeight="700"
              cursor="pointer"
              href="https://github.com/Clstialdev/"
            >
              clstialdev
            </Link>
          </Flex>
        </Flex>
      </Box>
      
  );
};