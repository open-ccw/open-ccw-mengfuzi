import { createContext } from "svelte";

export type TopicConfig = {
  oid: string;
  subjectType: "EXTENSION" | "POST" | "CREATION" | "PROFILE";
};

export const [getCommentTopic, setCommentTopic] = createContext<TopicConfig>();
