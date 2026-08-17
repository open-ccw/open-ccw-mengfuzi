export type TopicConfig = {
  oid: string;
  subjectType: "EXTENSION" | "POST" | "CREATION" | "PROFILE";
  sectionType: 'COMMENT' | 'REVIEW'
};