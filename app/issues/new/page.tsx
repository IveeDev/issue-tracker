"use client";
import { Button, TextField, Callout, Text } from "@radix-ui/themes";
import SimpleMDE from "react-simplemde-editor";
import { useForm, Controller, FieldValues } from "react-hook-form";
import { useRouter } from "next/navigation";
import axios from "axios";
import "easymde/dist/easymde.min.css";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { createIssueSchema } from "@/app/validationSchema";
import ErrorMessage from "@/app/components/ErrorMessage";
import Spinner from "@/app/components/Spinner";

type IssueForm = z.infer<typeof createIssueSchema>;

const NewIssuePage = () => {
  const router = useRouter();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IssueForm>({
    resolver: zodResolver(createIssueSchema),
  });
  const [error, setError] = useState("");
  const [isSubmitting, setSubmitting] = useState(false);

  const handleIssueForm = async (data: FieldValues) => {
    try {
      setSubmitting(true);
      await axios.post("/api/issues", data);
      setError("Issue created successfully!");
      setTimeout(() => {
        router.push("/issues");
      }, 5000);
    } catch (error) {
      setSubmitting(false);
      setError("An unexpected error occurred.");
    }
  };

  const calloutColor = error.includes("successfully") ? "green" : "red"; //Render calloutout component dynamically.

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
        <ErrorMessage>{errors.title?.message}</ErrorMessage>

        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <SimpleMDE placeholder="Enter Description" {...field} />
          )}
        />
        <ErrorMessage>{errors.description?.message}</ErrorMessage>

        <Button disabled={isSubmitting}>
          Submit New Issue {isSubmitting && <Spinner />}
        </Button>
      </form>
    </div>
  );
};

export default NewIssuePage;
