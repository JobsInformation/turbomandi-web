'use client';
import { useState } from 'react';
import { Calculator, CheckCircle, Shield, FileText } from 'lucide-react';

export default function FinancePage() {
  const [loanAmount, setLoanAmount] = useState(40000);
  const [loanTerm, setLoanTerm] = useState(60); // months
  const [interestRate, setInterestRate] = useState(6.5);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Calculate monthly payment
  const monthlyRate = interestRate / 100 / 12;
  const monthlyPayment = 
    (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, loanTerm)) /
    (Math.pow(1 + monthlyRate, loanTerm) - 1);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const formData = new FormData(e.currentTarget);
    formData.append("access_key", "c10f9dc7-0d2e-4603-b9ca-4410edccf688"); 
    formData.append("subject", `New Finance Pre-Approval Application ($${loanAmount})`);
    formData.append("from_name", "Royal Auto Hub Finance Portal");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });
      if (response.ok) setIsSubmitted(true);
      else alert("Something went wrong. Please try again.");
    } catch (error) {
      alert("Connection error. Please check your internet.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans pb-16">
      <div className="bg-blue-800 text-white py-16 px-6 text-center">
        <h1 className="text-4xl font-bold mb-4">Car Finance & Pre-Approval</h1>
        <p className="text-blue-100 text-lg max-w-2xl mx-auto">Competitive vehicle finance tailored to your budget with fast approval times.</p>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Calculator Panel */}
        <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
          <div className="flex items-center gap-3 text-blue-700 mb-2">
            <Calculator className="w-7 h-7" />
            <h2 className="text-2xl font-bold text-slate-800">Finance Calculator</h2>
          </div>
          <p className="text-sm text-slate-500">Estimate your weekly or monthly repayments instantly.</p>

          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm font-semibold text-slate-700 mb-1">
                <span>Loan Amount</span>
                <span className="text-blue-700">${loanAmount.toLocaleString()}</span>
              </div>
              <input 
                type="range" min="5000" max="100000" step="1000" 
                value={loanAmount} onChange={(e) => setLoanAmount(Number(e.target.value))}
                className="w-full accent-blue-700 cursor-pointer" 
              />
            </div>

            <div>
              <div className="flex justify-between text-sm font-semibold text-slate-700 mb-1">
                <span>Loan Term</span>
                <span className="text-blue-700">{loanTerm} Months</span>
              </div>
              <input 
                type="range" min="12" max="84" step="12" 
                value={loanTerm} onChange={(e) => setLoanTerm(Number(e.target.value))}
                className="w-full accent-blue-700 cursor-pointer" 
              />
            </div>

            <div className="p-6 bg-blue-50 rounded-2xl border border-blue-100 flex items-center justify-between mt-6">
              <div>
                <div className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Estimated Payment</div>
                <div className="text-3xl font-extrabold text-blue-700 mt-1">${isNaN(monthlyPayment) ? '0' : monthlyPayment.toFixed(2)} <span className="text-sm font-normal text-slate-600">/mo</span></div>
              </div>
              <div className="text-right">
                <div className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Approx. Weekly</div>
                <div className="text-xl font-bold text-slate-800 mt-1">${isNaN(monthlyPayment) ? '0' : (monthlyPayment / 4.33).toFixed(2)} <span className="text-xs font-normal text-slate-600">/wk</span></div>
              </div>
            </div>
          </div>
        </div>

        {/* Application Form */}
        <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
          <h3 className="text-xl font-bold text-slate-800 mb-6">Apply for Pre-Approval</h3>
          {isSubmitted ? (
            <div className="p-6 bg-green-50 border border-green-200 rounded-xl text-green-800 text-center h-full flex flex-col justify-center items-center">
              <CheckCircle className="w-12 h-12 mb-4 text-green-600" />
              <p className="text-xl font-bold mb-2">Application Received!</p>
              <p className="text-slate-600">Our finance specialist will review your details and contact you within 24 hours.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <input type="text" name="name" placeholder="Full Legal Name" required className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-700 outline-none" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input type="email" name="email" placeholder="Email Address" required className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-700 outline-none" />
                <input type="tel" name="phone" placeholder="Phone Number" required className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-700 outline-none" />
              </div>
              <input type="text" name="employment_status" placeholder="Employment Status (e.g. Full-Time, Self-Employed)" required className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-700 outline-none" />
              <textarea name="notes" placeholder="Additional details or specific vehicle of interest..." rows={3} className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-700 outline-none"></textarea>
              <input type="checkbox" name="botcheck" className="hidden" style={{ display: 'none' }} />
              <button type="submit" disabled={isSubmitting} className="w-full bg-blue-700 hover:bg-blue-800 disabled:bg-blue-400 text-white py-3 rounded-lg font-bold transition-colors">
                {isSubmitting ? 'Submitting Application...' : 'Submit Finance Application'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
