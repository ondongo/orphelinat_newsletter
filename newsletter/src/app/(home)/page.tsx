"use client";

import { NewsletterSchema, NewsletterType } from "@/schemas";
import {
  Box,
  Flex,
  Stack,
  Heading,
  Text,
  Container,
  Input,
  Button,
  SimpleGrid,
  Avatar,
  AvatarGroup,
  useBreakpointValue,
  IconProps,
  Icon,
  useToast,
  Spinner,
  FormErrorMessage,
  FormControl,
} from "@chakra-ui/react";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

const avatars = [
  {
    name: "opherlins",
    url: "/avatars/logo.jpeg",
  },
  {
    name: "Orphelins",
    url: "/avatars/oph1.jpeg",
  },
  {
    name: "Vistes Orphelins",
    url: "/avatars/groupe1.jpeg",
  },
  {
    name: "Vistes Orphelins",
    url: "",
  },
  {
    name: "Prince ONDONGO",
    url: "/avatars/groupe2.jpeg",
  },
];

const Blur = (props: IconProps) => {
  return (
    <Icon
      width={useBreakpointValue({ base: "100%", md: "40vw", lg: "30vw" })}
      zIndex={useBreakpointValue({ base: -1, md: -1, lg: 0 })}
      height="560px"
      viewBox="0 0 528 560"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <circle cx="71" cy="61" r="111" fill="#F56565" />
      <circle cx="244" cy="106" r="139" fill="#E2872E" />
      <circle cy="291" r="139" fill="#F2C678" />
      <circle cx="80.5" cy="189.5" r="101.5" fill="#EDB846" />
      <circle cx="196.5" cy="317.5" r="101.5" fill="#ECC94B" />
      <circle cx="70.5" cy="458.5" r="101.5" fill="#48BB78" />
      <circle cx="426.5" cy="-0.5" r="101.5" fill="#FF7810" />
    </Icon>
  );
};

