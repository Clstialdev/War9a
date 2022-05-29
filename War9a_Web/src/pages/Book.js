import {
  chakra,
  useColorModeValue,
  Image,
  Flex,
  Button,
  Stack,
  Box,
  SimpleGrid,
  Input,
  InputGroup,
  InputRightAddon,
  Center,
  VStack,
} from "@chakra-ui/react";
import { useSpring, animated } from "react-spring";
import { useEffect, useRef, useState } from "react";

import {
  collection,
  getDocs,
  query,
  where,
  doc,
  onSnapshot,
} from "firebase/firestore";

import { useSearchParams } from "react-router-dom";

import noQueueImg from "../images/NoQueue.png";
import noQueueImgPurple from "../images/NoQueuePurple.png";

import { IoMdMedical, IoMdClose, IoMdCalendar } from "react-icons/io";

import { MdFastfood, MdPinDrop } from "react-icons/md";

import { HiScissors } from "react-icons/hi";

import { RiFilePaper2Fill, RiBankFill, RiLeafLine } from "react-icons/ri";

import { Header } from "../components/Header";

export const Book = ({ db }) => {
  const [searchParams] = useSearchParams();
  const filter = searchParams.get("filter");

  const tags = [
    {
      title: "Doctor",
      color: "#F0635A",
      icon: <IoMdMedical size={20} color="white" />,
    },
    {
      title: "Barber",
      color: "#F59762",
      icon: <HiScissors size={20} color="white" />,
    },
    {
      title: "Food",
      color: "#25855A",
      icon: <MdFastfood size={20} color="white" />,
    },
    {
      title: "Services",
      color: "#4299E1",
      icon: <RiFilePaper2Fill size={20} color="white" />,
    },
    {
      title: "Banking",
      color: "#9F7AEA",
      icon: <RiBankFill size={20} color="white" />,
    },
    {
      title: "Care",
      color: "#FBB6CE",
      icon: <RiLeafLine size={20} color="white" />,
    },
  ];

  const [selectedTags, setSelectedTags] = useState([]);

  const handleTagPress = (index, key) => {
    let tempSelectedTags = [...selectedTags];
    let exists = false;

    selectedTags.map((val, i) => (val.title == key ? (exists = true) : <></>));

    if (!exists) {
      setSelectedTags([...selectedTags, tags[index]]);
    } else {
      tempSelectedTags = tempSelectedTags.filter((val, i) => {
        return val.title != key;
      });
      setSelectedTags(tempSelectedTags);
    }
    // console.log(selectedTags);
  };

  const draggable = useRef(null);

  useEffect(() => {
    if (draggable !== null) {
      draggable.current.scrollTop = 100;
      draggable.current.scrollLeft = 150;
    }
  }, []);

  let pos = { top: 0, left: 0, x: 0, y: 0 };

  const mouseDownHandler = function (e) {
    pos = {
      // The current scroll
      left: draggable.current.scrollLeft,
      top: draggable.current.scrollTop,
      // Get the current mouse position
      x: e.clientX,
      y: e.clientY,
    };

    document.addEventListener("mousemove", mouseMoveHandler);
    document.addEventListener("mouseup", mouseUpHandler);
  };

  const mouseMoveHandler = function (e) {
    // How far the mouse has been moved
    const dx = e.clientX - pos.x;
    const dy = e.clientY - pos.y;

    // Scroll the draggable.currentment
    draggable.current.scrollTop = pos.top - dy;
    draggable.current.scrollLeft = pos.left - dx;
  };

  const mouseUpHandler = function () {
    document.removeEventListener("mousemove", mouseMoveHandler);
    document.removeEventListener("mouseup", mouseUpHandler);
  };

  const draggableTags = useRef(null);

  useEffect(() => {
    if (draggableTags !== null) {
      draggableTags.current.scrollTop = 100;
      draggableTags.current.scrollLeft = 0;
    }
  }, []);

  let posTags = { top: 0, left: 0, x: 0, y: 0 };

  const mouseDownHandlerTags = function (e) {
    posTags = {
      // The current scroll
      left: draggableTags.current.scrollLeft,
      top: draggableTags.current.scrollTop,
      // Get the current mouse position
      x: e.clientX,
      y: e.clientY,
    };

    document.addEventListener("mousemove", mouseMoveHandlerTags);
    document.addEventListener("mouseup", mouseUpHandlerTags);
  };

  const mouseMoveHandlerTags = function (e) {
    // How far the mouse has been moved
    const dx = e.clientX - posTags.x;
    const dy = e.clientY - posTags.y;

    // Scroll the draggableTags.currentment
    draggableTags.current.scrollTop = posTags.top - dy;
    draggableTags.current.scrollLeft = posTags.left - dx;
  };

  const mouseUpHandlerTags = function () {
    document.removeEventListener("mousemove", mouseMoveHandlerTags);
    document.removeEventListener("mouseup", mouseUpHandlerTags);
  };

  //Firebase

  const [search, setSearch] = useState("");
  const [results, setResults] = useState();
  const [activeService, setActiveService] = useState(0);

  const [queue, setQueue] = useState();
  const [queueNames, setQueueNames] = useState(undefined);
  const [currentQueue, setCurrentQueue] = useState(0);
  const [laneTypesLength, setLaneTypesLength] = useState(0);

  const handleServicePress = async (i) => {
    if (i !== activeService) {
      setLaneTypesLength(0);
      setActiveService(i);
      // getQueue();
    }
  };

  const getResults = async () => {
    if (filter === null || search !== "") {
      const Query = query(
        collection(db, "services2"),
        where("nameAsArray", "array-contains", search.trim().toLowerCase())
      );
      const querySnapshot = await getDocs(Query);

      let docsArray = [];
      querySnapshot.forEach((doc) => {
        // console.log(doc.id, " => ", doc.data());
        docsArray.push(doc);
      });
      setResults(docsArray);
    } else {
      const Query = query(
        collection(db, "services2"),
        where("tags", "array-contains", filter.toLowerCase())
      );
      const querySnapshot = await getDocs(Query);

      // console.log("test")
      let docsArray = [];
      querySnapshot.forEach((doc) => {
        // console.log(doc.id, " => ", doc.data());
        docsArray.push(doc);
      });

      setResults(docsArray);
    }
  };

  useEffect(() => {
    if (search !== "" || filter !== null) {
      getResults();
    }
    setLaneTypesLength(0);
    // console.log(filter)
  }, [search]);

  const getQueue = async () => {
    // const querySnapshot = await getDoc(doc(db, "services2", serviceId));
    // setQueue(querySnapshot.data()?.queued);
    // setQueueNames(querySnapshot.data()?.queuedNames);
    setLaneTypesLength(0);

    const unsub = onSnapshot(
      doc(db, "services2", results[activeService].id),
      (doc) => {
        const isLegacyService =
          !doc.data()?.laneTypes ||
          (doc.data()?.laneTypes && doc.data()?.laneTypes.length === 0);

        if (isLegacyService) {
          setQueue(doc.data()?.queued[0].data);
          //   setQueueNames(doc.data()?.queued);
        } else {
          console.log(doc.data()?.laneTypes.length);

          setLaneTypesLength(doc.data()?.laneTypes.length);
          setQueue(doc.data()?.queued[currentQueue].ids);
          // setQueueNames(doc.data()?.queued[currentQueue].names);
          // setQueuePushTokens(doc.data()?.queued[currentQueue].pushTokens);
        }
        // setDocData(doc.data());
      }
    );

    console.log(queue);
  };

  useEffect(() => {
    setLaneTypesLength(0);
    if (results && results[0] !== undefined) {
      getQueue();
    }
  }, [results, activeService, currentQueue]);

  return (
    <Box w="100%" h="100%">
      <Header />

      <SimpleGrid columns={[1, 1, 1, 2]} p="25px 5% 0 5%" w="100%">
        <InputGroup mr={5}>
          <Input
            placeholder="Find Food, Barber, Medic, etc..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <InputRightAddon children=">" fontWeight={"bold"} />
        </InputGroup>

        {/* <Flex ml={[0,0,0,5]} justifyContent="space-evenly" mt={[5,5,5,0]} position={["absolute", "inherit"]} overflowX="scroll">
                    {tags.map((tag, index)=><Tag key={index} title={tag.title} color={tag.color} icon={tag.icon} onClick={()=>handleTagPress(index, tag.title)}/>)}
                </Flex> */}

        <Stack
          ref={draggableTags}
          borderRadius={10}
          maxW={["full"]}
          h={70}
          overflowX="scroll"
          direction={"row"}
          ml={[0, 0, 0, 5]}
          mt={[5, 5, 5, 0]}
        >
          {tags.map((tag, index) => (
            <Tag
              key={index}
              fw={true}
              title={tag.title}
              color={tag.color}
              icon={tag.icon}
              onClick={() => handleTagPress(index, tag.title)}
              mouseDownHandler={mouseDownHandlerTags}
            />
          ))}
        </Stack>
      </SimpleGrid>

      <Stack
        borderRadius={10}
        w={["90%", "90%", "90%", "45.2%"]}
        maxW={["full"]}
        overflowX="scroll"
        direction={"row"}
        ml={"5%"}
      >
        {selectedTags.map((tag, index) => (
          <Tag
            key={index}
            title={tag.title}
            color={tag.color}
            icon={<IoMdClose size={20} color="white" />}
            onClick={() => handleTagPress(index, tag.title)}
          />
        ))}
      </Stack>

      <SimpleGrid columns={{ lg: 2, md: 1, sm: 1 }} p="25px 5%" h={"80vh"}>
        <SimpleGrid columns={1}>
          <chakra.h3>Results</chakra.h3>
          <Flex
            ref={draggable}
            mt={10}
            flexDirection={{ lg: "column", md: "row", sm: "row" }}
            maxW={["full"]}
            overflowX="scroll"
            borderRadius={10}
          >
            {results &&
              results.map((service, index) =>
                selectedTags[0] === undefined ? (
                  <ServiceCard
                    key={index}
                    index={index}
                    image={service.data().image}
                    tpc={service.data().tpc}
                    name={service.data().name}
                    description={service.data().description}
                    active={activeService === index ? true : false}
                    setActiveService={handleServicePress}
                    mouseDownHandler={mouseDownHandler}
                  />
                ) : service.data().tags &&
                  selectedTags
                    .map((tag) =>
                      service.data().tags.includes(tag.title.toLowerCase())
                        ? true
                        : false
                    )
                    .includes(true) ? (
                  <ServiceCard
                    key={index}
                    index={index}
                    image={service.data().image}
                    tpc={service.data().tpc}
                    name={service.data().name}
                    description={service.data().description}
                    active={activeService === index ? true : false}
                    setActiveService={handleServicePress}
                    mouseDownHandler={mouseDownHandler}
                  />
                ) : (
                  <></>
                )
              )}
          </Flex>
        </SimpleGrid>
        <Flex
          w={"100%"}
          justifyContent="center"
          alignContent={"center"}
          p={["0", "10"]}
          borderLeft={{ lg: "solid rgba(255,255,255,0.2) 2px", md: "" }}
        >
          {results && results[0] ? (
            <Center flexDirection="column" justifyContent="flex-start">
              <Image
                src={results[activeService].data().image}
                borderRadius={10}
                maxH={"40%"}
              />
              <chakra.h5
                fontSize={30}
                textAlign="center"
                fontWeight={"bold"}
                mt={5}
              >
                {results[activeService].data().name}
              </chakra.h5>
              <SimpleGrid columns={[1, 1, 1, 2]} w="100%" spacingX={3} mb={10}>
                <DetailCard
                  text={
                    "Joined " +
                    results[activeService]
                      .data()
                      .created.toDate()
                      .toLocaleDateString("en-US", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })
                  }
                  description={
                    results[activeService].data().openCloseDates
                      ? results[activeService].data().openCloseDates
                      : "Tuesday - Friday, 4:00PM - 9:00PM"
                  }
                  icon={<IoMdCalendar size={25} color="#25855A" />}
                />
                <DetailCard
                  text={"Location"}
                  description={results[activeService].data().address}
                  icon={<MdPinDrop size={25} color="#25855A" />}
                />
              </SimpleGrid>
              <Button backgroundColor="#25855A" p="0 10%">
                <chakra.h5 color="white">Contact</chakra.h5>
              </Button>

              <Center
                flexDirection="column"
                justifyContent="flex-start"
                borderTop={"solid rgba(255,255,255,0.2) 2px"}
                mt={10}
                w="full"
              >
                {/* {laneTypesLength === 0 ? ( */}

                {1 ? (
                  !queue || (queue && queue.length === 0) ? (
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
                          // results[activeService].data().queuedNames !== undefined ? <h2>{results[activeService].data().queuedNames[i]}</h2> : "User"
                        )
                      ) : (
                        <div />
                      )}
                    </VStack>
                  )
                ) : !results[activeService].data() ||
                  (results[activeService].data().queued[currentQueue].ids &&
                    results[activeService].data().queued[currentQueue].ids
                      .length === 0) ? (
                  <QueueEmpty />
                ) : (
                  // "none"
                  <VStack
                    style={{ display: "flex", maxHeight: "75%", marginTop: 20 }}
                    pos="relative"
                    w="full"
                  >
                    {results[activeService].data() &&
                    results[activeService].data().queued[currentQueue].ids ? (
                      results[activeService]
                        .data()
                        .queued[currentQueue].ids.map(
                          (userID, i) => (
                            <QueueTicket
                              key={userID}
                              index={i + 1}
                              userName={
                                results[activeService].data().queued[
                                  currentQueue
                                ].names !== undefined
                                  ? results[activeService].data().queued[
                                      currentQueue
                                    ].names[i]
                                  : "User"
                              }
                            />
                          )
                          // results[activeService].data().queued[currentQueue].names !== undefined ? <h2>{results[activeService].data().queued[currentQueue].names[i]}</h2> : "User"
                        )
                    ) : (
                      <div />
                    )}
                  </VStack>
                )}
              </Center>
            </Center>
          ) : (
            <h2>No Service Selected</h2>
          )}
        </Flex>
      </SimpleGrid>
    </Box>
  );
};

