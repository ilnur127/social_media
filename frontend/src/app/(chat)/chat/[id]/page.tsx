import Chat from '@/components/screens/ChatsPage/Chat';

export default function ChatPage({ params }: { params: { id: string } }) {
  return <Chat id={params.id} />;
}
