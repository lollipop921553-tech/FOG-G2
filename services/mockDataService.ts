import { Job, Testimonial, Survey, JobType, Message, RewardTask, Transaction, User, Bid, Comment, Activity } from '../types';

let allJobs: Job[] = [
  // Existing Jobs
  { id: 'f1', title: 'Senior React Developer for Fintech App', description: 'We need an experienced React developer to lead the front-end development of our new fintech platform. Must have experience with TypeScript, Redux, and Jest. The ideal candidate will be a strong communicator and able to work in a fast-paced agile environment. This is a 3-month contract with a possibility of extension.', type: JobType.Freelance, budget: 5000, skills: ['React', 'TypeScript', 'Fintech', 'Redux', 'Jest'], postedBy: { id: 'c1', name: 'Fintech Solutions', avatarUrl: 'https://picsum.photos/seed/c1/100/100', rating: 4.9, isPremium: true }, isSponsored: true, createdAt: '2023-10-20T10:00:00.000Z', allowsPointDiscount: true },
  { id: 'f2', title: 'UI/UX Designer for Mobile Game', description: 'Looking for a creative UI/UX designer to create compelling interfaces and user experiences for an upcoming mobile game. Portfolio required. You will be responsible for creating wireframes, mockups, and prototypes for all screens of the game.', type: JobType.Freelance, budget: 3200, skills: ['UI/UX', 'Figma', 'Mobile Gaming', 'Adobe XD'], postedBy: { id: 'c2', name: 'Game Studios', avatarUrl: 'https://picsum.photos/seed/c2/100/100', rating: 4.7, isPremium: false }, isSponsored: false, createdAt: '2023-10-19T11:00:00.000Z', allowsPointDiscount: false },
  { id: 'f3', title: 'Content Writer for Tech Blog', description: 'Seeking a skilled writer to produce high-quality articles on topics like AI, blockchain, and software development. SEO knowledge is a plus. We need 4 articles per month, around 1500 words each.', type: JobType.Freelance, budget: 800, skills: ['Writing', 'SEO', 'Tech'], postedBy: { id: 'c3', name: 'Tech Weekly', avatarUrl: 'https://picsum.photos/seed/c3/100/100', rating: 4.8, isPremium: false }, isSponsored: false, createdAt: '2023-10-18T12:00:00.000Z', allowsPointDiscount: true },
  { id: 'f4', title: 'Cloud Architect (AWS/Azure)', description: 'Design and implement a scalable cloud infrastructure for a high-traffic e-commerce site. Certification is highly preferred. You must have proven experience with both AWS and Azure, as well as Terraform and Kubernetes.', type: JobType.Freelance, budget: 7500, skills: ['AWS', 'Azure', 'DevOps', 'Terraform'], postedBy: { id: 'user123', name: 'Alex Doe', avatarUrl: 'https://picsum.photos/seed/user123/200/200', rating: 5.0, isPremium: true }, isSponsored: true, createdAt: '2023-10-21T09:00:00.000Z', allowsPointDiscount: false },
  { id: 't1', title: 'Assemble IKEA Furniture', description: 'Need help assembling a bed frame, a dresser, and two nightstands. I have all the tools. Should take about 3-4 hours. Please be careful with the wooden floors.', type: JobType.Task, budget: 100, skills: ['Furniture Assembly', 'Handyman'], location: 'Islamabad', postedBy: { id: 'c5', name: 'Aisha K.', avatarUrl: 'https://picsum.photos/seed/c5/100/100', rating: 4.9, isPremium: false }, isSponsored: false, createdAt: '2023-10-20T15:00:00.000Z', allowsPointDiscount: true },
  { id: 't2', title: 'Garden Weeding and Cleanup', description: 'My garden is overgrown with weeds. Need someone for a full day of cleanup and weeding. All equipment provided. Must be able to haul away the garden waste.', type: JobType.Task, budget: 150, skills: ['Gardening', 'Landscaping'], location: 'Rawalpindi', postedBy: { id: 'c6', name: 'Bilal R.', avatarUrl: 'https://picsum.photos/seed/c6/100/100', rating: 4.6, isPremium: false }, isSponsored: true, createdAt: '2023-10-21T08:00:00.000Z', allowsPointDiscount: false },
  { id: 't3', title: 'Event Photographer for Birthday Party', description: 'Looking for a photographer for a 3-hour birthday party on Saturday evening. Must have your own professional camera and be good with kids.', type: JobType.Task, budget: 200, skills: ['Photography', 'Events'], location: 'Islamabad', postedBy: { id: 'user123', name: 'Alex Doe', avatarUrl: 'https://picsum.photos/seed/user123/200/200', rating: 5.0, isPremium: true }, isSponsored: false, createdAt: '2023-10-19T18:00:00.000Z', allowsPointDiscount: true },
];

