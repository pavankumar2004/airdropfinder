import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Terms of Service - AirdropFinder',
  description: 'Read the terms and conditions for using the AirdropFinder platform.',
};

export default function TermsPage() {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Terms of Service</h1>
          <p className="mt-4 text-lg text-gray-600">
            Last updated: May 14, 2025
          </p>
          
          <div className="mt-8 prose prose-indigo prose-lg text-gray-600">
            <h2>Introduction</h2>
            <p>
              Welcome to AirdropFinder. These terms and conditions outline the rules and regulations for the use of our website.
            </p>
            <p>
              By accessing this website, we assume you accept these terms and conditions in full. Do not continue to use AirdropFinder if you do not accept all of the terms and conditions stated on this page.
            </p>
            
            <h2>License</h2>
            <p>
              Unless otherwise stated, AirdropFinder and/or its licensors own the intellectual property rights for all material on AirdropFinder. All intellectual property rights are reserved.
            </p>
            <p>
              You may view and/or print pages from the website for your own personal use subject to restrictions set in these terms and conditions.
            </p>
            <p>
              You must not:
            </p>
            <ul>
              <li>Republish material from this website</li>
              <li>Sell, rent or sub-license material from this website</li>
              <li>Reproduce, duplicate or copy material from this website</li>
              <li>Redistribute content from AirdropFinder (unless content is specifically made for redistribution)</li>
            </ul>
            
            <h2>User Content</h2>
            <p>
              In these terms and conditions, "User Content" shall mean any audio, video, text, images or other material you choose to display on this website. By displaying your User Content, you grant AirdropFinder a non-exclusive, worldwide, irrevocable, royalty-free, sublicensable license to use, reproduce, adapt, publish, translate and distribute it in any and all media.
            </p>
            <p>
              Your User Content must be your own and must not be infringing on any third party&apos;s rights. AirdropFinder reserves the right to remove any of your content from this website at any time without notice.
            </p>
            
            <h2>No Warranties</h2>
            <p>
              This website is provided &quot;as is,&quot; with all faults, and AirdropFinder makes no express or implied representations or warranties, of any kind related to this website or the materials contained on this website.
            </p>
            <p>
              Additionally, nothing contained on this website shall be construed as providing advice to you. The information provided on platforms listed in our directory is for general informational purposes only and should not be considered financial advice.
            </p>
            
            <h2>Limitation of Liability</h2>
            <p>
              In no event shall AirdropFinder, nor any of its officers, directors and employees, be liable to you for anything arising out of or in any way connected with your use of this website, whether such liability is under contract, tort or otherwise.
            </p>
            <p>
              AirdropFinder, including its officers, directors and employees shall not be liable for any indirect, consequential or special liability arising out of or in any way related to your use of this website.
            </p>
            
            <h2>Indemnification</h2>
            <p>
              You hereby indemnify to the fullest extent AirdropFinder from and against any and all liabilities, costs, demands, causes of action, damages and expenses (including reasonable attorney&apos;s fees) arising out of or in any way related to your breach of any of the provisions of these terms.
            </p>
            
            <h2>Severability</h2>
            <p>
              If any provision of these terms is found to be unenforceable or invalid under any applicable law, such unenforceability or invalidity shall not render these terms unenforceable or invalid as a whole, and such provisions shall be deleted without affecting the remaining provisions herein.
            </p>
            
            <h2>Variation of Terms</h2>
            <p>
              AirdropFinder is permitted to revise these terms at any time as it sees fit, and by using this website you are expected to review such terms on a regular basis to ensure you understand all terms and conditions governing use of this website.
            </p>
            
            <h2>Entire Agreement</h2>
            <p>
              These terms, including any legal notices and disclaimers contained on this website, constitute the entire agreement between AirdropFinder and you in relation to your use of this website, and supersede all prior agreements and understandings with respect to the same.
            </p>
            
            <h2>Governing Law & Jurisdiction</h2>
            <p>
              These terms will be governed by and construed in accordance with the laws, and you submit to the non-exclusive jurisdiction of the courts located for the resolution of any disputes.
            </p>
            
            <h2>Contact Us</h2>
            <p>
              If you have any questions about these Terms of Service, please contact us:
            </p>
            <p>
              <Link href="/contact" className="text-indigo-600 hover:text-indigo-500">
                Through our contact form →
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
