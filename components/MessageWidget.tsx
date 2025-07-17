import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../hooks/useAuth';
import { Message, User } from '../types';
import { getConversations, getMessagesForConversation, addMessage, getJobById, getUnreadMessageCount } from '../services/mockDataService';
import { generateMessageReply } from '../services/geminiService';
import { Link } from 'react-router-dom';
import { XIcon, BriefcaseIcon, MessageIcon as MessageBubbleIcon, AIIcon, PaperClipIcon, PhotoIcon, MicrophoneIcon, SendIcon, StopIcon } from './Icons';

type ConversationSummary = {
    otherUser: Pick<User, 'id' | 'name' | 'avatarUrl'>;
    lastMessage: Message;
    unreadCount: number;
    isBuying: boolean;
};

const MessageWidget: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { user, isAuthenticated } = useAuth();
    const [conversations, setConversations] = useState<ConversationSummary[]>([]);
    const [activeConversation, setActiveConversation] = useState<ConversationSummary | null>(null);
    const [messages, setMessages] = useState<Message[]>([]);
    const [jobContext, setJobContext] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const [activeTab, setActiveTab] = useState<'buying'|'selling'>('buying');
    const [unreadCount, setUnreadCount] = useState(0);

    const [isGeneratingReply, setIsGeneratingReply] = useState(false);
    const [isRecording, setIsRecording] = useState(false);
    const [attachment, setAttachment] = useState<File | null>(null);
    
    const fileInputRef = useRef<HTMLInputElement>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const messageInputRef = useRef<HTMLInputElement>(null);

    const fetchUnreadCount = () => {
        if(user) getUnreadMessageCount(user.id).then(setUnreadCount);
    }
    
    useEffect(() => {
        if(isAuthenticated) fetchUnreadCount();
        const interval = setInterval(fetchUnreadCount, 5000); // Poll for new messages
        return () => clearInterval(interval);
    }, [isAuthenticated, user]);


    useEffect(() => {
        if (isOpen && user) {
            setLoading(true);
            getConversations(user.id).then(data => {
                setConversations(data);
                const currentActiveConvoExists = activeConversation && data.some(c => c.otherUser.id === activeConversation.otherUser.id);
                const filteredData = data.filter(c => c.isBuying === (activeTab === 'buying'));
                
                if (!currentActiveConvoExists || activeConversation.isBuying !== (activeTab === 'buying')) {
                    setActiveConversation(filteredData[0] || null);
                } else if (activeConversation) {
                    // Refresh active conversation data (like unread count)
                    const refreshedActive = data.find(c => c.otherUser.id === activeConversation.otherUser.id);
                    if(refreshedActive) setActiveConversation(refreshedActive);
                }
                
                setLoading(false);
            });
        }
    }, [isOpen, user, activeTab]);

    useEffect(() => {
        if (activeConversation && user) {
            getMessagesForConversation(user.id, activeConversation.otherUser.id).then(setMessages);
            if (activeConversation.lastMessage.jobId) {
                getJobById(activeConversation.lastMessage.jobId).then(setJobContext);
            } else {
                setJobContext(null);
            }
            fetchUnreadCount(); // Update total unread count after opening a conversation
        } else {
            setMessages([]);
            setJobContext(null);
        }
    }, [activeConversation, user]);
    
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const handleSendMessage = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget;
        const input = messageInputRef.current;
        if (!user || !activeConversation || !input) return;

        const content = input.value;
        if (!content.trim() && !attachment) return;

        const newMessage: Message = {
            id: `msg-${Date.now()}`,
            senderId: user.id,
            recipientId: activeConversation.otherUser.id,
            content: attachment ? `Sent attachment: ${attachment.name}` : content,
            timestamp: new Date().toISOString(),
            isRead: true, 
            jobId: activeConversation.lastMessage.jobId,
            jobSubject: activeConversation.lastMessage.jobSubject,
        };

        const added = await addMessage(newMessage);
        setMessages(prev => [...prev, added]);
        setAttachment(null);
        form.reset();
    };
    
    const handleAiAssist = async () => {
        if (!user || !activeConversation || messages.length === 0) return;
        const lastMessage = messages[messages.length - 1];
        if (lastMessage.senderId === user.id) return; // Don't reply to self

        setIsGeneratingReply(true);
        const reply = await generateMessageReply(lastMessage, user);
        if(messageInputRef.current) {
            messageInputRef.current.value = reply;
        }
        setIsGeneratingReply(false);
        messageInputRef.current?.focus();
    };

    const handleAttachmentClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setAttachment(e.target.files[0]);
        }
    };

    const handleRecordVoice = () => {
        if (!isRecording) {
            navigator.mediaDevices.getUserMedia({ audio: true })
                .then(stream => {
                    setIsRecording(true);
                    // In a real app, you would handle the stream here
                })
                .catch(err => {
                    alert("Microphone access denied. Please allow microphone permission in your browser settings.");
                    console.error("Microphone error:", err);
                });
        } else {
            setIsRecording(false);
        }
    };

    const toggleChat = () => setIsOpen(!isOpen);

    if (!isAuthenticated) return null;

    const filteredConversations = conversations.filter(c => c.isBuying === (activeTab === 'buying'));
    
    return (
        <div className="fixed bottom-24 right-5 z-50">
            {isOpen && (
                <div 
                    className="absolute bottom-full right-0 mb-2 w-[calc(100vw-2.5rem)] sm:w-[80vw] md:w-[70vw] lg:w-[60vw] max-w-4xl h-[calc(100vh-7.5rem)] sm:h-[70vh] max-h-[700px] bg-fog-white dark:bg-fog-dark rounded-xl shadow-2xl dark:shadow-2xl-dark flex flex-col animate-fade-in-up origin-bottom-right"
                >
                    {/* Conversations List */}
                    <div className={`w-full ${activeConversation ? 'hidden' : 'flex'} sm:w-1/3 sm:flex xl:w-1/4 border-r border-gray-200 dark:border-slate-800 flex-col`}>
                        <header className="p-4 border-b border-gray-200 dark:border-slate-800 flex justify-between items-center flex-shrink-0">
                            <h2 className="text-xl font-bold text-fog-dark dark:text-fog-light">Inbox</h2>
                        </header>
                        <div className="p-2 border-b border-gray-200 dark:border-slate-800 flex-shrink-0">
                             <div className="flex bg-gray-100 dark:bg-slate-800 rounded-md p-1">
                                <button onClick={() => { setActiveTab('buying'); setActiveConversation(null); }} className={`w-1/2 py-1.5 text-sm font-semibold rounded ${activeTab === 'buying' ? 'bg-white dark:bg-slate-700 shadow' : 'text-gray-500 dark:text-slate-400'}`}>Buying</button>
                                <button onClick={() => { setActiveTab('selling'); setActiveConversation(null); }} className={`w-1/2 py-1.5 text-sm font-semibold rounded ${activeTab === 'selling' ? 'bg-white dark:bg-slate-700 shadow' : 'text-gray-500 dark:text-slate-400'}`}>Selling</button>
                            </div>
                        </div>
                        <div className="flex-grow overflow-y-auto">
                            {loading ? <p className="p-4 text-center text-sm text-gray-500">Loading...</p> : filteredConversations.map(convo => (
                                <div key={convo.otherUser.id} onClick={() => setActiveConversation(convo)}
                                     className={`p-4 flex items-start gap-3 cursor-pointer border-l-4 ${activeConversation?.otherUser.id === convo.otherUser.id ? 'bg-fog-accent/10 border-fog-accent' : 'border-transparent hover:bg-gray-50 dark:hover:bg-slate-800'}`}>
                                    <div className="relative flex-shrink-0">
                                        <img src={convo.otherUser.avatarUrl} alt={convo.otherUser.name} className="w-12 h-12 rounded-full" />
                                        {convo.unreadCount > 0 && <span className="absolute top-0 right-0 block h-3 w-3 rounded-full bg-fog-accent ring-2 ring-white dark:ring-fog-dark"/>}
                                    </div>
                                    <div className="flex-1 overflow-hidden">
                                        <div className="flex justify-between items-baseline">
                                            <p className="font-semibold text-fog-dark dark:text-fog-light truncate">{convo.otherUser.name}</p>
                                            <p className="text-xs text-gray-400 dark:text-slate-500 flex-shrink-0">{new Date(convo.lastMessage.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                                        </div>
                                        <p className="text-sm text-gray-500 dark:text-slate-400 truncate">{convo.lastMessage.jobSubject}</p>
                                        <p className="text-sm text-gray-500 dark:text-slate-400 truncate mt-1">{convo.lastMessage.content}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Chat Window */}
                    <div className={`flex-1 flex-col bg-gray-50 dark:bg-slate-900/50 ${activeConversation ? 'flex' : 'hidden'} sm:flex`}>
                        {activeConversation && user ? (
                            <>
                                <header className="p-4 border-b border-gray-200 dark:border-slate-800 flex items-center gap-3 bg-white dark:bg-fog-mid-dark">
                                    <button className="sm:hidden p-1 -ml-2 text-gray-500 dark:text-gray-300" onClick={() => setActiveConversation(null)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
                                    </button>
                                     <img src={activeConversation.otherUser.avatarUrl} alt={activeConversation.otherUser.name} className="w-10 h-10 rounded-full" />
                                     <div>
                                        <h3 className="font-bold text-fog-dark dark:text-fog-light">{activeConversation.otherUser.name}</h3>
                                        {jobContext && <Link to={`/job/${jobContext.id}`} onClick={toggleChat} className="text-sm text-fog-accent hover:underline">{jobContext.title}</Link>}
                                     </div>
                                </header>
                                <main className="flex-grow overflow-y-auto p-6 space-y-4">
                                    {messages.map(msg => (
                                        <div key={msg.id} className={`flex items-end gap-2 ${msg.senderId === user.id ? 'justify-end' : ''}`}>
                                            {msg.senderId !== user.id && <img src={activeConversation.otherUser.avatarUrl} className="w-6 h-6 rounded-full self-start" alt="" />}
                                            <div className={`max-w-xs md:max-w-md p-3 rounded-2xl shadow-sm ${msg.senderId === user.id ? 'bg-fog-accent text-white rounded-br-none' : 'bg-white dark:bg-slate-700 rounded-bl-none'}`}>
                                                <p className="text-sm break-words">{msg.content}</p>
                                            </div>
                                        </div>
                                    ))}
                                    <div ref={messagesEndRef} />
                                </main>
                                <footer className="p-2 sm:p-3 border-t border-gray-200 dark:border-slate-800 bg-white dark:bg-fog-mid-dark flex-shrink-0">
                                    {attachment && (
                                        <div className="px-4 pb-2 flex items-center justify-between text-sm">
                                            <div className="text-gray-600 dark:text-gray-300 flex items-center gap-2">
                                                <PaperClipIcon className="w-4 h-4" />
                                                <span className="truncate max-w-xs">{attachment.name}</span>
                                            </div>
                                            <button onClick={() => setAttachment(null)} className="text-red-500 hover:text-red-700"><XIcon /></button>
                                        </div>
                                    )}
                                    <form onSubmit={handleSendMessage} className="flex items-center gap-1 sm:gap-2">
                                        <input ref={fileInputRef} type="file" onChange={handleFileChange} className="hidden" />
                                        <button onClick={handleAttachmentClick} type="button" title="Attach file" className="p-2 text-gray-500 dark:text-gray-400 hover:text-fog-accent dark:hover:text-fog-light rounded-full transition-colors">
                                            <PaperClipIcon className="w-5 h-5" />
                                        </button>
                                        <button onClick={handleAttachmentClick} type="button" title="Send image" className="p-2 text-gray-500 dark:text-gray-400 hover:text-fog-accent dark:hover:text-fog-light rounded-full transition-colors">
                                            <PhotoIcon className="w-5 h-5" />
                                        </button>
                                        <div className="flex-1 relative">
                                            <input
                                                ref={messageInputRef}
                                                name="message"
                                                type="text"
                                                placeholder="Type a message..."
                                                autoComplete="off"
                                                disabled={isGeneratingReply || isRecording}
                                                className="w-full px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-full bg-gray-100 dark:bg-slate-800 focus:outline-none focus:ring-1 focus:ring-fog-accent disabled:opacity-50"
                                            />
                                            {isGeneratingReply && <div className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 border-2 border-fog-accent border-t-transparent rounded-full animate-spin"></div>}
                                        </div>
                                        <button onClick={handleAiAssist} disabled={isGeneratingReply} type="button" title="Use AI assist" className="p-2 text-gray-500 dark:text-gray-400 hover:text-fog-accent dark:hover:text-fog-light rounded-full transition-colors disabled:opacity-50">
                                            <AIIcon className="w-5 h-5" />
                                        </button>
                                        <button onClick={handleRecordVoice} type="button" title="Record voice note" className={`p-2 rounded-full transition-colors ${isRecording ? 'text-red-500' : 'text-gray-500 dark:text-gray-400 hover:text-fog-accent dark:hover:text-fog-light'}`}>
                                            {isRecording ? <StopIcon className="w-5 h-5"/> : <MicrophoneIcon className="w-5 h-5" />}
                                        </button>
                                        <button type="submit" title="Send message" className="p-3 text-white bg-fog-accent rounded-full transition-colors hover:bg-fog-accent-hover shadow-sm flex-shrink-0">
                                            <SendIcon className="w-5 h-5" />
                                        </button>
                                    </form>
                                </footer>
                            </>
                        ) : (
                            <div className="flex-grow flex-col items-center justify-center text-center text-gray-500 dark:text-slate-400 p-8 hidden sm:flex">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-16 h-16 text-gray-300 dark:text-slate-600 mb-4"><path strokeLinecap="round" strokeLinejoin="round" d="M8.625 9.75a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227l.173.013h9.24a2.25 2.25 0 002.25-2.25v-1.706c0-1.114-.836-2.057-1.92-2.193a.375.375 0 00-.244.028l-1.034.345a.375.375 0 01-.362.019l-2.47-1.123a.375.375 0 00-.362-.019l-2.47-1.123a.375.375 0 01-.362.019l-1.034.345a.375.375 0 00-.244.028C2.957 8.943 2.123 9.886 2.123 11.01V12.75z" /></svg>
                                <h3 className="text-xl font-semibold text-fog-dark dark:text-fog-light">Select a conversation</h3>
                                <p>Choose from your existing conversations to start chatting.</p>
                            </div>
                        )}
                    </div>
                </div>
            )}
            
            <button
                onClick={toggleChat}
                className="bg-fog-accent text-white w-16 h-16 rounded-full flex items-center justify-center shadow-lg hover:bg-fog-accent-hover transition-all transform hover:scale-110 focus:outline-none relative"
                aria-label="Toggle Messages"
            >
                {isOpen ? <XIcon /> : <MessageBubbleIcon />}
                {unreadCount > 0 && !isOpen && (
                    <span className="absolute -top-1 -right-1 block h-5 w-5 text-xs flex items-center justify-center rounded-full bg-red-500 ring-2 ring-white dark:ring-fog-dark">{unreadCount}</span>
                )}
            </button>
        </div>
    );
};

export default MessageWidget;