"use client";
import { Select } from "@radix-ui/themes";
import React from "react";

const AssigneeSelect = () => {
  return (
    <Select.Root>
      <Select.Trigger placeholder="Assign issue to user" />
      <Select.Content variant="solid">
        <Select.Group>
          <Select.Label>Suggestions</Select.Label>
          <Select.Item value="1">Iviidev</Select.Item>
        </Select.Group>
      </Select.Content>
    </Select.Root>
  );
};

export default AssigneeSelect;
