import { chakra, useColorModeValue, Image, Link, Flex, Button, Stack, HStack, Box, SimpleGrid, Input, InputGroup, InputRightAddon, Center, VStack, Icon} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";


import { Header } from "../components/Header";
import { SideBar } from "../components/SideBar";
import { MainDoc } from "../components/Documentation/MainDoc";
import { ButtonsDoc } from "../components/Documentation/ButtonsDoc";
import { CardsDoc } from "../components/Documentation/CardsDoc";
import { EffectsDoc } from "../components/Documentation/EffectsDoc";
import { NavigationDoc } from "../components/Documentation/NavigationDoc";


export const Documentation = () => {
   const {type} = useParams();
   const [content, setContent] = useState(<MainDoc/>);
   
   useEffect(()=>{
       switch (type) {
           case "buttons":
               setContent(<ButtonsDoc />);
               break;
            case "cards":
               setContent(<CardsDoc />);
               break;
            case "navigation":
               setContent(<NavigationDoc />);
               break;
            case "effects":
               setContent(<EffectsDoc />);
               break;
       
           default:
               break;
       }
   },[type])
   

    return(
        <Box>
            <Header/>
            <SideBar Document={content} navOpen={type ? true : false}/>

        </Box>
    )
}

