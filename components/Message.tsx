import { DocumentData } from "firebase/firestore";

type Props = {
    message: DocumentData;
}

function Message({ message }: Props) {
  const isModel = message.user.name === "ChatGPT";
  return (
    // <div className={`py-5 text-white mx-auto mt-5 w-3/5 rounded-2xl ${isModel && "bg-[#434654]"}`}>
    <div className={`py-5 text-black mx-auto mt-5 w-3/5 rounded-2xl ${isModel && "bg-[#FFDFDF]"}`}>
        <div className="flex space-x-5 px-10 max-w-2xl mx-auto">
            <img src={message.user.avatar} alt="" className="h-8 w-8" />
            <p className="pt-1 text-sm">{message.text}</p>
        </div>
    </div>
  )
}

export default Message