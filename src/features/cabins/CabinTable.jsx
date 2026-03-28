import Spinner from "../../ui/Spinner";
import Empty from "../../ui/Empty";
import CabinRow from "./CabinRow";
import { useGetCabins } from "./useGetCabins";
import Table from "../../ui/Table";
import { useSearchParams } from "react-router-dom";

function CabinTable() {
  const { cabins = [], isPending } = useGetCabins();
  const [searchParams] = useSearchParams();
  // 1) Filter
  const filterValue = searchParams.get("filter") || "all";
  let filteredCabins = [];
  if (filterValue === "all") filteredCabins = cabins;
  if (filterValue === "no-discount")
    filteredCabins = cabins.filter((cabin) => cabin.discount === 0);
  if (filterValue === "with-discount")
    filteredCabins = cabins.filter((cabin) => cabin.discount > 0);
  // 2) SortBy
  const sortBy = searchParams.get("sortBy") || "maxCapacity-asc";
  const [field, direction] = sortBy.split("-");
  const absoluteModifier = direction === "asc" ? 1 : -1;

  const sortedCabins = filteredCabins.sort(
    (a, b) => (a[field] - b[field]) * absoluteModifier,
  );
  // This one is better!
  // .sort((a, b) => a[field].localeCompare(b[field]) * modifier);

  if (isPending) return <Spinner />;
  if (!cabins) return <Empty resource={"cabins"} />;
  return (
    <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
      <Table.Header>
        <div></div>
        <div>Cabin</div>
        <div>Capacity</div>
        <div>Price</div>
        <div>Discount</div>
        <div></div>
      </Table.Header>

      <Table.Body
        data={sortedCabins}
        render={(cabin) => <CabinRow key={cabin.id} cabin={cabin} />}
      />
      <Table.Footer>
        <div>Total: {cabins.length}</div>
      </Table.Footer>
    </Table>
  );
}

export default CabinTable;
