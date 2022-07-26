import { Flex, Box, Select, IconButton } from "@chakra-ui/react";
import { ChangeEvent, MouseEvent } from "react";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import { useRecoilState } from "recoil";
import { useNavigate, useLocation } from "react-router-dom";
import { pageInfoState } from "../../recoil";

const offsetList = [5, 10, 15, 20, 30];

const ListFooter = () => {
  const [pageInfo, setPageInfo] = useRecoilState(pageInfoState);
  const location = useLocation();
  const navigate = useNavigate();
  const endPageNum =
    pageInfo.page * pageInfo.offset > pageInfo.totalCount
      ? pageInfo.totalCount
      : pageInfo.page * pageInfo.offset;
  const startPageNum =
    pageInfo.page <= 1
      ? 1
      : pageInfo.page * pageInfo.offset - (pageInfo.offset - 1);
  const paginationHandler = (
    e:
      | ChangeEvent<HTMLSelectElement>
      | MouseEvent<HTMLButtonElement>
      | MouseEvent<MouseEvent>,
    type: string,
    button: string
  ) => {
    if (type === "page") {
      if (
        (button === "left" && pageInfo.page <= 1) ||
        (button === "right" && pageInfo.page >= pageInfo.totalPage)
      ) {
        return;
      }
      setPageInfo((prev) => {
        const page = button === "left" ? prev[type] - 1 : prev[type] + 1;
        navigate(`../${location.pathname}?page=${page}&offset=${prev.offset}`);
        return {
          ...prev,
          [type]: page,
        };
      });
    } else if (type === "offset") {
      const { value } = e.target as HTMLSelectElement;
      setPageInfo((prev) => {
        navigate(`../${location.pathname}?page=${1}&offset=${value}`);
        return {
          ...prev,
          page: 1,
          [type]: Number(value),
        };
      });
    }
  };
  return (
    <Flex
      bg="white"
      justifyContent="space-between"
      alignItems="center"
      p="12px 24px"
    >
      <Box>
        <Flex alignItems="center">
          Show rows per page
          <Select
            disabled={pageInfo.totalPage === 0}
            w="75px"
            ml="8px"
            size="sm"
            borderRadius="6px"
            value={pageInfo.offset}
            onChange={(e) => {
              paginationHandler(e, "offset", "");
            }}
          >
            {offsetList.map((v) => (
              <option key={v} value={v}>
                {v}
              </option>
            ))}
          </Select>
        </Flex>
      </Box>
      <Box>
        {startPageNum}-{endPageNum} of {pageInfo.totalCount}
        <IconButton
          disabled={pageInfo.totalPage === 0}
          size="sm"
          ml="24px"
          onClick={(e) => {
            paginationHandler(e, "page", "left");
          }}
          icon={<MdChevronLeft />}
          aria-label="left"
          bg="white"
        />
        <IconButton
          disabled={pageInfo.totalPage === 0}
          size="sm"
          ml="8px"
          onClick={(e) => {
            paginationHandler(e, "page", "right");
          }}
          icon={<MdChevronRight />}
          aria-label="right"
          bg="white"
        />
      </Box>
    </Flex>
  );
};

export default ListFooter;
