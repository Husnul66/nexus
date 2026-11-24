import { CompanyCandidate, Opportunity, DataSourceProvider, SystemSettings } from '../types';

export const INITIAL_DATA_PROVIDERS: DataSourceProvider[] = [
  {
    id: 'public_registry_adapter',
    name: 'Public Business Directory Adapter',
    complianceStatus: 'compliant',
    dailyQuotaRemaining: 480,
    dailyQuotaTotal: 500,
    rateLimitPerMin: 30,
    description: 'Permitted public registry metadata adapter with strict robots.txt and rate-limit compliance.',
    isAvailable: true,
  },
  {
    id: 'chamber_public_index',
    name: 'Chamber Public Trade Index API',
    complianceStatus: 'compliant',
    dailyQuotaRemaining: 150,
    dailyQuotaTotal: 200,
    rateLimitPerMin: 15,
    description: 'Public business categorization index without private contact extraction.',
    isAvailable: true,
  },
  {
    id: 'manual_seed_url_adapter',
    name: 'Direct User Manual URL Ingestion',
    complianceStatus: 'compliant',
    dailyQuotaRemaining: 9999,
    dailyQuotaTotal: 10000,
    rateLimitPerMin: 120,
    description: 'Single-URL user submitted domain intake for custom observation parsing.',
    isAvailable: true,
  },
  {
    id: 'third_party_aggregator_preview',
    name: 'Aggregator Search Adapter (Restricted)',
    complianceStatus: 'review_required',
    dailyQuotaRemaining: 0,
    dailyQuotaTotal: 50,
    rateLimitPerMin: 5,
    description: 'Requires legal terms review regarding commercial scraping boundaries before activation.',
    isAvailable: false,
  }
];

export const INITIAL_SETTINGS: SystemSettings = {
  activeEnvironment: 'demo_fixture',
  defaultEmployeeRange: '5–50',
  localDataStorage: true,
  strictAuditLogging: true,
  autoDeduplicationCheck: true,
  requireReviewBeforeApproval: true,
};

