export default function CookieNoticePage() {
  return (
    <div className="min-h-screen bg-slate-50 py-16 px-6">
      <div className="max-w-4xl mx-auto bg-white p-8 md:p-12 rounded-2xl border border-slate-200 shadow-sm">
        <h1 className="text-3xl font-bold text-slate-800 mb-6">Cookie Notice</h1>
        <div className="space-y-6 text-slate-600">
          <section>
            <h2 className="text-xl font-semibold text-slate-800 mb-3">How We Use Cookies</h2>
            <p>The Royal Auto Hub website uses cookies and similar tracking technologies to enhance your browsing experience, remember your preferences (such as saved vehicles), and analyze site traffic.</p>
          </section>
          <section>
            <h2 className="text-xl font-semibold text-slate-800 mb-3">Types of Cookies</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Essential Cookies:</strong> Required for basic website functionality and security.</li>
              <li><strong>Functional Cookies:</strong> Allow us to remember choices you make, such as the vehicles you have saved to your session.</li>
              <li><strong>Analytics Cookies:</strong> Help us understand how visitors interact with our website, allowing us to improve performance and usability.</li>
            </ul>
          </section>
          <section>
            <h2 className="text-xl font-semibold text-slate-800 mb-3">Managing Cookies</h2>
            <p>You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, some portions of our website may not function properly.</p>
          </section>
        </div>
      </div>
    </div>
  );
}
