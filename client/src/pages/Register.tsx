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

import { useTitle } from "../hooks/useTitle";

import { Link } from "react-router-dom";

import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

import RegisterNav from "../components/RegisterNav";

interface FormInputs {
  name: string;
  email: string;
  username: string;
  password: string;
  confirm_password: string;
}

const Register = () => {
  const formSchema = Yup.object().shape({
    name: Yup.string()
      .required("Password is required")
      .min(3, "Password must be at 3 char long"),
    email: Yup.string()
      .required("Password is required")
      .min(3, "Password must be at 3 char long"),
    username: Yup.string()
      .required("Password is required")
      .min(3, "Password must be at 3 char long"),
    password: Yup.string()
      .required("Password is required")
      .min(3, "Password must be at 3 char long"),
    confirm_password: Yup.string()
      .required("Confirm password is required")
      .oneOf([Yup.ref("password")], "Passwords does not match"),
  });

  const formOptions = { resolver: yupResolver(formSchema) };

  // const {
  //   register,
  //   formState: { errors },
  //   handleSubmit,
  // } = useForm<FormInputs>(formOptions);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm(formOptions);

  useTitle("Register");

  const onSubmit = (data: FormInputs) => {
    console.log(data);
  };

  return (
    <div>
      <RegisterNav />
      <Flex
        minH={"100vh"}
        align={"center"}
        justify={"center"}
        bg={useColorModeValue("gray.50", "gray.800")}
      >
        <Flex
          w={{ base: "100%", xl: "90%", "2xl": "70%" }}
          justifyContent={{ base: "center", xl: "space-between" }}
          my={"100px"}
          mx={"auto"}
        >
          <Stack
            spacing={8}
            minW={{ base: "100%", sm: "500px", xl: "40%" }}
            px={6}
          >
            <Stack align={"center"}>
              <Heading fontSize={"4xl"}>Join With Our Team</Heading>
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
                    <FormLabel htmlFor="username">Fullname</FormLabel>
                    <Input id="name" type="text" {...register("name", {})} />
                    <Text color={"red.400"}>
                      <ErrorMessage errors={errors} name="name" />
                    </Text>
                  </FormControl>
                  <FormControl>
                    <FormLabel htmlFor="username">Email</FormLabel>
                    <Input id="email" type="email" {...register("email", {})} />
                    <Text color={"red.400"}>
                      <ErrorMessage errors={errors} name="email" />
                    </Text>
                  </FormControl>
                  <FormControl>
                    <FormLabel htmlFor="username">Username</FormLabel>
                    <Input
                      id="username"
                      type="text"
                      {...register("username", {})}
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
                      {...register("password", {})}
                    />
                    <Text color={"red.400"}>
                      <ErrorMessage errors={errors} name="password" />
                    </Text>
                  </FormControl>
                  <FormControl>
                    <FormLabel htmlFor="password">Confirm Password</FormLabel>
                    <Input
                      id="confirm_password"
                      type="password"
                      {...register("confirm_password", {})}
                    />
                    <Text color={"red.400"}>
                      <ErrorMessage errors={errors} name="confirm_password" />
                    </Text>
                  </FormControl>
                  <Button mt={4} colorScheme="blue" type="submit">
                    Register
                  </Button>
                </form>
              </Stack>
            </Box>
            <Flex className="flex gap-1 justify-center">
              <p>Already have account?</p>
              <Link to="/login">
                <Text color={"blue.400"}>Login now</Text>
              </Link>
            </Flex>
          </Stack>
          <div className="w-[60%] hidden xl:flex items-center">
            <img className="w-[100%]" src="./register.jpg" alt="login_banner" />
          </div>
        </Flex>
      </Flex>
    </div>
  );
};

export default Register;
