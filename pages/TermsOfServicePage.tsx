import React from 'react';
import BackButton from '../components/BackButton';

const TermsOfServicePage: React.FC = () => {
  return (
    <div className="animate-fade-in max-w-4xl mx-auto">
      <BackButton />
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold text-fog-dark dark:text-fog-light">Terms of Service</h1>
        <p className="mt-4 text-lg text-fog-mid dark:text-slate-400">
          Effective date: October 26, 2023
        </p>
      </div>

      <div className="prose prose-lg dark:prose-invert max-w-none bg-fog-white dark:bg-fog-mid-dark p-8 rounded-lg shadow-lg dark:shadow-lg-dark">
        <h2>1. Agreement to Terms</h2>
        <p>
          By using our services, you agree to be bound by these Terms of Service. If you do not agree to these Terms, do not use the services. We may modify the Terms at any time, and if we do, we will notify you by posting the modified Terms on the site.
        </p>

        <h2>2. User Accounts</h2>
        <p>
          You must be at least 18 years old to use our services. When you create an account, you must provide us with information that is accurate, complete, and current at all times. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account on our service.
        </p>
        
        <h2>3. Service Description</h2>
        <p>
          FOG is a platform that connects Clients with Professionals (Freelancers and Taskers). We are not a party to the contracts for work between Clients and Professionals. We do not perform the work ourselves and do not employ Professionals.
        </p>

        <h2>4. Fees and Payments</h2>
        <p>
          We charge service fees for jobs completed through the platform. Fees will be clearly disclosed to you before you enter into an agreement with another user. All payments between users must be processed through the FOG platform's secure escrow system.
        </p>
        
        <h2>5. User Conduct</h2>
        <p>
          You agree not to use the service to:
        </p>
        <ul>
            <li>Violate any law or regulation.</li>
            <li>Infringe the rights of any third party, including intellectual property rights.</li>
            <li>Post any content that is false, misleading, defamatory, or obscene.</li>
            <li>Attempt to circumvent the platform's payment system.</li>
        </ul>
        <p>
          We reserve the right to suspend or terminate your account if you violate these rules.
        </p>

        <h2>6. Disclaimers</h2>
        <p>
          The services are provided "AS IS," without warranty of any kind. We make no warranty that the services will meet your requirements or be available on an uninterrupted, secure, or error-free basis.
        </p>

        <h2>7. Limitation of Liability</h2>
        <p>
          In no event will FOG be liable for any incidental, special, exemplary, or consequential damages arising out of or in connection with these terms or from the use of or inability to use the services.
        </p>

        <h2>8. Contact Information</h2>
        <p>
          If you have any questions about these Terms, please contact us at <a href="mailto:legal@fog.com">legal@fog.com</a>.
        </p>
      </div>
    </div>
  );
};

export default TermsOfServicePage;