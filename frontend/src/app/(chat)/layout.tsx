import ChatLayout from "@/components/layouts/ChatLayout";

export default function ChatPagesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ChatLayout>{children}</ChatLayout>
  );
}
