import { HiArrowCircleLeft, HiArrowCircleRight } from "react-icons/hi";
import { useSearchParams } from "react-router-dom";
import styled from "styled-components";
import { PAGINATION_LIMIT } from "../utils/constants";
const StyledPagination = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const P = styled.p`
  font-size: 1.4rem;
  margin-left: 0.8rem;

  & span {
    font-weight: 600;
  }
`;

const Buttons = styled.div`
  display: flex;
  gap: 0.6rem;
`;

const PaginationButton = styled.button`
  background-color: ${(props) =>
    props.active ? " var(--color-brand-600)" : "var(--color-grey-50)"};
  color: ${(props) => (props.active ? " var(--color-brand-50)" : "inherit")};
  border: none;
  border-radius: var(--border-radius-sm);
  font-weight: 500;
  font-size: 1.4rem;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  padding: 0.6rem 1.2rem;
  transition: all 0.3s;

  &:has(span:last-child) {
    padding-left: 0.4rem;
  }

  &:has(span:first-child) {
    padding-right: 0.4rem;
  }

  & svg {
    height: 1.8rem;
    width: 1.8rem;
  }

  &:hover:not(:disabled) {
    background-color: var(--color-brand-600);
    color: var(--color-brand-50);
  }
`;
function Pagination({ count }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const pages = Math.ceil(count / PAGINATION_LIMIT);
  const currentPage = !searchParams.get("page") ? 1 : +searchParams.get("page");
  if (pages <= 1) return null;
  function next() {
    const nextPage = currentPage === pages ? 1 : currentPage + 1;
    searchParams.set("page", nextPage);
    setSearchParams(searchParams);
  }
  function previous() {
    const prevPage = currentPage === 1 ? currentPage : currentPage - 1;
    searchParams.set("page", prevPage);
    setSearchParams(searchParams);
  }
  return (
    <StyledPagination>
      <p>
        Showing <span>{(currentPage - 1) * PAGINATION_LIMIT + 1}</span>{" "}
        <span>
          {currentPage === pages
            ? `to ${count} results`
            : ` to ${currentPage * PAGINATION_LIMIT} of ${count} results`}
        </span>
      </p>
      <Buttons>
        <PaginationButton onClick={previous} disabled={currentPage === 1}>
          <HiArrowCircleLeft /> <span>Previous</span>
        </PaginationButton>
        <PaginationButton onClick={next} disabled={currentPage === pages}>
          <span>Next</span> <HiArrowCircleRight />
        </PaginationButton>
      </Buttons>
    </StyledPagination>
  );
}

export default Pagination;