export const DEMO_FIXTURE_COMPANIES: CompanyCandidate[] = [
  {
    id: 'comp_demo_01',
    name: '[DEMO FIXTURE] Anadolu Pres Metal A.Ş.',
    domain: 'anadolupres-metal-demo.com.tr',
    country: 'Turkey',
    city: 'Bursa',
    sector: 'Automotive & Metal Parts',
    employeeRange: '15–35 (Estimated from job ads)',
    publicSourceUrl: 'https://example-public-portal.gov.tr/index/anadolu-pres',
    sourceProvider: 'Chamber Public Trade Index API',
    accessDate: '2026-11-20',
    observedFacts: [
      'Public job posting for "Excel & MRP Data Entry Specialist" posted 12 days ago.',
      'Public product catalog listing 250+ custom stamping dies with manual PDF quote request form.',
      'Public corporate page states delivery dispatch notes are prepared manually across 2 warehouse locations.'
    ],
    missingFields: ['Exact annual software budget', 'Internal ERP software vendor', 'Direct founder phone number'],
    status: 'promoted_to_research',
    hasDuplicateCandidates: false,
    matchConfidence: 'high',
    notes: 'Strong candidate for automated PDF quote-to-production schedule integration.',
    isDemoFixture: true,
  },
  {
    id: 'comp_demo_02',
    name: '[DEMO FIXTURE] Marmara Lojistik ve Dağıtım Ltd.',
    domain: 'marmaralog-demo.com.tr',
    country: 'Turkey',
    city: 'Kocaeli (Gebze)',
    sector: 'Logistics & Freight Forwarding',
    employeeRange: '20–45',
    publicSourceUrl: 'https://example-directory.org/tr/logistics/marmara-gebze',
    sourceProvider: 'Public Business Directory Adapter',
    accessDate: '2026-11-22',
    observedFacts: [
      'Website customer portal link displays broken 404 page for shipment tracking.',
      'Customer Google reviews cite phone delays in receiving delivery confirmation receipts (14 public reviews mentioning "evrak gecikmesi").',
      'Recent hiring announcement for 3 dispatch coordinators handling WhatsApp dispatch groups.'
    ],
    missingFields: ['Fleet management software brand', 'Average daily shipment volume'],
    status: 'promoted_to_research',
    hasDuplicateCandidates: true,
    matchConfidence: 'medium',
    notes: 'High operational friction: WhatsApp dispatching leads to lost proof-of-delivery docs.',
    isDemoFixture: true,
  },
  {
    id: 'comp_demo_03',
    name: '[DEMO FIXTURE] Ege Biyomedikal Cihazlar',
    domain: 'egebiomed-demo.com',
    country: 'Turkey',
    city: 'İzmir',
    sector: 'Medical Devices & Service',
    employeeRange: '8–20',
    publicSourceUrl: 'https://example-medical-directory.org/ege-bio',
    sourceProvider: 'Direct User Manual URL Ingestion',
    accessDate: '2026-11-23',
    observedFacts: [
      'Public technical service request form asks customers to download a Word document and email it back.',
      'Certification register indicates ISO 13485 calibration records must be maintained audit-ready.'
    ],
    missingFields: ['Current ticketing system', 'Contract maintenance revenue percentage'],
    status: 'reviewing',
    hasDuplicateCandidates: false,
    matchConfidence: 'high',
    notes: 'Word document service intake indicates lack of lightweight mobile service logging portal.',
    isDemoFixture: true,
  },
  {
    id: 'comp_demo_04',
    name: '[DEMO FIXTURE] Nordic Freightline GmbH',
    domain: 'nordicfreightline-demo.de',
    country: 'Germany',
    city: 'Hamburg',
    sector: 'Logistics & Intermodal Freight',
    employeeRange: '10–30',
    publicSourceUrl: 'https://example-trade-register.eu/company/nordic-freight',
    sourceProvider: 'Public Business Directory Adapter',
    accessDate: '2026-11-18',
    observedFacts: [
      'Public notice states customs clearance documents must be submitted via email in specific XML/EDI format.',
      'Job board listing for customs administrative clerk specifically requiring manual PDF conversion.'
    ],
    missingFields: ['Monthly customs declaration volume', 'Direct customs broker contact'],
    status: 'new',
    hasDuplicateCandidates: false,
    matchConfidence: 'high',
    notes: 'Cross-border opportunity: automated customs document extraction.',
    isDemoFixture: true,
  },
  {
    id: 'comp_demo_05',
    name: '[DEMO FIXTURE] Akdeniz Plastik Kalıp Sanayi',
    domain: 'akdeniz-kalip-demo.com',
    country: 'Turkey',
    city: 'Adana',
    sector: 'Industrial Manufacturing',
    employeeRange: '5–15 (Chamber listing)',
    publicSourceUrl: 'https://example-directory.org/tr/plastics/akdeniz',
    sourceProvider: 'Chamber Public Trade Index API',
    accessDate: '2026-11-19',
    observedFacts: [
      'Static one-page website without product filtering.',
      'Public tenders indicate supplying plastic crates to regional agricultural exporters.'
    ],
    missingFields: ['Inventory software presence', 'Management contact'],
    status: 'dismissed',
    hasDuplicateCandidates: false,
    matchConfidence: 'low',
    notes: 'Signals too weak to justify bespoke software intervention; dismissed due to low digital maturity.',
    isDemoFixture: true,
  }
];

