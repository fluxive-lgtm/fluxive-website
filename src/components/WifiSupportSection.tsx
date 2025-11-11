export default function WifiSupportSection() {
  return (
    <section
      id="wifi-support"
      className="py-16 sm:py-20 md:py-24 bg-gradient-to-b from-white to-slate-50 dark:from-slate-900 dark:to-slate-950"
    >
      <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
        <div className="glass-card rounded-2xl p-6 sm:p-8 md:p-10 shadow-xl border border-primary-500/10">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold mb-4">
            24/7 Wi-Fi Troubleshooting Portal
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-gray-700 dark:text-gray-200 mb-6">
            Experiencing slow Wi-Fi, random disconnects or no internet? Submit a
            support request here and our team will be notified instantly by
            email (and optionally WhatsApp) so we can assist you as fast as
            possible.
          </p>

          {/* IMPORTANT: this form posts to your Easyhost PHP script */}
          <form
            action="/wifi-support.php"
            method="POST"
            className="grid gap-4 sm:gap-5"
          >
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Name *
                </label>
                <input
                  name="name"
                  required
                  className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-slate-900 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Email *
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-slate-900 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  WhatsApp number (e.g. +3247… ) *
                </label>
                <input
                  name="whatsapp"
                  required
                  className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-slate-900 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Address / Location (optional)
                </label>
                <input
                  name="location"
                  className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-slate-900 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Router / Modem model
                </label>
                <input
                  name="device"
                  className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-slate-900 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Problem type
                </label>
                <select
                  name="issue_type"
                  className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-slate-900 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  <option value="no_internet">No internet</option>
                  <option value="slow_wifi">Slow Wi-Fi</option>
                  <option value="wifi_drops">Wi-Fi keeps dropping</option>
                  <option value="coverage">Bad coverage in some rooms</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Describe the problem *
              </label>
              <textarea
                name="message"
                required
                rows={4}
                className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-slate-900 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Preferred contact method
                </label>
                <select
                  name="preferred"
                  className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-slate-900 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  <option value="whatsapp">WhatsApp</option>
                  <option value="email">Email</option>
                  <option value="phone">Phone call</option>
                </select>
              </div>
              <div className="flex items-start pt-2">
                <label className="flex items-start text-xs sm:text-sm text-gray-600 dark:text-gray-300">
                  <input
                    type="checkbox"
                    name="consent"
                    value="1"
                    required
                    className="mt-1 mr-2"
                  />
                  I agree that Fluxive may contact me regarding this Wi-Fi
                  support request and store my data for this purpose.
                </label>
              </div>
            </div>

            <button
              type="submit"
              className="mt-2 inline-flex items-center justify-center rounded-lg bg-primary-600 hover:bg-primary-700 text-white text-sm sm:text-base font-semibold px-6 py-3 shadow-lg shadow-primary-600/30 transition"
            >
              Submit 24/7 Wi-Fi Support Request
            </button>
          </form>

          <p className="mt-4 text-xs text-gray-500 dark:text-gray-400">
            After submitting, your request will be sent directly to our support
            team by email (and optionally via WhatsApp integration), so we can
            respond as quickly as possible.
          </p>
        </div>
      </div>
    </section>
  );
}
