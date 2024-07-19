"use client";

import {
  Box,
  Container,
  SimpleGrid,
  Stack,
  Text,
  Flex,
  Tag,
  Image,
  useColorModeValue,
} from "@chakra-ui/react";
import { ReactNode } from "react";

const Logo = (props: any) => {
  return (
    <Image
      src="/avatars/logo.jpeg"
      alt="Logo"
      borderRadius="full"
      boxSize="150px"
      objectFit="cover"
    />
  );
};

const ListHeader = ({ children }: { children: ReactNode }) => {
  return (
    <Text fontWeight={"500"} fontSize={"lg"} mb={2}>
      {children}
    </Text>
  );
};

export default function LargeWithLogoCentered() {
  const currentYear = new Date().getFullYear();
  return (
    <Box color={useColorModeValue("gray.700", "gray.200")}>
      <Box py={10}>
        <Flex
          align={"center"}
          _before={{
            content: '""',
            borderBottom: "1px solid",
            borderColor: useColorModeValue("gray.200", "gray.700"),
            flexGrow: 1,
            mr: 8,
          }}
          _after={{
            content: '""',
            borderBottom: "1px solid",
            borderColor: useColorModeValue("gray.200", "gray.700"),
            flexGrow: 1,
            ml: 8,
          }}
        >
          <Logo />
        </Flex>
        <Box as="a" href={"/vo.pdf"} download="/vo.pdf">
          <Text
            pt={6}
            fontSize={"md"}
            textAlign={"center"}
            bgGradient="linear(to-r, orange.400 ,#FF7810)"
            bgClip="text"
            fontWeight={600}
          >
            Présentation de V-O
          </Text>
        </Box>
        <Text pt={2} fontSize={"sm"} textAlign={"center"}>
          © {currentYear} Gloire. Tous droits reservés
        </Text>
      </Box>
    </Box>
  );
}
