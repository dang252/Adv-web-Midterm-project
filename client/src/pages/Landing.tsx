import { useRef } from "react";
import {
  Container,
  Stack,
  Box,
  Heading,
  Text,
  Button,
  Icon,
  SimpleGrid,
} from "@chakra-ui/react";

import { BiSolidMessageDetail } from "react-icons/bi";

import LandingNav from "../components/LandingNav";
import LandingContributor from "../components/LandingContributor";
import LandingFooter from "../components/LandingFooter";

import { useTitle } from "../hooks/useTitle";
import { RootState } from "../redux/store";
import { useSelector } from "react-redux";
import HomeNav from "../components/HomeNav";

const Landing = () => {

  const isLogin = useSelector<RootState, boolean | undefined>(
    (state) => state.user.isLogin
  );
  const lineupRef = useRef(null);

  useTitle("Moodlab | Welcome");

  return (
    <div>
      {isLogin ? <HomeNav /> : <LandingNav lineupRef={lineupRef} />}
      <Container maxW={"7xl"} my={"100px"} p={4}>
        <Stack
          align={"center"}
          spacing={{ base: 8, md: 10 }}
          py={{ base: 20, md: 28 }}
          direction={{ base: "column" }}
        >
          <Stack flex={1} spacing={{ base: 5, md: 10 }}>
            <Heading lineHeight={1.1} fontWeight={600}>
              <Text
                fontSize={{ base: "5xl", sm: "4xl", lg: "6xl" }}
                as={"span"}
                position={"relative"}
                _after={{
                  content: "''",
                  width: "full",
                  height: "30%",
                  position: "absolute",
                  bottom: 1,
                  left: 0,
                  bg: "blue.400",
                  zIndex: -1,
                }}
              >
                Moodlab,
              </Text>
              <br />
              <Text
                fontSize={{ base: "3xl", sm: "4xl", lg: "6xl" }}
                as={"span"}
                color={"blue.400"}
              >
                Welcome to our workspace!
              </Text>
            </Heading>
            <Text color={"gray.500"}>
              We provide solutions to make your learning more professional!
            </Text>
            <Stack
              spacing={{ base: 4, sm: 6 }}
              direction={{ base: "column", sm: "row" }}
            >
              <Button
                rounded={"full"}
                size={"lg"}
                fontWeight={"normal"}
                px={6}
                colorScheme={"blue"}
                bg={"blue.400"}
                _hover={{ bg: "blue.500" }}
              >
                Get started
              </Button>
              <Button
                rounded={"full"}
                size={"lg"}
                fontWeight={"normal"}
                px={6}
                leftIcon={<Icon as={BiSolidMessageDetail} />}
              >
                Learn more
              </Button>
            </Stack>
          </Stack>
        </Stack>
      </Container>
      <Box
        ref={lineupRef}
        maxW={"7xl"}
        mx={"auto"}
        mt={"100px"}
        mb={"200px"}
        p={4}
      >
        <p className="font-bold text-2xl mb-10">Team Lineup</p>
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10}>
          <LandingContributor
            avatar={"./contributor/nhatdang.jpg"}
            name={"Nguyen Nhat Dang"}
            text={"Leader, Developer"}
            facebook={"https://www.facebook.com/dageng.252"}
            github={"https://github.com/dang252"}
          />
          <LandingContributor
            avatar={"./contributor/minhtri.jpg"}
            name={"Le Minh Tri"}
            text={"Developer"}
            facebook={"https://www.facebook.com/minhtrifit"}
            github={"https://github.com/minhtrifit"}
          />
          <LandingContributor
            avatar={"./contributor/giabao.jpg"}
            name={"Tran Gia Bao"}
            text={"Developer"}
            facebook={"https://www.facebook.com/profile.php?id=100010425813591"}
            github={"https://github.com/trangiabao2702"}
          />
        </SimpleGrid>
      </Box>
      <LandingFooter />
    </div>
  );
};

export default Landing;