export default function JoinOurTeam() {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<NewsletterType>({
    resolver: zodResolver(NewsletterSchema),
    mode: "all",
  });

  const [loading, setLoading] = useState<boolean>(false);
  const toast = useToast();
  const handleNewsletter = async (data: NewsletterType) => {
    try {
      setLoading(true);

      const response = await fetch(`${process.env.NEXT_PUBLIC_HOST_URL}/api/sendmail`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: data.email,
          name: data.name,
          phone: data.phone,
        }),
      });

      if (response.ok) {
        toast({
          title: "Success!",
          description: "Votre demande a été envoyée avec succès.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      } else {
        toast({
          title: "Erreur",
          description:
            "Une erreur est survenue lors de l'envoi de votre demande.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
        console.error("Erreur : problème avec la réponse du serveur.");
      }
    } catch (error) {
      toast({
        title: "Erreur",
        description:
          "Une erreur est survenue lors de l'envoi de votre demande.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      console.error("Erreur :", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <Box position={"relative"}>
      <Container
        as={SimpleGrid}
        maxW={"7xl"}
        columns={{ base: 1, md: 2 }}
        spacing={{ base: 10, lg: 32 }}
        py={{ base: 10, sm: 20, lg: 32 }}
      >
        <Stack spacing={{ base: 10, md: 20 }}>
          <Heading
            lineHeight={1.1}
            fontSize={{ base: "3xl", sm: "4xl", md: "5xl", lg: "6xl" }}
          >
            Partagez Notre Vision{" "}
            <Text
              as={"span"}
              bgGradient="linear(to-r, #FF7810, yellow.400)"
              bgClip="text"
            >
              &
            </Text>{" "}
            Transformez des Vies
          </Heading>
          <Stack direction={"row"} spacing={4} align={"center"}>
            <AvatarGroup>
              {avatars.map((avatar) => (
                <Avatar
                  key={avatar.name}
                  name={avatar.name}
                  src={avatar.url}
                  // eslint-disable-next-line react-hooks/rules-of-hooks
                  size={useBreakpointValue({ base: "md", md: "lg" })}
                  position={"relative"}
                  zIndex={2}
                  _before={{
                    content: '""',
                    width: "full",
                    height: "full",
                    rounded: "full",
                    transform: "scale(1.125)",
                    bgGradient: "linear(to-bl, #FF7810, yellow.400)",
                    position: "absolute",
                    zIndex: -1,
                    top: 0,
                    left: 0,
                  }}
                />
              ))}
            </AvatarGroup>
            <Text fontFamily={"heading"} fontSize={{ base: "4xl", md: "6xl" }}>
              +
            </Text>
            <Flex
              align={"center"}
              justify={"center"}
              fontFamily={"heading"}
              fontSize={{ base: "sm", md: "lg" }}
              bg={"gray.800"}
              color={"white"}
              rounded={"full"}
              minWidth={useBreakpointValue({ base: "44px", md: "60px" })}
              minHeight={useBreakpointValue({ base: "44px", md: "60px" })}
              position={"relative"}
              _before={{
                content: '""',
                width: "full",
                height: "full",
                rounded: "full",
                transform: "scale(1.125)",
                bgGradient: "linear(to-bl, orange.400,yellow.400)",
                position: "absolute",
                zIndex: -1,
                top: 0,
                left: 0,
              }}
            >
              TOI
            </Flex>
          </Stack>
        </Stack>
        <Stack
          bg={"gray.50"}
          rounded={"xl"}
          p={{ base: 4, sm: 6, md: 8 }}
          spacing={{ base: 8 }}
          maxW={{ lg: "lg" }}
        >
          <Stack spacing={4}>
            <Heading
              color={"gray.800"}
              lineHeight={1.1}
              fontSize={{ base: "2xl", sm: "3xl", md: "4xl" }}
            >
              Rejoignez notre Mission : Abonnez-vous à
              <Text
                as={"span"}
                bgGradient="linear(to-bl, #FF7810, orange.400)"
                bgClip="text"
                ml={"10px"}
              >
                V-O !
              </Text>
            </Heading>
            <Text color={"gray.500"} fontSize={{ base: "sm", sm: "md" }}>
              Recevez des nouvelles et des mises à jour sur notre mission pour
              aider les orphelins. Abonnez-vous pour être informé de nos actions
              et événements !
            </Text>
          </Stack>
          <Box as={"form"} mt={10} onSubmit={handleSubmit(handleNewsletter)}>
            <Stack spacing={4}>
              <FormControl isInvalid={!!errors.name}>
                <Input
                  id="name"
                  placeholder="Votre nom "
                  bg={"gray.100"}
                  border={0}
                  color={"gray.500"}
                  _placeholder={{
                    color: "gray.500",
                  }}
                  {...register("name")}
                  borderColor={errors.name ? "red.500" : "transparent"}
                />
                <FormErrorMessage>{errors.name?.message}</FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={!!errors.email}>
                <Input
                  id="email"
                  placeholder="Votre email"
                  bg={"gray.100"}
                  border={0}
                  color={"gray.500"}
                  _placeholder={{
                    color: "gray.500",
                  }}
                  {...register("email")}
                  borderColor={errors.email ? "red.500" : "transparent"}
                />
                {errors.email && (
                  <FormErrorMessage>{errors.email.message}</FormErrorMessage>
                )}
              </FormControl>

              <FormControl isInvalid={!!errors.phone}>
                <Input
                  id="phone"
                  placeholder="(+__) __-___-___"
                  bg={"gray.100"}
                  border={0}
                  color={"gray.500"}
                  _placeholder={{
                    color: "gray.500",
                  }}
                  {...register("phone")}
                  borderColor={errors.phone ? "red.500" : "transparent"}
                />
                <FormErrorMessage>{errors.phone?.message}</FormErrorMessage>
              </FormControl>
            </Stack>
            <Button
              type="submit"
              fontFamily={"heading"}
              mt={8}
              w={"full"}
              bgGradient={"linear(to-r,  orange.500,yellow.400,)"}
              color={"white"}
              _hover={{
                bgGradient: "linear(to-r, orange.400, yellow.400)",
                boxShadow: "xl",
              }}
            >
              {loading ? <Spinner color="white" /> : "Rejoignez-Nous"}
            </Button>
          </Box>
          form
        </Stack>
      </Container>
      <Blur
        position={"absolute"}
        top={-10}
        left={-10}
        style={{ filter: "blur(70px)" }}
      />
    </Box>
  );
}
