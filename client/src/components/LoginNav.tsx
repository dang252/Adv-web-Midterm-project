import {
  Box,
  Flex,
  Button,
  useColorModeValue,
  useColorMode,
} from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";

const LoginNav = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <div className="fixed w-[100%] top-0 z-20">
      <Box
        bg={useColorModeValue("gray.100", "gray.900")}
        px={14}
        py={{ base: 4, md: 2 }}
      >
        <Flex alignItems={"center"} justifyContent={"space-between"}>
          <Flex gap={5}>
            <Link to="/">
              <div className="w-[150px]">
                <img className="w-[100%]" src="./moodlab-logo.jpg" alt="logo" />
              </div>
            </Link>
          </Flex>

          <Flex alignItems={"center"}>
            <Flex alignItems={"center"} gap={5}>
              <Button onClick={toggleColorMode}>
                {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
              </Button>
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

export default LoginNav;
