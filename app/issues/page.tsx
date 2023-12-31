import prisma from "@/prisma/client";
import { Flex, Box } from "@radix-ui/themes";
import { Metadata, GetServerSideProps } from "next";
import { Status } from "@prisma/client";
import Pagination from "../components/Pagination";
import IssueActions from "./IssueActions";
import IssueTable, { IssueQuery, columnsName } from "./IssueTable";
import PageSizeSelect from "./PageSizeSelect";
interface Props {
  searchParams: IssueQuery;
}

const IssuesPage = async ({ searchParams }: Props) => {
  const statuses = Object.values(Status);
  const validStatuses = statuses.includes(searchParams.status)
    ? searchParams.status
    : undefined;

  const sortOrderBy = columnsName.includes(searchParams.orderBy)
    ? {
        [searchParams.orderBy]:
          searchParams.orderDirection === "asc" ? "desc" : "asc",
      }
    : undefined;

  const page = parseInt(searchParams.page) || 1;
  const pageSize = parseInt(searchParams.pageLength) || 10; // number of issues we want to fetch on a page
  // console.log(pageSizex);
  // const pageSize = 10;
  const issues = await prisma.issue.findMany({
    where: { status: validStatuses },
    orderBy: sortOrderBy,
    skip: (page - 1) * pageSize,
    take: pageSize,
  });

  const issueCount = await prisma.issue.count({
    where: { status: validStatuses },
  });

  return (
    <Flex direction="column" gap="3">
      <IssueActions />
      <Box className="max-w-sm">
        <PageSizeSelect />
      </Box>
      <IssueTable issues={issues} searchParams={searchParams} />
      <Pagination
        pageSize={pageSize}
        currentPage={page}
        itemCount={issueCount}
      />
    </Flex>
  );
};

// disablling caching: We are forcing dynamic rendering
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Issue Tracking - Issue List",
  description: "View all project issues",
};

export default IssuesPage;
