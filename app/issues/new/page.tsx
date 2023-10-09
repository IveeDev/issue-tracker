"use client";
import { Button, TextArea, TextField } from "@radix-ui/themes";

const page = () => {
  return (
    <div className="max-w-xl space-y-4">
      <TextField.Root>
        <TextField.Input placeholder="Enter Title" />
      </TextField.Root>
      <TextArea placeholder="Enter Description" />
      <Button>Submit New Issue</Button>
    </div>
  );
};

export default page;
