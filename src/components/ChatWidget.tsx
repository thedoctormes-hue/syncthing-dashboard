import { useState } from 'react';
import { Send, MessageCircle, X } from 'lucide-react';

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Привет! Я КотОлизатОр. Чем помочь?' }
  ]);

  const sendMessage = () => {
    if (!message.trim()) return;
    setMessages([...messages, { role: 'user', content: message }]);
    setTimeout(() => {
      setMessages(m => [...m, { role: 'assistant', content: 'Обрабатываю... 🔥' }]);
    }, 500);
    setMessage('');
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-4 right-4 w-12 h-12 bg-emerald rounded-full flex items-center justify-center shadow-lg z-50"
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </button>

      {isOpen && (
        <div className="fixed bottom-20 right-4 w-80 h-96 bg-dark border border-white/10 rounded-lg flex flex-col z-50">
          <div className="p-3 border-b border-white/10">
            <h3 className="font-mono text-emerald">Чат с КотОлизатОр</h3>
          </div>
          <div className="flex-1 p-3 overflow-y-auto space-y-2">
            {messages.map((m, i) => (
              <div key={i} className={`text-sm ${m.role === 'user' ? 'text-right' : 'text-left'}`}>
                <span className={`inline-block p-2 rounded ${
                  m.role === 'user' ? 'bg-emerald text-dark' : 'bg-white/10'
                }`}>
                  {m.content}
                </span>
              </div>
            ))}
          </div>
          <div className="p-3 border-t border-white/10 flex gap-2">
            <input
              value={message}
              onChange={e => setMessage(e.target.value)}
              onKeyPress={e => e.key === 'Enter' && sendMessage()}
              placeholder="Сообщение..."
              className="flex-1 px-2 py-1 bg-white/5 rounded font-mono text-sm"
            />
            <button onClick={sendMessage} className="p-1 hover:bg-white/10 rounded">
              <Send size={16} />
            </button>
          </div>
        </div>
      )}
    </>
  );
}