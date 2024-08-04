import { IoChatbubblesOutline } from "react-icons/io5";

export default function ChatLayout() {
    return (
        <section className='bg-transparent w-[70%] text-white'>
            <div className="flex flex-col justify-center items-center h-full gap-4">
                <IoChatbubblesOutline className="text-gray-600 text-[4rem]" />
                <div className="flex flex-col gap-1">
                    <h4 className="text-gray-400 font-semibold text-xl text-center">Your messages</h4>
                    <p className='text-gray-600 text-center text-sm'>Send message to start a chat</p>
                </div>
                <button className="bg-primary py-2 px-6 rounded-md text-sm font-semibold transition-all duration-200 hover:bg-light-primary">Send message</button>
            </div>
        </section>
    )
}
