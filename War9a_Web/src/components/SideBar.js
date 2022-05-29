import {
    Avatar,
    Box,
    Collapse,
    Drawer,
    DrawerContent,
    DrawerOverlay,
    Flex,
    Icon,
    IconButton,
    Input,
    InputGroup,
    InputLeftElement,
    Link,
    Text,
    useColorModeValue,
    useDisclosure,
  } from "@chakra-ui/react";
  import { FaBell, FaClipboardCheck, FaRss } from "react-icons/fa";
  import { AiFillGift } from "react-icons/ai";
  import { BsGearFill } from "react-icons/bs";
  import { FiMenu, FiSearch } from "react-icons/fi";
  import { HiCode, HiCollection, HiHome } from "react-icons/hi";
  import { MdHome, MdKeyboardArrowRight } from "react-icons/md";
  import React from "react";
  import Logo from "../images/logo-compact-green.png";
 
  
  export const SideBar = ({Document, navOpen}) =>{
    const sidebar = useDisclosure();
    const integrations = useDisclosure();
    const color = useColorModeValue("gray.600", "gray.300");
  
    const NavItem = (props) => {
      const { icon, children, href ,...rest } = props;
      return (
        <Link href={href}>
          <Flex
            align="center"
            px="4"
            pl="4"
            py="3"
            cursor="pointer"
            color={useColorModeValue("inherit", "gray.400")}
            _hover={{
              bg: useColorModeValue("gray.100", "gray.900"),
              color: useColorModeValue("gray.900", "gray.200"),
            }}
            role="group"
            fontWeight="semibold"
            transition=".15s ease"
            {...rest}
          >
            {icon && (
              <Icon
                mx="2"
                boxSize="4"
                _groupHover={{
                  color: color,
                }}
                as={icon}
              />
            )}
            {children}
          </Flex>
        </Link>
      );
    };
  
    const SidebarContent = (props) => (
      <Box
        as="nav"
        pos="fixed"
        top="0"
        left="0"
        zIndex="sticky"
        h="full"
        pb="10"
        pt={"60px"}
        overflowX="hidden"
        overflowY="auto"
        bg={useColorModeValue("white", "gray.800")}
        borderColor={useColorModeValue("inherit", "gray.700")}
        borderRightWidth="1px"
        w="60"
        {...props}
      >
        <Flex px="4" py="5" align="center">
            {/* <img src={Logo} alt="logo" style={{height:"50px"}} /> */}
          <Text
            fontSize="2xl"
            ml="2"
            color={useColorModeValue("brand.500", "white")}
            fontWeight="semibold"
          >
            Documentation
          </Text>
        </Flex>
        <Flex
          direction="column"
          as="nav"
          fontSize="sm"
          color="gray.600"
          aria-label="Main Navigation"
        >
          <NavItem icon={HiHome} href="/documentation#comments">Comments</NavItem>
          <NavItem icon={BsGearFill} href="/documentation#built">Built With</NavItem>
          <NavItem icon={HiCode} href="/documentation#framework" onClick={integrations.onToggle}>
            UI Framework
            <Icon
              as={MdKeyboardArrowRight}
              ml="auto"
              transform={integrations.isOpen  && "rotate(90deg)"}
            />
          </NavItem>
          <Collapse in={navOpen || integrations.isOpen}>
            <NavItem pl="12" py="2" href="/documentation/buttons">
              Buttons
            </NavItem>
            <NavItem pl="12" py="2" href="/documentation/cards">
              Cards
            </NavItem>
            <NavItem pl="12" py="2" href="/documentation/navigation">
              Navigation
            </NavItem>
            <NavItem pl="12" py="2" href="/documentation/effects">
              Effects
            </NavItem>
          </Collapse>
          <NavItem icon={HiCollection} href="/documentation#features" >Features</NavItem>
          
        </Flex>
      </Box>
    );
    return (
      <Box
        as="section"
        bg={useColorModeValue("gray.50", "gray.700")}
        minH="100vh"
      >
        <SidebarContent display={{ base: "none", md: "unset" }} />
        <Drawer
          isOpen={sidebar.isOpen}
          onClose={sidebar.onClose}
          placement="left"
        >
          <DrawerOverlay />
          <DrawerContent>
            <SidebarContent w="full" borderRight="none" />
          </DrawerContent>
        </Drawer>
        <Box ml={{ base: 0, md: 60 }} transition=".3s ease">
        <Flex
            as="header"
            align="center"
            justify="space-between"
            w="full"
            display={["flex", "flex", "none"]}
            px="4"
            bg={useColorModeValue("white", "gray.800")}
            borderBottomWidth="1px"
            borderColor={useColorModeValue("inherit", "gray.700")}
            h="14"
          >
            <IconButton
              aria-label="Menu"
              display={{ base: "inline-flex", md: "none" }}
              onClick={sidebar.onOpen}
              icon={<FiMenu />}
              size="sm"
            />
  
          </Flex>
          <Box as="main" p="4">
            {/* Add content here, remove div below  */}
            {Document}
          </Box>
        </Box>
      </Box>
    );
  }