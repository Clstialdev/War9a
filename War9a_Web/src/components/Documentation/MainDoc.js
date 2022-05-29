import {
  chakra,
  useColorModeValue,
  Link,
  Flex,
  Box,
  SimpleGrid,
} from "@chakra-ui/react";

import { ArticleCard } from "../ArticleCard";
import { SMCard } from "../SMCard";

import { BsFillMenuButtonFill } from "react-icons/bs";

import { AiOutlineQrcode } from "react-icons/ai";

import { MdGpsFixed } from "react-icons/md";

import { CgCardSpades, CgAbstract, CgArrangeBack } from "react-icons/cg";

import { BiNavigation } from "react-icons/bi";

export const MainDoc = () => {
  return (
    <>
      <chakra.h3 fontWeight={"bold"} id="comments">
        Dev Comments
      </chakra.h3>
      <Flex
        bg={useColorModeValue("#F9FAFB", "gray.600")}
        py={10}
        justifyContent="center"
        flexDirection={["column", "column", "row"]}
      >
        <ArticleCard />
        <SMCard />
      </Flex>

      <Box id="built">
        <chakra.h2
          fontSize={28}
          fontWeight={"bold"}
          mt={10}
          textDecoration="underline"
        >
          Built With:
        </chakra.h2>
        <chakra.h2 fontSize={20} fontWeight={"bold"} mt={3} ml={5}>
          IOS/Android:
        </chakra.h2>
        <Flex ml={10} alignItems="flex-start" flexWrap="wrap">
          <Box
            p={5}
            bg={useColorModeValue("white", "gray.800")}
            m={5}
            borderRadius={10}
          >
            <Link href="https://reactjs.org" fontSize={18} color="blue.500">
              *React.js
            </Link>
          </Box>
          <Box
            p={5}
            bg={useColorModeValue("white", "gray.800")}
            m={5}
            borderRadius={10}
          >
            <Link href="https://expo.dev" fontSize={18} color="blue.500">
              *Expo
            </Link>
          </Box>
          <Box
            p={5}
            bg={useColorModeValue("white", "gray.800")}
            m={5}
            borderRadius={10}
          >
            <Link href="https://reactnative.dev" fontSize={18} color="blue.500">
              *React Native
            </Link>
          </Box>
          <Box
            p={5}
            bg={useColorModeValue("white", "gray.800")}
            m={5}
            borderRadius={10}
          >
            <Link
              href="https://firebase.google.com"
              fontSize={18}
              color="blue.500"
            >
              *Firebase
            </Link>
          </Box>
          <Box
            p={5}
            bg={useColorModeValue("white", "gray.800")}
            m={5}
            borderRadius={10}
          >
            <Link href="https://ruby-lang.org" fontSize={18} color="blue.500">
              *Ruby
            </Link>
          </Box>
          <Box
            p={5}
            bg={useColorModeValue("white", "gray.800")}
            m={5}
            borderRadius={10}
          >
            <Link fontSize={18}>*JSX</Link>
          </Box>
          <Box
            p={5}
            bg={useColorModeValue("white", "gray.800")}
            m={5}
            borderRadius={10}
          >
            <Link fontSize={18}>*CSS</Link>
          </Box>
        </Flex>

        <chakra.h2 fontSize={20} fontWeight={"bold"} mt={3} ml={5}>
          Web Platform:
        </chakra.h2>
        <Flex ml={10} alignItems="flex-start" mt={3} flexWrap="wrap">
          <Box
            p={5}
            bg={useColorModeValue("white", "gray.800")}
            m={5}
            borderRadius={10}
          >
            <Link href="https://reactjs.org" fontSize={18} color="blue.500">
              *React.js
            </Link>
          </Box>
          <Box
            p={5}
            bg={useColorModeValue("white", "gray.800")}
            m={5}
            borderRadius={10}
          >
            <Link
              href="https://firebase.google.com"
              fontSize={18}
              color="blue.500"
            >
              *Firebase
            </Link>
          </Box>
          <Box
            p={5}
            bg={useColorModeValue("white", "gray.800")}
            m={5}
            borderRadius={10}
          >
            <Link href="https://chakra-ui.com/" fontSize={18} color="blue.500">
              *ChakraUI
            </Link>
          </Box>
          <Box
            p={5}
            bg={useColorModeValue("white", "gray.800")}
            m={5}
            borderRadius={10}
          >
            <Link href="https://choc-ui.com/" fontSize={18} color="blue.500">
              *ChocUI
            </Link>
          </Box>
          <Box
            p={5}
            bg={useColorModeValue("white", "gray.800")}
            m={5}
            borderRadius={10}
          >
            <Link fontSize={18}>*JSX</Link>
          </Box>
          <Box
            p={5}
            bg={useColorModeValue("white", "gray.800")}
            m={5}
            borderRadius={10}
          >
            <Link fontSize={18}>*CSS</Link>
          </Box>
        </Flex>
      </Box>

      <Box id="framework">
        <chakra.h2
          fontSize={32}
          fontWeight={"bold"}
          mt={10}
          textDecoration="underline"
        >
          War9a UI:
        </chakra.h2>
        <chakra.h4 fontSize={20} mx={5} mt={5}>
          To ensure the cohesivness of our app design UI and UX, we set to build
          our own React Component Library. This library of components allow us
          to reuse the same code we write once across different mobile platforms
          and achieve the same look and feel, while also keeping every element
          of our design as cohesive as possible. Components are like puzzle
          pieces, instead of coding a piece each time you need to use it we
          build a framework where we coded each puzzle piece once and made it
          reusable in different situations while it's still maleable, flexible
          and able to be bent and twisted according to the visual structure of
          it's environment.
        </chakra.h4>
        <Flex ml={5} alignItems="flex-start" mt={3} flexWrap="wrap">
          <DocCard
            title="Buttons"
            href="/documentation/buttons"
            icon={<BsFillMenuButtonFill size={20} color="white" />}
          />
          <DocCard
            title="Cards"
            href="/documentation/cards"
            icon={<CgCardSpades size={20} color="white" />}
          />
          <DocCard
            title="Navigation"
            href="/documentation/navigation"
            icon={<BiNavigation size={20} color="white" />}
          />
          <DocCard
            title="Effects"
            href="/documentation/effects"
            icon={<CgAbstract size={20} color="white" />}
          />
        </Flex>
      </Box>

      <Box id="features">
        <chakra.h2
          fontSize={32}
          fontWeight={"bold"}
          mt={10}
          textDecoration="underline"
        >
          App Features:
        </chakra.h2>
        <chakra.h4 fontSize={20} mx={5} mt={5}>
          For ease of use and in porsuite of mass adoption, War9a is rich in
          features and uses many technologies such as:
        </chakra.h4>
        <Features />
      </Box>
    </>
  );
};

