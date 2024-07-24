import { Button, Flex, SystemStyleObject } from "@chakra-ui/react";
import React from "react";

function Pagination({
  hasPrevious,
  hasNext,
  nextPage,
  previousPage,
}: {
  hasPrevious: boolean;
  hasNext: boolean;
  nextPage: () => void;
  previousPage: () => void;
}) {
  return (
    <Flex gap="20px" alignItems={"center"} mx={"auto"}>
      <Button
        minW={"128px"}
        py={2}
        onClick={previousPage}
        disabled={!hasPrevious}
        backgroundColor={!hasPrevious ? "#8c8c8c" : "orange.500"}
        _hover={!hasPrevious ? {} : {
          transform: "scale(1.1)",
          background: "orange.400",
          color: "white",
        } as SystemStyleObject}
        fontWeight={"light"}
        fontSize={["13px", null, null, "16px"]}
        textColor={"brand.white"}
        rounded={"full"}
        pointerEvents={hasPrevious ? "auto" : "none"}
      >
        Précédent
      </Button>
      <Button
        minW={"128px"}
        py={2}
        onClick={nextPage}
        disabled={!hasNext}
        backgroundColor={!hasNext ? "#8c8c8c" : "orange.500"}
        _hover={!hasNext ? {} : {
          transform: "scale(1.1)",
          background: "orange.400",
          color: "white",
        } as SystemStyleObject}
        fontWeight={"light"}
        fontSize={["13px", null, null, "16px"]}
        textColor={"brand.white"}
        rounded={"full"}
        pointerEvents={hasNext ? "auto" : "none"}
      >
        Suivant
      </Button>
    </Flex>
  );
}

export default Pagination;