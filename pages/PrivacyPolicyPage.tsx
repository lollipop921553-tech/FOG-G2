import React from 'react';
import BackButton from '../components/BackButton';

const PrivacyPolicyPage: React.FC = () => {
  return (
    <div className="animate-fade-in max-w-4xl mx-auto">
      <BackButton />
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold text-fog-dark dark:text-fog-light">Privacy Policy</h1>
        <p className="mt-4 text-lg text-fog-mid dark:text-slate-400">
          Last updated: October 26, 2023
        </p>
      </div>

      <div className="prose prose-lg dark:prose-invert max-w-none bg-fog-white dark:bg-fog-mid-dark p-8 rounded-lg shadow-lg dark:shadow-lg-dark">
        <p>
          Welcome to FOG ("we", "our", "us"). We are committed to protecting your personal information and your right to privacy. If you have any questions or concerns about this privacy notice, or our practices with regards to your personal information, please contact us at <a href="mailto:privacy@fog.com">privacy@fog.com</a>.
        </p>

        <h2>1. WHAT INFORMATION DO WE COLLECT?</h2>
        <p>
          We collect personal information that you voluntarily provide to us when you register on the FOG platform, express an interest in obtaining information about us or our products and services, when you participate in activities on the platform (such as posting jobs, applying for tasks, or filling out your profile) or otherwise when you contact us.
        </p>
        <p>
          The personal information that we collect depends on the context of your interactions with us and the platform, the choices you make and the products and features you use. The personal information we collect may include the following: Name, Email Address, Phone Number, Mailing Address, Job Titles, Skills, Payment Information, and more.
        </p>

        <h2>2. HOW DO WE USE YOUR INFORMATION?</h2>
        <p>
          We use personal information collected via our platform for a variety of business purposes described below. We process your personal information for these purposes in reliance on our legitimate business interests, in order to enter into or perform a contract with you, with your consent, and/or for compliance with our legal obligations.
        </p>
        <ul>
          <li>To facilitate account creation and logon process.</li>
          <li>To post jobs and allow applications.</li>
          <li>To manage user accounts.</li>
          <li>To send administrative information to you.</li>
          <li>To protect our Services.</li>
          <li>To enforce our terms, conditions and policies for business purposes, to comply with legal and regulatory requirements or in connection with our contract.</li>
        </ul>

        <h2>3. WILL YOUR INFORMATION BE SHARED WITH ANYONE?</h2>
        <p>
          We only share information with your consent, to comply with laws, to provide you with services, to protect your rights, or to fulfill business obligations. Your public profile information, such as your name, skills, and work history, will be visible to other users of the platform to facilitate connections for jobs and tasks.
        </p>

        <h2>4. HOW DO WE KEEP YOUR INFORMATION SAFE?</h2>
        <p>
          We have implemented appropriate technical and organizational security measures designed to protect the security of any personal information we process. However, despite our safeguards and efforts to secure your information, no electronic transmission over the Internet or information storage technology can be guaranteed to be 100% secure, so we cannot promise or guarantee that hackers, cybercriminals, or other unauthorized third parties will not be able to defeat our security, and improperly collect, access, steal, or modify your information.
        </p>

        <h2>5. DO WE MAKE UPDATES TO THIS NOTICE?</h2>
        <p>
          Yes, we will update this notice as necessary to stay compliant with relevant laws. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date.
        </p>
        
        <h2>6. HOW CAN YOU CONTACT US ABOUT THIS NOTICE?</h2>
        <p>
            If you have questions or comments about this notice, you may email us at <a href="mailto:privacy@fog.com">privacy@fog.com</a> or by post to:
        </p>
        <address>
            FOG Platform, Inc.<br/>
            Attn: Privacy Officer<br/>
            123 Productivity Ave,<br/>
            Islamabad, 44000<br/>
            Pakistan
        </address>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;