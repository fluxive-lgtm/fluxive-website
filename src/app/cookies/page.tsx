"use client";

import { motion } from "framer-motion";
import { Cookie } from "lucide-react";

export default function CookiePolicy() {
  return (
    <main className="relative min-h-screen pt-32 pb-20">
      <div className="container mx-auto px-6 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-3 mb-6">
            <Cookie className="w-10 h-10 text-primary-500" />
            <h1 className="text-4xl md:text-5xl font-display font-bold">
              Cookie Policy
            </h1>
          </div>
          
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>

          <div className="prose prose-lg dark:prose-invert max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">1. Introduction and Legal Framework</h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                This Cookie Policy explains how FLUXIVE uses cookies and similar tracking technologies on our website. This policy is designed to comply with:
              </p>
              <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 mb-4 space-y-2">
                <li><strong>GDPR</strong> (General Data Protection Regulation - EU 2016/679)</li>
                <li><strong>ePrivacy Directive</strong> (2002/58/EC as amended by 2009/136/EC) - also known as the "Cookie Law"</li>
                <li><strong>Belgian Law</strong> on Electronic Communications and Data Protection</li>
              </ul>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                Under Belgian and EU law, we must obtain your explicit consent before placing non-essential cookies on your device.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">2. What Are Cookies?</h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                Cookies are small text files that are stored on your device (computer, tablet, or mobile) when you visit a website. They are widely used to make websites work more efficiently and provide information to website owners.
              </p>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                Cookies help us understand how you use our website, remember your preferences, and improve your overall experience.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">3. How We Use Cookies</h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                FLUXIVE uses cookies for various purposes to enhance your browsing experience and improve our services. We use cookies to:
              </p>
              <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 mb-4 space-y-2">
                <li>Keep you signed in to your account</li>
                <li>Remember your preferences and settings (e.g., language, theme)</li>
                <li>Understand how you use our website</li>
                <li>Improve website performance and functionality</li>
                <li>Provide personalized content and recommendations</li>
                <li>Analyze website traffic and user behavior</li>
                <li>Deliver relevant advertising (if applicable)</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">3. Types of Cookies We Use</h2>
              
              <h3 className="text-xl font-semibold mb-3">3.1 Essential Cookies</h3>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                These cookies are necessary for the website to function properly. They enable core functionality such as security, network management, and accessibility.
              </p>
              <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg mb-4">
                <p className="text-gray-700 dark:text-gray-300 mb-2"><strong>Examples:</strong></p>
                <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-1">
                  <li>Session cookies for user authentication</li>
                  <li>Security cookies to prevent fraudulent activity</li>
                  <li>Load balancing cookies for website performance</li>
                </ul>
              </div>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                <strong>Duration:</strong> Session or up to 1 year<br />
                <strong>Can be disabled:</strong> No (required for website functionality)
              </p>

              <h3 className="text-xl font-semibold mb-3">3.2 Performance Cookies</h3>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                These cookies collect information about how visitors use our website, such as which pages are visited most often and if users receive error messages.
              </p>
              <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg mb-4">
                <p className="text-gray-700 dark:text-gray-300 mb-2"><strong>Examples:</strong></p>
                <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-1">
                  <li>Google Analytics cookies</li>
                  <li>Page load time measurement</li>
                  <li>Error tracking and reporting</li>
                </ul>
              </div>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                <strong>Duration:</strong> Up to 2 years<br />
                <strong>Can be disabled:</strong> Yes
              </p>

              <h3 className="text-xl font-semibold mb-3">3.3 Functionality Cookies</h3>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                These cookies allow our website to remember choices you make (such as your username, language, or region) and provide enhanced, personalized features.
              </p>
              <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg mb-4">
                <p className="text-gray-700 dark:text-gray-300 mb-2"><strong>Examples:</strong></p>
                <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-1">
                  <li>Theme preference (dark/light mode)</li>
                  <li>Language selection</li>
                  <li>Region-specific content preferences</li>
                  <li>Form auto-fill data</li>
                </ul>
              </div>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                <strong>Duration:</strong> Up to 1 year<br />
                <strong>Can be disabled:</strong> Yes (may affect functionality)
              </p>

              <h3 className="text-xl font-semibold mb-3">3.4 Targeting/Advertising Cookies</h3>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                These cookies are used to deliver content that is more relevant to you and your interests. They may be set by us or third-party advertising partners.
              </p>
              <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg mb-4">
                <p className="text-gray-700 dark:text-gray-300 mb-2"><strong>Examples:</strong></p>
                <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-1">
                  <li>Google Ads cookies</li>
                  <li>Facebook Pixel</li>
                  <li>LinkedIn Insight Tag</li>
                  <li>Retargeting cookies</li>
                </ul>
              </div>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                <strong>Duration:</strong> Up to 2 years<br />
                <strong>Can be disabled:</strong> Yes
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">4. Detailed Cookie Table</h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                Below is a detailed list of specific cookies we may use on our website:
              </p>

              <div className="overflow-x-auto mb-6">
                <table className="min-w-full bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg">
                  <thead>
                    <tr className="bg-gray-200 dark:bg-gray-700">
                      <th className="px-4 py-3 text-left text-sm font-semibold">Cookie Name</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold">Provider</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold">Purpose</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold">Duration</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold">Type</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm">
                    <tr className="border-t border-gray-300 dark:border-gray-700">
                      <td className="px-4 py-3 font-mono text-xs">cookie-consent</td>
                      <td className="px-4 py-3">FLUXIVE</td>
                      <td className="px-4 py-3">Stores your cookie preferences</td>
                      <td className="px-4 py-3">2 years</td>
                      <td className="px-4 py-3"><span className="px-2 py-1 bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 rounded text-xs">Essential</span></td>
                    </tr>
                    <tr className="border-t border-gray-300 dark:border-gray-700">
                      <td className="px-4 py-3 font-mono text-xs">theme</td>
                      <td className="px-4 py-3">FLUXIVE</td>
                      <td className="px-4 py-3">Remembers your theme preference (dark/light mode)</td>
                      <td className="px-4 py-3">1 year</td>
                      <td className="px-4 py-3"><span className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded text-xs">Functional</span></td>
                    </tr>
                    <tr className="border-t border-gray-300 dark:border-gray-700">
                      <td className="px-4 py-3 font-mono text-xs">_ga</td>
                      <td className="px-4 py-3">Google Analytics</td>
                      <td className="px-4 py-3">Distinguishes unique users for analytics</td>
                      <td className="px-4 py-3">2 years</td>
                      <td className="px-4 py-3"><span className="px-2 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded text-xs">Analytics</span></td>
                    </tr>
                    <tr className="border-t border-gray-300 dark:border-gray-700">
                      <td className="px-4 py-3 font-mono text-xs">_gid</td>
                      <td className="px-4 py-3">Google Analytics</td>
                      <td className="px-4 py-3">Distinguishes unique users for analytics</td>
                      <td className="px-4 py-3">24 hours</td>
                      <td className="px-4 py-3"><span className="px-2 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded text-xs">Analytics</span></td>
                    </tr>
                    <tr className="border-t border-gray-300 dark:border-gray-700">
                      <td className="px-4 py-3 font-mono text-xs">_gat</td>
                      <td className="px-4 py-3">Google Analytics</td>
                      <td className="px-4 py-3">Throttles request rate to Analytics</td>
                      <td className="px-4 py-3">1 minute</td>
                      <td className="px-4 py-3"><span className="px-2 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded text-xs">Analytics</span></td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <p className="text-sm text-gray-600 dark:text-gray-400">
                <strong>Note:</strong> This table is indicative. Actual cookies may vary based on your consent choices and services we implement.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">5. Third-Party Cookies</h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                We may use third-party services that place cookies on your device. These third parties have their own privacy policies and cookie policies:
              </p>
              
              <div className="space-y-4">
                <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">Google Analytics</h4>
                  <p className="text-gray-700 dark:text-gray-300 mb-2">We use Google Analytics to analyze website usage and improve our services.</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-primary-500 hover:underline">
                      Google Privacy Policy
                    </a>
                  </p>
                </div>

                <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">Social Media Platforms</h4>
                  <p className="text-gray-700 dark:text-gray-300 mb-2">If you interact with social media features on our site, those platforms may set cookies.</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Platforms include: Facebook, LinkedIn, Twitter, Instagram
                  </p>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">6. How to Control Cookies</h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                You have the right to control and manage cookies in several ways:
              </p>

              <h3 className="text-xl font-semibold mb-3">5.1 Browser Settings</h3>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                Most web browsers allow you to control cookies through their settings. You can:
              </p>
              <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 mb-4 space-y-2">
                <li>Block all cookies</li>
                <li>Block third-party cookies only</li>
                <li>Delete cookies after browsing sessions</li>
                <li>Set exceptions for specific websites</li>
              </ul>
              
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                <strong>Browser-specific instructions:</strong>
              </p>
              <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 mb-4 space-y-2">
                <li><a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer" className="text-primary-500 hover:underline">Chrome</a></li>
                <li><a href="https://support.mozilla.org/en-US/kb/cookies-information-websites-store-on-your-computer" target="_blank" rel="noopener noreferrer" className="text-primary-500 hover:underline">Firefox</a></li>
                <li><a href="https://support.apple.com/guide/safari/manage-cookies-and-website-data-sfri11471/mac" target="_blank" rel="noopener noreferrer" className="text-primary-500 hover:underline">Safari</a></li>
                <li><a href="https://support.microsoft.com/en-us/microsoft-edge/delete-cookies-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09" target="_blank" rel="noopener noreferrer" className="text-primary-500 hover:underline">Edge</a></li>
              </ul>

              <h3 className="text-xl font-semibold mb-3">5.2 Opt-Out Tools</h3>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                You can opt out of targeted advertising cookies through:
              </p>
              <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 mb-4 space-y-2">
                <li><a href="http://www.aboutads.info/choices/" target="_blank" rel="noopener noreferrer" className="text-primary-500 hover:underline">Digital Advertising Alliance (DAA)</a></li>
                <li><a href="http://www.youronlinechoices.com/" target="_blank" rel="noopener noreferrer" className="text-primary-500 hover:underline">European Interactive Digital Advertising Alliance (EDAA)</a></li>
                <li><a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" className="text-primary-500 hover:underline">Google Analytics Opt-out Browser Add-on</a></li>
              </ul>

              <h3 className="text-xl font-semibold mb-3">5.3 Important Note</h3>
              <div className="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-500 p-4 mb-4">
                <p className="text-gray-700 dark:text-gray-300">
                  <strong>Warning:</strong> Blocking or deleting cookies may affect your experience on our website. Some features may not work properly without certain cookies enabled.
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">7. Do Not Track Signals</h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                Some browsers include a "Do Not Track" (DNT) feature that signals to websites that you do not want to be tracked. Currently, there is no uniform standard for recognizing and implementing DNT signals. We do not currently respond to DNT signals, but we respect your privacy choices and provide multiple ways to control cookies and tracking.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">8. Mobile Devices</h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                If you access our website through a mobile device, you can control cookies and tracking through your device settings:
              </p>
              <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 mb-4 space-y-2">
                <li><strong>iOS:</strong> Settings {'>'} Safari {'>'} Privacy & Security</li>
                <li><strong>Android:</strong> Settings {'>'} Google {'>'} Ads</li>
              </ul>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                You can also reset your advertising identifier to limit ad tracking.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">9. Cookie Consent</h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                When you first visit our website, we will display a cookie consent banner. You can:
              </p>
              <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 mb-4 space-y-2">
                <li>Accept all cookies</li>
                <li>Reject non-essential cookies</li>
                <li>Customize your cookie preferences</li>
              </ul>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                You can change your preferences at any time by clicking the "Cookie Settings" link in our footer or by clearing your browser cookies and revisiting our site.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">10. Updates to This Policy</h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                We may update this Cookie Policy from time to time to reflect changes in our practices or for legal, regulatory, or operational reasons. We will notify you of any material changes by posting the updated policy on our website with a new "Last updated" date.
              </p>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                We encourage you to review this policy periodically to stay informed about how we use cookies.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">11. More Information</h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                For more information about our privacy practices, please see our <a href="/privacy" className="text-primary-500 hover:underline">Privacy Policy</a>.
              </p>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                To learn more about cookies in general, visit <a href="https://www.allaboutcookies.org/" target="_blank" rel="noopener noreferrer" className="text-primary-500 hover:underline">AllAboutCookies.org</a>.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">12. Contact Us</h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                If you have questions or concerns about our use of cookies, please contact us:
              </p>
              <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg">
                <p className="text-gray-700 dark:text-gray-300 mb-2"><strong>FLUXIVE</strong></p>
                <p className="text-gray-700 dark:text-gray-300 mb-2">Email: privacy@fluxive.com</p>
                <p className="text-gray-700 dark:text-gray-300">Subject: Cookie Policy Inquiry</p>
                <p className="text-gray-700 dark:text-gray-300 mt-2">Response time: Within 48 hours</p>
              </div>
            </section>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
