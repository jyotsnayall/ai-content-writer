"use client";

import { db } from "@/firebase";
import { PaperAirplaneIcon, MicrophoneIcon } from "@heroicons/react/24/solid";

import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useSession } from "next-auth/react";
import { FormEvent, useState } from "react";
import toast from "react-hot-toast";
import ModelSelection from "./ModelSelection";

type Props = {
    chatId: string;
}

function ChatInput({ chatId }: Props) {
  const [prompt, setPrompt] = useState("");
  const { data: session } = useSession();

  // TODO: use SWR to get model
  const model = "text-davinci-003";

  const sendMessage = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if(!prompt) return;

    const input = prompt.trim();
    setPrompt("");

    const message: Message = {
      text: input,
      createdAt: serverTimestamp(),
      user: {
        _id: session?.user?.email!,
        name: session?.user?.name!,
        avatar: session?.user?.image! || `https://ui-avatars.com/api/?name=${session?.user?.name}`,
      }
    }

    await addDoc(
      collection(
        db, 
        'users', 
        session?.user?.email!, 
        'chats', 
        chatId, 
        'messages'
      ),
      message
    );

    // Toast notification to say loading
    const notification = toast.loading("I am thinking...");

    await fetch('/api/askQuestion', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        prompt: input,
        chatId, 
        model, 
        session
      }),
    }).then(() => {
      // Toast notification to say successful
      toast.success("Model has responded!", {
        id: notification,
      })
    });
  };

  return (
    // <div className="bg-gray-700/50 text-gray-400 text-sm rounded-3xl	w-4/5 m-auto mb-6 ">
    <div className="bg-[#e4dbf7] text-black-400 text-sm rounded-3xl	w-4/5 m-auto mb-6 ">
        <form onSubmit={sendMessage} className="p-5 space-x-5 flex">
            <button
                className="bg-[#11A37F] hover:opacity-50 text-white font-bold px-4 py-2 rounded disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
                <MicrophoneIcon className="h-5 w-4" />
            </button>
            
            <input 
                className="bg-transparent focus:outline-none flex-1 disabled:cursor-not-allowed disabled:text-gray-300"
                disabled={!session}
                value={prompt}
                onChange={e => setPrompt(e.target.value)}
                type="text"
                placeholder="Type your message here..." 
            />

            <button
                disabled={!prompt || !session}
                type="submit"
                className="bg-[#11A37F] hover:opacity-50 text-white font-bold px-4 py-2 rounded disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
                <PaperAirplaneIcon className="h-4 w-4 -rotate-45" />
            </button>
        </form>

        <div className="md:hidden">
          <ModelSelection />
        </div>
    </div>
  )
}

export default ChatInput;