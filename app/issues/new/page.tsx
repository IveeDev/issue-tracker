"use client";
import { Button, TextField, Callout } from "@radix-ui/themes";
import SimpleMDE from "react-simplemde-editor";
import { useForm, Controller, FieldValues } from "react-hook-form";
import { useRouter } from "next/navigation";
import axios from "axios";
import "easymde/dist/easymde.min.css";
import { useState } from "react";

interface IssueForm {
  title: string;
  description: string;
}

const NewIssuePage = () => {
  const router = useRouter();
  const { register, control, handleSubmit } = useForm<IssueForm>();
  const [error, setError] = useState("");

  const handleIssueForm = async (data: FieldValues) => {
    try {
      await axios.post("/api/issues", data);
      setError("Issue created successfully!");
      setTimeout(() => {
        router.push("/issues");
      }, 5000);
    } catch (error) {
      console.log(error);
      setError("An unexpected error occurred.");
    }
  };

  const calloutColor = error.includes("successfully") ? "green" : "red";
  return (
    <div className="max-w-xl">
      {error && (
        <Callout.Root color={calloutColor} className="mb-5">
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <form className="space-y-4" onSubmit={handleSubmit(handleIssueForm)}>
        <TextField.Root>
          <TextField.Input placeholder="Enter Title" {...register("title")} />
        </TextField.Root>

        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <SimpleMDE placeholder="Enter Description" {...field} />
          )}
        />

        <Button>Submit New Issue</Button>
      </form>
    </div>
  );
};

export default NewIssuePage;
