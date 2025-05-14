import { Metadata } from 'next';
import ContactForm from './ContactForm';

export const metadata: Metadata = {
  title: 'Contact Us - AirdropFinder',
  description: 'Get in touch with the AirdropFinder team. We welcome your questions, feedback, and suggestions about our crypto earning opportunities directory.',
};

export default function ContactPage() {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl py-24 sm:px-6 sm:py-32 lg:px-8">
        <div className="relative isolate overflow-hidden bg-gray-900 px-6 pt-16 shadow-2xl sm:rounded-3xl sm:px-16 md:pt-24 lg:flex lg:gap-x-20 lg:px-24 lg:pt-0">
          <svg
            viewBox="0 0 1024 1024"
            className="absolute left-1/2 top-1/2 -z-10 h-[64rem] w-[64rem] -translate-y-1/2 [mask-image:radial-gradient(closest-side,white,transparent)] sm:left-full sm:-ml-80 lg:left-1/2 lg:ml-0 lg:-translate-x-1/2 lg:translate-y-0"
            aria-hidden="true"
          >
            <circle cx={512} cy={512} r={512} fill="url(#759c1415-0410-454c-8f7c-9a820de03641)" fillOpacity="0.7" />
            <defs>
              <radialGradient id="759c1415-0410-454c-8f7c-9a820de03641">
                <stop stopColor="#7775D6" />
                <stop offset={1} stopColor="#E935C1" />
              </radialGradient>
            </defs>
          </svg>
          <div className="mx-auto max-w-md text-center lg:mx-0 lg:flex-auto lg:py-32 lg:text-left">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Get in touch with us
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-300">
              Have questions about AirdropFinder? Want to suggest a new platform or report an issue? We're here to help!
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6 lg:justify-start">
              <a
                href="#contact-form"
                className="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                Contact us now
              </a>
              <a href="/faq" className="text-sm font-semibold leading-6 text-white">
                View FAQ <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      <div id="contact-form">
        <ContactForm />
      </div>
    </div>
  );
}
