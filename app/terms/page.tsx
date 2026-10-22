export default function TermsPage() {
  return (
    <div className="min-h-screen bg-slate-50 py-16 px-6">
      <div className="max-w-4xl mx-auto bg-white p-8 md:p-12 rounded-2xl border border-slate-200 shadow-sm">
        <h1 className="text-3xl font-bold text-slate-800 mb-6">Terms and Conditions</h1>
        <div className="space-y-6 text-slate-600">
          <p>Last updated: October 2026</p>
          <section>
            <h2 className="text-xl font-semibold text-slate-800 mb-3">1. Website Usage</h2>
            <p>By accessing the Royal Auto Hub website, you agree to be bound by these terms and conditions. The content provided is for general information and vehicle browsing purposes.</p>
          </section>
          <section>
            <h2 className="text-xl font-semibold text-slate-800 mb-3">2. Vehicle Information & Pricing</h2>
            <p>While we strive for accuracy, vehicle details, specifications, and prices are subject to change without notice. Advertised prices exclude government charges unless explicitly stated otherwise. We recommend verifying all details with our sales team prior to purchase.</p>
          </section>
          <section>
            <h2 className="text-xl font-semibold text-slate-800 mb-3">3. Trade-In Valuations</h2>
            <p>Any trade-in valuations provided via our online forms are indicative estimates only. A final, binding offer is strictly subject to a physical inspection of the vehicle and verification of ownership by our dealership.</p>
          </section>
          <section>
            <h2 className="text-xl font-semibold text-slate-800 mb-3">4. Jurisdiction</h2>
            <p>These terms are governed by the laws of Victoria, Australia. Any disputes arising in connection with this website shall be subject to the exclusive jurisdiction of the courts of Victoria.</p>
          </section>
        </div>
      </div>
    </div>
  );
}