// Generate more jobs for scrolling
const freelanceTitles = ['Build a Landing Page', 'Optimize SQL Database', 'Create Marketing Copy', 'Develop a Python Script', 'Manage Social Media Accounts', '3D Model for a Product', 'Translate Document', 'Create a Brand Logo', 'Video Editing for YouTube Channel', 'SEO Audit and Strategy'];
const taskTitles = ['Paint a Room', 'Mount a TV', 'Grocery Delivery', 'Dog Walking Services', 'Deep Clean a Kitchen', 'Minor Car Repair', 'Help Moving Boxes', 'Garden Weeding', 'Plumbing Fix', 'AC Servicing'];
const clientNames = ['Innovate Inc.', 'DataCorp', 'MarketBoost', 'CodeStream', 'CreativeMinds', 'LocalGoods', 'HomeCare Co.', 'TechSolutions'];
const skillsBank = [['HTML', 'CSS', 'JavaScript'], ['SQL', 'PostgreSQL'], ['Copywriting', 'Marketing'], ['Python', 'Automation'], ['Social Media', 'Content Creation'], ['Blender', '3D Modeling'], ['Translation', 'Spanish'], ['Painting', 'DIY'], ['Handyman', 'Installation'], ['Delivery', 'Driving'], ['Pet Care'], ['Cleaning'], ['Mechanics'], ['Moving']];

for (let i = 0; i < 20; i++) {
  const isFreelance = Math.random() > 0.4;
  const skillIndex = Math.floor(Math.random() * skillsBank.length);
  const titleIndex = Math.floor(Math.random() * (isFreelance ? freelanceTitles.length : taskTitles.length));
  
  allJobs.push({
    id: `gen-${i}`,
    type: isFreelance ? JobType.Freelance : JobType.Task,
    title: `${isFreelance ? freelanceTitles[titleIndex] : taskTitles[titleIndex]}`,
    description: `This is a generated job posting for ${isFreelance ? 'a freelance project' : 'a local task'}. We are looking for a reliable individual with the right skills. Please apply if you are a good fit.`,
    budget: Math.floor(Math.random() * (isFreelance ? 5000 : 500)) + 50,
    skills: skillsBank[skillIndex % skillsBank.length],
    location: isFreelance ? undefined : (Math.random() > 0.5 ? 'Islamabad' : 'Rawalpindi'),
    postedBy: { id: `c-gen-${i}`, name: `${clientNames[i % clientNames.length]}`, avatarUrl: `https://picsum.photos/seed/c-gen-${i}/100/100`, rating: parseFloat((Math.random() * (5 - 4) + 4).toFixed(1)), isPremium: Math.random() > 0.8 },
    isSponsored: Math.random() > 0.85,
    createdAt: new Date(Date.now() - Math.random() * 1000 * 60 * 60 * 24 * 10).toISOString(),
    allowsPointDiscount: Math.random() > 0.3,
  });
}


