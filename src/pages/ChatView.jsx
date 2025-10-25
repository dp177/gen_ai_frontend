import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../Axios/axios';
import { initSocket } from '../utils/socket';
import useAuthStore from '../context/AuthContext';
import Card from '../components/ui/Card';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';

const ChatView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const user = useAuthStore((s) => s.user);
  const [connections, setConnections] = useState([]);
  const [activeChat, setActiveChat] = useState(id || null);
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState('');
  const socketRef = useRef(null);
  const scrollRef = useRef(null);
  const isLawyer = user?.role === 'lawyer';

  useEffect(() => {
    const fetchConnections = async () => {
      try {
        const route = isLawyer ? '/api/lawyers/connections/lawyer' : '/api/lawyers/connections/me';
        const res = await api.get(route);
        const normalized = (res.data.connections || []).map((c) => {
          const peer = isLawyer ? c.from : c.to;
          const chatId = (c.chat && typeof c.chat === 'object') ? c.chat._id : c.chat;
          return {
            id: c._id,
            chat: chatId,
            peer,
            lastMessage: c.lastMessage || null,
            unread: c.unread || 0,
          };
        });
        setConnections(normalized);
      } catch (e) {
        console.error(e);
      }
    };
    fetchConnections();
  }, [isLawyer]);

  useEffect(() => {
    const s = initSocket();
    socketRef.current = s;

    s.on('new_message', (msg) => {
      if (msg.chat === activeChat) {
        setMessages((prev) => [...prev, msg]);
        setConnections((prev) =>
          prev.map((p) =>
            p.chat === msg.chat ? { ...p, lastMessage: msg, unread: 0 } : p
          )
        );
      } else {
        setConnections((prev) =>
          prev.map((p) =>
            p.chat === msg.chat
              ? { ...p, lastMessage: msg, unread: (p.unread || 0) + 1 }
              : p
          )
        );
      }
    });

    return () => {
      s.off('new_message');
    };
  }, [activeChat]);

  useEffect(() => {
    if (!activeChat) return;
    const fetchMessages = async () => {
      try {
        const res = await api.get(`/api/messages/${activeChat}`);
        setMessages(res.data.messages || []);
        socketRef.current?.emit('join', activeChat);
        setConnections((prev) =>
          prev.map((p) => (p.chat === activeChat ? { ...p, unread: 0 } : p))
        );
        navigate(`/chat/${activeChat}`, { replace: true });
      } catch (e) {
        console.error(e);
      }
    };
    fetchMessages();

    return () => {
      socketRef.current?.emit('leave', activeChat);
    };
  }, [activeChat, navigate]);

  useEffect(() => {
    if (id) setActiveChat(id);
  }, [id]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessage = async () => {
    if (!text.trim() || !activeChat) return;
    const payload = {
      chatId: activeChat,
      content: text,
      userId: user?._id,
      role: isLawyer ? 'lawyer' : 'user',
    };
    setText('');
    try {
      await api.post('/api/messages', payload);
    } catch (e) {
      console.error('send failed', e);
    }
  };

  return (
    <div className="h-full flex space-x-8">
      <Card className="w-1/3 flex flex-col">
        <h2 className="text-2xl font-bold mb-4">Contacts</h2>
        <div className="flex-1 overflow-y-auto">
          {connections.map((c) => (
            <div
              key={c.id}
              onClick={() => setActiveChat(c.chat)}
              className={`p-4 rounded-md cursor-pointer mb-2 ${
                c.chat === activeChat ? 'bg-accent text-accent-text' : 'hover:bg-gray-50'
              }`}
            >
              <div className="font-semibold">{c.peer?.name}</div>
              <div className="text-sm opacity-75 truncate">
                {c.lastMessage ? c.lastMessage.content : 'No messages yet'}
              </div>
            </div>
          ))}
        </div>
      </Card>
      <Card className="w-2/3 flex flex-col">
        {activeChat ? (
          <>
            <div className="border-b border-border pb-4 mb-4">
              <h2 className="text-2xl font-bold">
                {connections.find((x) => x.chat === activeChat)?.peer?.name}
              </h2>
            </div>
            <div ref={scrollRef} className="flex-1 overflow-y-auto pr-4">
              {messages.map((m) => (
                <div
                  key={m._id}
                  className={`mb-4 flex ${
                    m.user === user?._id ? 'justify-end' : 'justify-start'
                  }`}
                >
                  <div
                    className={`max-w-md px-4 py-2 rounded-lg shadow ${
                      m.user === user?._id
                        ? 'bg-accent text-accent-text'
                        : 'bg-surface'
                    }`}
                  >
                    {m.content}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 flex space-x-4">
              <Input
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Type a message..."
                className="flex-1"
                onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
              />
              <Button onClick={sendMessage}>Send</Button>
            </div>
          </>
        ) : (
          <div className="flex items-center justify-center h-full">
            <p className="text-secondary">Select a conversation to start chatting.</p>
          </div>
        )}
      </Card>
    </div>
  );
};

export default ChatView;