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
  HStack,
  IconButton,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { ReactNode } from "react";
import { FaInstagram } from "react-icons/fa";

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
  const router = useRouter();
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
            Télécharger la présentation de V-O
          </Text>
        </Box>
        <Text pt={2} fontSize={"sm"} textAlign={"center"}>
          © {currentYear} Gloire. Tous droits reservés
        </Text>

        <Flex justifyContent={"center"} pt={2}>
          <Image
            src="/Instagram_icon.png"
            rounded={"full"}
            alt="Instagram"
            boxSize="30px"
            cursor="pointer"
            _hover={{ transform: "scale(1.1)" }}
            onClick={() =>
              router.push(
                "https://www.instagram.com/visite_aux_orphelins_?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
              )
            }
          />
        </Flex>
      </Box>
    </Box>
  );
}
