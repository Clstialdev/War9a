import React from "react";
import {
  chakra,
  Flex,
  HStack,
  Icon,
  IconButton,
  Link,
  useColorMode,
  useColorModeValue,
  useDisclosure,
  CloseButton,
  Box,
  VStack,
  Button,
  Popover,
  PopoverTrigger,
  PopoverContent,
  Spacer,
  Divider,
} from "@chakra-ui/react";
import { useViewportScroll } from "framer-motion";
import { FaMoon, FaSun, FaHeart } from "react-icons/fa";
import {
  AiFillGithub,
  AiOutlineMenu,
  AiFillHome,
  AiOutlineInbox,
  AiOutlineBook,
  AiOutlineQuestionCircle
} from "react-icons/ai";

import {
  RiContactsBook2Line,
} from "react-icons/ri"

import {
  BsQuestionSquare,
} from "react-icons/bs"


import { BsFillCameraVideoFill } from "react-icons/bs";
import { IoIosArrowDown } from "react-icons/io";
import Logo from "../images/logo-compact-green.png";

export const Header = () => {
  const mobileNav = useDisclosure();

  const { toggleColorMode: toggleMode } = useColorMode();
  const text = useColorModeValue("dark", "light");
  const SwitchIcon = useColorModeValue(FaMoon, FaSun);

  const bg = useColorModeValue("white", "gray.800");
  const ref = React.useRef();
  const [y, setY] = React.useState(0);
  const { height = 0 } = ref.current ? ref.current.getBoundingClientRect() : {};

  const { scrollY } = useViewportScroll();
  React.useEffect(() => {
    return scrollY.onChange(() => setY(scrollY.get()));
  }, [scrollY]);
  
  const SponsorButton = (
    <Box
      display={{ base: "none", md: "flex" }}
      alignItems="center"
      as="a"
      aria-label="Sponsor War9a on Open Collective"
      href={""}
      target="_blank"
      rel="noopener noreferrer"
      bg="gray.50"
      borderWidth="1px"
      borderColor="gray.200"
      px="1em"
      minH="36px"
      rounded="md"
      fontSize="sm"
      color="gray.800"
      outline="0"
      transition="all 0.3s"
      _hover={{
        bg: "gray.100",
        borderColor: "gray.300",
      }}
      _active={{
        borderColor: "gray.200",
      }}
      _focus={{
        boxShadow: "outline",
      }}
      ml={5}
    >
      <Icon as={FaHeart} w="4" h="4" color="red.500" mr="2" />
      <Box as="strong" lineHeight="inherit" fontWeight="semibold">
        Sponsor
      </Box>
    </Box>
  );
  const MobileNavContent = (
    <VStack
      pos="absolute"
      top={0}
      left={0}
      right={0}
      display={mobileNav.isOpen ? "flex" : "none"}
      flexDirection="column"
      p={2}
      pb={4}
      m={2}
      bg={bg}
      spacing={3}
      rounded="sm"
      shadow="sm"
      backgroundColor={useColorModeValue("dark", "light")}
      zIndex={2}
    >
      <CloseButton
        aria-label="Close menu"
        justifySelf="self-start"
        onClick={mobileNav.onClose}
      />
      {/* <Button w="full" variant="ghost"  leftIcon={<AiFillHome />}>
        Home
      </Button> */}
      <Link
      href={"./home#features"} w="full" variant="ghost">
        <Button
          w="full"
          variant="ghost"
          colorScheme="brand"
          leftIcon={<AiOutlineInbox />}
        >
          Features
        </Button>
      </Link>
      <Link
      href={"/book"} w="full" variant="ghost">
        <Button
          w="full"
          variant="ghost"
          colorScheme="brand"
          leftIcon={<AiOutlineBook />}
        >
          Book
        </Button>
      </Link>
      <Link
      href={"./documentation"} w="full" variant="ghost">
        <Button
          w="full"
          variant="ghost"
          colorScheme="brand"
          leftIcon={<AiOutlineQuestionCircle />}
        >
          Documentation
        </Button>
      </Link>
      
      
    </VStack>
  );

  
  return (
    <Box pos="relative">
      <chakra.header
        ref={ref}
        shadow={y > height ? "sm" : undefined}
        transition="box-shadow 0.2s"
        bg={bg}
        borderTopColor="brand.400"
        w="full"
        overflowY="hidden"
        borderBottomWidth={2}
        borderBottomColor={useColorModeValue("gray.200", "gray.900")}
      >
        <chakra.div h="4.5rem" mx="auto" maxW="1200px">
          <Flex w="full" h="full" px="6" align="center" justify="space-between">
            <Flex align="center">
              <Link href="/">
                <HStack>
                  <img src={Logo} alt="logo" style={{height:"50px"}} />
                  <chakra.h2
                        fontSize={{ base: "2xl", sm: "3xl" }}
                        fontWeight="bold"
                        letterSpacing="tight"
                        lineHeight="shorter"
                        color={useColorModeValue("gray.900", "gray.100")}
                        width={200}
                        
                    >
                        War9a
                    </chakra.h2>
                  
                </HStack>
              </Link>
            </Flex>

            <Divider orientation='vertical'/>

            <Flex ml={10}>
              <HStack spacing="5" display={{ base: "none", md: "flex" }}> 
               <Link href="/">
                  <Button
                    bg={bg}
                    color="gray.500"
                    display="inline-flex"
                    alignItems="center"
                    fontSize="md"
                    _hover={{ color: "green.500" }}
                    _focus={{ boxShadow: "none" }}
                  >
                    Home
                  </Button>
                </Link>
                <Link href="/book">
                  <Button
                    bg={bg}
                    color="gray.500"
                    display="inline-flex"
                    alignItems="center"
                    fontSize="md"
                    _hover={{ color: "green.500" }}
                    _focus={{ boxShadow: "none" }}
                    >
                    Book
                  </Button>
                </Link>
                <Link href="/documentation">
                  <Button
                    bg={bg}
                    color="gray.500"
                    display="inline-flex"
                    alignItems="center"
                    fontSize="md"
                    _hover={{ color: "green.500" }}
                    _focus={{ boxShadow: "none" }}
                  >
                    Documentation
                  </Button>
                </Link>
                
              </HStack>
            </Flex>

            <Flex
              justify="flex-end"
              w="full"
              maxW="824px"
              align="center"
              color="gray.400"
            >
              <HStack spacing="5" display={{ base: "none", md: "flex" }}>
                <Link
                  isExternal
                  aria-label="Go to Choc UI GitHub page"
                  href="https://github.com/Clstialdev/War9a_App"
                >
                  <Icon
                    as={AiFillGithub}
                    display="block"
                    transition="color 0.2s"
                    w="5"
                    h="5"
                    _hover={{ color: "gray.600" }}
                  />
                </Link>
              </HStack>
              <IconButton
                size="md"
                fontSize="lg"
                aria-label={`Switch to ${text} mode`}
                variant="ghost"
                color="current"
                ml={{ base: "0", md: "3" }}
                onClick={toggleMode}
                icon={<SwitchIcon />}
              />
              <IconButton
                display={{ base: "flex", md: "none" }}
                aria-label="Open menu"
                fontSize="20px"
                color={useColorModeValue("gray.800", "inherit")}
                variant="ghost"
                icon={<AiOutlineMenu />}
                onClick={mobileNav.onOpen}
              />
            </Flex>
          </Flex>
          {MobileNavContent}
        </chakra.div>
      </chakra.header>
    </Box>
  );
};