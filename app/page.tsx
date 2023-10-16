"use client";

import { useSearchParams } from "next/navigation";
import Pagination from "./components/Pagination";

interface Props {
  searchParams: { page: string };
}

export default function Home({ searchParams }: Props) {
  return (
    <div>
      Hello world
      {/* <Pagination
        itemCount={100}
        pageSize={10}
        currentPage={parseInt(searchParams.page)}
      /> */}
    </div>
  );
}