const testimonials: Testimonial[] = [
    { id: 1, name: 'Sarah L.', role: 'Freelance Developer', quote: 'FOG connected me with a high-value client in a different timezone. The platform is professional, secure, and focused on getting things done.', avatarUrl: 'https://picsum.photos/seed/t1/100/100' },
    { id: 2, name: 'Ahmed Khan', role: 'Tasker in Islamabad', quote: 'I make a good side income by doing local tasks on FOG. The geo-fencing is great, so I only see jobs that are actually near me.', avatarUrl: 'https://picsum.photos/seed/t2/100/100' },
    { id: 3, name: 'David Chen', role: 'Small Business Owner', quote: "Hiring for both a website redesign and local delivery help was seamless. It's my one-stop-shop for getting work done.", avatarUrl: 'https://picsum.photos/seed/t3/100/100' },
];

const surveys: Survey[] = [
    { id: 's1', title: 'Platform Feedback Survey', description: 'Help us improve FOG. Tell us about your experience and what features you want to see next.', points: 150 },
    { id: 's2', title: 'Ad Preference Quiz', description: 'Let us know what kind of ads you prefer to see so we can tailor your experience.', points: 75 },
    { id: 's3', title: 'Market Research: New Service Ideas', description: 'Participate in our market research and share your thoughts on potential new services for the platform.', points: 200 },
];

const rewardTasks: RewardTask[] = [
    { id: 'rt1', title: 'Review a new App', description: 'Download and provide feedback on a partner application.', reward: '$5.00' },
    { id: 'rt2', title: 'Data Annotation Task', description: 'Help train an AI by labeling 100 images.', reward: '1000 Points' },
    { id: 'rt3', title: 'Follow on Social Media', description: 'Follow our partner on Twitter and Instagram.', reward: '50 Points' },
    { id: 'rt4', title: 'Product Promotion Post', description: 'Share a promotional post on your social media profile.', reward: '$10.00' },
];

let mockMessages: Message[] = [
    // Conversation 1: Alex (user123) and Fintech Solutions (c1) about job f1
    { id: 'm1', senderId: 'c1', recipientId: 'user123', content: 'Thanks for your application, Alex. Your profile looks impressive. Could we schedule a brief call next week?', jobId: 'f1', jobSubject: 'Senior React Developer for Fintech App', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(), isRead: false },
    { id: 'm2', senderId: 'user123', recipientId: 'c1', content: 'Thank you! I\'d be happy to. I\'m available Tuesday or Wednesday afternoon. Let me know what works best for you.', jobId: 'f1', jobSubject: 'Senior React Developer for Fintech App', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 23).toISOString(), isRead: true },
    { id: 'm3', senderId: 'c1', recipientId: 'user123', content: 'Great, let\'s do Tuesday at 2 PM. I\'ll send a calendar invite shortly.', jobId: 'f1', jobSubject: 'Senior React Developer for Fintech App', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 22).toISOString(), isRead: true },

    // Conversation 2: Alex (user123) and Aisha K. (c5) about job t1
    { id: 'm4', senderId: 'user123', recipientId: 'c5', content: 'Hi Aisha, I saw your post about assembling IKEA furniture. I have a lot of experience with this and can be there tomorrow morning.', jobId: 't1', jobSubject: 'Assemble IKEA Furniture', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 8).toISOString(), isRead: false },
    { id: 'm5', senderId: 'c5', recipientId: 'user123', content: 'Hi Alex, that would be great! Can you make it at 10 AM?', jobId: 't1', jobSubject: 'Assemble IKEA Furniture', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 7).toISOString(), isRead: true },
    { id: 'm6', senderId: 'user123', recipientId: 'c5', content: '10 AM works perfectly. See you then!', jobId: 't1', jobSubject: 'Assemble IKEA Furniture', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 6).toISOString(), isRead: true },

    // Conversation 3: Alex (user123) and Game Studios (c2)
    { id: 'm7', senderId: 'c2', recipientId: 'user123', content: 'Hello Alex, we are looking for developers for a new project and your profile caught our eye. Are you open to new opportunities?', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 72).toISOString(), isRead: true, jobId: 'f2', jobSubject: 'UI/UX Designer for Mobile Game' },
];

