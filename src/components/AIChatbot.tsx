import { useState } from "react";
import { MessageCircle, X } from "lucide-react";

interface Message {
  sender: "user" | "bot";
  text: string;
}

const AIChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: "bot",
      text: "Hello 👋 I am your AI Maintenance Assistant. Ask about motor faults, health score, or risk level."
    }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const getBotResponse = (message: string): string => {
    const msg = message.toLowerCase();

    if (msg.includes("bearing"))
      return "Bearing wear is typically caused by friction, overload, or lubrication issues.";

    if (msg.includes("motor"))
      return "Motor faults may include overheating, misalignment, or insulation degradation.";

    if (msg.includes("conveyor"))
      return "Common conveyor issues include belt misalignment and roller wear.";

    if (msg.includes("health"))
      return "Health score represents overall machine condition derived from acoustic analysis.";

    if (msg.includes("risk"))
      return "Risk level indicates the probability of failure if preventive action is not taken.";

    if (msg.includes("maintenance"))
      return "Recommended maintenance includes inspection, lubrication, and alignment checks.";

    return "Please ask about machine faults, health score, risk level, or maintenance.";
  };

  const handleSend = () => {
    if (!input.trim()) return;

    const newMessages: Message[] = [
      ...messages,
      { sender: "user", text: input }
    ];

    setMessages(newMessages);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      const reply = getBotResponse(input);
      setMessages([...newMessages, { sender: "bot", text: reply }]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <>
      {/* Floating Button */}
      <div className="fixed bottom-6 right-6 z-50">
        {!isOpen ? (
          <button
            onClick={() => setIsOpen(true)}
            className="bg-emerald-500 hover:bg-emerald-600 text-white p-4 rounded-full shadow-lg transition-all"
          >
            <MessageCircle size={22} />
          </button>
        ) : (
          <div className="w-80 h-[480px] bg-[#0f172a] border border-gray-700 rounded-xl shadow-2xl flex flex-col">
            
            {/* Header */}
            <div className="flex justify-between items-center p-4 border-b border-gray-700 bg-[#111827] rounded-t-xl">
              <h2 className="text-sm font-semibold text-emerald-400">
                AI Maintenance Assistant
              </h2>
              <button onClick={() => setIsOpen(false)}>
                <X size={18} className="text-gray-400 hover:text-white" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 text-sm">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`max-w-[75%] px-3 py-2 rounded-lg ${
                    msg.sender === "user"
                      ? "ml-auto bg-emerald-500 text-white"
                      : "bg-gray-800 text-gray-200"
                  }`}
                >
                  {msg.text}
                </div>
              ))}

              {isTyping && (
                <div className="text-gray-400 text-xs italic">
                  AI Assistant is typing...
                </div>
              )}
            </div>

            {/* Input */}
            <div className="p-3 border-t border-gray-700 flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask something..."
                className="flex-1 bg-gray-800 text-white px-3 py-2 rounded-md outline-none text-sm"
              />
              <button
                onClick={handleSend}
                className="bg-emerald-500 hover:bg-emerald-600 px-4 py-2 rounded-md text-white text-sm"
              >
                Send
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default AIChatbot;