export const Tag = ({ title, color, icon, onClick, fw, mouseDownHandler }) => {
  return (
    <Button
      bgColor={color}
      leftIcon={icon}
      onClick={onClick}
      minWidth={"100px"}
      width={fw ? "100%" : 100 / 7 + "%"}
      onMouseDown={(e) => mouseDownHandler(e)}
    >
      <chakra.h5 color="white">{title}</chakra.h5>
    </Button>
  );
};

export const ServiceCard = ({
  index,
  image,
  tpc,
  name,
  description,
  active = false,
  setActiveService,
  mouseDownHandler,
}) => {
  // Animations
  const expand = useSpring({
    config: { friction: 30 },
    width: active ? "90%" : "50%",
  });

  return (
    <animated.div style={expand}>
      <Flex
        h={"150px"}
        minW="300px"
        mr="20px"
        transition="ease-in-out"
        p={"15px"}
        bgColor={useColorModeValue(
          !active ? "white" : "#E0FFD6",
          !active ? "gray.700" : "#68D391A5"
        )}
        borderRadius={10}
        mb={5}
        onMouseDown={(e) => mouseDownHandler(e)}
        onClick={() => setActiveService(index)}
        cursor="pointer"
        boxShadow={[
          "1px 2px 20px rgba(0,0,0,0.2)",
          "1px 2px 20px rgba(0,0,0,0.05)",
        ]}
      >
        <Image src={image} objectFit="cover" boxSize={128} borderRadius={10} />
        <Flex
          ml={5}
          flexDirection="column"
          justifyContent={"center"}
          overflow="hidden"
        >
          <chakra.h5
            color={active ? "green.700" : "green"}
            display={[
              active ? "block" : "none",
              active ? "block" : "none",
              "block",
            ]}
          >
            {(tpc / 60000).toFixed(0) + "mins"}
          </chakra.h5>
          <chakra.h3
            fontSize={17}
            fontWeight="bold"
            display={[
              active ? "block" : "none",
              active ? "block" : "none",
              "block",
            ]}
          >
            {name}
          </chakra.h3>
          <chakra.h5 display={["none", "none", "block"]}>
            {description.substr(0, 60) + "..."}
          </chakra.h5>
        </Flex>
      </Flex>
    </animated.div>
  );
};

