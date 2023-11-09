import {
  Box,
  Flex,
  Avatar,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useColorModeValue,
  Stack,
  useColorMode,
  Center,
} from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";

// Reduc/redux-toolkit config import
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { Link } from "react-router-dom";

const HomeNav = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  const name = useSelector<RootState, string>((state) => state.user.name);

  return (
    <>
      <Box bg={useColorModeValue("gray.100", "gray.900")} px={14}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <Flex gap={5}>
            <Link to="/home">
              <div className="w-[150px]">
                <img className="w-[100%]" src="./moodlab-logo.jpg" alt="logo" />
              </div>
            </Link>
          </Flex>

          <Flex alignItems={"center"}>
            <Stack direction={"row"} spacing={7}>
              <Button onClick={toggleColorMode}>
                {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
              </Button>

              <Menu>
                <MenuButton
                  as={Button}
                  rounded={"full"}
                  variant={"link"}
                  cursor={"pointer"}
                  minW={0}
                >
                  <Avatar
                    size={"sm"}
                    src={"https://avatars.dicebear.com/api/male/username.svg"}
                  />
                </MenuButton>
                <MenuList alignItems={"center"}>
                  <br />
                  <Center>
                    <Avatar
                      size={"xl"}
                      src={"https://avatars.dicebear.com/api/male/username.svg"}
                    />
                  </Center>
                  <br />
                  <Center>
                    <p>{name}</p>
                  </Center>
                  <br />
                  <MenuDivider />
                  <Link to="/home/edit">
                    <MenuItem>Edit Profile</MenuItem>
                  </Link>
                  <MenuItem>Logout</MenuItem>
                </MenuList>
              </Menu>
            </Stack>
          </Flex>
        </Flex>
      </Box>
    </>
  );
};

export default HomeNav;
