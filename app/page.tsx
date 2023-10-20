import prisma from "@/prisma/client";
import IssuesSummary from "./IssuesSummary";
import IssuesChart from "./IssuesChart";
import LatestIssues from "./LatestIssues";
import { Flex, Grid } from "@radix-ui/themes";

export default async function Home() {
  const openIssues = await prisma.issue.count({ where: { status: "OPEN" } });
  const inProgressIssues = await prisma.issue.count({
    where: { status: "IN_PROGRESS" },
  });
  const closedIssues = await prisma.issue.count({
    where: { status: "CLOSED" },
  });
  return (
    <Grid columns={{ initial: "1", md: "2" }} gap="5">
      <Flex direction="column" gap="5">
        <IssuesSummary
          open={openIssues}
          inProgress={inProgressIssues}
          closed={closedIssues}
        />
        <IssuesChart
          open={openIssues}
          inProgress={inProgressIssues}
          closed={closedIssues}
        />
      </Flex>
      <LatestIssues />
    </Grid>
  );
}
