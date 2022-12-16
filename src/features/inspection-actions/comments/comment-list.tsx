interface props {
  comments: {
    content: string;
    author: string;
    timestamp: number;
  }[];
}

export const CommentList = (props: props) => {
  return (
    <>
      {props.comments.map((comment) => (
        <div>{comment.content}</div>
      ))}
    </>
  );
};
