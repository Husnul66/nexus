import React, { useState } from 'react';
import { 
  Calculator, 
  AlertTriangle, 
  Copy
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Card, CardHeader, CardContent } from '../common/Card';

export const RoiCalculatorScreen: React.FC = () => {
  const { opportunities, activeOpportunityForRoi, setActiveOpportunityForRoi } = useApp();

  // Selected opportunity or standalone sandbox
  const [selectedOppId, setSelectedOppId] = useState<string>(activeOpportunityForRoi?.id || opportunities[0]?.id || 'standalone');

  // Interactive parameters
  const [currencySymbol, setCurrencySymbol] = useState('$');
  const [hourlyRate, setHourlyRate] = useState<number>(35);
  const [hoursWastedPerWeek, setHoursWastedPerWeek] = useState<number>(6);
  const [affectedEmployees, setAffectedEmployees] = useState<number>(4);
  const [implementationFee, setImplementationFee] = useState<number>(12000);
  const [annualMaintenanceFee, setAnnualMaintenanceFee] = useState<number>(1800);
  const [copiedPitchSummary, setCopiedPitchSummary] = useState(false);

  // Sync when selected opportunity changes
  const handleSelectOpp = (id: string) => {
    setSelectedOppId(id);
    const opp = opportunities.find(o => o.id === id);
    if (opp) {
      setActiveOpportunityForRoi(opp);
      if (opp.country === 'Turkey') {
        setCurrencySymbol('₺');
        setHourlyRate(450);
        setImplementationFee(180000);
        setAnnualMaintenanceFee(25000);
      } else {
        setCurrencySymbol('$');
        setHourlyRate(35);
        setImplementationFee(12000);
        setAnnualMaintenanceFee(1800);
      }
    } else {
      setActiveOpportunityForRoi(null);
    }
  };

  // Base raw annual cost calculation
  // Total hours wasted annually = hours * employees * 50 working weeks
  const totalAnnualHoursWasted = hoursWastedPerWeek * affectedEmployees * 50;
  const totalAnnualCostOfWaste = totalAnnualHoursWasted * hourlyRate;

  // 3 Scenarios:
  // 1. Conservative (40% recovery)
  // 2. Realistic (70% recovery)
  // 3. Optimistic (90% recovery)
  const calculateScenario = (recoveryRatio: number) => {
    const annualGrossSavings = totalAnnualCostOfWaste * recoveryRatio;
    const netFirstYearSavings = annualGrossSavings - implementationFee - annualMaintenanceFee;
    const paybackMonths = annualGrossSavings > 0 
      ? Math.max(1, Math.round(((implementationFee) / (annualGrossSavings / 12)) * 10) / 10)
      : 0;
    const threeYearGrossSavings = annualGrossSavings * 3;
    const threeYearNetSavings = threeYearGrossSavings - implementationFee - (annualMaintenanceFee * 3);
    const threeYearRoiPercent = implementationFee > 0
      ? Math.round((threeYearNetSavings / implementationFee) * 100)
      : 0;

    return {
      recoveryRatio,
      annualGrossSavings: Math.round(annualGrossSavings),
      netFirstYearSavings: Math.round(netFirstYearSavings),
      paybackMonths,
      threeYearRoiPercent,
    };
  };

  const conservative = calculateScenario(0.40);
  const realistic = calculateScenario(0.70);
  const optimistic = calculateScenario(0.90);

  const selectedOpp = opportunities.find(o => o.id === selectedOppId);

  const copyExecutiveSummary = () => {
    const text = `ROI ESTIMATE SUMMARY (Hypothetical Model for Discovery Alignment)\nTarget Problem: ${selectedOpp ? selectedOpp.problemHypothesis : 'Operational Workflow Automation'}\n\nKey Assumptions:\n- Affected Staff: ${affectedEmployees} employees\n- Manual Waste: ${hoursWastedPerWeek} hrs/week per employee\n- Estimated Blended Cost: ${currencySymbol}${hourlyRate}/hr\n\nSensitivity Scenarios:\n- Conservative (40% recovery): ${currencySymbol}${conservative.annualGrossSavings.toLocaleString()}/yr savings (Payback: ${conservative.paybackMonths} mo)\n- Realistic (70% recovery): ${currencySymbol}${realistic.annualGrossSavings.toLocaleString()}/yr savings (Payback: ${realistic.paybackMonths} mo, 3-Yr ROI: ${realistic.threeYearRoiPercent}%)\n- Optimistic (90% recovery): ${currencySymbol}${optimistic.annualGrossSavings.toLocaleString()}/yr savings\n\n*DISCLAIMER: All inputs are preliminary unverified estimates to be validated during client discovery interview.`;
    navigator.clipboard.writeText(text);
    setCopiedPitchSummary(true);
    setTimeout(() => setCopiedPitchSummary(false), 2500);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-base font-bold text-slate-100 tracking-tight flex items-center gap-2">
            <Calculator className="w-5 h-5 text-brand-400" />
            Parametric ROI & Sensitivity Model (FR-07)
          </h2>
          <p className="text-xs text-slate-400">
            Formulate multi-scenario financial savings matrices. Exposes assumptions rather than hallucinating deterministic numbers.
          </p>
        </div>

        <button
          onClick={copyExecutiveSummary}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold bg-brand-600 hover:bg-brand-500 text-white rounded-lg transition-colors shadow-sm"
        >
          <Copy className="w-3.5 h-3.5" />
          <span>{copiedPitchSummary ? 'Copied to Clipboard!' : 'Copy Discovery Summary'}</span>
        </button>
      </div>

      {/* Critical Methodology Warning Banner */}
      <div className="p-3.5 rounded-xl border border-amber-800/80 bg-amber-950/40 text-xs text-amber-200 flex items-start gap-3">
        <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <strong className="font-semibold text-amber-300">Methodology & Anti-Hallucination Rule:</strong>
          <p className="leading-relaxed text-amber-200/90 text-[11px]">
            Public web signals do not reveal private SME employee salaries, waste hours, or internal budgets. This model serves as an <em>interactive sensitivity framework</em> to present during client interviews, testing which assumptions hold true before quoting a final contract.
          </p>
        </div>
      </div>

      {/* Opportunity Selector and Currency */}
      <Card>
        <CardContent className="p-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 flex-1">
            <label className="text-xs font-semibold text-slate-300 shrink-0">
              Target Opportunity Dossier:
            </label>
            <select
              value={selectedOppId}
              onChange={(e) => handleSelectOpp(e.target.value)}
              className="flex-1 px-3 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-100 focus:outline-none focus:border-brand-500"
            >
              <option value="standalone">Standalone Generic SME Model</option>
              {opportunities.map(o => (
                <option key={o.id} value={o.id}>
                  {o.companyName} — {o.solutionBrief.title}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <span className="text-xs text-slate-400">Currency:</span>
            {['$', '₺', '€', '£'].map(sym => (
              <button
                key={sym}
                onClick={() => setCurrencySymbol(sym)}
                className={`w-7 h-7 rounded text-xs font-mono font-bold transition-colors ${
                  currencySymbol === sym
                    ? 'bg-brand-600 text-white'
                    : 'bg-slate-950 text-slate-400 border border-slate-800 hover:text-slate-200'
                }`}
              >
                {sym}
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Main Grid: Parameters on Left, 3 Scenarios on Right */}
      <div className="grid grid-cols-3 gap-6">
        {/* Left Column (1 col): Editable Parameters */}
        <div className="space-y-4">
          <Card>
            <CardHeader
              title="Operational Girdileri (Inputs)"
              subtitle="Editable parameters to validate with client"
            />
            <CardContent className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 font-medium mb-1 flex items-center justify-between">
                  <span>Blended Hourly Cost</span>
                  <span className="font-mono text-brand-400">{currencySymbol}{hourlyRate}/hr</span>
                </label>
                <input
                  type="range"
                  min="15"
                  max={currencySymbol === '₺' ? 2500 : 150}
                  step={currencySymbol === '₺' ? 25 : 5}
                  value={hourlyRate}
                  onChange={(e) => setHourlyRate(Number(e.target.value))}
                  className="w-full accent-brand-500"
                />
                <span className="text-[10px] text-slate-400">Total burdened employee cost</span>
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1 flex items-center justify-between">
                  <span>Hours Wasted / Week / Person</span>
                  <span className="font-mono text-brand-400">{hoursWastedPerWeek} hrs</span>
                </label>
                <input
                  type="range"
                  min="1"
                  max="20"
                  step="1"
                  value={hoursWastedPerWeek}
                  onChange={(e) => setHoursWastedPerWeek(Number(e.target.value))}
                  className="w-full accent-brand-500"
                />
                <span className="text-[10px] text-slate-400">Manual re-entry, email coordination, Excel</span>
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1 flex items-center justify-between">
                  <span>Affected Team Size</span>
                  <span className="font-mono text-brand-400">{affectedEmployees} staff</span>
                </label>
                <input
                  type="range"
                  min="1"
                  max="25"
                  step="1"
                  value={affectedEmployees}
                  onChange={(e) => setAffectedEmployees(Number(e.target.value))}
                  className="w-full accent-brand-500"
                />
                <span className="text-[10px] text-slate-400">SME target cohort (5–50 total)</span>
              </div>

              <div className="pt-3 border-t border-slate-800 space-y-3">
                <div>
                  <label className="block text-slate-300 font-medium mb-1 flex items-center justify-between">
                    <span>Software Implementation Fee</span>
                    <span className="font-mono text-purple-400">{currencySymbol}{implementationFee.toLocaleString()}</span>
                  </label>
                  <input
                    type="range"
                    min={currencySymbol === '₺' ? 20000 : 2000}
                    max={currencySymbol === '₺' ? 800000 : 50000}
                    step={currencySymbol === '₺' ? 5000 : 1000}
                    value={implementationFee}
                    onChange={(e) => setImplementationFee(Number(e.target.value))}
                    className="w-full accent-purple-500"
                  />
                  <span className="text-[10px] text-slate-400">One-time custom project cost</span>
                </div>

                <div>
                  <label className="block text-slate-300 font-medium mb-1 flex items-center justify-between">
                    <span>Annual Hosting & Maintenance</span>
                    <span className="font-mono text-purple-400">{currencySymbol}{annualMaintenanceFee.toLocaleString()}</span>
                  </label>
                  <input
                    type="range"
                    min={currencySymbol === '₺' ? 5000 : 500}
                    max={currencySymbol === '₺' ? 100000 : 8000}
                    step={currencySymbol === '₺' ? 1000 : 100}
                    value={annualMaintenanceFee}
                    onChange={(e) => setAnnualMaintenanceFee(Number(e.target.value))}
                    className="w-full accent-purple-500"
                  />
                  <span className="text-[10px] text-slate-400">Yearly recurring SLA fee</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column (2 cols): 3 Scenarios Matrix */}
        <div className="col-span-2 space-y-4">
          <div className="grid grid-cols-3 gap-4">
            {/* Conservative */}
            <Card className="border-slate-800 bg-slate-900/60 flex flex-col justify-between">
              <div>
                <CardHeader
                  title="Conservative"
                  subtitle="40% time recovery"
                  badge={<span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-slate-800 text-slate-400">Pessimistic</span>}
                />
                <CardContent className="space-y-4 pt-3 text-xs">
                  <div>
                    <span className="text-slate-400 text-[11px] block">Annual Gross Savings</span>
                    <div className="text-xl font-bold font-mono text-slate-100">
                      {currencySymbol}{conservative.annualGrossSavings.toLocaleString()}
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-800/80 space-y-1.5">
                    <div className="flex justify-between text-[11px]">
                      <span className="text-slate-400">Net 1st Year:</span>
                      <span className={`font-mono font-medium ${conservative.netFirstYearSavings >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                        {currencySymbol}{conservative.netFirstYearSavings.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between text-[11px]">
                      <span className="text-slate-400">Payback Period:</span>
                      <span className="font-mono text-slate-200">{conservative.paybackMonths} months</span>
                    </div>
                    <div className="flex justify-between text-[11px]">
                      <span className="text-slate-400">3-Year ROI:</span>
                      <span className="font-mono text-brand-400 font-bold">{conservative.threeYearRoiPercent}%</span>
                    </div>
                  </div>
                </CardContent>
              </div>
              <div className="p-3 bg-slate-950/70 border-t border-slate-800 text-[10px] text-slate-400">
                Safe baseline assumption for skeptical stakeholders.
              </div>
            </Card>

            {/* Expected / Realistic (Highlighted) */}
            <Card className="border-brand-500/50 bg-brand-950/20 shadow-lg shadow-brand-950/30 flex flex-col justify-between">
              <div>
                <CardHeader
                  title="Realistic / Expected"
                  subtitle="70% time recovery"
                  badge={<span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-brand-500/20 text-brand-300 border border-brand-500/40">Expected</span>}
                />
                <CardContent className="space-y-4 pt-3 text-xs">
                  <div>
                    <span className="text-slate-400 text-[11px] block">Annual Gross Savings</span>
                    <div className="text-2xl font-bold font-mono text-brand-400">
                      {currencySymbol}{realistic.annualGrossSavings.toLocaleString()}
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-800/80 space-y-1.5">
                    <div className="flex justify-between text-[11px]">
                      <span className="text-slate-400">Net 1st Year:</span>
                      <span className="font-mono font-bold text-emerald-400">
                        {currencySymbol}{realistic.netFirstYearSavings.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between text-[11px]">
                      <span className="text-slate-400">Payback Period:</span>
                      <span className="font-mono text-emerald-300 font-bold">{realistic.paybackMonths} months</span>
                    </div>
                    <div className="flex justify-between text-[11px]">
                      <span className="text-slate-400">3-Year ROI:</span>
                      <span className="font-mono text-emerald-400 font-bold text-sm">{realistic.threeYearRoiPercent}%</span>
                    </div>
                  </div>
                </CardContent>
              </div>
              <div className="p-3 bg-brand-950/60 border-t border-brand-900/50 text-[10px] text-brand-300">
                Primary anchor for proposal presentation.
              </div>
            </Card>

            {/* Optimistic */}
            <Card className="border-slate-800 bg-slate-900/60 flex flex-col justify-between">
              <div>
                <CardHeader
                  title="Accelerated"
                  subtitle="90% time recovery"
                  badge={<span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-emerald-950 text-emerald-300 border border-emerald-800">Optimistic</span>}
                />
                <CardContent className="space-y-4 pt-3 text-xs">
                  <div>
                    <span className="text-slate-400 text-[11px] block">Annual Gross Savings</span>
                    <div className="text-xl font-bold font-mono text-slate-100">
                      {currencySymbol}{optimistic.annualGrossSavings.toLocaleString()}
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-800/80 space-y-1.5">
                    <div className="flex justify-between text-[11px]">
                      <span className="text-slate-400">Net 1st Year:</span>
                      <span className="font-mono font-bold text-emerald-400">
                        {currencySymbol}{optimistic.netFirstYearSavings.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between text-[11px]">
                      <span className="text-slate-400">Payback Period:</span>
                      <span className="font-mono text-slate-200">{optimistic.paybackMonths} months</span>
                    </div>
                    <div className="flex justify-between text-[11px]">
                      <span className="text-slate-400">3-Year ROI:</span>
                      <span className="font-mono text-emerald-400 font-bold">{optimistic.threeYearRoiPercent}%</span>
                    </div>
                  </div>
                </CardContent>
              </div>
              <div className="p-3 bg-slate-950/70 border-t border-slate-800 text-[10px] text-slate-400">
                Upper bound if integration achieves near-total automation.
              </div>
            </Card>
          </div>

          {/* Value Narrative Box for Proposal Copy */}
          <Card>
            <CardHeader
              title="Proposal Narrative Blueprint"
              subtitle="Ready-to-use ROI argument for custom software proposal"
            />
            <CardContent className="space-y-3 text-xs">
              <div className="p-3.5 rounded-lg bg-slate-950 border border-slate-800 font-mono text-[11px] text-slate-300 leading-relaxed">
                "Based on observing public operational friction in your team's workflow, we project that automating this repetitive data handling across ~{affectedEmployees} staff members recovers an estimated {currencySymbol}{realistic.annualGrossSavings.toLocaleString()} in annual labor bandwidth. At an initial project investment of {currencySymbol}{implementationFee.toLocaleString()}, the solution reaches break-even within approximately {realistic.paybackMonths} months, yielding a 3-year net ROI of ~{realistic.threeYearRoiPercent}%."
              </div>
              <div className="flex items-center justify-between text-[11px] text-slate-400">
                <span>Variables marked as unverified inputs during discovery call</span>
                <button
                  onClick={copyExecutiveSummary}
                  className="text-brand-400 hover:text-brand-300 font-medium flex items-center gap-1"
                >
                  <Copy className="w-3 h-3" /> Copy Summary
                </button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