export const DetailCard = ({ text, description, icon }) => {
  return (
    <Box
      style={styles.container}
      bgColor={useColorModeValue("gray.200", "gray.700")}
      p={"10px 7px"}
      borderRadius={10}
    >
      <Box style={styles.iconContainer}>{icon}</Box>
      <Box>
        <chakra.h2 style={styles.text}>
          {text ? text : "Pass a text={''} param"}
        </chakra.h2>
        <chakra.h2
          fontSize={13}
          color={useColorModeValue("rgba(0,0,0,0.44)", "gray.400")}
        >
          {description ? description : "Pass a description={''} param"}
        </chakra.h2>
      </Box>
    </Box>
  );
};

const styles = {
  container: {
    width: "100%",
    display: "flex",
    // justifyContent: 'center',
    alignItems: "center",
    flexDirection: "row",
    marginTop: 20,
  },
  iconContainer: {
    height: 45,
    width: 45,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(37,133,90,0.2)",
    marginRight: 10,
    borderRadius: 10,
  },
  text: {
    fontSize: 18.5,
    paddingBottom: 2,
  },
  description: {
    fontSize: 13,
  },
};

export const QueueTicket = ({
  index,
  userName,
  color = "#25855A",
  selfAdded = true,
}) => {
  return (
    <Flex
      style={queueTicketStyle.container}
      minH={100}
      flexDirection="column"
      bgColor={useColorModeValue("rgba(247,247,247,1)", "gray.700")}
    >
      <h5 style={{ ...queueTicketStyle.smallNumber, color: color }}>
        #{index}
      </h5>
      <h5 style={queueTicketStyle.userName}>{userName}</h5>
      <h5 style={{ ...queueTicketStyle.bigNumber, color: color }}>#{index}</h5>
      <h5 style={queueTicketStyle.selfAdded}>
        {selfAdded ? "Self Added" : "Added by service owner"}
      </h5>
    </Flex>
  );
};

