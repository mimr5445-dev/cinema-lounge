'use client';

import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, Send, X, Bot, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'مرحباً بك في استراحة السينما! أنا مساعدك الذكي المطور بـ Gemini، كيف يمكنني مساعدتك في اختيار فيلم السهرة؟' }
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;
    
    const userMessage = { role: 'user', content: input };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMessages }),
      });

      const data = await response.json();
      
      if (data.content) {
        setMessages(prev => [...prev, { role: 'assistant', content: data.content }]);
      } else {
        throw new Error('No content');
      }
    } catch (error) {
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: 'عذراً، حدث خطأ أثناء الاتصال بـ Gemini. تأكد من إعداد مفتاح API بشكل صحيح.' 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="mb-4 w-[350px] md:w-[400px] h-[500px] glass-card flex flex-col shadow-2xl border-[#c9a84c]/20 overflow-hidden"
          >
            {/* Header */}
            <div className="p-4 border-b border-white/10 flex items-center justify-between bg-[#c9a84c]/10">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-[#c9a84c] flex items-center justify-center">
                  <Bot size={18} className="text-[#07070f]" />
                </div>
                <div>
                  <h3 className="text-[#f0ece0] font-bold text-sm">مساعد Gemini</h3>
                  <span className="text-[10px] text-[#c9a84c] animate-pulse">نشط الآن</span>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-[#a09880] hover:text-[#f0ece0]">
                <X size={20} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`
                    max-w-[80%] p-3 rounded-2xl text-sm leading-relaxed
                    ${msg.role === 'user' 
                      ? 'bg-[#c9a84c] text-[#07070f] rounded-tl-none' 
                      : 'bg-white/10 text-[#f0ece0] border border-white/5 rounded-tr-none'
                    }
                  `}>
                    {msg.content}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white/10 p-3 rounded-2xl rounded-tr-none border border-white/5">
                    <Loader2 size={16} className="text-[#c9a84c] animate-spin" />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-white/10">
              <div className="relative">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="اسأل Gemini عن أي فيلم..."
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 pr-12 text-[#f0ece0] placeholder-[#5a5a6e] focus:border-[#c9a84c]/50 outline-none text-sm"
                />
                <button 
                  onClick={handleSend}
                  disabled={isLoading}
                  className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-[#c9a84c] text-[#07070f] rounded-lg flex items-center justify-center hover:bg-[#e4c06e] transition-colors disabled:opacity-50"
                >
                  <Send size={16} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-[#c9a84c] text-[#07070f] rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform active:scale-95"
      >
        <MessageSquare size={24} />
      </button>
    </div>
  );
};
