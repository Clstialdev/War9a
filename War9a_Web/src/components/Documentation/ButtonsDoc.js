import {
  chakra,
  useColorModeValue,
  Image,
  Box,
  Center,
} from "@chakra-ui/react";

import UIButtonImg from "../../images/Documentation/Buttons/UIButton.png";
import BackButtonImg from "../../images/Documentation/Buttons/BackButton.png";
import RoundTagImg from "../../images/Documentation/Buttons/RoundTag.png";
import TagButtonImg from "../../images/Documentation/Buttons/TagButton.png";
import SwitchButtonImg from "../../images/Documentation/Buttons/SwitchButton.png";

export const ButtonsDoc = () => {
  return (
    <>
      <UIButtonDoc />
      <Box my={80}></Box>
      <BackButtonDoc />
      <Box my={80}></Box>
      <RoundTagDoc />
      <Box my={80}></Box>
      <TagButtonDoc />
      <Box my={80}></Box>
      <SwitchButtonDoc />
    </>
  );
};

const UIButtonDoc = () => {
  return (
    <Box mx="5%">
      <chakra.h2 fontSize={28} fontWeight={"bold"} mt={10}>
        UIButton
      </chakra.h2>
      <chakra.h3 mt={5}>
        UIButton is the simplest button component on top of which all other
        Button components are built. By default, it renders a green button
        element.
      </chakra.h3>

      <Center mt={10}>
        <Image src={UIButtonImg} maxH={20} borderRadius={10} />
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
        <chakra.span color="white"> UIButton </chakra.span>
        <chakra.span color="orange.300">{"}"}</chakra.span>
        <chakra.span color="purple.300"> from </chakra.span>
        <chakra.span color="green.300">{` "components/Buttons/UIButton"`}</chakra.span>
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
        <chakra.span color="purple.300">{"<UIButton "} </chakra.span>
        <chakra.span color="orange.300">text='</chakra.span>
        <chakra.span color="white">Confirm</chakra.span>
        <chakra.span color="orange.300">'</chakra.span>
        <chakra.span color="orange.300"> color=' </chakra.span>
        <chakra.span color="white">green</chakra.span>
        <chakra.span color="orange.300">' </chakra.span>
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
        <chakra.span color="white">{`UIButtonProps {`}</chakra.span>
        <chakra.br></chakra.br>
        <chakra.span color="blue.300" ml={5}>
          text
        </chakra.span>
        <chakra.span color="white">: string</chakra.span>
        <chakra.br></chakra.br>
        <chakra.span color="blue.300" ml={5}>
          fontWeight
        </chakra.span>
        <chakra.span color="white">?: number</chakra.span>
        <chakra.br></chakra.br>
        <chakra.span color="blue.300" ml={5}>
          color
        </chakra.span>
        <chakra.span color="white">?: string</chakra.span>
        <chakra.br></chakra.br>
        <chakra.span color="blue.300" ml={5}>
          sz
        </chakra.span>
        <chakra.span color="white">{`?: "sm" | "md" | "lg" | "xxl",`}</chakra.span>
        <chakra.br></chakra.br>
        <chakra.span color="blue.300" ml={5}>
          shadow
        </chakra.span>
        <chakra.span color="white">?: boolean</chakra.span>
        <chakra.br></chakra.br>
        <chakra.span color="blue.300" ml={5}>
          icon
        </chakra.span>
        <chakra.span color="white">?: string</chakra.span>
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

const BackButtonDoc = () => {
  return (
    <Box mx="5%">
      <chakra.h2 fontSize={28} fontWeight={"bold"} mt={10}>
        BackButton
      </chakra.h2>
      <chakra.h3 mt={5}>
        BackButton is an essential navigation button, simply it takes you back
        one screen on the navigation stack.
      </chakra.h3>

      <Center mt={10}>
        <Image src={BackButtonImg} maxH={20} borderRadius={10} />
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
        <chakra.span color="white"> BackButton </chakra.span>
        <chakra.span color="orange.300">{"}"}</chakra.span>
        <chakra.span color="purple.300"> from </chakra.span>
        <chakra.span color="green.300">{` "components/Buttons/BackButton"`}</chakra.span>
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
        <chakra.span color="purple.300">{"<BackButton "} </chakra.span>
        <chakra.span color="orange.300">color='</chakra.span>
        <chakra.span color="white">green</chakra.span>
        <chakra.span color="orange.300">'</chakra.span>
        <chakra.span color="orange.300"> shadow=' </chakra.span>
        <chakra.span color="white">false</chakra.span>
        <chakra.span color="orange.300">' </chakra.span>
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
        <chakra.span color="white">{`BackButtonProps {`}</chakra.span>
        <chakra.br></chakra.br>
        <chakra.span color="blue.300" ml={5}>
          color
        </chakra.span>
        <chakra.span color="white">: string</chakra.span>
        <chakra.br></chakra.br>
        <chakra.span color="blue.300" ml={5}>
          shadow
        </chakra.span>
        <chakra.span color="white">?: boolean</chakra.span>
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

const RoundTagDoc = () => {
  return (
    <Box mx="5%">
      <chakra.h2 fontSize={28} fontWeight={"bold"} mt={10}>
        RoundTag
      </chakra.h2>
      <chakra.h3 mt={5}>
        RoundTag is a component used mostly for switch / toggle purposes
      </chakra.h3>

      <Center mt={10}>
        <Image src={RoundTagImg} maxH={40} borderRadius={10} />
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
        <chakra.span color="white"> RoundTag </chakra.span>
        <chakra.span color="orange.300">{"}"}</chakra.span>
        <chakra.span color="purple.300"> from </chakra.span>
        <chakra.span color="green.300">{` "components/Buttons/RoundTag"`}</chakra.span>
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
        <chakra.span color="purple.300">{"<RoundTag "} </chakra.span>
        <chakra.span color="orange.300">name='</chakra.span>
        <chakra.span color="white">Doctor</chakra.span>
        <chakra.span color="orange.300">'</chakra.span>
        <chakra.span color="orange.300"> color=' </chakra.span>
        <chakra.span color="white">red</chakra.span>
        <chakra.span color="orange.300">' </chakra.span>
        <chakra.span color="orange.300"> active=' </chakra.span>
        <chakra.span color="pink.300">true</chakra.span>
        <chakra.span color="orange.300">' </chakra.span>
        <chakra.span color="orange.300"> icon=' </chakra.span>
        <chakra.span color="white">doctor-icon</chakra.span>
        <chakra.span color="orange.300">' </chakra.span>
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
        <chakra.span color="white">{`RoundTagProps {`}</chakra.span>
        <chakra.br></chakra.br>
        <chakra.span color="blue.300" ml={5}>
          name
        </chakra.span>
        <chakra.span color="white">: string</chakra.span>
        <chakra.br></chakra.br>
        <chakra.span color="blue.300" ml={5}>
          color
        </chakra.span>
        <chakra.span color="white">?: string</chakra.span>
        <chakra.br></chakra.br>
        <chakra.span color="blue.300" ml={5}>
          active
        </chakra.span>
        <chakra.span color="white">?: boolean</chakra.span>
        <chakra.br></chakra.br>
        <chakra.span color="blue.300" ml={5}>
          icon
        </chakra.span>
        <chakra.span color="white">?: string</chakra.span>
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

const TagButtonDoc = () => {
  return (
    <Box mx="5%">
      <chakra.h2 fontSize={28} fontWeight={"bold"} mt={10}>
        TagButton
      </chakra.h2>
      <chakra.h3 mt={5}>
        TagButton is the round button that accepts an icon on the right and a
        cross icon on the left, meant for things that can be dynamically added
        aned removed on press.
      </chakra.h3>

      <Center mt={10}>
        <Image src={TagButtonImg} maxH={20} borderRadius={10} />
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
        <chakra.span color="white"> TagButton </chakra.span>
        <chakra.span color="orange.300">{"}"}</chakra.span>
        <chakra.span color="purple.300"> from </chakra.span>
        <chakra.span color="green.300">{` "components/Buttons/TagButton"`}</chakra.span>
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
        <chakra.span color="purple.300">{"<TagButton "} </chakra.span>
        <chakra.span color="orange.300">text='</chakra.span>
        <chakra.span color="white">Doctor</chakra.span>
        <chakra.span color="orange.300">'</chakra.span>
        <chakra.span color="orange.300"> color=' </chakra.span>
        <chakra.span color="white">red</chakra.span>
        <chakra.span color="orange.300">' </chakra.span>
        <chakra.span color="orange.300"> removable=' </chakra.span>
        <chakra.span color="white">true</chakra.span>
        <chakra.span color="orange.300">' </chakra.span>
        <chakra.span color="orange.300"> icon=' </chakra.span>
        <chakra.span color="white">doctor-icon</chakra.span>
        <chakra.span color="orange.300">' </chakra.span>
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
        <chakra.span color="white">{`TagButtonProps {`}</chakra.span>
        <chakra.br></chakra.br>
        <chakra.span color="blue.300" ml={5}>
          text
        </chakra.span>
        <chakra.span color="white">: string</chakra.span>
        <chakra.br></chakra.br>
        <chakra.span color="blue.300" ml={5}>
          fontWeight
        </chakra.span>
        <chakra.span color="white">?: number</chakra.span>
        <chakra.br></chakra.br>
        <chakra.span color="blue.300" ml={5}>
          color
        </chakra.span>
        <chakra.span color="white">?: string</chakra.span>
        <chakra.br></chakra.br>
        <chakra.span color="blue.300" ml={5}>
          sz
        </chakra.span>
        <chakra.span color="white">{`?: "sm" | "md" | "lg" | "xxl",`}</chakra.span>
        <chakra.br></chakra.br>
        <chakra.span color="blue.300" ml={5}>
          shadow
        </chakra.span>
        <chakra.span color="white">?: boolean</chakra.span>
        <chakra.br></chakra.br>
        <chakra.span color="blue.300" ml={5}>
          removable
        </chakra.span>
        <chakra.span color="white">?: boolean</chakra.span>
        <chakra.br></chakra.br>
        <chakra.span color="blue.300" ml={5}>
          icon
        </chakra.span>
        <chakra.span color="white">?: string</chakra.span>
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

const SwitchButtonDoc = () => {
  return (
    <Box mx="5%">
      <chakra.h2 fontSize={28} fontWeight={"bold"} mt={10}>
        SwitchButton
      </chakra.h2>
      <chakra.h3 mt={5}>
        SwitchButton lets you switch between two states, like a light switch.
        powered by React.useState
      </chakra.h3>

      <Center mt={10}>
        <Image src={SwitchButtonImg} maxH={20} borderRadius={50} />
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
        <chakra.span color="white"> SwitchButton </chakra.span>
        <chakra.span color="orange.300">{"}"}</chakra.span>
        <chakra.span color="purple.300"> from </chakra.span>
        <chakra.span color="green.300">{` "components/Buttons/SwitchButton"`}</chakra.span>
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
        <chakra.span color="purple.300">{"<SwitchButton "} </chakra.span>
        <chakra.span color="orange.300">option1='</chakra.span>
        <chakra.span color="white">Queue</chakra.span>
        <chakra.span color="orange.300">'</chakra.span>
        <chakra.span color="orange.300"> option2=' </chakra.span>
        <chakra.span color="white">Details</chakra.span>
        <chakra.span color="orange.300">' </chakra.span>
        <chakra.span color="orange.300"> state=' </chakra.span>
        <chakra.span color="white">false</chakra.span>
        <chakra.span color="orange.300">' </chakra.span>
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
        <chakra.span color="white">{`SwitchButtonProps {`}</chakra.span>
        <chakra.br></chakra.br>
        <chakra.span color="blue.300" ml={5}>
          active
        </chakra.span>
        <chakra.span color="white">?: string</chakra.span>
        <chakra.br></chakra.br>
        <chakra.span color="blue.300" ml={5}>
          option1
        </chakra.span>
        <chakra.span color="white">?: string</chakra.span>
        <chakra.br></chakra.br>
        <chakra.span color="blue.300" ml={5}>
          option2
        </chakra.span>
        <chakra.span color="white">?: string</chakra.span>
        <chakra.br></chakra.br>
        <chakra.span color="blue.300" ml={5}>
          state
        </chakra.span>
        <chakra.span color="white">?: boolean</chakra.span>
        <chakra.br></chakra.br>
        <chakra.span color="blue.300" ml={5}>
          style
        </chakra.span>
        <chakra.span color="white">?: ViewStyle</chakra.span>
        <chakra.br></chakra.br>
        <chakra.span color="blue.300" ml={5}>
          press
        </chakra.span>
        <chakra.span color="white">{`?: (arg0:boolean) => void,`}</chakra.span>
        <chakra.br></chakra.br>
        <chakra.span color="white">{`}`}</chakra.span>
      </chakra.h3>
    </Box>
  );
};
