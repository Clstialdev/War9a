import React, { useEffect, useState } from "react";
import {
  chakra,
  Box,
  GridItem,
  useColorModeValue,
  Button,
  Stack,
  Center,
  Flex,
  Icon,
  SimpleGrid,
  VisuallyHidden,
  Input,
  Image,
  Link,
  Select,
} from "@chakra-ui/react";

import { InfoAlert } from "./InfoAlert";

export const Hero = () => {
  const [filter, setFilter] = useState("");

  return (
    <Center px={8} py={10} mx="auto">
      <Flex
        alignItems="center"
        w={"full"}
        // mx="15%"
        flexWrap={true}
        flexDirection={["column-reverse", "column-reverse", "row"]}
      >
        <Flex
          colSpan={{ base: "auto", lg: 5 }}
          textAlign={{ base: "center", lg: "left" }}
          justifyContent="center"
          alignItems={["center", "center", "flex-start"]}
          flexDirection="column"
          w={["full", "80%", "50%"]}
        >
          <chakra.h1
            mb={4}
            fontSize={{ base: "4xl", md: "5xl" }}
            fontWeight="extrabold"
            lineHeight={{ base: "shorter", md: "none" }}
            color={useColorModeValue("gray.900", "gray.200")}
            letterSpacing={{ base: "normal", md: "tight" }}
            mt={[10, 10, 0]}
          >
            Our solution to your problem!
          </chakra.h1>
          <chakra.p
            mb={{ base: 10, md: 4 }}
            fontSize={{ base: "lg", md: "xl" }}
            fontWeight="normal"
            color="gray.500"
            letterSpacing="wider"
          >
            We give you more control over your appointements, while also ridding
            you of unnecessary wait time!
          </chakra.p>
          <Flex
            w={["full", "full", "md"]}
            flexDirection={["column", "column", "row"]}
          >
            <Select
              id="category"
              name="category"
              autoComplete="category"
              placeholder="Select a category"
              mt={1}
              focusBorderColor="brand.400"
              shadow="sm"
              size="lg"
              w={["full", "full", "lg"]}
              rounded="md"
              fontWeight="600"
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="doctor">Doctor</option>
              <option value="food">Food</option>
              <option value="barber">Barber</option>
              <option value="other">Other</option>
            </Select>

            <Link
              w={["full", "full", "full"]}
              display="inline-flex"
              alignItems="center"
              justifyContent="center"
              px={5}
              py={2}
              mt={[2, 0]}
              border="solid transparent"
              fontWeight="bold"
              rounded="md"
              shadow="md"
              // ml={2}
              href={filter !== "" ? "/book?filter=" + filter : "/book"}
              color={useColorModeValue("white")}
              bg={useColorModeValue("green.600", "green.900")}
              _hover={{
                bg: useColorModeValue("green.500", "green.600"),
              }}
            >
              Search
            </Link>
          </Flex>

          <Flex w="full" mt={5} display={["none", "none", "flex"]}>
            <InfoAlert
              title="Covid-19 Precautions"
              description="Please respect the Covid-19 precautions. Stay safe!"
            />
          </Flex>
        </Flex>

        <Flex
          flexDirection="column"
          alignItems={"center"}
          w={["100%", "100%", "50%"]}
        >
          <Flex justify={"center"}>
            <Image
              // w="full"
              h={["md", "2xl"]}
              rounded="lg"
              shadow="2xl"
              src="https://github.com/Clstialdev/War9a_App/blob/master/Screenshots/1.png?raw=true"
              alt="App screenshot"
            />
          </Flex>
          <Flex justify={"center"} mt={5}>
            <Link
              w={["full", , "auto"]}
              display={["none", "inline-flex"]}
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
              bg={useColorModeValue("green.600", "green.900")}
              _hover={{
                bg: useColorModeValue("green.500", "green.600"),
              }}
            >
              Learn More About The App
            </Link>
          </Flex>
        </Flex>
      </Flex>
    </Center>
  );
};
