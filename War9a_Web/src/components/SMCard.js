import React from "react";
import {
  chakra,
  Box,
  Image,
  Flex,
  useColorModeValue,
  Link,
} from "@chakra-ui/react";

import {
    AiOutlineGithub,
    AiOutlineLink
} from 'react-icons/ai'

export const SMCard = () => {

    return(
        <Box
        w="full"
        maxW={["90%","94%","24%"]}
        mx={5}
        px={8}
        py={3}
        mt={[5,5,0]}
        bg={useColorModeValue("white", "gray.800")}
        shadow="md"
        rounded="md"
      >
        <Flex justifyContent="space-between" alignItems="center">
          <chakra.span
            fontSize="sm"
            color={useColorModeValue("gray.800", "gray.400")}
          >
            {"Roadmap & Execution"} 
          </chakra.span>
          <chakra.span
            bg={useColorModeValue("brand.200", "brand.300")}
            color={useColorModeValue("green.800", "green.700")}
            px={3}
            py={1}
            rounded="full"
            textTransform="uppercase"
            fontSize="xs"
          >
            Planning
          </chakra.span>
        </Flex>

        <Box>
          <chakra.h1
            fontSize="lg"
            fontWeight="bold"
            mt={2}
            color={useColorModeValue("gray.800", "white")}
          >
            Presenting War9a!
          </chakra.h1>
          <chakra.p
            fontSize="sm"
            mt={2}
            color={useColorModeValue("gray.600", "gray.300")}
          >
            Creating an App which Gets Noticed, There's immense competition in the mobile app market and honestly, it's very crowded. Thus, we created a unique solution to a problem many face in a way no other app has, you don't want to get lost.
          </chakra.p>
        </Box>

        <Box>
          

          <Flex justifyContent="space-between" alignItems="center" mt={4}>
          <Flex alignItems="center" justifyContent="center">
            <Link
              mr={2}
              color={useColorModeValue("gray.800", "gray.400")}
              _hover={{ color: useColorModeValue("gray.700", "gray.300") }}
              cursor="pointer"
              href="https://github.com/Clstialdev/War9a_App/blob/master/README.md"
            >
              <AiOutlineGithub />
            </Link>

            <Link
              mr={2}
              color={useColorModeValue("gray.800", "gray.400")}
              _hover={{ color: useColorModeValue("gray.700", "gray.300") }}
              cursor="pointer"
              href="/"
            >
              <AiOutlineLink />
            </Link>
            
          </Flex>

          <Flex alignItems="center">
            <Image
              mx={4}
              w={10}
              h={10}
              rounded="full"
              fit="cover"
              display={{ base: "none", sm: "block" }}
              src="https://pbs.twimg.com/profile_images/1056249291981967362/--HWWrrj_400x400.jpg"
              alt="avatar"
            />
            <Link
              color={useColorModeValue("gray.700", "gray.200")}
              fontWeight="700"
              cursor="pointer"
              href="https://twitter.com/Sparpouhy"
            >
              R. Med
            </Link>
          </Flex>
        </Flex>
        </Box>
      </Box>
    )
}