const firstNames = ['John', 'Jane', 'Peter', 'Susan', 'Michael', 'Emily', 'Chris', 'Katie'];
const lastNames = ['Smith', 'Doe', 'Jones', 'Williams', 'Brown', 'Davis', 'Miller', 'Wilson'];
const messageContent = [
    "Hey, I'm really interested in this. Can we discuss further?",
    "Your project looks great! I have a few questions.",
    "Is the budget negotiable?",
    "I've attached my portfolio for your review.",
    "Perfect, that works for me.",
    "Thanks for the quick response!",
    "Let me check my calendar and get back to you.",
    "I can start on this immediately."
];

const allUsers: Pick<User, 'id' | 'name' | 'avatarUrl'>[] = [
    { id: 'user123', name: 'Alex Doe', avatarUrl: 'https://picsum.photos/seed/user123/200/200'},
    { id: 'c1', name: 'Fintech Solutions', avatarUrl: 'https://picsum.photos/seed/c1/100/100'},
    { id: 'c2', name: 'Game Studios', avatarUrl: 'https://picsum.photos/seed/c2/100/100'},
    { id: 'c3', name: 'Tech Weekly', avatarUrl: 'https://picsum.photos/seed/c3/100/100'},
    { id: 'c5', name: 'Aisha K.', avatarUrl: 'https://picsum.photos/seed/c5/100/100'},
    { id: 'c6', name: 'Bilal R.', avatarUrl: 'https://picsum.photos/seed/c6/100/100'},
];

// Generate more users
for(let i=0; i<20; i++) {
    const name = `${firstNames[i % firstNames.length]} ${lastNames[i % lastNames.length]}`;
    allUsers.push({ id: `user-gen-${i}`, name, avatarUrl: `https://picsum.photos/seed/user-gen-${i}/100/100` });
}

// Generate more messages for scroll testing
for(let i = 0; i < 20; i++) {
    const otherUser = allUsers[i + 4]; // Use generated users
    const relatedJob = allJobs[i % allJobs.length];
    const isAlexBuying = relatedJob.postedBy.id !== 'user123';
    
    const sender = isAlexBuying ? otherUser.id : 'user123';
    const recipient = isAlexBuying ? 'user123' : otherUser.id;

    mockMessages.push({
        id: `m-gen1-${i}`,
        senderId: sender,
        recipientId: recipient,
        content: `Hi, I'm contacting you about "${relatedJob.title}".`,
        jobId: relatedJob.id,
        jobSubject: relatedJob.title,
        timestamp: new Date(Date.now() - (1000 * 60 * 60 * (i * 2 + 1))).toISOString(),
        isRead: i > 5, // Make some unread
    });
     mockMessages.push({
        id: `m-gen2-${i}`,
        senderId: recipient,
        recipientId: sender,
        content: messageContent[i % messageContent.length],
        jobId: relatedJob.id,
        jobSubject: relatedJob.title,
        timestamp: new Date(Date.now() - (1000 * 60 * 55 * (i * 2 + 1))).toISOString(),
        isRead: true,
    });
}


