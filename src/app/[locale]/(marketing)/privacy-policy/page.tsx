// app/privacy-policy/page.tsx
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy | Imagibook.ai',
  description: 'Privacy Policy for Imagibook.ai - Learn how we collect, use, and protect your information',
}

export default function PrivacyPolicyPage() {
  return (
    <div className="container max-w-3xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Privacy Policy</h1>
          <p className="text-muted-foreground mt-2">Last Updated: February 28th, 2025</p>
        </div>

        <section id="introduction" className="space-y-3">
          <h2 className="text-2xl font-semibold tracking-tight">1. Introduction</h2>
          <p>
            This Privacy Policy ("Policy") explains how Imagibook.ai ("Imagibook," "we," "us," or "our") collects, 
            uses, discloses, and safeguards personal information when you ("User" or "you") access or use our Services. 
            By using the Services, you agree to the collection and use of your information in accordance with this Policy.
          </p>
        </section>

        <section id="information-we-collect" className="space-y-3">
          <h2 className="text-2xl font-semibold tracking-tight">2. Information We Collect</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <span className="font-medium">Account Information:</span> When you create an account, we may collect your name, email address, and password.
            </li>
            <li>
              <span className="font-medium">Child-Related Information:</span>
              <ul className="list-disc pl-6 mt-1">
                <li>Name</li>
                <li>Age</li>
                <li>Photos (for AI image generation)</li>
              </ul>
              <p className="mt-1">
                Any child-related data is used solely for generating personalized stories, illustrations, or audio narrations, 
                in compliance with applicable child protection laws like COPPA.
              </p>
            </li>
            <li>
              <span className="font-medium">Payment Information:</span> If you make a purchase or subscription payment, 
              we collect payment details (e.g., credit card or PayPal information) through our third-party payment processors. 
              We do not store sensitive payment information on our servers.
            </li>
            <li>
              <span className="font-medium">Usage Data:</span> We may collect log data such as your IP address, browser type, 
              device type, operating system, and pages visited to understand how you use our Services.
            </li>
            <li>
              <span className="font-medium">Cookies and Tracking Technologies:</span> We may use cookies, web beacons, 
              and similar technologies to collect information about your browsing activities and to improve the user experience.
            </li>
          </ul>
        </section>

        <section id="how-we-use-your-information" className="space-y-3">
          <h2 className="text-2xl font-semibold tracking-tight">3. How We Use Your Information</h2>
          <p>We use your information to:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <span className="font-medium">Provide and Maintain the Services:</span> Generate custom stories, images, and audio narrations.
            </li>
            <li>
              <span className="font-medium">Enhance User Experience:</span> Personalize content and make recommendations.
            </li>
            <li>
              <span className="font-medium">Process Payments:</span> Facilitate transactions for subscriptions or credits.
            </li>
            <li>
              <span className="font-medium">Communicate with You:</span> Respond to inquiries, send updates, and provide customer support.
            </li>
            <li>
              <span className="font-medium">Improve Our Services:</span> Evaluate usage patterns and enhance our AI technologies.
            </li>
            <li>
              <span className="font-medium">Enforce Our Policies:</span> Prevent misuse of our Services and enforce our Terms of Service.
            </li>
          </ul>
        </section>

        <section id="data-retention-and-childrens-privacy" className="space-y-3">
          <h2 className="text-2xl font-semibold tracking-tight">4. Data Retention and Children's Privacy</h2>
          
          <div className="space-y-2">
            <h3 className="text-xl font-medium">Data Retention:</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                We retain account-related information as long as necessary to fulfill the purposes outlined in this Policy or as required by law.
              </li>
              <li>
                Children's personal data (e.g., name, age, photos) will be stored for no more than thirty (30) days, 
                after which it is permanently deleted from active databases.
              </li>
            </ul>
          </div>
          
          <div className="space-y-2">
            <h3 className="text-xl font-medium">Children's Data Practices:</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                We comply with the Children's Online Privacy Protection Act ("COPPA") and other relevant laws.
              </li>
              <li>
                We only collect child information from parents or legal guardians with their consent.
              </li>
              <li>
                We do not use children's personal information for marketing or advertising purposes.
              </li>
            </ul>
          </div>
        </section>

        <section id="sharing-your-information" className="space-y-3">
          <h2 className="text-2xl font-semibold tracking-tight">5. Sharing Your Information</h2>
          <p>We may share your personal information in the following limited circumstances:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <span className="font-medium">Service Providers:</span> We engage reputable third-party companies and individuals to 
              help us operate and improve the Services (e.g., payment processors, hosting providers). 
              These parties are contractually obligated to keep your data confidential and secure.
            </li>
            <li>
              <span className="font-medium">Legal Requirements:</span> We may disclose your information if required to do so by law 
              or in response to valid requests by public authorities (e.g., courts or government agencies).
            </li>
            <li>
              <span className="font-medium">Business Transfers:</span> If Imagibook is involved in a merger, acquisition, reorganization, 
              or sale of assets, your information may be transferred as part of that transaction.
            </li>
          </ul>
        </section>

        <section id="security-measures" className="space-y-3">
          <h2 className="text-2xl font-semibold tracking-tight">6. Security Measures</h2>
          <p>
            We employ commercially reasonable security measures (e.g., encryption, firewalls) to protect your information from 
            unauthorized access, alteration, disclosure, or destruction. However, no transmission method over 
            the internet is guaranteed to be completely secure.
          </p>
        </section>

        <section id="international-data-transfers" className="space-y-3">
          <h2 className="text-2xl font-semibold tracking-tight">7. International Data Transfers</h2>
          <p>
            Given the global nature of the internet, your information may be transferred to and stored on servers 
            located in countries outside of Costa Rica. By using our Services, you consent to such transfers, 
            subject to applicable data protection laws.
          </p>
        </section>

        <section id="your-rights-and-choices" className="space-y-3">
          <h2 className="text-2xl font-semibold tracking-tight">8. Your Rights and Choices</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <span className="font-medium">Account Information:</span> You may update or delete your account information at any time 
              by logging into your account settings or contacting us at legal@imagibook.ai.
            </li>
            <li>
              <span className="font-medium">Opt-Out:</span> You may opt out of receiving promotional emails by following the 
              unsubscribe instructions included in each email or by contacting us directly.
            </li>
            <li>
              <span className="font-medium">Cookies:</span> Most web browsers allow you to reject cookies. Doing so, however, 
              may affect the functionality or availability of certain parts of the Services.
            </li>
          </ul>
        </section>

        <section id="third-party-links" className="space-y-3">
          <h2 className="text-2xl font-semibold tracking-tight">9. Third-Party Links</h2>
          <p>
            The Services may contain links to third-party websites or services. We are not responsible for the 
            privacy practices or content of these third parties. We encourage you to read the privacy policies 
            of any third-party sites you visit.
          </p>
        </section>

        <section id="changes-to-this-policy" className="space-y-3">
          <h2 className="text-2xl font-semibold tracking-tight">10. Changes to This Policy</h2>
          <p>
            We reserve the right to update or modify this Privacy Policy at any time. If we make material changes, 
            we will post the revised Policy on our website and/or notify you by email. Your continued use of the 
            Services after the revised Policy is posted indicates your acceptance of the changes.
          </p>
        </section>

        <section id="contact-us" className="space-y-3">
          <h2 className="text-2xl font-semibold tracking-tight">11. Contact Us</h2>
          <p>
            If you have any questions, concerns, or requests about this Privacy Policy or our data practices, 
            please contact us at:
          </p>
          <p>
            Email: <a href="mailto:legal@imagibook.ai" className="text-primary hover:underline">legal@imagibook.ai</a>
          </p>
        </section>

        <div className="border-t pt-6 text-sm text-muted-foreground">
          <p className="italic">
            Disclaimer: This Terms of Service and Privacy Policy are provided for informational purposes only and 
            do not constitute legal advice. For specific guidance related to Costa Rican laws or other applicable 
            jurisdictions, consult with a qualified attorney.
          </p>
        </div>
      </div>
    </div>
  )
}