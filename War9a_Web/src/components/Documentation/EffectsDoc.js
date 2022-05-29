import { chakra, useColorModeValue, Box } from "@chakra-ui/react";

export const EffectsDoc = () => {
  return (
    <>
      <ShadowDoc />
    </>
  );
};

const ShadowDoc = () => {
  return (
    <Box mx="5%">
      <chakra.h2 fontSize={28} fontWeight={"bold"} mt={10}>
        Shadow
      </chakra.h2>
      <chakra.h3 mt={5}>
        Shadow is a visual only component that can be invoked to add shadow
        anywhere in the app
      </chakra.h3>

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
        <chakra.span color="white"> Shadow </chakra.span>
        <chakra.span color="orange.300">{"}"}</chakra.span>
        <chakra.span color="purple.300"> from </chakra.span>
        <chakra.span color="green.300">{` "components/UIComponents/Shadow"`}</chakra.span>
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
        <chakra.span color="purple.300">{"<Shadow "} </chakra.span>
        <chakra.span color="orange.300"> strength='</chakra.span>
        <chakra.span color="white">10</chakra.span>
        <chakra.span color="orange.300">'</chakra.span>
        <chakra.span color="orange.300"> color='</chakra.span>
        <chakra.span color="pink.300">black</chakra.span>
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
        <chakra.span color="white">{`ShadowProps {`}</chakra.span>
        <chakra.br></chakra.br>
        <chakra.span color="blue.300" ml={5}>
          style
        </chakra.span>
        <chakra.span color="white">?: ViewStyle</chakra.span>
        <chakra.br></chakra.br>
        <chakra.span color="blue.300" ml={5}>
          strength
        </chakra.span>
        <chakra.span color="white">?: number</chakra.span>
        <chakra.br></chakra.br>
        <chakra.span color="blue.300" ml={5}>
          color
        </chakra.span>
        <chakra.span color="white">?: string</chakra.span>
        <chakra.br></chakra.br>
        <chakra.span color="white">{`}`}</chakra.span>
      </chakra.h3>
    </Box>
  );
};
