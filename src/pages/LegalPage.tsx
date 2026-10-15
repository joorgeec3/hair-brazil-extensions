import React from 'react';
import { STUDIO_INFO } from '../data/siteData';

interface LegalPageProps {
  type: 'terms' | 'privacy';
  onNavigate: (path: string) => void;
}

export const LegalPage: React.FC<LegalPageProps> = ({ type, onNavigate }) => {
  const isTerms = type === 'terms';

  const termsSections = [
    {
      title: '1. Acceptance of Terms',
      content:
        'By booking an appointment, accessing our hair services, or using the Hair Brazil Extensions website, you agree to comply with and be bound by these Terms of Service. If you do not agree, please refrain from using our services.',
    },
    {
      title: '2. Eligibility',
      content:
        'You must be at least 18 years of age or have parental/guardian consent to receive hair services at Hair Brazil Extensions. Please disclose any medical conditions or allergies prior to treatment.',
    },
    {
      title: '3. Appointments & Bookings',
      content:
        'Appointments may be reserved online, in person, or over the telephone. To guarantee availability, bookings should be made in advance. We reserve the right to decline or reschedule bookings in unforeseen circumstances.',
    },
    {
      title: '4. Use of Services',
      content:
        'Clients agree to arrive on time. Late arrivals exceeding 15 minutes may result in shortened appointment durations or necessary rescheduling to respect following guests.',
    },
    {
      title: '5. Payments & Cancellations',
      content:
        'All treatment prices are listed in Euros (€) / USD ($) and include applicable statutory taxes. We kindly request at least 24 hours notice for appointment cancellations or modifications.',
    },
    {
      title: '6. Intellectual Property',
      content:
        'All visual assets, typography, and copy displayed on the Hair Brazil Extensions website are protected by applicable intellectual property laws and belong exclusively to Hair Brazil Extensions.',
    },
    {
      title: '7. Client Communications',
      content:
        'By providing your contact details, you consent to receive appointment confirmation, reminder emails, and concierge updates. You may opt out of promotional communications at any time.',
    },
    {
      title: '8. Termination',
      content:
        'Hair Brazil Extensions reserves the right to terminate access to services for clients exhibiting abusive behavior, non-payment, or disregard of studio safety and hygiene standards.',
    },
    {
      title: '9. Disclaimers',
      content:
        'While our treatments use premium vegan and hypoallergenic formulas, individual skin reactions may vary. Please communicate any discomfort immediately to your aesthetician.',
    },
    {
      title: '10. Limitation of Liability',
      content:
        'To the fullest extent permitted by applicable law, Hair Brazil Extensions shall not be liable for indirect, incidental, or consequential damages arising from studio visits or website use.',
    },
    {
      title: '11. Changes To These Terms',
      content:
        'We reserve the right to revise these terms periodically. Continued use of our studio and website after updates signifies acceptance of modified terms.',
    },
    {
      title: '12. Contact',
      content: `If you have questions regarding these terms, please contact us at ${STUDIO_INFO.email} or by post at ${STUDIO_INFO.address}.`,
    },
  ];

  const privacySections = [
    {
      title: '1. Information We Collect',
      content:
        'We collect information you provide directly to us when scheduling appointments, including your name, email address, telephone number, preferred treatments, and any treatment notes.',
    },
    {
      title: '2. How We Use Your Information',
      content:
        'We use your personal details strictly to confirm appointments, manage studio schedules, personalize your aesthetic treatments, and process payments securely.',
    },
    {
      title: '3. Sharing Your Information',
      content:
        'We do not sell, rent, or trade your personal data. We only share information with trusted third-party service providers (such as appointment scheduling systems) necessary for studio operations.',
    },
    {
      title: '4. Cookies & Tracking',
      content:
        'Our website uses essential session cookies to preserve your navigation experience and preferences. We do not employ intrusive third-party cross-site trackers.',
    },
    {
      title: '5. Data Security',
      content:
        'We implement strict technical and organizational safeguards to protect your personal details against unauthorized access, loss, or alteration.',
    },
    {
      title: '6. Your Rights',
      content:
        'Under GDPR and applicable privacy legislation, you have the right to request access to, correction of, or deletion of your personal data held by Hair Brazil Extensions.',
    },
    {
      title: '7. Data Retention',
      content:
        'We retain booking history only for as long as needed to fulfill appointments, comply with accounting regulations, and provide continuous personalized care.',
    },
    {
      title: '8. Children’s Privacy',
      content:
        'Our services and website are not directed to individuals under the age of 16 without parental guidance.',
    },
    {
      title: '9. Changes to This Policy',
      content:
        'We may update this Privacy Policy from time to time to reflect operational or legal enhancements. Changes will be posted directly to this page.',
    },
    {
      title: '10. Contact',
      content: `For any privacy inquiries or to exercise your rights, please email us at ${STUDIO_INFO.email}.`,
    },
  ];

  const sections = isTerms ? termsSections : privacySections;
  const title = isTerms ? 'Terms of Service' : 'Privacy Policy';

  return (
    <div className="w-full bg-[#261511] text-[#f2f0e5] pt-28 sm:pt-32 pb-24 px-4 sm:px-6 md:px-10">
      <div className="max-w-4xl mx-auto">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs font-sans-ui text-[#dddcb0]/70 mb-4">
          <button onClick={() => onNavigate('/')} className="hover:text-[#f2f0e5]">
            Home
          </button>
          <span>/</span>
          <span>Legal</span>
          <span>/</span>
          <span className="text-[#ffd9a8]">{title}</span>
        </div>

        {/* Heading */}
        <h1 className="font-serif-editorial text-4xl sm:text-6xl text-[#f2f0e5] mb-8 tracking-tight">
          {title}
        </h1>

        <div className="text-xs text-[#dddcb0]/60 font-mono mb-12 pb-6 border-b border-[#543923]/40">
          Last updated: October 2026 · Hair Brazil Extensions
        </div>

        {/* Legal Sections */}
        <div className="space-y-10">
          {sections.map((sec, i) => (
            <div key={i} className="space-y-3">
              <h2 className="font-serif-editorial text-2xl sm:text-3xl text-[#f2f0e5]">
                {sec.title}
              </h2>
              <p className="font-sans-ui text-sm sm:text-base text-[#f2f0e5]/75 leading-relaxed">
                {sec.content}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
