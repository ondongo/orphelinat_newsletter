"use client";
import Pagination from "@/components/Pagination";
import {
  getFilteredUsersNewsletter,
  getUsersNewsletterCount,
  getUsersNewsletterLimit,
  searchUsersNewsletter,
} from "@/services/userNewsletter";
import {
  Flex,
  Box,
  InputGroup,
  InputLeftElement,
  Input,
  InputRightElement,
  IconButton,
  Button,
  HStack,
  Text,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  VStack,
} from "@chakra-ui/react";
import { QueryDocumentSnapshot, DocumentData } from "firebase/firestore";
import React, { useCallback, useEffect, useState } from "react";
import {
  AiOutlineClose,
  AiOutlineFieldTime,
  AiOutlineReload,
  AiOutlineSearch,
} from "react-icons/ai";

function ListUsers() {
  const [lastVisibleReference, setLastVisibileReference] =
    useState<QueryDocumentSnapshot<DocumentData, DocumentData> | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageCount, setPageCount] = useState<number>(0);
  const [usersNewsletter, setUsersNewsletter] = useState<any[] | null>();

  useEffect(() => {
    getInitialTenders();
  }, []);

  function getInitialTenders() {
    getUsersNewsletterLimit().then((data) => {
      if (data === null) {
        setUsersNewsletter(null);
      } else {
        const { docs, lastVisible } = data;
        setUsersNewsletter(docs);
        console.log(data);
        setLastVisibileReference(lastVisible);
      }
    });
    getUsersNewsletterCount().then((UsersNewsletterCount) => {
      console.log(UsersNewsletterCount, "COUNTHERE_GLOIRE");
      return setPageCount(Math.ceil(UsersNewsletterCount / 50));
    });
  }

  function searchUsersByTitle(searchText: string) {
    searchUsersNewsletter({
      searchText,
      pageSize: 50,
      lastVisible: null,
    })
      .then((searchResult) => {
        console.log("Simple search :", searchResult);
        if (searchResult) {
          const { users, lastVisible } = searchResult;
          setUsersNewsletter(users);
          setLastVisibileReference(lastVisible);
        } else {
          setUsersNewsletter([]);
          setLastVisibileReference(null);
        }
      })
      .catch((error) => {
        console.error("Error searching tenders by title:", error);
      });
  }

  function handleSimpleSearchButtonClick(searchText: string) {
    searchUsersByTitle(searchText);
  }

  const [searchText, setSearchText] = useState<string>("");
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  const handleClear = () => {
    setSearchText("");
  };

  function fetchPaginatedUsersNewsletter(direction: "before" | "after") {
    getFilteredUsersNewsletter({
      startAfterDoc: direction === "after" ? lastVisibleReference : null,
      endBeforeDoc: direction === "before" ? lastVisibleReference : null,
      setPageCount,
      setLastVisibileReference,
    })
      .then((paginatedUsersNewsletter) => {
        if (paginatedUsersNewsletter === null) {
          setUsersNewsletter(null);
        } else {
          const { docs, lastVisible } = paginatedUsersNewsletter;
          setLastVisibileReference(lastVisible);
          setUsersNewsletter(docs);
        }
      })
      .catch((error) => {
        console.error("Error fetching paginated :", error);
      });
  }

  /********************/
  /*                 Update Current Pagination              */
  /*********************/
  const updateCurrentPage = useCallback(
    (change: number) => {
      const direction: "before" | "after" = change < 1 ? "before" : "after";
      fetchPaginatedUsersNewsletter(direction);
      setCurrentPage((previous) => previous + change);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [lastVisibleReference]
  );

  const [isInputFocused, setIsInputFocused] = useState<boolean>(false);

  const handleInputFocus = () => {
    setIsInputFocused(true);
  };

  const handleInputBlur = () => {
    setIsInputFocused(false);
  };
  return (
    <Flex justifyContent={"center"} w={"100%"} overflow={"hidden"}>
      <Flex
        maxW={["100%", null, "900px"]}
        minW={["100%", null, "900px"]}
        alignItems={"center"}
        direction={"column"}
        py={4}
      >
        <Flex
          h={"auto"}
          alignItems={"center"}
          background={"brand.white"}
          borderRadius={"md"}
          direction={["column", null, "row"]}
          color={"brand.midgray"}
          borderTop={"5px solid orange"}
          justifyContent={"space-between"}
          p={6}
          w={"100%"}
          gap={"10px"}
        >
          <Box position="relative" w={"80%"}>
            <Flex w={"100%"} height={"auto"} gap="10px">
              <InputGroup>
                <Box
                  position="absolute"
                  left="8"
                  top={"1"}
                  display="flex"
                  alignItems="center"
                  zIndex="1"
                >
                  <Text fontSize={"0.7rem"} color={"gray"} ml="2">
                    Mots clés
                  </Text>
                </Box>

                <InputLeftElement pointerEvents="none" height={"100%"}>
                  <AiOutlineSearch color="black" fontSize="1.2rem" />
                </InputLeftElement>

                <Input
                  pt={"3"}
                  placeholder="Cliquer ici pour rechercher"
                  w={"100%"}
                  height={"50px"}
                  value={searchText}
                  onChange={handleInputChange}
                  onFocus={handleInputFocus}
                  onBlur={handleInputBlur}
                  _placeholder={{ color: "gray" }}
                  focusBorderColor="#DD6A1F"
                  rounded={"full"}
                />
                {searchText && (
                  <InputRightElement height={"100%"}>
                    <IconButton
                      aria-label="Clear input"
                      icon={<AiOutlineClose />}
                      onClick={handleClear}
                      color={"black"}
                      background="transparent"
                      _hover={{ background: "transparent" }}
                    />
                  </InputRightElement>
                )}
              </InputGroup>
            </Flex>
          </Box>

          <Button
            colorScheme="orange"
            aria-label="Search database"
            height={"50px"}
            rounded={"full"}
            onClick={() => handleSimpleSearchButtonClick(searchText)}
          >
            Rechercher
          </Button>
        </Flex>

        <Box overflowX="auto" w="100%">
          <Table variant="striped" colorScheme="orange" mb={4}>
            <Thead>
              <Tr>
                <Th>Nom</Th>
                <Th>Email</Th>
                <Th isNumeric>Téléphone</Th>
              </Tr>
            </Thead>
            <Tbody>
              {usersNewsletter &&
                usersNewsletter?.map((result: any, index: any) => (
                  <Tr key={index}>
                    <Td>{result.name ?? ""}</Td>
                    <Td>{result.email ?? ""}</Td>
                    <Td isNumeric>{result.phone ?? ""}</Td>
                  </Tr>
                ))}
            </Tbody>
          </Table>
        </Box>

        {usersNewsletter && usersNewsletter.length > 0 && (
          <Pagination
            hasNext={currentPage < pageCount}
            hasPrevious={currentPage > 1}
            nextPage={() => updateCurrentPage(1)}
            previousPage={() => updateCurrentPage(-1)}
          />
        )}
      </Flex>
    </Flex>
  );
}

export default ListUsers;
