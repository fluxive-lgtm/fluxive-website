"use client";

import { motion } from "framer-motion";
import { FileText } from "lucide-react";

export default function TermsOfService() {
  return (
    <main className="relative min-h-screen pt-32 pb-20">
      <div className="container mx-auto px-6 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-3 mb-6">
            <FileText className="w-10 h-10 text-primary-500" />
            <h1 className="text-4xl md:text-5xl font-display font-bold">
              Terms of Service
            </h1>
          </div>
          
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>

          <div className="prose prose-lg dark:prose-invert max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">1. Acceptance of Terms</h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                Welcome to FLUXIVE. By accessing or using our website, services, or products, you agree to be bound by these Terms of Service ("Terms"). If you do not agree to these Terms, please do not use our services.
              </p>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                These Terms constitute a legally binding agreement between you and FLUXIVE. We reserve the right to modify these Terms at any time, and your continued use of our services constitutes acceptance of any changes.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">2. Description of Services</h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                FLUXIVE provides a range of professional services, including but not limited to:
              </p>
              <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 mb-4 space-y-2">
                <li>IT Services and Infrastructure Management</li>
                <li>Marketing Solutions and Digital Strategy</li>
                <li>AI Automation and Machine Learning Solutions</li>
                <li>Web Development and Custom Applications</li>
                <li>Penetration Testing and Security Assessments</li>
                <li>Cybersecurity Services and Consulting</li>
              </ul>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                The specific terms of service delivery will be outlined in individual service agreements or statements of work.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">3. User Responsibilities</h2>
              <h3 className="text-xl font-semibold mb-3">3.1 Account Security</h3>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                If you create an account with us, you are responsible for:
              </p>
              <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 mb-4 space-y-2">
                <li>Maintaining the confidentiality of your account credentials</li>
                <li>All activities that occur under your account</li>
                <li>Notifying us immediately of any unauthorized access</li>
                <li>Ensuring all information provided is accurate and up-to-date</li>
              </ul>

              <h3 className="text-xl font-semibold mb-3">3.2 Acceptable Use</h3>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                You agree not to:
              </p>
              <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 mb-4 space-y-2">
                <li>Use our services for any illegal or unauthorized purpose</li>
                <li>Violate any laws in your jurisdiction</li>
                <li>Infringe upon the intellectual property rights of others</li>
                <li>Transmit viruses, malware, or other malicious code</li>
                <li>Attempt to gain unauthorized access to our systems</li>
                <li>Interfere with or disrupt the integrity of our services</li>
                <li>Harass, abuse, or harm other users</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">4. Intellectual Property Rights</h2>
              <h3 className="text-xl font-semibold mb-3">4.1 Our Content</h3>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                All content on our website, including text, graphics, logos, images, software, and code, is the property of FLUXIVE or our licensors and is protected by copyright, trademark, and other intellectual property laws.
              </p>

              <h3 className="text-xl font-semibold mb-3">4.2 Your Content</h3>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                When you provide content to us (e.g., through forms or communications), you grant us a non-exclusive, worldwide, royalty-free license to use, reproduce, and display that content for the purpose of providing our services.
              </p>

              <h3 className="text-xl font-semibold mb-3">4.3 Work Product</h3>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                Ownership of work product created for you under a service agreement will be specified in the relevant contract or statement of work.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">5. Payment Terms</h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                Payment terms for our services will be specified in individual service agreements. Generally:
              </p>
              <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 mb-4 space-y-2">
                <li>Invoices are payable within 30 days unless otherwise specified</li>
                <li>Late payments may incur interest charges</li>
                <li>We reserve the right to suspend services for non-payment</li>
                <li>All fees are non-refundable unless otherwise stated</li>
                <li>Prices are subject to change with 30 days' notice</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">6. Confidentiality</h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                Both parties agree to maintain the confidentiality of any proprietary or confidential information disclosed during the course of our business relationship. This obligation survives the termination of services.
              </p>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                Confidential information does not include information that:
              </p>
              <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 mb-4 space-y-2">
                <li>Is or becomes publicly available through no breach of these Terms</li>
                <li>Was rightfully known prior to disclosure</li>
                <li>Is independently developed without use of confidential information</li>
                <li>Is required to be disclosed by law</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">7. Warranties and Disclaimers</h2>
              <h3 className="text-xl font-semibold mb-3">7.1 Our Warranties</h3>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                We warrant that our services will be performed in a professional and workmanlike manner consistent with industry standards.
              </p>

              <h3 className="text-xl font-semibold mb-3">7.2 Disclaimers</h3>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                EXCEPT AS EXPRESSLY PROVIDED, OUR SERVICES ARE PROVIDED "AS IS" WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, OR NON-INFRINGEMENT.
              </p>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                We do not warrant that our services will be uninterrupted, error-free, or completely secure.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">8. Limitation of Liability</h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                TO THE MAXIMUM EXTENT PERMITTED BY LAW, FLUXIVE SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS OR REVENUES, WHETHER INCURRED DIRECTLY OR INDIRECTLY, OR ANY LOSS OF DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES.
              </p>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                Our total liability for any claims arising from or related to our services shall not exceed the amount paid by you to FLUXIVE in the 12 months preceding the claim.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">9. Indemnification</h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                You agree to indemnify, defend, and hold harmless FLUXIVE and its officers, directors, employees, and agents from any claims, liabilities, damages, losses, and expenses arising from:
              </p>
              <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 mb-4 space-y-2">
                <li>Your violation of these Terms</li>
                <li>Your violation of any third-party rights</li>
                <li>Your misuse of our services</li>
                <li>Your breach of any applicable laws or regulations</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">10. Termination</h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                We reserve the right to suspend or terminate your access to our services at any time, with or without notice, for any reason, including:
              </p>
              <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 mb-4 space-y-2">
                <li>Violation of these Terms</li>
                <li>Fraudulent, abusive, or illegal activity</li>
                <li>Non-payment of fees</li>
                <li>Extended period of inactivity</li>
              </ul>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                Upon termination, your right to use our services will immediately cease. Sections of these Terms that by their nature should survive termination will survive.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">11. Dispute Resolution and Governing Law</h2>
              <h3 className="text-xl font-semibold mb-3">11.1 Informal Resolution</h3>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                In the event of any dispute, we encourage you to contact us first to seek an informal resolution.
              </p>

              <h3 className="text-xl font-semibold mb-3">11.2 Governing Law</h3>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                These Terms shall be governed by and construed in accordance with Belgian law, without regard to conflict of law principles.
              </p>

              <h3 className="text-xl font-semibold mb-3">11.3 Jurisdiction</h3>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                For business clients, any disputes arising from these Terms shall be subject to the exclusive jurisdiction of the courts of Brussels, Belgium.
              </p>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                For Belgian consumers, you retain the right to bring proceedings before the courts in your place of residence in accordance with Belgian consumer protection law.
              </p>

              <h3 className="text-xl font-semibold mb-3">11.4 Mediation</h3>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                Before initiating legal proceedings, parties may consider voluntary mediation in accordance with Belgian mediation procedures.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">12. General Provisions</h2>
              <h3 className="text-xl font-semibold mb-3">12.1 Entire Agreement</h3>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                These Terms, together with any service agreements, constitute the entire agreement between you and FLUXIVE.
              </p>

              <h3 className="text-xl font-semibold mb-3">12.2 Severability</h3>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                If any provision of these Terms is found to be unenforceable, the remaining provisions will remain in full force and effect.
              </p>

              <h3 className="text-xl font-semibold mb-3">12.3 Waiver</h3>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights.
              </p>

              <h3 className="text-xl font-semibold mb-3">12.4 Assignment</h3>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                You may not assign or transfer these Terms without our prior written consent. We may assign these Terms without restriction.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">13. Belgian Law Compliance</h2>
              <h3 className="text-xl font-semibold mb-3">13.1 Company Details (Required by Belgian Law)</h3>
              <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg mb-4">
                <p className="text-gray-700 dark:text-gray-300 mb-2"><strong>Legal Entity Name:</strong> FLUXIVE</p>
                <p className="text-gray-700 dark:text-gray-300 mb-2"><strong>VAT Number (BTW):</strong> BE1029968269</p>
                <p className="text-gray-700 dark:text-gray-300 mb-2"><strong>Company Registration:</strong> Belgium</p>
                <p className="text-gray-700 dark:text-gray-300 mb-2"><strong>Legal Form:</strong> Private Limited Company (if applicable)</p>
              </div>

              <h3 className="text-xl font-semibold mb-3">13.2 Consumer Rights (Belgian Law)</h3>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                For consumers in Belgium, you have specific rights under the Belgian Code of Economic Law (Wetboek van economisch recht):
              </p>
              <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 mb-4 space-y-2">
                <li><strong>Right of Withdrawal:</strong> For certain services, you may have a 14-day cooling-off period</li>
                <li><strong>Guarantee Rights:</strong> Legal guarantee of conformity for goods and services</li>
                <li><strong>Transparency:</strong> Right to clear, unambiguous information before purchase</li>
                <li><strong>Unfair Terms:</strong> Protection against unfair contract terms under Belgian consumer law</li>
              </ul>

              <h3 className="text-xl font-semibold mb-3">13.3 Dispute Resolution</h3>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                Belgian consumers can also contact:
              </p>
              <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg mb-4">
                <p className="text-gray-700 dark:text-gray-300 mb-2"><strong>FOD Economie - Mediation Service</strong></p>
                <p className="text-gray-700 dark:text-gray-300 mb-2">North Gate III, Koning Albert II-laan 16, 1000 Brussels</p>
                <p className="text-gray-700 dark:text-gray-300">
                  <a href="https://economie.fgov.be/" target="_blank" rel="noopener noreferrer" className="text-primary-500 hover:underline">
                    economie.fgov.be
                  </a>
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">14. Contact Information</h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                For questions about these Terms, please contact us:
              </p>
              <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg">
                <p className="text-gray-700 dark:text-gray-300 mb-2"><strong>FLUXIVE</strong></p>
                <p className="text-gray-700 dark:text-gray-300 mb-2"><strong>BTW:</strong> BE1029968269</p>
                <p className="text-gray-700 dark:text-gray-300 mb-2">Email: legal@fluxive.com</p>
                <p className="text-gray-700 dark:text-gray-300">Response time: Within 48 hours</p>
              </div>
            </section>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