const mockTransactions: Transaction[] = [
    { id: 'tx1', date: '2023-10-22', description: 'Deposit from Bank Account', amount: '+$50.00', status: 'Completed', type: 'Deposit' },
    { id: 'tx2', date: '2023-10-21', description: 'Withdrawal to BTC Wallet', amount: '-$100.00', status: 'Completed', type: 'Withdrawal' },
    { id: 'tx3', date: '2023-10-20', description: 'Payment for "Fix leaky faucet"', amount: '+$75.00', status: 'Completed', type: 'Earning' },
    { id: 'tx4', date: '2023-10-19', description: 'Platform Fee for "Fix leaky faucet"', amount: '-$7.50', status: 'Completed', type: 'Expense' },
    { id: 'tx5', date: '2023-10-18', description: 'Withdrawal to Jazzcash', amount: '-$20.00', status: 'Pending', type: 'Withdrawal' },
    { id: 'tx6', date: '2023-10-17', description: 'Earning from "Reward Task"', amount: '+$0.50', status: 'Completed', type: 'Earning' },
    { id: 'tx7', date: '2023-10-16', description: 'Redeemed Points for Fee Discount', amount: '-1000 pts', status: 'Completed', type: 'Expense' },
];

let mockBids: Bid[] = [
    { id: 'b1', user: { id: 'user456', name: 'Jane Smith', avatarUrl: 'https://picsum.photos/seed/user456/100/100', rating: 4.8, isPremium: false, isIdVerified: true }, amount: 4800, message: 'I have extensive experience with React and Fintech. I can start immediately.', createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString() },
    { id: 'b2', user: { id: 'user789', name: 'Sam Wilson', avatarUrl: 'https://picsum.photos/seed/user789/100/100', rating: 5.0, isPremium: true, isIdVerified: true }, amount: 5000, message: 'As a senior developer with a 5-star rating, I am confident I can deliver exceptional results for your project.', createdAt: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString() },
];

let mockComments: Comment[] = [
    { id: 'cm1', user: { id: 'user101', name: 'Chris P.', avatarUrl: 'https://picsum.photos/seed/user101/100/100' }, content: 'Is there any flexibility on the budget for this project?', createdAt: new Date(Date.now() - 1000 * 60 * 60 * 10).toISOString() },
    { id: 'cm2', user: { id: 'c1', name: 'Fintech Solutions', avatarUrl: 'https://picsum.photos/seed/c1/100/100' }, content: 'We are open to discussing the budget with the right candidate based on their experience.', createdAt: new Date(Date.now() - 1000 * 60 * 60 * 9).toISOString() },
];

const mockActivities: Activity[] = [
    { id: 'ac1', type: 'message', text: 'You have a new message from Fintech Solutions.', user: { name: 'Fintech Solutions', avatarUrl: 'https://picsum.photos/seed/c1/100/100' }, timestamp: new Date(Date.now() - 1000 * 60 * 60 * 22).toISOString(), isRead: false, link: '/messages/c1' },
    { id: 'ac2', type: 'bid', text: 'Jane Smith placed a bid on your job "Senior React Developer".', user: { name: 'Jane Smith', avatarUrl: 'https://picsum.photos/seed/user456/100/100' }, timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), isRead: false, link: '/job/f1' },
    { id: 'ac3', type: 'job_completed', text: 'Your job "Fix a leaky faucet" was marked as complete.', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(), isRead: true },
    { id: 'ac4', type: 'withdrawal', text: 'Your withdrawal of $100.00 to your BTC wallet was processed.', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 50).toISOString(), isRead: true },
    { id: 'ac5', type: 'job_posted', text: 'You successfully posted "Event Photographer for Birthday Party".', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 52).toISOString(), isRead: true, link: '/job/t3' },
];


// Simulate API latency
const apiCall = <T,>(data: T, delay = 500): Promise<T> => {
    return new Promise(resolve => setTimeout(() => resolve(JSON.parse(JSON.stringify(data))), delay));
}

export const getFreelanceJobs = () => apiCall(allJobs.filter(j => j.type === JobType.Freelance));
export const getLocalTasks = () => apiCall(allJobs.filter(j => j.type === JobType.Task));
export const getTestimonials = () => apiCall(testimonials);
export const getSurveys = () => apiCall(surveys);
export const getRewardTasks = () => apiCall(rewardTasks);
export const getTransactions = () => apiCall(mockTransactions);
export const getJobById = (id: string | undefined) => apiCall(allJobs.find(job => job.id === id));
export const getBidsByJobId = (jobId: string) => apiCall(mockBids);
export const getCommentsByJobId = (jobId: string) => apiCall(mockComments);
export const getActivities = (userId: string) => apiCall(mockActivities);

