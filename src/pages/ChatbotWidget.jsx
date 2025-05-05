// import React, { useState } from "react";
// import { motion } from "framer-motion";
// import { MessageCircle, X, ArrowRight } from "lucide-react";
// import { fetchGeminiResponse } from "../geminiService/geminiService";

// const ChatbotWidget = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [messages, setMessages] = useState([
//     {
//       from: "bot",
//       text: "Hi! I'm Saarthi, your solar energy assistant. How can I help you today?",
//     },
//   ]);
//   const [input, setInput] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleSend = async () => {
//     if (!input.trim()) return;

//     // Add user message to chat
//     const userMessage = { from: "user", text: input };
//     setMessages((prev) => [...prev, userMessage]);
//     setInput("");
//     setLoading(true);

//     try {
//       // Get response from Gemini API
//       const botResponse = await fetchGeminiResponse(input);

//       // Add bot response to chat
//       setMessages((prev) => [...prev, { from: "bot", text: botResponse }]);
//     } catch (error) {
//       console.error("Error calling Gemini API:", error);
//       setMessages((prev) => [
//         ...prev,
//         {
//           from: "bot",
//           text: "Sorry, I'm having trouble connecting. Please try again later.",
//         },
//       ]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <>
//       {/* Chatbot Toggle Button */}
//       <button
//         onClick={() => setIsOpen(!isOpen)}
//         className={`fixed bottom-8 right-8 z-50 p-4 rounded-full shadow-xl transition-all duration-300 ${
//           isOpen ? "hidden" : "bg-[#8055FF] text-white hover:bg-[#6a46d9]"
//         }`}
//         aria-label="Open chat"
//       >
//         <MessageCircle size={28} />
//       </button>

//       {/* Chatbot Container */}
//       {isOpen && (
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           exit={{ opacity: 0, y: 20 }}
//           className="fixed bottom-8 right-8 w-80 bg-white dark:bg-gray-800 rounded-xl shadow-xl overflow-hidden z-50 flex flex-col border border-gray-200 dark:border-gray-700"
//         >
//           {/* Chatbot Header */}
//           <div className="bg-[#8055FF] text-white p-3 flex justify-between items-center">
//             <h3 className="font-semibold">Solar Saarthi Assistant</h3>
//             <button
//               onClick={() => setIsOpen(false)}
//               className="text-white hover:text-gray-200"
//               aria-label="Close chat"
//             >
//               <X size={20} />
//             </button>
//           </div>

//           {/* Chat Messages */}
//           <div className="flex-1 p-4 space-y-3 overflow-y-auto max-h-80">
//             {messages.map((msg, idx) => (
//               <div
//                 key={idx}
//                 className={`max-w-[90%] px-3 py-2 rounded-lg text-sm ${
//                   msg.from === "user"
//                     ? "ml-auto bg-[#8055FF] text-white rounded-tr-none"
//                     : "mr-auto bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-tl-none"
//                 }`}
//               >
//                 {msg.text}
//               </div>
//             ))}
//             {loading && (
//               <div className="mr-auto bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-tl-none rounded-lg px-3 py-2 max-w-[90%] text-sm">
//                 <div className="flex space-x-1">
//                   <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
//                   <div
//                     className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
//                     style={{ animationDelay: "0.2s" }}
//                   ></div>
//                   <div
//                     className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
//                     style={{ animationDelay: "0.4s" }}
//                   ></div>
//                 </div>
//               </div>
//             )}
//           </div>

//           {/* Input Area */}
//           <div className="p-3 border-t bg-gray-50 dark:bg-gray-700">
//             <div className="flex items-center gap-2">
//               <input
//                 type="text"
//                 placeholder="Ask about solar..."
//                 className="flex-1 px-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-1 focus:ring-[#8055FF] dark:bg-gray-600 dark:border-gray-500 dark:text-white dark:placeholder-gray-300"
//                 value={input}
//                 onChange={(e) => setInput(e.target.value)}
//                 onKeyDown={(e) => e.key === "Enter" && handleSend()}
//                 disabled={loading}
//               />
//               <button
//                 onClick={handleSend}
//                 className="p-2 bg-[#8055FF] text-white rounded-lg hover:bg-[#6a46d9] disabled:opacity-50"
//                 disabled={loading || !input.trim()}
//                 aria-label="Send message"
//               >
//                 <ArrowRight size={18} />
//               </button>
//             </div>
//           </div>
//         </motion.div>
//       )}
//     </>
//   );
// };

// export default ChatbotWidget;
