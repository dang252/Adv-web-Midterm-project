import {
  Text,
  Box,
  Flex,
  Image,
  Button,
  useColorModeValue,
  useColorMode,
} from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";

interface PropType {
  lineupRef: any;
}

const LandingNav = (props: PropType) => {
  const { lineupRef } = props;

  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <div className="fixed w-[100%] top-0 z-20">
      <Box
        bg={useColorModeValue("gray.100", "gray.900")}
        px={14}
        py={{ base: 4, md: 2 }}
      >
        <Flex
          flexDirection={{ base: "column", md: "row" }}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <div className="flex gap-3 flex-col items-center mb-6 md:mb-0 md:flex-row md:gap-10">
            <Link to="/">
              <div className="w-[150px]">
                <img className="w-[100%]" src="./moodlab-logo.jpg" alt="logo" />
              </div>
            </Link>
            <Flex gap={5}>
              <Box
                className="hover:text-blue-400 hover:cursor-pointer"
                onClick={() => {
                  window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
                }}
              >
                Home
              </Box>
              <Box
                className="hover:text-blue-400 hover:cursor-pointer"
                onClick={() => {
                  lineupRef.current?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                About
              </Box>
            </Flex>
          </div>

          <Flex alignItems={"center"}>
            <Flex alignItems={"center"} gap={5}>
              <Button onClick={toggleColorMode}>
                {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
              </Button>
              <Link to="/login">
                <Text fontWeight={"bold"} as={"span"} color={"blue.400"}>
                  Login
                </Text>
              </Link>
              <Link to="/register">
                <Button colorScheme="blue">Register</Button>
              </Link>
            </Flex>
          </Flex>
        </Flex>
      </Box>
    </div>
  );
};

export default LandingNav;
