import { useEffect, useState } from "react";
import { TableSort } from "../components/TableSort";

export function Report() {
  const [data, setData] = useState(null);
  const [sortBy, setSortBy] = useState("date");
  const [sortOrder, setsortOrder] = useState("DESC");

  useEffect(() => {
    const query = `http://localhost:3000/report/state-storm-overlap?name=florida&sortBy=${sortBy}&sortOrder=${sortOrder}`;

    fetch(query)
      .then((res) => res.json())
      .then(setData);
  }, [sortBy, sortOrder]);

  return (
    <TableSort
      data={data}
      sortByState={[sortBy, setSortBy]}
      sortOrderState={[sortOrder, setsortOrder]}
    />
  );
}