const queueTicketStyle = {
  container: {
    display: "flex",
    justifyContent: "center",
    paddingLeft: "5%",
    paddingRight: "5%",
    height: 110,
    width: "100%",
    borderRadius: 12,
    marginBottom: 20,
    shadowColor: "black",
    shadowOpacity: 0.05,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 10 },
    elevation: 5,
    marginLeft: "7.5%",
    marginRight: "7.5%",
    position: "relative",
  },
  smallNumber: {
    color: "#25855A",
    position: "absolute",
    left: "5%",
    top: "5%",
  },
  userName: {
    fontSize: 25,
    fontWeight: "bold",
  },
  bigNumber: {
    position: "absolute",
    fontSize: 60,
    fontWeight: "600",
    right: "5%",
    top: "0%",
    opacity: 0.4,
  },
  selfAdded: {
    position: "absolute",
    bottom: "5%",
    right: "5%",
    opacity: 0.3,
  },
};

export const QueueEmpty = ({ workMode = false }) => {
  return (
    <Flex
      style={{
        marginTop: "auto",
        marginBottom: "auto",
        width: "100%",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 20,
      }}
    >
      {useColorModeValue(
        <Image src={noQueueImg} />,
        <Image src={noQueueImgPurple} />
      )}

      <h3 style={{ textAlign: "center", fontSize: 22.5, paddingTop: 30 }}>
        {"Queue is empty"}
      </h3>
      <h3
        style={{
          textAlign: "center",
          fontSize: 17.5,
          paddingTop: 10,
          maxWidth: "70%",
          opacity: 0.4,
        }}
      >
        {"be the first to join in!"}
      </h3>
    </Flex>
  );
};
