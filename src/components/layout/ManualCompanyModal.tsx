import React, { useState } from 'react';
import { Modal } from '../common/Modal';
import { useApp } from '../../context/AppContext';

interface ManualCompanyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ManualCompanyModal: React.FC<ManualCompanyModalProps> = ({ isOpen, onClose }) => {
  const { addManualCompany } = useApp();

  const [name, setName] = useState('');
  const [domain, setDomain] = useState('');
  const [country, setCountry] = useState('Turkey');
  const [city, setCity] = useState('');
  const [sector, setSector] = useState('Industrial Manufacturing');
  const [employeeRange, setEmployeeRange] = useState('5–50');
  const [sourceUrl, setSourceUrl] = useState('');
  const [observedFact, setObservedFact] = useState('');
  const [notes, setNotes] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    addManualCompany({
      name: name.trim(),
      domain: domain.trim() || undefined,
      country,
      city: city.trim() || 'Unspecified City',
      sector,
      employeeRange: employeeRange || '5–50',
      publicSourceUrl: sourceUrl.trim() || 'https://user-submitted-seed',
      sourceProvider: 'Direct User Manual URL Ingestion',
      observedFacts: observedFact.trim() ? [observedFact.trim()] : ['Manually seeded by user for research.'],
      missingFields: ['Detailed operational financials', 'Decision maker direct contact'],
      status: 'new',
      hasDuplicateCandidates: false,
      matchConfidence: 'high',
      notes: notes.trim(),
    });

    onClose();
    // Reset fields
    setName('');
    setDomain('');
    setCity('');
    setSourceUrl('');
    setObservedFact('');
    setNotes('');
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Add Manual Company Seed"
      subtitle="Input a specific public domain or company source for evidence-backed analysis (FR-01 fallback)"
      maxWidth="lg"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">Company Name *</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Atlas Kalıp Sanayi A.Ş."
              className="w-full px-3 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-100 placeholder-slate-400 focus:outline-none focus:border-brand-500"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">Domain or Website</label>
            <input
              type="text"
              value={domain}
              onChange={(e) => setDomain(e.target.value)}
              placeholder="e.g. atlaskalip.com.tr"
              className="w-full px-3 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-100 placeholder-slate-400 focus:outline-none focus:border-brand-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3">
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">Country</label>
            <select
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="w-full px-3 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-100 focus:outline-none focus:border-brand-500"
            >
              <option value="Turkey">Turkey</option>
              <option value="Germany">Germany</option>
              <option value="United Kingdom">United Kingdom</option>
              <option value="United States">United States</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">City / Region</label>
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="e.g. Bursa"
              className="w-full px-3 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-100 placeholder-slate-400 focus:outline-none focus:border-brand-500"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">Employee Range</label>
            <input
              type="text"
              value={employeeRange}
              onChange={(e) => setEmployeeRange(e.target.value)}
              placeholder="Defaults to 5–50"
              className="w-full px-3 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-100 placeholder-slate-400 focus:outline-none focus:border-brand-500 font-mono"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-300 mb-1">Sector</label>
          <select
            value={sector}
            onChange={(e) => setSector(e.target.value)}
            className="w-full px-3 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-100 focus:outline-none focus:border-brand-500"
          >
            <option value="Automotive & Metal Parts">Automotive & Metal Parts</option>
            <option value="Logistics & Freight Forwarding">Logistics & Freight Forwarding</option>
            <option value="Medical Devices & Service">Medical Devices & Service</option>
            <option value="Industrial Manufacturing">Industrial Manufacturing</option>
            <option value="Food & Wholesale Distribution">Food & Wholesale Distribution</option>
            <option value="Construction & Contracting">Construction & Contracting</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-300 mb-1">Public Evidence Source URL</label>
          <input
            type="url"
            value={sourceUrl}
            onChange={(e) => setSourceUrl(e.target.value)}
            placeholder="https://example.com/contact-or-careers"
            className="w-full px-3 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-100 placeholder-slate-400 focus:outline-none focus:border-brand-500"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-300 mb-1">Initial Observed Fact (Raw signal)</label>
          <textarea
            rows={2}
            value={observedFact}
            onChange={(e) => setObservedFact(e.target.value)}
            placeholder="e.g. Job post indicates manual PDF invoice entry; contact form downloads paper document."
            className="w-full px-3 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-100 placeholder-slate-400 focus:outline-none focus:border-brand-500 resize-none"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-300 mb-1">Internal Notes</label>
          <input
            type="text"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Optional contextual notes for research"
            className="w-full px-3 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-100 placeholder-slate-400 focus:outline-none focus:border-brand-500"
          />
        </div>

        <div className="pt-3 border-t border-slate-800 flex items-center justify-end gap-2.5">
          <button
            type="button"
            onClick={onClose}
            className="px-3.5 py-1.5 text-xs font-medium text-slate-400 hover:text-slate-200 bg-slate-800 rounded-lg hover:bg-slate-700 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-1.5 text-xs font-medium text-white bg-brand-600 hover:bg-brand-500 rounded-lg shadow-sm transition-colors"
          >
            Save Candidate Record
          </button>
        </div>
      </form>
    </Modal>
  );
};
