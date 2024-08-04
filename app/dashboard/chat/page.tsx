import ChatLayout from './_components/ChatLayout'
import List from './_components/List'

export default function ChatPage() {
  return (
    <main className='w-full'>
      <div className="flex h-full">
        <List />
        <ChatLayout />
      </div>
    </main>
  )
}
