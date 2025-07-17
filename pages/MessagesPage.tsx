import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../hooks/useAuth';
import { Message, User } from '../types';
import { getConversations, getMessagesForConversation, addMessage, getJobById } from '../services/mockDataService';
import { Link, useParams } from 'react-router-dom';
import { BriefcaseIcon, StarIcon, WalletIcon } from '../components/Icons';

type ConversationSummary = {
    otherUser: Pick<User, 'id' | 'name' | 'avatarUrl'>;
    lastMessage: Message;
    unreadCount: number;
};

const MessagesPage: React.FC = () => {
    const { user } = useAuth();
    const { conversationId } = useParams<{ conversationId?: string }>();
    const [conversations, setConversations] = useState<ConversationSummary[]>([]);
    const [activeConversation, setActiveConversation] = useState<ConversationSummary | null>(null);
    const [messages, setMessages] = useState<Message[]>([]);
    const [jobContext, setJobContext] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (user) {
            setLoading(true);
            getConversations(user.id).then(data => {
                setConversations(data);
                if (conversationId) {
                    const found = data.find(c => c.otherUser.id === conversationId);
                    setActiveConversation(found || data[0] || null);
                } else {
                    setActiveConversation(data[0] || null);
                }
                setLoading(false);
            });
        }
    }, [user, conversationId]);

    useEffect(() => {
        if (activeConversation && user) {
            getMessagesForConversation(user.id, activeConversation.otherUser.id).then(setMessages);
            if (activeConversation.lastMessage.jobId) {
                getJobById(activeConversation.lastMessage.jobId).then(setJobContext);
            } else {
                setJobContext(null);
            }
        } else {
            setMessages([]);
            setJobContext(null);
        }
    }, [activeConversation, user]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSendMessage = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!user || !activeConversation) return;

        const content = (e.currentTarget.elements.namedItem('message') as HTMLInputElement).value;
        if (!content.trim()) return;

        const newMessage: Message = {
            id: `msg-${Date.now()}`,
            senderId: user.id,
            recipientId: activeConversation.otherUser.id,
            content,
            timestamp: new Date().toISOString(),
            isRead: true, // It's read by the sender
            jobId: activeConversation.lastMessage.jobId,
            jobSubject: activeConversation.lastMessage.jobSubject,
        };

        const added = await addMessage(newMessage);
        setMessages(prev => [...prev, added]);
        e.currentTarget.reset();
    };

    if (loading) {
        return <div className="text-center p-10">Loading messages...</div>;
    }

    return (
        <div className="flex h-[calc(100vh-150px)] bg-fog-white dark:bg-fog-mid-dark rounded-xl shadow-2xl dark:shadow-2xl-dark overflow-hidden">
            {/* Conversations List */}
            <div className="w-full md:w-1/3 xl:w-1/4 border-r border-gray-200 dark:border-slate-800 flex flex-col">
                <header className="p-4 border-b border-gray-200 dark:border-slate-800">
                    <h2 className="text-xl font-bold text-fog-dark dark:text-fog-light">Messages</h2>
                </header>
                <div className="flex-grow overflow-y-auto">
                    {conversations.map(convo => (
                        <div key={convo.otherUser.id} onClick={() => setActiveConversation(convo)}
                             className={`p-4 flex items-start gap-3 cursor-pointer border-l-4 ${activeConversation?.otherUser.id === convo.otherUser.id ? 'bg-fog-accent/10 border-fog-accent' : 'border-transparent hover:bg-gray-50 dark:hover:bg-slate-700/50'}`}>
                            <img src={convo.otherUser.avatarUrl} alt={convo.otherUser.name} className="w-12 h-12 rounded-full" />
                            <div className="flex-1 overflow-hidden">
                                <div className="flex justify-between items-baseline">
                                    <p className="font-semibold text-fog-dark dark:text-fog-light truncate">{convo.otherUser.name}</p>
                                    <p className="text-xs text-gray-400 dark:text-slate-500 flex-shrink-0">{new Date(convo.lastMessage.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                                </div>
                                <p className="text-sm text-gray-500 dark:text-slate-400 truncate">{convo.lastMessage.jobSubject}</p>
                                <div className="flex justify-between items-center mt-1">
                                    <p className="text-sm text-gray-500 dark:text-slate-400 truncate">{convo.lastMessage.content}</p>
                                    {convo.unreadCount > 0 && <span className="flex-shrink-0 ml-2 bg-fog-accent text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">{convo.unreadCount}</span>}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Chat Window */}
            <div className="hidden md:flex flex-1 flex-col">
                {activeConversation && user ? (
                    <>
                        <header className="p-4 border-b border-gray-200 dark:border-slate-800 flex items-center gap-3">
                             <img src={activeConversation.otherUser.avatarUrl} alt={activeConversation.otherUser.name} className="w-10 h-10 rounded-full" />
                             <div>
                                <h3 className="font-bold text-fog-dark dark:text-fog-light">{activeConversation.otherUser.name}</h3>
                                {jobContext && <Link to={`/job/${jobContext.id}`} className="text-sm text-fog-accent hover:underline">{jobContext.title}</Link>}
                             </div>
                        </header>
                        <main className="flex-grow overflow-y-auto p-6 space-y-4 bg-gray-50 dark:bg-slate-900/50">
                            {messages.map(msg => (
                                <div key={msg.id} className={`flex items-end gap-2 ${msg.senderId === user.id ? 'justify-end' : ''}`}>
                                    {msg.senderId !== user.id && <img src={activeConversation.otherUser.avatarUrl} className="w-6 h-6 rounded-full" alt="" />}
                                    <div className={`max-w-md p-3 rounded-2xl ${msg.senderId === user.id ? 'bg-fog-accent text-white rounded-br-none' : 'bg-white dark:bg-slate-700 rounded-bl-none'}`}>
                                        <p className="text-sm">{msg.content}</p>
                                    </div>
                                </div>
                            ))}
                            <div ref={messagesEndRef} />
                        </main>
                        <footer className="p-4 border-t border-gray-200 dark:border-slate-800 bg-white dark:bg-fog-mid-dark">
                            <form onSubmit={handleSendMessage} className="flex items-center gap-3">
                                <input name="message" type="text" placeholder="Type a message..." className="flex-1 px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-full bg-gray-100 dark:bg-slate-800 focus:outline-none focus:ring-1 focus:ring-fog-accent" />
                                <button type="submit" className="px-4 py-2 bg-fog-accent text-white font-semibold rounded-full shadow-sm hover:bg-fog-accent-hover transition-colors">Send</button>
                            </form>
                        </footer>
                    </>
                ) : (
                    <div className="flex-grow flex flex-col items-center justify-center text-center text-gray-500 dark:text-slate-400 p-8">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-16 h-16 text-gray-300 dark:text-slate-600 mb-4"><path strokeLinecap="round" strokeLinejoin="round" d="M8.625 9.75a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227l.173.013h9.24a2.25 2.25 0 002.25-2.25v-1.706c0-1.114-.836-2.057-1.92-2.193a.375.375 0 00-.244.028l-1.034.345a.375.375 0 01-.362.019l-2.47-1.123a.375.375 0 00-.362-.019l-2.47-1.123a.375.375 0 01-.362.019l-1.034.345a.375.375 0 00-.244.028C2.957 8.943 2.123 9.886 2.123 11.01V12.75z" /></svg>
                        <h3 className="text-xl font-semibold text-fog-dark dark:text-fog-light">Select a conversation</h3>
                        <p>Choose from your existing conversations to start chatting.</p>
                    </div>
                )}
            </div>

             {/* Context Pane */}
            <div className="hidden xl:block w-1/4 border-l border-gray-200 dark:border-slate-800 p-6 bg-gray-50 dark:bg-slate-900/50">
                 {jobContext ? (
                    <div>
                         <h3 className="text-lg font-bold text-fog-dark dark:text-fog-light mb-4">Job Details</h3>
                         <div className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow-sm">
                            <h4 className="font-semibold text-fog-accent">{jobContext.title}</h4>
                            <p className="text-sm text-gray-500 dark:text-slate-400 mt-1">{jobContext.type}</p>
                            <div className="mt-4 flex justify-between items-center text-sm">
                                <span className="font-semibold text-gray-600 dark:text-gray-300">Budget</span>
                                <span className="font-bold text-lg text-fog-dark dark:text-fog-light">${jobContext.budget}</span>
                            </div>
                            <Link to={`/job/${jobContext.id}`} className="mt-4 block w-full text-center px-4 py-2 bg-fog-accent text-white font-semibold rounded-lg shadow-sm hover:bg-fog-accent-hover transition-colors text-sm">
                                View Job
                            </Link>
                         </div>
                    </div>
                 ) : (
                    <div className="text-center text-gray-400 dark:text-slate-500 pt-10">
                        <BriefcaseIcon className="w-12 h-12 mx-auto mb-2"/>
                        <p>Context about the job will appear here.</p>
                    </div>
                 )}
            </div>

        </div>
    );
};

export default MessagesPage;