export const getConversations = (userId: string) => {
    const conversationsMap = new Map();
    mockMessages
        .filter(m => m.senderId === userId || m.recipientId === userId)
        .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
        .forEach(message => {
            const otherUserId = message.senderId === userId ? message.recipientId : message.senderId;
            if (!conversationsMap.has(otherUserId)) {
                const otherUser = allUsers.find(u => u.id === otherUserId);
                if (otherUser) {
                    const relatedJob = allJobs.find(j => j.id === message.jobId);
                    const isBuying = relatedJob ? relatedJob.postedBy.id !== userId : message.senderId !== userId;
                    
                    conversationsMap.set(otherUserId, {
                        otherUser,
                        lastMessage: message,
                        unreadCount: mockMessages.filter(m => m.senderId === otherUserId && m.recipientId === userId && !m.isRead).length,
                        isBuying
                    });
                }
            }
        });
    return apiCall(Array.from(conversationsMap.values()));
};


export const getMessagesForConversation = (userId: string, otherUserId: string) => {
    const messages = mockMessages.filter(
        m => (m.senderId === userId && m.recipientId === otherUserId) || (m.senderId === otherUserId && m.recipientId === userId)
    ).sort((a,b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());
    
    // Mark messages as read
    mockMessages.forEach(m => {
        if (m.senderId === otherUserId && m.recipientId === userId) {
            m.isRead = true;
        }
    });

    return apiCall(messages);
};

export const getUnreadMessageCount = (userId: string) => {
    const count = mockMessages.filter(m => m.recipientId === userId && !m.isRead).length;
    return apiCall(count);
};


export const addJob = (job: Job) => {
    allJobs.unshift(job); // Add new jobs to the start of the list
    return apiCall(job);
};

export const getJobsByUserId = (userId: string) => {
    return apiCall(allJobs.filter(job => job.postedBy.id === userId));
};

export const updateJob = (updatedJob: Job) => {
    allJobs = allJobs.map(job => (job.id === updatedJob.id ? updatedJob : job));
    return apiCall(updatedJob);
};

export const deleteJob = (jobId: string) => {
    allJobs = allJobs.filter(job => job.id !== jobId);
    return apiCall({ success: true, id: jobId });
};

export const addMessage = (message: Message) => {
    mockMessages.push(message);
    const otherUserId = message.recipientId;
    const conversation = mockMessages.filter(m => (m.senderId === message.senderId && m.recipientId === otherUserId) || (m.senderId === otherUserId && m.recipientId === message.senderId));
    return apiCall(message);
};

export const addBid = (jobId: string, bid: Omit<Bid, 'id' | 'createdAt'>) => {
    const newBid: Bid = {
        ...bid,
        id: `b-${Date.now()}`,
        createdAt: new Date().toISOString()
    };
    mockBids.unshift(newBid);
    return apiCall(newBid);
};

export const addComment = (jobId: string, comment: Omit<Comment, 'id' | 'createdAt'>) => {
    const newComment: Comment = {
        ...comment,
        id: `cm-${Date.now()}`,
        createdAt: new Date().toISOString()
    };
    mockComments.push(newComment);
    return apiCall(newComment);
};

export const getEarningsBreakdown = () => apiCall([
    { name: 'Freelance', value: 4500, color: '#3b82f6' },
    { name: 'Tasks', value: 250, color: '#14b8a6' },
    { name: 'Rewards', value: 55, color: '#f59e0b' },
]);

export const getMonthlyActivity = () => apiCall([
    { name: 'Jul', value: 3 },
    { name: 'Aug', value: 5 },
    { name: 'Sep', value: 2 },
    { name: 'Oct', value: 8 },
]);