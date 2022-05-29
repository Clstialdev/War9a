import {
  chakra,
  useColorModeValue,
  Image,
  Box,
  Center,
} from "@chakra-ui/react";

import NavigationImg from "../../images/Documentation/Navigation/Navigation.png";

export const NavigationDoc = () => {
  return (
    <>
      <NavBarDoc />
    </>
  );
};
const NavBarDoc = () => {
  return (
    <Box mx="5%">
      <chakra.h2 fontSize={28} fontWeight={"bold"} mt={10}>
        Navigation
      </chakra.h2>
      <chakra.h3 mt={5}>
        Navigation is used as a nav bar at the bottom of the app allowing us to
        easily manipulate the navigation stack
      </chakra.h3>

      <Center mt={10}>
        <Image src={NavigationImg} maxH={"130px"} borderRadius={10} />
      </Center>

      <chakra.h2 fontSize={20} fontWeight={"bold"} mt={20}>
        Import:
      </chakra.h2>
      <chakra.h3
        fontWeight={"bold"}
        p={5}
        pl={10}
        bg={useColorModeValue("gray.700", "gray.800")}
        borderRadius={10}
        m={5}
      >
        <chakra.span color="purple.300">Import </chakra.span>
        <chakra.span color="orange.300">{"{"}</chakra.span>
        <chakra.span color="white"> Navigation </chakra.span>
        <chakra.span color="orange.300">{"}"}</chakra.span>
        <chakra.span color="purple.300"> from </chakra.span>
        <chakra.span color="green.300">{` "components/Navigation"`}</chakra.span>
      </chakra.h3>

      <chakra.h2 fontSize={20} fontWeight={"bold"} mt={20}>
        Usage:
      </chakra.h2>
      <chakra.h3
        fontWeight={"bold"}
        p={5}
        pl={10}
        bg={useColorModeValue("gray.700", "gray.800")}
        borderRadius={10}
        m={5}
      >
        <chakra.span color="purple.300">{"<Navigation "} </chakra.span>
        <chakra.span color="orange.300">active='</chakra.span>
        <chakra.span color="white">explore</chakra.span>
        <chakra.span color="orange.300">'</chakra.span>
        <chakra.span color="purple.300">{` />`}</chakra.span>
      </chakra.h3>

      <chakra.h2 fontSize={20} fontWeight={"bold"} mt={20}>
        All Props:
      </chakra.h2>
      <chakra.h3
        fontWeight={"bold"}
        p={5}
        pl={10}
        bg={useColorModeValue("gray.700", "gray.800")}
        borderRadius={10}
        m={5}
      >
        <chakra.span color="red.300">{"interface "} </chakra.span>
        <chakra.span color="white">{`NavigationProps {`}</chakra.span>
        <chakra.br></chakra.br>
        <chakra.span color="blue.300" ml={5}>
          active
        </chakra.span>
        <chakra.span color="white">
          : "explore" | "queues" | "favorites" | "profile"
        </chakra.span>
        <chakra.br></chakra.br>

        <chakra.span color="white">{`}`}</chakra.span>
      </chakra.h3>
    </Box>
  );
};
