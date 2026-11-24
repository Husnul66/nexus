export type CandidateStatus = 'new' | 'reviewing' | 'promoted_to_research' | 'dismissed';

export type MatchConfidence = 'high' | 'medium' | 'low';

export type EvidenceStrength = 'high' | 'medium' | 'low';

export type OpportunityStatus = 
  | 'discovered_signal'
  | 'hypothesis'
  | 'scored'
  | 'proposal_ready'
  | 'user_approved'
  | 'contacted'
  | 'outcome_recorded';

export interface CompanyCandidate {
  id: string;
  name: string;
  domain?: string;
  country: string;
  city: string;
  sector: string;
  employeeRange: string; // Defaults to 5–50 or specific observed
  publicSourceUrl: string;
  sourceProvider: string;
  accessDate: string;
  observedFacts: string[];
  missingFields: string[];
  status: CandidateStatus;
  hasDuplicateCandidates: boolean;
  matchConfidence: MatchConfidence;
  notes?: string;
  isDemoFixture?: boolean;
}

export interface OpportunityScore {
  total: number; // 0-100
  evidenceQuality: number; // 0-30
  technicalFeasibility: number; // 0-25
  economicFit: number; // 0-25
  decisionMakerAccess: number; // 0-20
  justification: string;
}

export interface SolutionBrief {
  title: string;
  overview: string;
  proposedFlow: string;
  riskAnalysis: string;
}

export interface OutreachDraft {
  subject: string;
  body: string;
  approvedAt?: string;
  approvedBy?: string;
  isApproved: boolean;
}

export interface OpportunityOutcome {
  result: 'won' | 'lost' | 'invalidated';
  notes: string;
  recordedAt: string;
}

export interface Opportunity {
  id: string;
  companyId: string;
  companyName: string;
  sector: string;
  country: string;
  city: string;
  problemHypothesis: string;
  evidenceStrength: EvidenceStrength;
  uncertaintyNotes: string;
  tags: string[];
  status: OpportunityStatus;
  score: OpportunityScore;
  solutionBrief: SolutionBrief;
  outreachDraft: OutreachDraft;
  outcome?: OpportunityOutcome;
  createdAt: string;
  updatedAt: string;
  isDemoFixture?: boolean;
}

export interface DiscoverySearchQuery {
  id: string;
  country: string;
  cityOrRegion: string;
  sector: string;
  employeeRange: string;
  keywords?: string;
  createdAt: string;
  provider: string;
  resultsCount: number;
}

export interface DataSourceProvider {
  id: string;
  name: string;
  complianceStatus: 'compliant' | 'review_required' | 'restricted';
  dailyQuotaRemaining: number;
  dailyQuotaTotal: number;
  rateLimitPerMin: number;
  description: string;
  isAvailable: boolean;
}

export interface RoiParameters {
  hourlyRate: number;
  hoursWastedPerWeek: number;
  affectedEmployees: number;
  implementationCostEstimate: number;
}

export interface SystemSettings {
  activeEnvironment: 'demo_fixture' | 'live_empty';
  defaultEmployeeRange: string;
  localDataStorage: boolean;
  strictAuditLogging: boolean;
  autoDeduplicationCheck: boolean;
  requireReviewBeforeApproval: boolean;
}
