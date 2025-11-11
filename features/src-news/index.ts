import { ImageSourcePropType } from "react-native";
import { SrcNewsInterface } from "@/types/src-news.types";

export const srcNewsData: SrcNewsInterface[] = [
  {
    id: "1",
    title: "AI Revolutionizes Mobile Development",
    body: "Artificial intelligence is changing how developers build mobile apps, offering smarter user experiences and faster development cycles.",
    publisher: "SRC President",
    publisherImage: require("@/assets/images/Campus-1.png") as ImageSourcePropType,
    source: "SRC Office",
    publishedAt: new Date("2025-09-12T10:30:00Z"),
    isDraft: false,
    createAt: "2025-09-10T14:45:00Z",
  },
  {
    id: "2",
    title: "React Native 0.77: What’s New?",
    body: "The latest version of React Native introduces performance boosts, better Hermes support, and new developer tools to streamline your workflow.",
    publisher: "SRC Pro",
    publisherImage: require("@/assets/images/Campus-1.png") as ImageSourcePropType,
    source: "Tech Department",
    publishedAt: new Date("2025-10-01T09:00:00Z"),
    isDraft: false,
    createAt: "2025-09-28T16:15:00Z",
  },
  {
    id: "3",
    title: "10 Tips to Improve UX in News Apps",
    body: "A well-designed news app keeps readers engaged. Here are ten actionable tips to make your app’s user experience shine.",
    publisher: "Wocom Office",
    publisherImage: require("@/assets/images/Campus-1.png") as ImageSourcePropType,
    source: "UX Team",
    publishedAt: new Date("2025-08-15T12:00:00Z"),
    isDraft: false,
    createAt: "2025-08-12T08:30:00Z",
  },
  {
    id: "4",
    title: "Behind the Scenes: Building a Scalable News Platform",
    body: "From backend architecture to frontend optimization, discover the techniques that power modern scalable news applications.",
    publisher: "SRC Admin",
    publisherImage: require("@/assets/images/Campus-1.png") as ImageSourcePropType,
    source: "Development Office",
    publishedAt: new Date("2025-11-01T18:20:00Z"),
    isDraft: true,
    createAt: "2025-10-29T10:10:00Z",
  },
];
