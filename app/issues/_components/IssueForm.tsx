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
import SimpleMDE from "react-simplemde-editor";
import toast, { Toaster } from "react-hot-toast";

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
        toast.success("Issue updated successfully!");
      } else {
        await axios.post("/api/issues", data);
        toast.success("Issue created successfully!");
      }

      setTimeout(() => {
        router.push("/issues");
        router.refresh();
      }, 5000);
    } catch (error) {
      setSubmitting(false);
      toast.error("An unexpected error occurred!");
    }
  };

  return (
    <div className="max-w-xl">
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
            // eslint-disable-next-line react/jsx-no-undef
            <SimpleMDE placeholder="Enter Description" {...field} />
          )}
        />
        <ErrorMessage>{errors.description?.message}</ErrorMessage>

        <Button disabled={isSubmitting}>
          {issue ? "Update Issue" : "Submit New Issue"}{" "}
          {isSubmitting && <Spinner />}
        </Button>
      </form>
      <Toaster />
    </div>
  );
};

export default IssueForm;
