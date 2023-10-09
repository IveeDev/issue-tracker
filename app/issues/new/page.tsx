"use client";
import { Button, TextField } from "@radix-ui/themes";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";

const page = () => {
  return (
    <div className="max-w-xl space-y-4">
      <TextField.Root>
        <TextField.Input placeholder="Enter Title" />
      </TextField.Root>
      <SimpleMDE placeholder="Enter Description" />
      <Button>Submit New Issue</Button>
    </div>
  );
};

export default page;
