'use client';

import { useState } from 'react';
import { MapPin, Phone, Mail, Clock, CheckCircle } from 'lucide-react';

export default function ContactPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const formData = new FormData(e.currentTarget);
    // Remember to replace this string with your actual Web3Forms Access Key!
    formData.append("access_key", "c10f9dc7-0d2e-4603-b9ca-4410edccf688"); 
    formData.append("subject", "New General Enquiry from Royal Auto Hub Website");
    formData.append("from_name", "Royal Auto Hub Website");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });
      
      if (response.ok) {
        setIsSubmitted(true);
      } else {
        alert("Something went wrong. Please try again.");
      }
    } catch (error) {
      alert("Connection error. Please check your internet.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans pb-16">
      {/* Hero Section */}
      <div className="bg-blue-800 text-white py-16 px-6 text-center">
        <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
        <p className="text-blue-100 text-lg max-w-2xl mx-auto">Have a question about a vehicle or need finance assistance? Our team is here to help.</p>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-2 gap-12">
        
        {/* Contact Details Panel */}
        <div className="space-y-8">
          <div>
            <h2 className="text-2xl font-bold text-slate-800 mb-6">Get in Touch</h2>
            <p className="text-slate-600 mb-8">We are a trusted Victorian LMCT certified dealer dedicated to providing premium used vehicles with fair deals and transparency.</p>
          </div>

          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="bg-blue-100 p-3 rounded-full text-blue-700">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-slate-800">Dealership Location</h3>
                <p className="text-slate-600">123 Auto Hub Drive<br />Victoria, Australia</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-blue-100 p-3 rounded-full text-blue-700">
                <Phone className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-slate-800">Phone</h3>
                <p className="text-slate-600">[Add Phone Number]</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-blue-100 p-3 rounded-full text-blue-700">
                <Mail className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-slate-800">Email</h3>
                <p className="text-slate-600">[Add Email Address]</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-blue-100 p-3 rounded-full text-blue-700">
                <Clock className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-slate-800">Trading Hours</h3>
                <p className="text-slate-600">Mon - Fri: 9:00 AM - 5:30 PM<br />Saturday: 9:00 AM - 4:00 PM<br />Sunday: Closed</p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form Panel */}
        <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
          <h3 className="text-xl font-bold text-slate-800 mb-6">Send us a Message</h3>
          
          {isSubmitted ? (
            <div className="p-6 bg-green-50 border border-green-200 rounded-xl text-green-800 text-center h-full flex flex-col justify-center items-center">
              <CheckCircle className="w-12 h-12 mb-4 text-green-600" />
              <p className="text-xl font-bold mb-2">Message Sent!</p>
              <p className="text-slate-600">Thank you for reaching out. One of our team members will get back to you shortly.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
                <input type="text" name="name" required className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-700 outline-none" />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
                  <input type="email" name="email" required className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-700 outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Phone Number</label>
                  <input type="tel" name="phone" required className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-700 outline-none" />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Message</label>
                <textarea name="message" rows={4} required className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-700 outline-none"></textarea>
              </div>

              {/* Honeypot Spam Protection */}
              <input type="checkbox" name="botcheck" className="hidden" style={{ display: 'none' }} />

              <button type="submit" disabled={isSubmitting} className="w-full bg-blue-800 hover:bg-blue-900 disabled:bg-blue-400 text-white py-3 rounded-lg font-bold transition-colors">
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          )}
        </div>

      </div>
    </div>
  );
}
