"use client";
import { Issue, Status } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/app/components";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { Select } from "@radix-ui/themes";

interface Props {
  issue: Issue;
}

const StatusSelect = ({ issue }: Props) => {
  const statuses: { label: string; value: Status }[] = [
    { label: "Open", value: "OPEN" },
    { label: "In Progress", value: "IN_PROGRESS" },
    { label: "Closed", value: "CLOSED" },
  ];

  const handleIssueStatus = (value: Status) => {
    axios
      .patch(`/api/issues/${issue.id}`, { status: value })
      .then(() => {
        toast.success("Status changed successfully!");
      })
      .catch(() => {
        toast.error("Changes could not be saved!");
      });
  };
  return (
    <>
      <Select.Root
        defaultValue={issue.status}
        onValueChange={handleIssueStatus}
      >
        <Select.Trigger placeholder="Change issue status" />
        <Select.Content>
          {statuses?.map((status) => (
            <Select.Item key={status.value} value={status.value}>
              {status.label}
            </Select.Item>
          ))}
        </Select.Content>
      </Select.Root>
      <Toaster />
    </>
  );
};

export default StatusSelect;
