import { Button, Flex, Heading, Icon, Link } from "@chakra-ui/react";
import { RiAddLine } from "react-icons/ri";

interface IListHeaderProps {
  pageNamePlural: string;
  pageNameSingle: string;
}

export default function ListHeader({ pageNamePlural, pageNameSingle }: IListHeaderProps ) {
  return (
    <Flex mb="8" justify="space-between" align="center">
      <Heading size="lg" fontWeight="normal">Lista de {pageNamePlural}</Heading>
      <Link href={`/${pageNamePlural.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "")}/novo`} passHref>
        <Button
          as="a"
          size="sm"
          fontSize="sm"
          colorScheme="purple"
          leftIcon={<Icon as={RiAddLine} fontSize="20" />}
        >
          Criar novo {pageNameSingle}
        </Button>
      </Link>
    </Flex>
  )
}