const DocCard = ({ icon, title, href }) => {
  return (
    <Link href={href}>
      <Flex
        px={10}
        py={5}
        m={5}
        bg={useColorModeValue("white", "gray.800")}
        borderRadius={10}
        alignItems="center"
      >
        <Box p={5} bg={"green.900"} borderRadius={10} mr={5}>
          {icon}
        </Box>
        <chakra.h3 fontSize={24} fontWeight="bold">
          {title}
        </chakra.h3>
      </Flex>
    </Link>
  );
};

const Features = () => {
  const Feature = (props) => {
    return (
      <Box>
        {props.icon}
        <chakra.h3
          mb={3}
          fontSize="lg"
          lineHeight="shorter"
          fontWeight="bold"
          color={useColorModeValue("gray.900")}
          mt={5}
        >
          {props.title}
        </chakra.h3>
        <chakra.p
          lineHeight="tall"
          color={useColorModeValue("gray.600", "gray.400")}
        >
          {props.children}
        </chakra.p>
      </Box>
    );
  };

  return (
    <Flex
      //   bg={useColorModeValue("#F9FAFB", "gray.600")}
      p={20}
      w="auto"
      justifyContent="center"
      alignItems="center"
    >
      <SimpleGrid
        columns={{ base: 1, md: 2, lg: 3 }}
        spacing={20}
        px={{ base: 4, lg: 16, xl: 24 }}
        py={20}
        mx="auto"
        bg={useColorModeValue("white", "gray.800")}
        shadow="xl"
      >
        <Feature title="Qr Code" icon={<AiOutlineQrcode size={40} />}>
          Services can generate and print QR codes, while clients can use the QR
          code to join queues with or without having the War9a App.
        </Feature>

        <Feature title="GPS" icon={<MdGpsFixed size={40} />}>
          When registering, services can pinpoint their exact location on the
          map, allowing users to find their way to the service's location
          easily. We use user location to determine the dynamic queue order and
          also dynamicly notifying the clients to approach the service locations
          and get there on time.
        </Feature>

        <Feature title="TPC Algorithms" icon={<CgArrangeBack size={40} />}>
          Our algorithms calculate TPC or Time Per Client to better notify
          clients when their turns are getting closer.
        </Feature>
      </SimpleGrid>
    </Flex>
  );
};
