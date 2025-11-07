"use client";

import { motion } from "framer-motion";
import { Shield } from "lucide-react";

export default function PrivacyPolicy() {
  return (
    <main className="relative min-h-screen pt-32 pb-20">
      <div className="container mx-auto px-6 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-3 mb-6">
            <Shield className="w-10 h-10 text-primary-500" />
            <h1 className="text-4xl md:text-5xl font-display font-bold">
              Privacy Policy
            </h1>
          </div>
          
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>

          <div className="prose prose-lg dark:prose-invert max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">1. Introduction</h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                Welcome to FLUXIVE ("we," "our," or "us"). We are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">2. Information We Collect</h2>
              <h3 className="text-xl font-semibold mb-3">2.1 Personal Information</h3>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                We may collect personal information that you voluntarily provide to us when you:
              </p>
              <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 mb-4 space-y-2">
                <li>Contact us through our website forms</li>
                <li>Subscribe to our newsletter or marketing communications</li>
                <li>Request information about our services</li>
                <li>Engage with our customer support</li>
              </ul>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                This information may include: name, email address, phone number, company name, job title, and any other information you choose to provide.
              </p>

              <h3 className="text-xl font-semibold mb-3">2.2 Automatically Collected Information</h3>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                When you visit our website, we may automatically collect certain information about your device, including:
              </p>
              <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 mb-4 space-y-2">
                <li>IP address and browser type</li>
                <li>Operating system and device information</li>
                <li>Pages visited and time spent on pages</li>
                <li>Referring website addresses</li>
                <li>Clickstream data and user behavior patterns</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">3. How We Use Your Information and Legal Basis</h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                We use the information we collect for various purposes. Under GDPR, we must have a legal basis for processing your personal data:
              </p>
              <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 mb-4 space-y-2">
                <li><strong>Providing and maintaining our services</strong> - Legal basis: Contract performance</li>
                <li><strong>Responding to your inquiries and support requests</strong> - Legal basis: Contract performance / Legitimate interest</li>
                <li><strong>Sending you newsletters, marketing materials, and promotional content</strong> - Legal basis: Consent (you can withdraw at any time)</li>
                <li><strong>Improving our website and services</strong> - Legal basis: Legitimate interest</li>
                <li><strong>Analyzing usage trends and preferences</strong> - Legal basis: Legitimate interest / Consent (for cookies)</li>
                <li><strong>Detecting, preventing, and addressing technical issues or security threats</strong> - Legal basis: Legitimate interest</li>
                <li><strong>Complying with legal obligations</strong> - Legal basis: Legal obligation</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">4. Data Sharing and Disclosure</h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                We do not sell, trade, or rent your personal information to third parties. We may share your information in the following circumstances:
              </p>
              <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 mb-4 space-y-2">
                <li><strong>Service Providers:</strong> We may share information with trusted third-party service providers who assist us in operating our website and delivering services</li>
                <li><strong>Legal Requirements:</strong> We may disclose information if required by law or in response to valid legal requests</li>
                <li><strong>Business Transfers:</strong> In the event of a merger, acquisition, or sale of assets, your information may be transferred</li>
                <li><strong>With Your Consent:</strong> We may share information with your explicit consent</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">5. Data Security</h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. These measures include:
              </p>
              <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 mb-4 space-y-2">
                <li>Encryption of data in transit and at rest</li>
                <li>Regular security assessments and penetration testing</li>
                <li>Access controls and authentication mechanisms</li>
                <li>Employee training on data protection practices</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">6. Data Retention</h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                We retain your personal information only for as long as necessary to fulfill the purposes for which it was collected and to comply with legal obligations:
              </p>
              <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 mb-4 space-y-2">
                <li><strong>Contact Form Submissions:</strong> Retained for up to 3 years after last contact or until you request deletion</li>
                <li><strong>Marketing Consent:</strong> Retained until you withdraw consent, then deleted within 30 days</li>
                <li><strong>Service Contracts:</strong> Retained for 7 years after contract end (Belgian accounting law requirement)</li>
                <li><strong>Website Analytics:</strong> Anonymized after 14 months (Google Analytics default)</li>
                <li><strong>Cookie Consent Records:</strong> Retained for up to 2 years to demonstrate compliance</li>
                <li><strong>Security Logs:</strong> Retained for up to 12 months for security purposes</li>
              </ul>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                After the retention period expires, we securely delete or anonymize your personal information. You can request earlier deletion by contacting us, subject to legal retention obligations.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">7. Your Rights and Choices</h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                Under GDPR and Belgian law, you have the following rights regarding your personal information:
              </p>
              <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 mb-4 space-y-2">
                <li><strong>Access:</strong> Request access to the personal information we hold about you</li>
                <li><strong>Correction:</strong> Request correction of inaccurate or incomplete information</li>
                <li><strong>Deletion (Right to be Forgotten):</strong> Request deletion of your personal information</li>
                <li><strong>Opt-Out:</strong> Unsubscribe from marketing communications at any time</li>
                <li><strong>Data Portability:</strong> Request a copy of your data in a portable format</li>
                <li><strong>Object:</strong> Object to certain processing of your personal information</li>
                <li><strong>Restrict Processing:</strong> Request restriction of processing in certain circumstances</li>
                <li><strong>Withdraw Consent:</strong> Withdraw consent at any time (does not affect prior processing)</li>
              </ul>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                To exercise any of these rights, please contact us at privacy@fluxive.com. We will respond within 30 days as required by GDPR.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">8. Cookies and Tracking Technologies</h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                We use cookies and similar tracking technologies to enhance your browsing experience. For detailed information about our use of cookies, please refer to our <a href="/cookies" className="text-primary-500 hover:underline">Cookie Policy</a>.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">9. Children's Privacy</h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                Our services are not directed to individuals under the age of 18. We do not knowingly collect personal information from children. If you believe we have collected information from a child, please contact us immediately.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">10. International Data Transfers</h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                Your information may be transferred to and processed in countries other than your country of residence. We ensure appropriate safeguards are in place to protect your information in accordance with this Privacy Policy and GDPR requirements (such as Standard Contractual Clauses or adequacy decisions).
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">11. Changes to This Privacy Policy</h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                We may update this Privacy Policy from time to time. We will notify you of any material changes by posting the new Privacy Policy on this page and updating the "Last updated" date. We encourage you to review this Privacy Policy periodically.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">12. Belgian Data Protection Authority</h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                As a company operating under Belgian law, we are subject to oversight by the Belgian Data Protection Authority (Gegevensbeschermingsautoriteit/Autorité de protection des données).
              </p>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                You have the right to lodge a complaint with the Belgian DPA if you believe we have violated your data protection rights:
              </p>
              <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg mb-4">
                <p className="text-gray-700 dark:text-gray-300 mb-2"><strong>Belgian Data Protection Authority</strong></p>
                <p className="text-gray-700 dark:text-gray-300 mb-2">Drukpersstraat 35, 1000 Brussels, Belgium</p>
                <p className="text-gray-700 dark:text-gray-300 mb-2">Phone: +32 (0)2 274 48 00</p>
                <p className="text-gray-700 dark:text-gray-300 mb-2">Email: contact@apd-gba.be</p>
                <p className="text-gray-700 dark:text-gray-300">
                  <a href="https://www.dataprotectionauthority.be/" target="_blank" rel="noopener noreferrer" className="text-primary-500 hover:underline">
                    www.dataprotectionauthority.be
                  </a>
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">13. Company Information (Belgian Law)</h2>
              <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg mb-4">
                <p className="text-gray-700 dark:text-gray-300 mb-2"><strong>FLUXIVE</strong></p>
                <p className="text-gray-700 dark:text-gray-300 mb-2">VAT Number (BTW): BE1029968269</p>
                <p className="text-gray-700 dark:text-gray-300 mb-2">Company Registration: Belgium</p>
                <p className="text-gray-700 dark:text-gray-300 mb-2">Email: privacy@fluxive.com</p>
                <p className="text-gray-700 dark:text-gray-300">Response time: Within 48 hours</p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">14. Contact Us</h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us:
              </p>
              <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg">
                <p className="text-gray-700 dark:text-gray-300 mb-2"><strong>Privacy Contact</strong></p>
                <p className="text-gray-700 dark:text-gray-300 mb-2">Email: privacy@fluxive.com</p>
                <p className="text-gray-700 dark:text-gray-300">Response time: Within 30 days (GDPR requirement)</p>
              </div>
            </section>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
