"use client";
import { Select } from "@radix-ui/themes";
import { useRouter, useSearchParams } from "next/navigation";

const PageSizeSelect = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const pages = [
    { label: "5 pages", value: "5" },
    { label: "10 pages", value: "10" },
    { label: "15 pages", value: "15" },
  ];
  return (
    <Select.Root
      defaultValue={searchParams.get("pageLength") || "10"}
      onValueChange={(pageLength) => {
        const params = new URLSearchParams();
        if (pageLength) params.append("pageLength", pageLength);
        router.push("?" + params.toString());
      }}
    >
      <Select.Trigger placeholder="Select page size" />
      <Select.Content>
        {pages.map((page) => (
          <Select.Item key={page.value} value={page.value}>
            {page.label}
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  );
};

export default PageSizeSelect;
