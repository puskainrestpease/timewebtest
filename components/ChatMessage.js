function ChatMessage({ message }) {
    return (
      <div className={`message ${message.type}`}>
        {message.text}
      </div>
    );
  }
  
export default ChatMessage;
  