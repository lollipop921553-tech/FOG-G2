import React from 'react';
import { BriefcaseIcon, QuestionMarkCircleIcon, ShieldCheckIcon } from '@heroicons/react/24/outline'; // Assuming you have Heroicons or similar
import BackButton from '../components/BackButton';

const ContactPage: React.FC = () => {
    const contactPoints = [
        { name: 'General Inquiries', description: 'For general questions about the FOG platform.', icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-fog-accent"><path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" /></svg> },
        { name: 'Trust & Safety', description: 'Report an issue or concern about a user or job.', href: '/trust-and-safety', icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-fog-accent"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.286zm0 13.036h.008v.008H12v-.008z" /></svg> },
        { name: 'Press & Media', description: 'For media inquiries and partnership opportunities.', href: '/press', icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-fog-accent"><path strokeLinecap="round" strokeLinejoin="round" d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 01-2.25 2.25M16.5 7.5V18a2.25 2.25 0 002.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 002.25 2.25h13.5M6 7.5h3v3H6v-3z" /></svg> },
    ];

    return (
        <div className="animate-fade-in">
            <BackButton />
            <div className="text-center mb-16">
                <h1 className="text-4xl md:text-5xl font-extrabold text-fog-dark dark:text-fog-light">Get In Touch</h1>
                <p className="mt-4 max-w-2xl mx-auto text-lg text-fog-mid dark:text-slate-400">
                    We're here to help. Whether you have a question, a concern, or feedback, our team is ready to listen.
                </p>
            </div>

            <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 bg-fog-white dark:bg-fog-mid-dark p-8 rounded-2xl shadow-xl dark:shadow-2xl-dark">
                {/* Contact Form */}
                <div>
                    <h2 className="text-2xl font-bold text-fog-dark dark:text-fog-light mb-6">Send us a Message</h2>
                    <form className="space-y-6">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Full Name</label>
                            <input type="text" name="name" id="name" className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-fog-accent focus:border-fog-accent bg-fog-white dark:bg-slate-800"/>
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email Address</label>
                            <input type="email" name="email" id="email" className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-fog-accent focus:border-fog-accent bg-fog-white dark:bg-slate-800"/>
                        </div>
                         <div>
                            <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Subject</label>
                            <input type="text" name="subject" id="subject" className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-fog-accent focus:border-fog-accent bg-fog-white dark:bg-slate-800"/>
                        </div>
                        <div>
                            <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Message</label>
                            <textarea name="message" id="message" rows={4} className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-fog-accent focus:border-fog-accent bg-fog-white dark:bg-slate-800"></textarea>
                        </div>
                        <div>
                            <button type="submit" className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-fog-accent hover:bg-fog-accent-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-fog-accent">
                                Send Message
                            </button>
                        </div>
                    </form>
                </div>

                {/* Contact Info */}
                <div className="bg-gray-50 dark:bg-slate-800/50 p-8 rounded-xl">
                     <h2 className="text-2xl font-bold text-fog-dark dark:text-fog-light mb-6">Other Ways to Reach Us</h2>
                     <div className="space-y-6">
                         {contactPoints.map((point) => (
                             <div key={point.name} className="flex items-start gap-4">
                                 <div className="flex-shrink-0">{point.icon}</div>
                                 <div>
                                     <h3 className="text-lg font-semibold text-fog-dark dark:text-fog-light">{point.name}</h3>
                                     <p className="text-gray-600 dark:text-gray-300">{point.description}</p>
                                      {point.href && <a href={point.href} className="text-sm font-semibold text-fog-accent hover:underline mt-1 inline-block">Learn More &rarr;</a>}
                                 </div>
                             </div>
                         ))}
                     </div>
                      <div className="mt-8 pt-6 border-t border-gray-200 dark:border-slate-700">
                        <h3 className="text-lg font-semibold text-fog-dark dark:text-fog-light">Office Address</h3>
                        <p className="mt-2 text-gray-600 dark:text-gray-300">
                            123 Productivity Ave,<br/>
                            Islamabad, 44000<br/>
                            Pakistan
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactPage;