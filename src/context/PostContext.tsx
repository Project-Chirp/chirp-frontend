import { createContext, useContext, useState } from "react";
import { Post } from "../components/Posts/PostList";

type PostContextType = {
  posts: Post[];
  setPosts: (posts: Post[]) => void;
  updatePost: (updatedPost: Post) => void;
};

const PostContext = createContext<PostContextType | null>(null);

export const PostContextProvider = ({ children }: any) => {
  const [posts, setPosts] = useState<Post[]>([]);

  const updatePost = (updatedPost: Post) => {
    const newPosts = posts.map((o) => {
      if (o.postId === updatedPost.postId) {
        return updatedPost;
      }
      return o;
    });
    setPosts(newPosts);
  };

  return (
    <PostContext.Provider value={{ posts, setPosts, updatePost }}>
      {children}
    </PostContext.Provider>
  );
};

export const usePostContext = () => useContext(PostContext) as PostContextType;
