import {
  chakra,
  useColorModeValue,
  Image,
  Box,
  Center,
} from "@chakra-ui/react";

import QueueCardImg from "../../images/Documentation/Cards/QueueCard.png";
import QueueTicketImg from "../../images/Documentation/Cards/QueueTicket.png";

export const CardsDoc = () => {
  return (
    <>
      <QueueCardDoc />
      <Box my={80}></Box>
      <QueueTicketDoc />
    </>
  );
};

const QueueCardDoc = () => {
  return (
    <Box mx="5%">
      <chakra.h2 fontSize={28} fontWeight={"bold"} mt={10}>
        QueueCard
      </chakra.h2>
      <chakra.h3 mt={5}>
        QueueCard is the round component that accepts an icon on the right, a
        counter in the middle and a button on the left
      </chakra.h3>

      <Center mt={10}>
        <Image src={QueueCardImg} maxH={20} borderRadius={50} />
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
        <chakra.span color="white"> QueueCard </chakra.span>
        <chakra.span color="orange.300">{"}"}</chakra.span>
        <chakra.span color="purple.300"> from </chakra.span>
        <chakra.span color="green.300">{` "components/Cards/QueueCard"`}</chakra.span>
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
        <chakra.span color="purple.300">{"<QueueCard "} </chakra.span>
        <chakra.span color="orange.300">number='</chakra.span>
        <chakra.span color="white">21</chakra.span>
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
        <chakra.span color="white">{`QueueCardProps {`}</chakra.span>
        <chakra.br></chakra.br>
        <chakra.span color="blue.300" ml={5}>
          number
        </chakra.span>
        <chakra.span color="white">?: number</chakra.span>
        <chakra.br></chakra.br>
        <chakra.span color="blue.300" ml={5}>
          style
        </chakra.span>
        <chakra.span color="white">?: ViewStyle</chakra.span>
        <chakra.br></chakra.br>
        <chakra.span color="blue.300" ml={5}>
          press
        </chakra.span>
        <chakra.span color="white">{`?: () => void,`}</chakra.span>
        <chakra.br></chakra.br>
        <chakra.span color="white">{`}`}</chakra.span>
      </chakra.h3>
    </Box>
  );
};

const QueueTicketDoc = () => {
  return (
    <Box mx="5%">
      <chakra.h2 fontSize={28} fontWeight={"bold"} mt={10}>
        QueueTicket
      </chakra.h2>
      <chakra.h3 mt={5}>
        QueueTicket is a dynamic component that takes an index and a name and
        seamlessly stacks ontop of each component of the same type
      </chakra.h3>

      <Center mt={10}>
        <Image src={QueueTicketImg} maxH={"190px"} borderRadius={10} />
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
        <chakra.span color="white"> QueueTicket </chakra.span>
        <chakra.span color="orange.300">{"}"}</chakra.span>
        <chakra.span color="purple.300"> from </chakra.span>
        <chakra.span color="green.300">{` "components/Cards/QueueTicket"`}</chakra.span>
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
        <chakra.span color="purple.300">{"<QueueTicket "} </chakra.span>
        <chakra.span color="orange.300">index='</chakra.span>
        <chakra.span color="white">1</chakra.span>
        <chakra.span color="orange.300">'</chakra.span>
        <chakra.span color="orange.300"> useName='</chakra.span>
        <chakra.span color="white">M. R</chakra.span>
        <chakra.span color="orange.300">'</chakra.span>
        <chakra.span color="orange.300"> selfAdded='</chakra.span>
        <chakra.span color="pink.300">true</chakra.span>
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
        <chakra.span color="white">{`QueueTicketProps {`}</chakra.span>
        <chakra.br></chakra.br>
        <chakra.span color="blue.300" ml={5}>
          useName
        </chakra.span>
        <chakra.span color="white">?: string</chakra.span>
        <chakra.br></chakra.br>
        <chakra.span color="blue.300" ml={5}>
          index
        </chakra.span>
        <chakra.span color="white">?: number</chakra.span>
        <chakra.br></chakra.br>
        <chakra.span color="blue.300" ml={5}>
          color
        </chakra.span>
        <chakra.span color="white">?: string</chakra.span>
        <chakra.br></chakra.br>
        <chakra.span color="blue.300" ml={5}>
          selfAdded
        </chakra.span>
        <chakra.span color="white">?: boolean</chakra.span>
        <chakra.br></chakra.br>
        <chakra.span color="white">{`}`}</chakra.span>
      </chakra.h3>
    </Box>
  );
};
