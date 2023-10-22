import { Button, TextArea } from "@radix-ui/themes";

const CommentIssue = () => {
  return (
    <form className="bg-slate-100 px-4 py-4 rounded-sm">
      <TextArea placeholder="Comment on this issue" />
      <Button size="3" variant="solid" mt="5">
        Submit Comment
      </Button>
    </form>
  );
};

export default CommentIssue;
