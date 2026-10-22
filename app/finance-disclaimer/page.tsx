export default function FinanceDisclaimerPage() {
  return (
    <div className="min-h-screen bg-slate-50 py-16 px-6">
      <div className="max-w-4xl mx-auto bg-white p-8 md:p-12 rounded-2xl border border-slate-200 shadow-sm">
        <h1 className="text-3xl font-bold text-slate-800 mb-6">Finance Disclaimer</h1>
        <div className="space-y-6 text-slate-600">
          <section>
            <h2 className="text-xl font-semibold text-slate-800 mb-3">General Information Only</h2>
            <p>Any finance information, estimates, or calculator results provided on the Royal Auto Hub website are for illustrative and general information purposes only. They do not constitute an offer of finance, financial advice, or a credit quote.</p>
          </section>
          <section>
            <h2 className="text-xl font-semibold text-slate-800 mb-3">Subject to Approval</h2>
            <p>All applications for personal and business finance are subject to the approval of the respective financial institution or authorised finance provider. Lending criteria, fees, charges, and terms and conditions apply.</p>
          </section>
          <section>
            <h2 className="text-xl font-semibold text-slate-800 mb-3">Interest Rates & Repayments</h2>
            <p>Indicative interest rates and estimated repayment amounts depend on various factors, including the loan term, deposit amount, balloon payment structures, and the applicant's credit profile. Please speak directly with our finance department for a formal, personalised quote.</p>
          </section>
        </div>
      </div>
    </div>
  );
}
