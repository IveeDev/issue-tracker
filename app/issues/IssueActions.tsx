import { Box, Button, Flex } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";
import IssueStatusFilter from "./IssueStatusFilter";
import PageSizeSelect from "./PageSizeSelect";

const IssueActions = () => {
  return (
    <Flex justify="between">
      <Box className="space-x-20">
        <IssueStatusFilter />
        {/* <PageSizeSelect /> */}
      </Box>
      <Button>
        <Link href="/issues/new">New Issue</Link>
      </Button>
    </Flex>
  );
};

export default IssueActions;
