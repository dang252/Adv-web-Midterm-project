import {
  Flex,
  Stack,
  Box,
  FormControl,
  FormLabel,
  Input,
  Button,
  Heading,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";

import { Link } from "react-router-dom";

import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";

import { useTitle } from "../hooks/useTitle";

import LoginNav from "../components/LoginNav";

interface FormInputs {
  username: string;
  password: string;
}

const Login = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<FormInputs>();

  useTitle("Login");

  const onSubmit = (data: FormInputs) => {
    console.log(data);
  };

  return (
    <div>
      <LoginNav />
      <Flex
        minH={"100vh"}
        align={"center"}
        justify={"center"}
        bg={useColorModeValue("gray.50", "gray.800")}
      >
        <Stack spacing={8} mx={"auto"} minW={"500px"} py={12} px={6}>
          <Stack align={"center"}>
            <Heading fontSize={"4xl"}>Login With Your Account</Heading>
          </Stack>
          <Box
            rounded={"lg"}
            bg={useColorModeValue("white", "gray.700")}
            boxShadow={"lg"}
            p={8}
          >
            <Stack spacing={4}>
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col gap-8"
              >
                <FormControl>
                  <FormLabel htmlFor="username">Username</FormLabel>
                  <Input
                    id="username"
                    type="text"
                    {...register("username", {
                      required: "Username is required",
                    })}
                  />
                  <Text color={"red.400"}>
                    <ErrorMessage errors={errors} name="username" />
                  </Text>
                </FormControl>
                <FormControl>
                  <FormLabel htmlFor="password">Password</FormLabel>
                  <Input
                    id="password"
                    type="password"
                    {...register("password", {
                      required: "Password is required",
                    })}
                  />
                  <Text color={"red.400"}>
                    <ErrorMessage errors={errors} name="password" />
                  </Text>
                </FormControl>
                <Button mt={4} colorScheme="blue" type="submit">
                  Login
                </Button>
              </form>
            </Stack>
          </Box>
          <Flex className="flex gap-1 justify-center">
            <p>Don't have account?</p>
            <Link to="/register">
              <Text color={"blue.400"}>Register now</Text>
            </Link>
          </Flex>
        </Stack>
      </Flex>
    </div>
  );
};

export default Login;
