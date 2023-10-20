import prisma from "@/prisma/client";
import IssuesSummary from "./IssuesSummary";
import IssuesChart from "./IssuesChart";
import LatestIssues from "./LatestIssues";
// import LatestIssues from "./LatestIssues";

export default async function Home() {
  const openIssues = await prisma.issue.count({ where: { status: "OPEN" } });
  const inProgressIssues = await prisma.issue.count({
    where: { status: "IN_PROGRESS" },
  });
  const closedIssues = await prisma.issue.count({
    where: { status: "CLOSED" },
  });
  return (
    <div>
      <LatestIssues />
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
    </div>
  );
}
