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

import { UserAccount } from "../types";

import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
// import { useAppDispatch } from "../redux/hooks";

import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

import Loading from "../components/Loading";

interface FormInputs {
  name: string;
  phone: string;
  email: string;
}

const EditProfile = () => {
  const isLoading = useSelector<RootState, boolean | undefined>(
    (state) => state.user.isLoading
  );

  const formSchema = Yup.object().shape({
    name: Yup.string()
      .required("Name is required")
      .min(3, "Name must be at 3 char long"),
    email: Yup.string()
      .required("Password is required")
      .min(3, "Password must be at 3 char long"),
    phone: Yup.string()
      .required("Phone is required")
      .min(10, "Phone must be at 10 char long"),
  });

  const formOptions = { resolver: yupResolver(formSchema) };

  const {
    register,
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm(formOptions);

  const onSubmit = async (data: FormInputs) => {
    const UserAccount: UserAccount = {
      name: data.name,
      phone: data.phone,
      email: data.email,
    };

    console.log(UserAccount);

    reset({
      name: "",
      email: "",
      phone: "",
    });
  };

  return (
    <div>
      <Flex
        direction={"column"}
        minH={"90vh"}
        align={"center"}
        // justify={"center"}
        bg={useColorModeValue("gray.50", "gray.800")}
      >
        <Flex
          w={{ base: "100%", xl: "90%", "2xl": "70%" }}
          // justifyContent={{ base: "center", xl: "space-between" }}
          justifyContent={{ base: "center" }}
          my={"100px"}
          mx={"auto"}
        >
          <Stack
            spacing={8}
            minW={{ base: "100%", sm: "500px", xl: "40%" }}
            px={6}
          >
            <Stack align={"center"}>
              <Heading fontSize={"4xl"}>Edit Account Profile</Heading>
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
                    <FormLabel htmlFor="name">Name</FormLabel>
                    <Input id="name" type="text" {...register("name", {})} />
                    <Text color={"red.400"}>
                      <ErrorMessage errors={errors} name="name" />
                    </Text>
                  </FormControl>

                  <FormControl>
                    <FormLabel htmlFor="email">Email</FormLabel>
                    <Input id="email" type="email" {...register("email", {})} />
                    <Text color={"red.400"}>
                      <ErrorMessage errors={errors} name="email" />
                    </Text>
                  </FormControl>

                  <FormControl>
                    <FormLabel htmlFor="phone">Phone</FormLabel>
                    <Input id="phone" type="text" {...register("phone", {})} />
                    <Text color={"red.400"}>
                      <ErrorMessage errors={errors} name="phone" />
                    </Text>
                  </FormControl>

                  <Button mt={4} colorScheme="blue" type="submit">
                    Edit
                  </Button>
                </form>
              </Stack>
            </Box>
          </Stack>
        </Flex>
      </Flex>
    </div>
  );
};

export default EditProfile;
