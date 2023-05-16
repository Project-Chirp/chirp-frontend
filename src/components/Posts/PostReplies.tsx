import Timeline from "./PostList";
import ComposePose from "./ComposePost";

export const PostReplies = () => {
  return (
    <>
      <ComposePose placeholder="Post your reply" />
      <Timeline />
    </>
  );
};
