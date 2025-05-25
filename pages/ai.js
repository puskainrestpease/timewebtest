import Layout from '../components/Layout';
import ChatMessage from '../components/ChatMessage';
import { useState } from 'react';

function AIPage() {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!inputText.trim()) return;

    const newMessage = { text: inputText, type: 'user' };
    setMessages([...messages, newMessage]);
    setInputText('');
    setLoading(true);

    try {
      const token = new URLSearchParams(window.location.search).get('token');
      const response = await fetch(`/api/chat`, { // Используем проксированный API
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: inputText, token }),
      });

      const data = await response.json();
      const aiResponse = { text: data.response, type: 'assistant' };
      setMessages((prevMessages) => [...prevMessages, aiResponse]);
    } catch (error) {
      const errorResponse = { text: '❌ Ошибка получения ответа', type: 'assistant' };
      setMessages((prevMessages) => [...prevMessages, errorResponse]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="page active">
        <div className="page-header">
          <h1>🤖 AI Помощник</h1>
        </div>
        <div className="chat-container">
          <div className="chat-messages">
            {messages.map((message, index) => (
              <ChatMessage key={index} message={message} />
            ))}
            {loading && <ChatMessage message={{ text: 'Думаю...', type: 'assistant' }} />}
          </div>
          <div className="chat-input-container">
            <textarea
              id="-input"
              placeholder="Задайте вопрос..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
            />
            <button className="send-btn" onClick={sendMessage}>
              Отправить
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default AIPage;