export const DEMO_FIXTURE_OPPORTUNITIES: Opportunity[] = [
  {
    id: 'opp_demo_01',
    companyId: 'comp_demo_01',
    companyName: '[DEMO FIXTURE] Anadolu Pres Metal A.Ş.',
    sector: 'Automotive & Metal Parts',
    country: 'Turkey',
    city: 'Bursa',
    problemHypothesis: 'Manual transcription of PDF quote requests into Excel production planning causes 2–3 day quoting latency and double-entry errors between sales and workshop.',
    evidenceStrength: 'high',
    uncertaintyNotes: 'Public job posting for data entry clerk + manual quote download link confirms Excel dependency, but exact ERP version in use is unverified.',
    tags: ['Excel Elimination', 'Production Scheduling', 'B2B Quoting Portal'],
    status: 'proposal_ready',
    score: {
      total: 82,
      evidenceQuality: 26, // max 30
      technicalFeasibility: 22, // max 25
      economicFit: 19, // max 25
      decisionMakerAccess: 15, // max 20
      justification: 'Strong multi-signal public evidence (job ad + public catalog workflow). High technical feasibility using lightweight web portal with PDF parsing. SME size (15-35) indicates accessible plant manager.'
    },
    solutionBrief: {
      title: 'Automated Metal Stamping Quote & Production Dispatcher',
      overview: 'A lightweight web-based quoting portal allowing customers to upload CAD/PDF specs, automatically extracting parameters and generating draft manufacturing estimates for engineering approval.',
      proposedFlow: 'Customer Upload (PDF/DWG) → Web Extractor parses dimensions & material → Engineering Review Dashboard (1-click approve) → Notification with estimated dispatch date.',
      riskAnalysis: 'Relies on customer engineering file consistency. Initial version should focus on standard dimensional quotes before custom tooling calculations.'
    },
    outreachDraft: {
      subject: 'Anadolu Pres üretim teklif süreçleri ve sipariş hazırlama süreleri hakkında',
      body: 'Sayın Yetkili,\n\nKamuya açık ürün kataloğunuzu ve parça imalat süreçlerinizi incelediğimizde, müşterilerinizin özel kalıp ve baskı taleplerini manuel PDF formları üzerinden ilettiğini gözlemledik.\n\n5–50 kişilik üretim tesislerinde teklif hazırlama sürecinin ortalama 48–72 saat sürdüğü ve mühendislik ekibinin vaktinin önemli bir kısmını veri kopyalamaya ayırdığı sıkça görülen bir darboğazdır.\n\nBu süreyi 15 dakikaya indiren ve doğrudan atölye iş emri taslağı oluşturan düşük sadakatli prototip akışımızı incelemek isterseniz, hazırladığımız kavramsal ekran akışını paylaşmaktan memnuniyet duyarız.\n\nSaygılarımla,\n[Adınız / Nexus Danışmanlık]',
      isApproved: false,
    },
    createdAt: '2026-11-20T10:30:00Z',
    updatedAt: '2026-11-23T14:15:00Z',
    isDemoFixture: true,
  },
  {
    id: 'opp_demo_02',
    companyId: 'comp_demo_02',
    companyName: '[DEMO FIXTURE] Marmara Lojistik ve Dağıtım Ltd.',
    sector: 'Logistics & Freight Forwarding',
    country: 'Turkey',
    city: 'Kocaeli (Gebze)',
    problemHypothesis: 'WhatsApp dispatch coordination and missing digital delivery confirmations lead to lost proof-of-delivery (POD) documents, delayed billing cycles, and repeated client phone inquiries.',
    evidenceStrength: 'high',
    uncertaintyNotes: 'Broken portal link verified directly on domain; 14 client reviews explicitly complain about missing delivery receipts. Exact carrier software stack unknown.',
    tags: ['Proof of Delivery (POD)', 'Customer Tracking', 'Dispatch Automation'],
    status: 'user_approved',
    score: {
      total: 88,
      evidenceQuality: 28,
      technicalFeasibility: 23,
      economicFit: 21,
      decisionMakerAccess: 16,
      justification: 'Direct client complaints prove active commercial friction. High business ROI because faster POD collection directly accelerates factoring and invoice settlement.'
    },
    solutionBrief: {
      title: 'Mobile Web Proof-of-Delivery & Instant SMS Status Link',
      overview: 'Driver-friendly zero-install mobile web page allowing drivers to photograph signed waybills on delivery, automatically uploading them to an instant customer tracking link.',
      proposedFlow: 'Driver scans QR on waybill → Captures signature photo on smartphone → Cloud OCR validates delivery note # → Customer automatically receives instant tracking SMS with POD receipt.',
      riskAnalysis: 'Driver smartphone adoption and poor cellular coverage in industrial zones. Requires offline-first web cache for photo capture.'
    },
    outreachDraft: {
      subject: 'Marmara Lojistik Gebze operasyonunda teslimat teyidi ve evrak takibi',
      body: 'Sayın Marmara Lojistik Operasyon Yöneticisi,\n\nGebze hattındaki parsiyel ve tam yük taşımacılığı operasyonlarınızı ve kamuya açık müşteri geri bildirimlerini inceledik. Teslimat irsaliyelerinin merkeze ulaşma süresinin faturalama döngülerini ve müşteri bildirimlerini geciktirebildiğini gözlemliyoruz.\n\nSürücülerin herhangi bir uygulama indirmeden, telefon kamerasıyla teslimat anında irsaliye yükleyebildiği ve müşterilerinize otomatik dijital teyit ileten kavramsal çözüm akışımızı hazırladık.\n\nBu mimari taslağı 10 dakikalık kısa bir görüşmede sizinle paylaşmak isteriz.\n\nSaygılarımla,\n[Adınız]',
      approvedAt: '2026-11-24T11:00:00Z',
      approvedBy: 'Proje Sahibi (Nexus User)',
      isApproved: true,
    },
    createdAt: '2026-11-22T09:00:00Z',
    updatedAt: '2026-11-24T11:00:00Z',
    isDemoFixture: true,
  },
  {
    id: 'opp_demo_03',
    companyId: 'comp_demo_03',
    companyName: '[DEMO FIXTURE] Ege Biyomedikal Cihazlar',
    sector: 'Medical Devices & Service',
    country: 'Turkey',
    city: 'İzmir',
    problemHypothesis: 'Word-document-based service fault reporting creates friction for hospital biomedical technicians, risking delayed maintenance SLAs and non-standardized audit logs.',
    evidenceStrength: 'medium',
    uncertaintyNotes: 'Word form download exists on website, but hospital clients might be using alternate direct phone dispatching.',
    tags: ['Service Ticketing', 'Field Maintenance', 'Compliance Logging'],
    status: 'hypothesis',
    score: {
      total: 68,
      evidenceQuality: 18,
      technicalFeasibility: 20,
      economicFit: 17,
      decisionMakerAccess: 13,
      justification: 'Medium evidence strength. Medical compliance regulations create willingness to pay, but requires customer validation regarding field technician workflow.'
    },
    solutionBrief: {
      title: 'Biomedical Field Service & Calibration Compliance Portal',
      overview: 'Digital service request and mobile calibration report generator meeting ISO 13485 audit standards with digital technician sign-off.',
      proposedFlow: 'Hospital technician scans device QR → Submits fault description → Field engineer dispatched with checklist → PDF calibration certificate generated automatically.',
      riskAnalysis: 'High regulatory strictness; calibration report formats must strictly comply with regional health directorate standards.'
    },
    outreachDraft: {
      subject: 'Ege Biyomedikal teknik servis ve cihaz kalibrasyon süreçleri',
      body: 'Sayın Yetkili,\n\nKamuya açık servis talep formunuzu inceledik. Hastane ve klinik müşterilerinizin cihaz arıza bildirimlerini ve periyodik kalibrasyon kayıtlarını dijitalleştiren kavramsal akışımızı paylaşmak isteriz.\n\nSaygılarımızla,\n[Adınız]',
      isApproved: false,
    },
    createdAt: '2026-11-23T11:00:00Z',
    updatedAt: '2026-11-23T11:00:00Z',
    isDemoFixture: true,
  },
  {
    id: 'opp_demo_04',
    companyId: 'comp_demo_04',
    companyName: '[DEMO FIXTURE] Nordic Freightline GmbH',
    sector: 'Logistics & Intermodal Freight',
    country: 'Germany',
    city: 'Hamburg',
    problemHypothesis: 'Manual data re-entry from commercial PDF invoices into ATLAS customs declaration system causes clearance backlogs at port terminal.',
    evidenceStrength: 'high',
    uncertaintyNotes: 'Public job listing explicitly calls out manual PDF processing for customs clerks.',
    tags: ['Customs Automation', 'EDI Integration', 'Document OCR'],
    status: 'scored',
    score: {
      total: 79,
      evidenceQuality: 25,
      technicalFeasibility: 21,
      economicFit: 21,
      decisionMakerAccess: 12,
      justification: 'High economic value due to European logistics labor costs, but cross-border outreach requires German-language pitch.'
    },
    solutionBrief: {
      title: 'Automated Commercial Invoice to ATLAS XML Converter',
      overview: 'Secure OCR extraction service mapping multimodal bill of lading and commercial invoices directly into compliant customs declaration schema.',
      proposedFlow: 'PDF Dropped into folder → AI Extractor validates HS Codes & VAT → XML generated for customs broker validation.',
      riskAnalysis: 'Customs compliance fines for wrong HS classification; requires human validation gate before official filing.'
    },
    outreachDraft: {
      subject: 'Automating commercial invoice data intake for Nordic Freightline',
      body: 'Dear Operations Team,\n\nWe observed your recent search for customs administrative specialists. We developed a visual workflow blueprint showing how commercial freight invoices can be parsed into structured EDI formats with zero manual transcription.\n\nBest regards,\n[Your Name / Nexus Intelligence]',
      isApproved: false,
    },
    createdAt: '2026-11-18T16:00:00Z',
    updatedAt: '2026-11-22T09:30:00Z',
    isDemoFixture: true,
  }
];
