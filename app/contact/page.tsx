import { Metadata } from 'next';
import ContactForm from './ContactForm';

export const metadata = {
  title: 'Contact Us - AirdropFinder',
  description: 'Get in touch with the AirdropFinder team. We welcome your questions, feedback, and suggestions about our crypto earning opportunities directory.',
};

export default function ContactPage() {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <ContactForm />
      </div>
    </div>
  );
}
