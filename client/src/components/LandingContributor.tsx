import { Flex, Text, Icon } from "@chakra-ui/react";

import { AiFillGithub } from "react-icons/ai";
import { BsFacebook } from "react-icons/bs";
import { Link } from "react-router-dom";

interface PropType {
  avatar: string;
  name: string;
  text: string;
  facebook: string;
  github: string;
}

interface FeatureProps {
  avatar: string;
  name: string;
  text: string;
  facebook: string;
  github: string;
}

const Feature = ({ name, text, avatar, facebook, github }: FeatureProps) => {
  return (
    <Flex direction={"column"} alignItems={"center"}>
      <img
        className="w-[200px] h-[200px] object-cover rounded-full mb-5"
        src={avatar}
        alt="contributor"
      />
      <Flex direction={"column"} alignItems={"center"} gap={3}>
        <Text fontWeight={600}>{name}</Text>
        <Text color={"gray.600"}>{text}</Text>
        <Flex gap={3}>
          <Link to={facebook}>
            <Icon fontSize={30} as={BsFacebook} />
          </Link>
          <Link to={github}>
            <Icon fontSize={30} as={AiFillGithub} />
          </Link>
        </Flex>
      </Flex>
    </Flex>
  );
};

const LandingContributor = (props: PropType) => {
  const { avatar, name, text, facebook, github } = props;

  return (
    <Feature
      avatar={avatar}
      name={name}
      text={text}
      facebook={facebook}
      github={github}
    />
  );
};

export default LandingContributor;
