import { Metadata } from "next";

import SettingsPage from "@/components/screens/SettingsPage";

export const metadata: Metadata = {
    title: "Setting page",
    description: "",
  };

export default function Friends() {
  return <SettingsPage />;
}
  