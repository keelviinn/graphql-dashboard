import { Box, Button, Stack, Text } from "@chakra-ui/react";
import PaginationItem from "./PaginationItem";

interface PaginationProps {
  totalDocs: number;
  totalPages: number;
  registerPerPage?: number;
  currentPage?: number;
  limit?:number;
  setPage: (page: number) => void;
}

const siblingsCount = 1;
const generatePagesArray = (from: number, to: number) =>
  [...new Array(to - from)].map((_, index) => from + index + 1).filter(page => page > 0);

export function Pagination( props: PaginationProps) {
  const { totalDocs, totalPages, limit = 10, currentPage = 1, setPage } = props;
  const previousPages = currentPage > 1 
    ? generatePagesArray(currentPage - 1 - siblingsCount, currentPage - 1)
    : [];
  const nextPages = currentPage < totalPages
    ? generatePagesArray(currentPage, Math.min(currentPage + siblingsCount, totalPages))
    : [];

  return (
    <Stack
      direction={["column", "column", "row"]}
      spacing="6"
      mt="8"
      justify="space-between"
      align="center"
    >
      <Box>
        <strong>{(limit * currentPage) - limit + 1}</strong> - <strong>{limit * currentPage}</strong> de <strong>{totalDocs}</strong>
      </Box>
      <Stack direction="row" spacing="2">
        {currentPage > (1 + siblingsCount) && (
          <> 
            <PaginationItem setPage={setPage} key={1} number={1}/>
            { currentPage > (2 + siblingsCount) && (
              <Text color="gray.300" width="8" align="center">...</Text>
            ) }
          </>
        )}
        {!!previousPages.length && previousPages.map(page => <PaginationItem setPage={setPage} key={page} number={page}/>)}
        <PaginationItem setPage={setPage} number={currentPage} isCurrent />
        {!!nextPages.length && nextPages.map(page => <PaginationItem setPage={setPage} key={page} number={page}/>)}
        {(currentPage + siblingsCount) < totalPages && (
          <>
            { (currentPage + 1 + siblingsCount) < totalPages && (
              <Text color="gray.300" width="8" align="center">...</Text>
            ) }
            <PaginationItem setPage={setPage} key={totalPages} number={totalPages}/>
          </>
        )}
      </Stack>
    </Stack>
  )
}