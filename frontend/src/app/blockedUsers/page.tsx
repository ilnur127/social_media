import { Metadata } from "next";

import BlockedUsersPage from "@/components/screens/BlockedUsers";

export const metadata: Metadata = {
    title: "Blocked users page",
    description: "",
  };

export default function BlockedUsers() {
  return <BlockedUsersPage />;
}
  