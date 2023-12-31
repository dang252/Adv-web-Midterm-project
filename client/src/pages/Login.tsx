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
import { toast } from "react-toastify";
import { useEffect } from "react";

import { Link, useNavigate } from "react-router-dom";

import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { useAppDispatch } from "../redux/hooks";

import { UserAccount } from "../types";
import { loginAccount } from "../redux/reducers/user.reducer";

import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

import { useTitle } from "../hooks/useTitle";

import LoginNav from "../components/LoginNav";
import Loading from "../components/Loading";

// import { axiosInterReq, axiosInterRes } from "../helpers/axios";

interface FormInputs {
  username: string;
  password: string;
}

const Login = () => {
  const dispathAsync = useAppDispatch();
  const navigate = useNavigate();

  const formSchema = Yup.object().shape({
    username: Yup.string()
      .required("Email or Phone is required")
      .min(3, "Email or Phone must be at 3 char long"),
    password: Yup.string()
      .required("Password is required")
      .min(3, "Password must be at 3 char long"),
  });

  const formOptions = { resolver: yupResolver(formSchema) };

  const {
    register,
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm(formOptions);

  useTitle("Moodlab | Login");

  const isLogin = useSelector<RootState, boolean | undefined>(
    (state) => state.user.isLogin
  );

  const isLoading = useSelector<RootState, boolean | undefined>(
    (state) => state.user.isLoading
  );

  // useEffect(() => {
  //   dispathAsync(handleAccessToken());
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  useEffect(() => {
    if (isLogin) {
      navigate("/home");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLogin]);

  const onSubmit = (data: FormInputs) => {
    const UserAccount: UserAccount = {
      username: data.username,
      password: data.password,
    };

    const promise = dispathAsync(loginAccount(UserAccount));

    promise.unwrap().then((res) => {
      console.log("check res:", res);
      navigate("/home");
      toast.success("Login account successfully");
    });

    promise.unwrap().catch((err) => {
      console.log("Check err:", err);
      toast.error("Login account failed");
    });

    reset({
      password: "",
    });
  };

  return (
    <div>
      <LoginNav />
      <Flex
        direction={"column"}
        minH={"100vh"}
        align={"center"}
        justify={"center"}
        bg={useColorModeValue("gray.50", "gray.800")}
      >
        <Stack
          spacing={8}
          mx={"auto"}
          minW={{ base: "90%", md: "500px" }}
          py={12}
          px={6}
        >
          <Stack align={"center"}>
            <Heading fontSize={"4xl"} textAlign={"center"}>
              Login With Your Account
            </Heading>
            {isLoading && (
              <div className="mt-5">
                <Loading />
              </div>
            )}
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
                  <FormLabel htmlFor="username">Email or Phone</FormLabel>
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
