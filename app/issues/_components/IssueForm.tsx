"use client";
import { Button, TextField, Callout, Text } from "@radix-ui/themes";
import dynamic from "next/dynamic";
import { useForm, Controller, FieldValues } from "react-hook-form";
import { useRouter } from "next/navigation";
import axios from "axios";
import "easymde/dist/easymde.min.css";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { IssueSchema } from "@/app/validationSchema";
import ErrorMessage from "@/app/components/ErrorMessage";
import Spinner from "@/app/components/Spinner";
import { Issue } from "@prisma/client";

const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
});

type IssueFormData = z.infer<typeof IssueSchema>;

interface Props {
  issue?: Issue;
  isEdit?: boolean;
}

const IssueForm = ({ issue, isEdit }: Props) => {
  const router = useRouter();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IssueFormData>({
    resolver: zodResolver(IssueSchema),
  });
  const [error, setError] = useState("");
  const [isSubmitting, setSubmitting] = useState(false);

  const handleIssueForm = async (data: FieldValues) => {
    try {
      setSubmitting(true);
      // edit existing issue
      if (issue) {
        await axios.patch(`/api/issues/${issue.id}`, data);
        setError("Issue updated successfully!");
      } else {
        await axios.post("/api/issues", data);
        setError("Issue created successfully!"); // Set the success message for creation
      }

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
          <TextField.Input
            defaultValue={issue?.title}
            placeholder="Enter Title"
            {...register("title")}
          />
        </TextField.Root>
        <ErrorMessage>{errors.title?.message}</ErrorMessage>

        <Controller
          name="description"
          control={control}
          defaultValue={issue?.description}
          render={({ field }) => (
            <SimpleMDE placeholder="Enter Description" {...field} />
          )}
        />
        <ErrorMessage>{errors.description?.message}</ErrorMessage>

        <Button disabled={isSubmitting}>
          {issue ? "Update Issue" : "Submit New Issue"}{" "}
          {isSubmitting && <Spinner />}
        </Button>
      </form>
    </div>
  );
};

export default IssueForm;
