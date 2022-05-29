import logo from "../logo.svg";

import { Header } from "../components/Header";
import { useParams } from "react-router-dom";

import {
  chakra,
  useColorModeValue,
  Image,
  Flex,
  Button,
  Center,
  VStack,
  HStack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";

import { doc, onSnapshot, updateDoc } from "firebase/firestore";

import { IoMdCalendar } from "react-icons/io";

import { MdPinDrop } from "react-icons/md";

import noQueueImg from "../images/NoQueue.png";
import noQueueImgPurple from "../images/NoQueuePurple.png";

import { DetailCard } from "./Book";
import { QueueEmpty } from "./Book";
import { QueueTicket } from "./Book";

export const Join = ({ db }) => {
  const { id } = useParams();

  const [service, setService] = useState(undefined);
  const [queue, setQueue] = useState(undefined);
  const [joibtnActive, setJoibtnActive] = useState(true);

  const getService = () => {
    const unsub = onSnapshot(doc(db, "services2", id), (doc) => {
      if (doc) {
        setService(doc.data());
        setQueue(doc.data()?.queued[0].data);
      }
    });
  };

  useEffect(() => {
    getService();
  }, []);

  const JoinService = async () => {
    let currentQueue = 0;
    let clientNumber = queue.length + 1;
    // console.log(currentQueue)
    let exists = false;

    queue.map((obj) =>
      obj.uid === "Client #" + clientNumber ? (exists = true) : null
    );

    if (exists) {
      for (let i = 0; ; i++) {
        exists = false;
        console.log(i);
        clientNumber = i;
        queue.map((obj) =>
          obj.uid === "Client #" + clientNumber ? (exists = true) : null
        );

        if (!exists) {
          break;
        }
      }
    }

    const serviceRef = doc(db, "services2", id.toString());
    let tempTypeQueues = service.queued;
    tempTypeQueues[currentQueue].data.push({
      uid: "Client #" + clientNumber,
      name: "Client #" + clientNumber,
      pushToken: "Client #" + clientNumber,
    });

    await updateDoc(serviceRef, {
      queued: tempTypeQueues,
    });
    alert("joined as " + "Client #" + clientNumber);
    setQueue(service.queued[currentQueue].data);
    setJoibtnActive(false);
  };

  return (
    <div>
      <Header />

      <Center>
        {service ? (
          <Center
            flexDirection="column"
            justifyContent="center"
            alignContent={"center"}
          >
            <Image src={service.image} borderRadius={10} maxH={"30%"} />
            <chakra.h5
              fontSize={30}
              textAlign="center"
              fontWeight={"bold"}
              mt={5}
            >
              {service.name}
            </chakra.h5>
            {joibtnActive ? (
              <Button backgroundColor="#25855A" p="4% 15%" mt={2}>
                <chakra.h5
                  color="white"
                  fontSize={20}
                  onClick={() => {
                    JoinService();
                  }}
                >
                  Join
                </chakra.h5>
              </Button>
            ) : (
              <></>
            )}

            <Center
              flexDirection="column"
              justifyContent="flex-start"
              //   borderTop={"solid rgba(255,255,255,0.2) 2px"}
              //   mt={10}
              w="full"
            >
              {!queue || (queue && queue.length === 0) ? (
                <QueueEmpty />
              ) : (
                // "none"
                <VStack
                  style={{
                    display: "flex",
                    maxHeight: "85%",
                    marginTop: 20,
                  }}
                  pos="relative"
                  w="full"
                >
                  {queue ? (
                    queue.map(
                      (userID, i) => (
                        <QueueTicket
                          key={userID}
                          index={i + 1}
                          userName={
                            queue[i] !== undefined ? queue[i].name : "User"
                          }
                        />
                      )
                      // service.queuedNames !== undefined ? <h2>{service.queuedNames[i]}</h2> : "User"
                    )
                  ) : (
                    <div />
                  )}
                </VStack>
              )}
            </Center>
          </Center>
        ) : (
          <Center
            justifyContent={"center"}
            alignItems="center"
            flexDir={"column"}
          >
            <h2 style={{ marginTop: 50, fontSize: 80 }}>404</h2>

            <h2 style={{ marginTop: 0, fontSize: 18 }}>Wrong service link</h2>
          </Center>
        )}
      </Center>

      {/* <Center>
        <Flex
          w="50%"
          justify={"space-around"}
          align="center"
          bgColor="red"
          h={"3xl"}
          flexDir="column"
        >
          <chakra.h2>Want to Join {id} ?</chakra.h2>
        </Flex>
      </Center> */}
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
