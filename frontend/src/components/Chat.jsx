const Chat = ({ messages }) => {
    return (
        <div className="min-h-0">
            {messages.map((msg, idx) => (
                <div key={idx} className={`chat ${msg.from === "ia" ? "chat-start bg-white" : "chat-end bg-gray-100"}`}>
                    <div className="bg-white text-[#333333] p-2 rounded-lg shadow-lg shadow-[#04A3A9]/20">{msg.text}</div>
                </div>
            ))}
        </div>
    );
}

export default Chat;
