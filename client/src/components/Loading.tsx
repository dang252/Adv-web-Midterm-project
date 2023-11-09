import { Spinner, Text } from "@chakra-ui/react";

const Loading = () => {
  return (
    <div className="flex flex-col items-center gap-3">
      <Spinner size="lg" color="blue.400" />
      <Text fontSize="2xl" fontWeight={"bold"} color="blue.400">
        Please wait...
      </Text>
    </div>
  );
};

export default Loading;
