import Pagination from "@mui/material/Pagination";

interface IPaginationComponentProps {
  totalResults: number;
  page: number;
  setPage: (page: number) => void;
}

function PaginationComponent({ totalResults, page, setPage }:IPaginationComponentProps) {
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };
  return (
    <Pagination
      count={Math.ceil(totalResults / 10)}
      page={page}
      onChange={handleChange}
    />
  );
}

export default PaginationComponent;
