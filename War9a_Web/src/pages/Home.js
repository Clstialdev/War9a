import logo from "../logo.svg";

import { Header } from "../components/Header";
import { CallToAction } from "../components/CallToAction";
import { Features } from "../components/Features";
import { Hero } from "../components/Hero";

import {
  chakra,
  useColorModeValue,
  Flex,
  HStack,
  Center,
} from "@chakra-ui/react";
import { GridBlurredBackdrop as Testimonials } from "../components/Testimonials";

export const Home = () => {
  return (
    <div>
      <Header />
      {/* <InfoAlert /> */}
      <Flex w="full" justify={"center"} mt={10}>
        <Heading />
      </Flex>
      <Flex flexDirection={["column-reverse", "column-reverse", "column"]}>
        <Hero />
        <CallToAction />
      </Flex>
      <Features />
      <Center mt={20} mb={20}>
        <Testimonials />
      </Center>
    </div>
  );
};

function Heading() {
  return (
    <Flex align="center" justify={"center"} mt={5} textAlign="center">
      <HStack>
        <chakra.h1
          fontSize={{ base: "2xl", sm: "3xl" }}
          fontWeight="bold"
          letterSpacing="tight"
          lineHeight="shorter"
          color={useColorModeValue("green.500", "gray.100")}
        >
          <chakra.span display="block">
            We're Still Working On War9a!
          </chakra.span>
          <chakra.span
            display="block"
            fontSize={{ base: "1xl", sm: "2xl" }}
            color={useColorModeValue("gray.600", "gray.100")}
          >
            But We're Almost Ready!
          </chakra.span>
        </chakra.h1>
      </HStack>
    </Flex>
  );
}
