import React from "react";
import {
  chakra,
  Box,
  Flex,
  useColorModeValue,
  Stack,
  Link,
} from "@chakra-ui/react";

export function CallToAction() {
  return (
    <Flex
    //   bg={useColorModeValue("#F9FAFB", "gray.600")}
      p={50}
      w="full"
      alignItems="center"
      justifyContent="center"
    >
      <Box bg={useColorModeValue("green.50", "gray.900")} borderRadius={"7px"}>
        <Box
          maxW="7xl"
          w={{ md: "3xl", lg: "4xl" }}
          mx="auto"
          py={{ base: 12, lg: 16 }}
          px={{ base: 4, lg: 8 }}
          display={{ lg: "flex" }}
          alignItems={{ lg: "center" }}
          justifyContent={{ lg: "space-between" }}
        >
          <chakra.h2
            fontSize={{ base: "3xl", sm: "4xl" }}
            fontWeight="extrabold"
            letterSpacing="tight"
            lineHeight="shorter"
            color={useColorModeValue("gray.900", "gray.100")}
          >
            <chakra.span display="block">Excited for War9a?</chakra.span>
            <chakra.span
              display="block"
              color={useColorModeValue("brand.600", "gray.500")}
            >
              Checkout our progress!
            </chakra.span>
          </chakra.h2>
          <Stack
            direction={{ base: "column", sm: "row" }}
            mt={{ base: 8, lg: 0 }}
            shrink={{ lg: 0 }}
          >
            <Link
              w={["full", , "auto"]}
              display="inline-flex"
              alignItems="center"
              justifyContent="center"
              px={5}
              py={3}
              border="solid transparent"
              fontWeight="bold"
              rounded="md"
              shadow="md"
              href="https://github.com/Clstialdev/War9a_App#readme"
              color={useColorModeValue("white")}
              bg={useColorModeValue("green.700", "green.900")}
              _hover={{
                bg: useColorModeValue("green.500", "green.600"),
              }}
            >
              Learn More
            </Link>
            <Link
              w={["full", , "auto"]}
              display="inline-flex"
              alignItems="center"
              justifyContent="center"
              px={5}
              py={3}
              border="solid transparent"
              fontWeight="bold"
              rounded="md"
              shadow="md"
              color="brand.900"
              bg="white"
              href="https://github.com/Clstialdev/War9a_App"
              _hover={{
                bg: "brand.50",
              }}
            >
              Github
            </Link>
          </Stack>
        </Box>
      </Box>
    </Flex>
  );
}