import { DocumentMetadata } from '../types/document';

export const SAMPLE_DOCUMENTS: DocumentMetadata[] = [
  {
    id: 'doc-saas-msa',
    title: 'Enterprise Master Services Agreement & SLA',
    subtitle: 'Contract Ref: MSA-2026-X9 · Cloud Platform Services',
    fileType: 'contract',
    category: 'Legal',
    totalPages: 5,
    totalChunks: 10,
    totalWords: 3480,
    uploadedAt: '2026-10-01',
    isSample: true,
    rawText: `ENTERPRISE MASTER SERVICES AGREEMENT AND SERVICE LEVEL COMMITMENT
Document Identification: MSA-2026-X9
Parties: StrataCloud Systems Inc. ("Vendor") and Apex Global Enterprises LLC ("Client")
Effective Date: October 1, 2026

[Page 1, Section 1: Recitals & Scope of Services]
Vendor provides enterprise cloud infrastructure, managed API orchestration, and containerized deployment services ("Services") as specified in associated Statements of Work (SOW). Client agrees to license and access the platform strictly subject to the terms, limitations, and operational guarantees set forth herein. All authorized affiliates of Client may access the Services provided that Client remains fully and primarily liable for affiliate compliance with this Agreement.

[Page 1, Section 2: Subscription Terms & License Grant]
Vendor grants Client a non-exclusive, non-transferable, worldwide commercial license to access and utilize the Services during the Term. User seats are provisioned on a named-credential basis. Sharing user credentials outside Client’s authenticated SSO domain is strictly prohibited. Client retains sole ownership of all raw data, customer files, and analytical payloads processed by the platform. Vendor shall not utilize Client data for training generalized third-party machine learning models without express written authorization.

[Page 2, Section 3: Service Level Agreement (SLA) & Uptime Credits]
Section 3.1: Service Availability Commitment. Vendor guarantees that the Core Production Infrastructure shall maintain a monthly Service Availability of not less than 99.90% (the "SLA Target"), calculated over each calendar month, excluding Scheduled Maintenance Windows.
Section 3.2: Scheduled Maintenance. Vendor may conduct routine maintenance between 01:00 UTC and 05:00 UTC on Sundays, provided written notice is issued to Client’s designated technical operations team at least five (5) business days in advance.
Section 3.3: Service Credit Schedule. In the event Vendor fails to maintain the SLA Target in any billing month, Client shall be entitled to receive service credits applied against the subsequent monthly invoice:
- Monthly Availability between 99.50% and 99.89%: 10% credit of monthly platform base fee.
- Monthly Availability between 99.00% and 99.49%: 25% credit of monthly platform base fee.
- Monthly Availability below 99.00%: 50% credit of monthly platform base fee.
Section 3.4: Claim Procedure. To claim a service credit, Client must submit a formal written notice with system logs to Vendor’s Support Desk within thirty (30) calendar days following the conclusion of the affected calendar month. Service credits constitute Client’s sole and exclusive financial remedy for SLA failures, without prejudice to termination rights under Section 10.

[Page 2, Section 4: Data Security, Encryption & Incident Response]
Section 4.1: Security Standards. Vendor shall maintain SOC 2 Type II certification, ISO/IEC 27001 compliance, and enforce AES-256 encryption for data at rest and TLS 1.3 for data in transit across all public and internal service backbones.
Section 4.2: Vulnerability Audits. Vendor shall conduct annual third-party penetration testing and provide an executive summary of the SOC 2 Type II report to Client within sixty (60) days of each calendar year end.
Section 4.3: Security Breach Notification. Vendor shall notify Client in writing without undue delay, and in any event within twenty-four (24) hours, upon confirming any unauthorized access, exfiltration, or breach impacting Client confidential information. Vendor shall bear all direct costs related to incident remediation and statutory consumer notifications mandated by applicable data privacy regulations (including GDPR and CCPA/CPRA).

[Page 3, Section 5: Payment Terms, Fees & Disputed Charges]
Section 5.1: Billing Schedule. Vendor shall invoice Client on a monthly recurring basis for base tier infrastructure plus variable API compute metrics. Invoices are payable within Net thirty (30) days from invoice receipt date.
Section 5.2: Late Payment Surcharge. Undisputed overdue balances shall accrue interest at the rate of 1.5% per month or the maximum statutory rate permitted by Delaware state law, whichever is less.
Section 5.3: Disputed Billing. Client must register any billing discrepancy or disputed line item in writing within fifteen (15) calendar days of receipt. The parties shall negotiate disputed amounts in good faith while undisputed sums remain payable when due.

[Page 3, Section 6: Confidentiality & Non-Disclosure]
Section 6.1: Protection Standard. Each party agrees to safeguard the other party’s proprietary source code, operational architecture, financial metrics, and customer identities with at least the degree of care it exercises with its own trade secrets, never less than reasonable commercial care.
Section 6.2: Survival Period. The confidentiality covenants herein shall survive termination of this Agreement for a term of five (5) years; provided, however, that trade secrets, proprietary platform architectures, and sensitive customer data shall remain confidential in perpetuity.

[Page 4, Section 7: Warranties & Operational Disclaimers]
Vendor warrants that the Services will function materially in accordance with published API documentation. EXCEPT AS EXPRESSLY PROVIDED IN THIS SECTION 7, VENDOR DISCLAIMS ALL OTHER WARRANTIES, EXPRESS OR IMPLIED, INCLUDING WARRANTIES OF MERCHANTABILITY OR FITNESS FOR A PARTICULAR PURPOSE.

[Page 4, Section 8: Limitation of Liability & Exclusions]
Section 8.1: Aggregate Liability Cap. EXCEPT FOR INDEMNIFICATION LIABILITIES UNDER SECTION 9, GROSS NEGLIGENCE, WILLFUL MISCONDUCT, OR INTENTIONAL BREACH OF SECTION 4 (DATA SECURITY), NEITHER PARTY’S TOTAL AGGREGATE LIABILITY ARISING OUT OF OR RELATED TO THIS AGREEMENT SHALL EXCEED FIVE MILLION UNITED STATES DOLLARS ($5,000,000.00).
Section 8.2: Consequential Damages Waiver. Under no circumstances shall either party be liable to the other for indirect, special, incidental, punitive, or consequential damages, including loss of profits, loss of anticipated revenue, or business interruption.
Section 8.3: Insurance Maintenance. Vendor shall maintain Commercial General Liability insurance of not less than $5,000,000 aggregate, Cyber Liability and Data Breach insurance of not less than $10,000,000 per claim, and provide Client an ACORD-25 certificate naming Client as additional insured within ten (10) business days of signing.

[Page 5, Section 9: Mutual Intellectual Property Indemnification]
Vendor shall defend, indemnify, and hold harmless Client, its officers, directors, and employees against any third-party claim, suit, or proceeding alleging that Client’s authorized use of the Services infringes or misappropriates any valid United States patent, copyright, or trademark. Client must provide Vendor prompt written notice within ten (10) days of receiving any such claim and grant Vendor sole authority to defend or settle such action.

[Page 5, Section 10: Term, Renewal & Termination]
Section 10.1: Term. The initial term of this Agreement shall be thirty-six (36) months commencing on the Effective Date (October 1, 2026), automatically renewing for successive twelve (12) month periods unless either party delivers written notice of non-renewal at least sixty (60) days prior to the expiration of the then-current term.
Section 10.2: Termination for Convenience. Client may terminate this Agreement without cause at any time by giving sixty (60) calendar days prior written notice to Vendor, provided that all accrued platform usage fees through the effective date of termination are settled in full.
Section 10.3: Termination for Cause. Either party may terminate immediately if the other party breaches any material term and fails to cure such breach within thirty (30) days of receiving formal written notice specifying the failure. In the event of repeated SLA failure below 99.00% for three (3) consecutive months, Client may terminate without penalty.`,
    chunks: [
      {
        id: 'saas-c1',
        page: 1,
        section: 'Section 1: Recitals & Scope',
        tokenCount: 168,
        charCount: 650,
        text: 'Vendor provides enterprise cloud infrastructure, managed API orchestration, and containerized deployment services ("Services") as specified in associated Statements of Work (SOW). Client agrees to license and access the platform strictly subject to the terms, limitations, and operational guarantees set forth herein. All authorized affiliates of Client may access the Services provided that Client remains fully and primarily liable for affiliate compliance with this Agreement.'
      },
      {
        id: 'saas-c2',
        page: 1,
        section: 'Section 2: Subscription Terms & License Grant',
        tokenCount: 185,
        charCount: 720,
        text: 'Vendor grants Client a non-exclusive, non-transferable, worldwide commercial license to access and utilize the Services during the Term. User seats are provisioned on a named-credential basis. Sharing user credentials outside Client’s authenticated SSO domain is strictly prohibited. Client retains sole ownership of all raw data, customer files, and analytical payloads processed by the platform. Vendor shall not utilize Client data for training generalized third-party machine learning models without express written authorization.'
      },
      {
        id: 'saas-c3',
        page: 2,
        section: 'Section 3.1 - 3.2: Service Level Agreement (SLA) & Uptime Target',
        tokenCount: 195,
        charCount: 780,
        text: 'Section 3.1: Service Availability Commitment. Vendor guarantees that the Core Production Infrastructure shall maintain a monthly Service Availability of not less than 99.90% (the "SLA Target"), calculated over each calendar month, excluding Scheduled Maintenance Windows. Section 3.2: Scheduled Maintenance. Vendor may conduct routine maintenance between 01:00 UTC and 05:00 UTC on Sundays, provided written notice is issued to Client’s designated technical operations team at least five (5) business days in advance.'
      },
      {
        id: 'saas-c4',
        page: 2,
        section: 'Section 3.3 - 3.4: SLA Service Credits & Claim Procedures',
        tokenCount: 220,
        charCount: 885,
        text: 'Section 3.3: Service Credit Schedule. In the event Vendor fails to maintain the SLA Target in any billing month, Client shall be entitled to receive service credits applied against the subsequent monthly invoice: Monthly Availability between 99.50% and 99.89%: 10% credit; Monthly Availability between 99.00% and 99.49%: 25% credit; Monthly Availability below 99.00%: 50% credit. Section 3.4: Claim Procedure. To claim a service credit, Client must submit a formal written notice with system logs to Vendor’s Support Desk within thirty (30) calendar days following the conclusion of the affected calendar month.'
      },
      {
        id: 'saas-c5',
        page: 2,
        section: 'Section 4: Data Security, Encryption & Breach Notification',
        tokenCount: 235,
        charCount: 940,
        text: 'Section 4.1: Security Standards. Vendor shall maintain SOC 2 Type II certification, ISO/IEC 27001 compliance, and enforce AES-256 encryption for data at rest and TLS 1.3 for data in transit. Section 4.2: Vulnerability Audits. Vendor shall conduct annual third-party penetration testing and provide an executive summary of SOC 2 Type II report to Client within 60 days of year end. Section 4.3: Security Breach Notification. Vendor shall notify Client in writing without undue delay, and in any event within 24 hours, upon confirming any unauthorized access or breach impacting Client confidential information. Vendor bears direct costs related to incident remediation.'
      },
      {
        id: 'saas-c6',
        page: 3,
        section: 'Section 5: Payment Terms, Fees & Disputed Charges',
        tokenCount: 180,
        charCount: 710,
        text: 'Section 5.1: Billing Schedule. Vendor shall invoice Client on a monthly recurring basis for base tier infrastructure plus variable compute metrics. Invoices are payable within Net thirty (30) days from invoice receipt date. Section 5.2: Late Payment Surcharge. Undisputed overdue balances shall accrue interest at 1.5% per month or maximum statutory rate. Section 5.3: Disputed Billing. Client must register any billing discrepancy in writing within 15 calendar days of receipt.'
      },
      {
        id: 'saas-c7',
        page: 3,
        section: 'Section 6: Confidentiality & Perpetual Trade Secrets',
        tokenCount: 160,
        charCount: 640,
        text: 'Section 6.1: Protection Standard. Each party agrees to safeguard the other party’s proprietary source code, operational architecture, financial metrics, and customer identities with at least the degree of care it exercises with its own trade secrets. Section 6.2: Survival Period. The confidentiality covenants herein shall survive termination of this Agreement for five (5) years; provided, however, that trade secrets and proprietary architectures remain confidential in perpetuity.'
      },
      {
        id: 'saas-c8',
        page: 4,
        section: 'Section 8: Limitation of Liability ($5M Cap) & Insurance',
        tokenCount: 240,
        charCount: 960,
        text: 'Section 8.1: Aggregate Liability Cap. EXCEPT FOR INDEMNIFICATION LIABILITIES UNDER SECTION 9, GROSS NEGLIGENCE, WILLFUL MISCONDUCT, OR INTENTIONAL BREACH OF SECTION 4 (DATA SECURITY), NEITHER PARTY’S TOTAL AGGREGATE LIABILITY ARISING OUT OF OR RELATED TO THIS AGREEMENT SHALL EXCEED FIVE MILLION UNITED STATES DOLLARS ($5,000,000.00). Section 8.2: Consequential Damages Waiver. Under no circumstances shall either party be liable for indirect, special, incidental, punitive, or consequential damages. Section 8.3: Insurance Maintenance. Vendor shall maintain $5,000,000 CGL insurance and $10,000,000 Cyber Liability insurance.'
      },
      {
        id: 'saas-c9',
        page: 5,
        section: 'Section 9: Intellectual Property Indemnification',
        tokenCount: 175,
        charCount: 690,
        text: 'Vendor shall defend, indemnify, and hold harmless Client, its officers, directors, and employees against any third-party claim, suit, or proceeding alleging that Client’s authorized use of the Services infringes or misappropriates any valid United States patent, copyright, or trademark. Client must provide Vendor prompt written notice within ten (10) days of receiving any such claim and grant Vendor sole authority to defend or settle such action.'
      },
      {
        id: 'saas-c10',
        page: 5,
        section: 'Section 10: Term, Termination for Convenience & SLA Default',
        tokenCount: 215,
        charCount: 860,
        text: 'Section 10.1: Term. The initial term is thirty-six (36) months commencing October 1, 2026, automatically renewing for successive 12-month periods unless written notice of non-renewal is delivered at least sixty (60) days prior. Section 10.2: Termination for Convenience. Client may terminate without cause at any time by giving sixty (60) calendar days prior written notice. Section 10.3: Termination for Cause. 30-day cure window for material breach. In the event of repeated SLA failure below 99.00% for three (3) consecutive months, Client may terminate without penalty.'
      }
    ],
    extraction: {
      summary: '36-month Enterprise SaaS agreement granting non-exclusive cloud platform licenses with a 99.9% uptime SLA, stringent SOC 2 and 24-hour breach notification standards, and a mutual $5,000,000 liability ceiling.',
      documentType: 'Master Services Agreement & SLA',
      scope: 'Global Commercial SaaS (Governing Law: Delaware)',
      watchouts: [
        {
          title: 'Uncapped Liability Exclusions',
          description: 'The $5M liability ceiling does not apply to gross negligence, willful misconduct, data security breaches, or IP indemnification.',
          severity: 'critical',
          section: 'Section 8.1',
          page: 4
        },
        {
          title: 'Strict 30-Day SLA Credit Claim Window',
          description: 'SLA uptime credits are permanently forfeited if Client fails to submit formal logs within 30 calendar days of month-end.',
          severity: 'high',
          section: 'Section 3.4',
          page: 2
        },
        {
          title: 'Immediate 24-Hour Breach Notification',
          description: 'Vendor must formally notify Client within 24 hours of confirming unauthorized data access or security incidents.',
          severity: 'high',
          section: 'Section 4.3',
          page: 2
        },
        {
          title: 'Perpetual Trade Secret Survival',
          description: 'Confidentiality obligations survive for 5 years generally, but proprietary architecture and trade secrets remain protected in perpetuity.',
          severity: 'medium',
          section: 'Section 6.2',
          page: 3
        }
      ],
      keyDates: [
        {
          event: 'Effective Date & Initial 36-Month Term Start',
          date: 'October 1, 2026',
          type: 'effective',
          description: 'Contract takes full legal effect across all authorized affiliates.',
          section: 'Section 10.1',
          page: 5,
          isCritical: true
        },
        {
          event: 'Non-Renewal Written Notice Window',
          date: '60 Days Before Expiration (August 2, 2029)',
          type: 'renewal',
          description: 'Notice required to stop automatic 12-month renewal roll-over.',
          section: 'Section 10.1',
          page: 5,
          isCritical: true
        },
        {
          event: 'Annual SOC 2 Type II Report Delivery',
          date: 'Within 60 Days of Calendar Year-End (March 1)',
          type: 'audit',
          description: 'Vendor must supply third-party auditor security attestation.',
          section: 'Section 4.2',
          page: 2,
          isCritical: false
        },
        {
          event: 'Billing Discrepancy Dispute Window',
          date: 'Within 15 Days of Invoice Receipt',
          type: 'deadline',
          description: 'Client must formally notify Vendor of disputed invoice items.',
          section: 'Section 5.3',
          page: 3,
          isCritical: false
        }
      ],
      actionItems: [
        {
          id: 'saas-act-1',
          title: 'Collect ACORD-25 Certificate of Insurance',
          description: 'Ensure Vendor provides proof of $5M CGL and $10M Cyber Liability naming Client as additional insured.',
          assigneeRole: 'Legal & Risk Ops',
          priority: 'urgent',
          dueDateSuggestion: 'Within 10 Days of Signing',
          section: 'Section 8.3',
          page: 4,
          status: 'pending'
        },
        {
          id: 'saas-act-2',
          title: 'Establish 99.9% Uptime Logging Telemetry',
          description: 'Configure automated synthetic monitors to track monthly uptime and flag <99.89% degradation within the 30-day credit window.',
          assigneeRole: 'Cloud Infrastructure Lead',
          priority: 'high',
          dueDateSuggestion: 'Launch Day - Oct 1, 2026',
          section: 'Section 3.1 - 3.4',
          page: 2,
          status: 'pending'
        },
        {
          id: 'saas-act-3',
          title: 'Audit SSO Credential Sharing Safeguards',
          description: 'Verify all user accounts map to authenticated internal corporate SSO to prevent unauthorized credential sharing.',
          assigneeRole: 'InfoSec / IAM Team',
          priority: 'medium',
          dueDateSuggestion: 'Oct 15, 2026',
          section: 'Section 2',
          page: 1,
          status: 'in_progress'
        },
        {
          id: 'saas-act-4',
          title: 'Review 24-Hour Breach Escalation Runbook',
          description: 'Ensure vendor emergency contact distribution list is integrated into corporate Incident Command System.',
          assigneeRole: 'Security Operations Center',
          priority: 'high',
          dueDateSuggestion: 'Oct 7, 2026',
          section: 'Section 4.3',
          page: 2,
          status: 'completed'
        }
      ],
      keyMetrics: [
        {
          metric: 'Aggregate Liability Ceiling',
          value: '$5,000,000',
          category: 'liability',
          notes: 'Excludes gross negligence, data security breach, and IP indemnity',
          section: 'Section 8.1',
          page: 4
        },
        {
          metric: 'Core Service Availability SLA',
          value: '99.90%',
          category: 'sla',
          notes: 'Excludes Sunday 01:00-05:00 UTC maintenance windows',
          section: 'Section 3.1',
          page: 2
        },
        {
          metric: 'Maximum SLA Service Credit',
          value: '50% Monthly Fee',
          category: 'sla',
          notes: 'Triggered when monthly uptime falls below 99.00%',
          section: 'Section 3.3',
          page: 2
        },
        {
          metric: 'Security Incident Notification SLA',
          value: '24 Hours',
          category: 'compliance',
          notes: 'Mandatory written notice upon confirmed breach',
          section: 'Section 4.3',
          page: 2
        },
        {
          metric: 'Payment Settlement Terms',
          value: 'Net 30 Days',
          category: 'financial',
          notes: '1.5% monthly late fee applies to delinquent undisputed amounts',
          section: 'Section 5.1',
          page: 3
        }
      ],
      suggestedQueries: [
        {
          query: 'What is the liability cap under Section 8 and what specific claims are uncapped?',
          category: 'grounded',
          rationale: 'Tests deep multi-clause retrieval and extraction of high-stakes legal exclusions.'
        },
        {
          query: 'What service credits are awarded if uptime drops to 99.2% and what is the deadline to claim them?',
          category: 'grounded',
          rationale: 'Validates exact numeric reasoning and procedural rule retrieval.'
        },
        {
          query: 'What is the refund policy or money-back guarantee for unused annual prepaid fees?',
          category: 'hallucination_test',
          rationale: 'FALLBACK TEST: The MSA has no refund policy, testing that the LLM explicitly returns "I cannot find that information in the document."'
        },
        {
          query: 'What are the termination for convenience terms and required advance notice?',
          category: 'commercial',
          rationale: 'Evaluates business exit rights and notice windows.'
        }
      ]
    }
  },
  {
    id: 'doc-cre-lease',
    title: 'Commercial Real Estate Master Lease',
    subtitle: 'Building Ref: CRE-Metro-704 · Triple Net (NNN) Office Lease',
    fileType: 'contract',
    category: 'Real Estate',
    totalPages: 5,
    totalChunks: 8,
    totalWords: 2950,
    uploadedAt: '2026-09-18',
    isSample: true,
    rawText: `COMMERCIAL REAL ESTATE MASTER LEASE AGREEMENT
Premises: Suite 1400, Metro Tower, 450 Commerce Boulevard, Chicago, Illinois
Landlord: Metro Real Estate Holdings LP
Tenant: Horizon Biopharma Technologies Inc.
Lease Term: Ten (10) Years (120 Months)
Commencement Date: November 1, 2026

[Page 1, Section 1: Demised Premises & Lease Term]
Landlord leases to Tenant, and Tenant hires from Landlord, approximately 24,000 usable square feet comprising the entire fourteenth (14th) floor of Metro Tower. The Initial Term shall be one hundred twenty (120) calendar months beginning on November 1, 2026 and expiring October 31, 2036, unless sooner terminated or extended pursuant to Tenant's single five (5) year Renewal Option under Section 11.

[Page 1, Section 2: Base Rent & Annual Compounding Escalations]
Section 2.1: Initial Base Rent. Tenant shall pay Base Rent at an initial rate of Forty-Two Dollars and Fifty Cents ($42.50) per square foot annually, payable in equal monthly installments of Eighty-Five Thousand Dollars ($85,000.00) on or before the first (1st) day of each calendar month.
Section 2.2: Escalations. On each anniversary of the Commencement Date, Base Rent shall escalate by three percent (3.0%) over the prior year's rate compounded annually.

[Page 2, Section 3: Triple Net (NNN) Common Area Maintenance (CAM) & Taxes]
Tenant shall pay its proportionate share (calculated at 11.8% of the rentable building area) of all Real Estate Taxes, Special Municipal Assessments, Building Hazard Insurance, and Operating Expenses (including common lobby utilities, security, and central mechanical upkeep). Operating expense reconciliations shall be delivered by Landlord within ninety (90) days of the close of each fiscal year.

[Page 2, Section 4: Security Deposit & Letter of Credit]
Upon signing, Tenant shall deliver an unconditional, irrevocable standby Letter of Credit in the sum of One Hundred Fifty Thousand Dollars ($150,000.00) issued by an FDIC-insured national bank, naming Landlord as beneficiary. If Tenant maintains zero defaults for thirty-six (36) consecutive months, the Letter of Credit requirement shall decrease to One Hundred Thousand Dollars ($100,000.00).

[Page 3, Section 5: Permitted Commercial Use & Structural Alterations]
The Premises shall be utilized exclusively for general executive offices, wet laboratory research, and pharmaceutical administrative operations. Tenant shall not perform structural alterations, ceiling modifications, or heavy MEP installations exceeding Twenty-Five Thousand Dollars ($25,000.00) in cost without Landlord’s prior written consent, which shall not be unreasonably withheld.

[Page 3, Section 6: Environmental Indemnity & Hazardous Substances]
Tenant agrees that all biomedical waste, reagents, and biohazard materials shall be transported and incinerated off-site in strict conformity with OSHA and EPA standards. Tenant shall hold Landlord harmless and provide full indemnity against any remediation expenses arising from Tenant’s chemical handling.

[Page 4, Section 7: Required Insurance Coverage]
Tenant must maintain at all times Commercial General Liability insurance of not less than $5,000,000 per occurrence / $10,000,000 general aggregate, Workers' Compensation at statutory limits, and Business Interruption insurance covering at least twelve (12) months of Base Rent. Landlord and Property Manager must be named as additional insureds with 30 days prior written notice of cancellation.

[Page 4, Section 8: Repairs, Maintenance & HVAC Provision]
Landlord shall be responsible for structural foundations, exterior curtain walls, roof membrane, and central elevator cores. Tenant shall maintain interior perimeter walls, dedicated tenant electrical panels, plumbing fixtures within the Suite, and supplementary laboratory cooling units. Standard building HVAC is furnished Monday through Friday 07:00 to 18:00; after-hours HVAC is billed at $95.00 per hour.

[Page 5, Section 9: Subletting, Assignment & Profit Share]
Tenant may not sublet or assign the lease without Landlord’s written consent. In the event of an approved sublease where subtenant rent exceeds Tenant's base rent and CAM share, Tenant shall remit fifty percent (50%) of all net excess sublease profits to Landlord within thirty (30) days of collection.

[Page 5, Section 10: Events of Default, Notice & Cure Periods]
The occurrence of any of the following constitutes an Event of Default:
- Monetary Default: Failure to pay Base Rent or CAM charges within five (5) business days following written notice of delinquency.
- Non-Monetary Default: Failure to cure non-monetary breach within thirty (30) days after written notice.`,
    chunks: [
      {
        id: 'cre-c1',
        page: 1,
        section: 'Section 1: Demised Premises & Lease Term (10 Years)',
        tokenCount: 155,
        charCount: 620,
        text: 'Landlord leases to Tenant, and Tenant hires from Landlord, approximately 24,000 usable square feet comprising the entire fourteenth (14th) floor of Metro Tower. The Initial Term shall be one hundred twenty (120) calendar months beginning on November 1, 2026 and expiring October 31, 2036, unless extended pursuant to Tenant’s single 5-year Renewal Option.'
      },
      {
        id: 'cre-c2',
        page: 1,
        section: 'Section 2: Base Rent ($42.50/sq ft) & 3.0% Annual Escalations',
        tokenCount: 165,
        charCount: 650,
        text: 'Section 2.1: Initial Base Rent. Tenant shall pay Base Rent at an initial rate of $42.50 per square foot annually, payable in monthly installments of $85,000.00 on the 1st day of each month. Section 2.2: Escalations. On each anniversary of Commencement Date, Base Rent escalates by 3.0% compounded annually.'
      },
      {
        id: 'cre-c3',
        page: 2,
        section: 'Section 3: Triple Net (NNN) Operating Expenses & CAM (11.8%)',
        tokenCount: 170,
        charCount: 680,
        text: 'Tenant shall pay its proportionate share (calculated at 11.8% of the rentable building area) of all Real Estate Taxes, Special Municipal Assessments, Building Hazard Insurance, and Operating Expenses. Operating expense reconciliations shall be delivered by Landlord within 90 days of fiscal year close.'
      },
      {
        id: 'cre-c4',
        page: 2,
        section: 'Section 4: Security Deposit & $150k Letter of Credit',
        tokenCount: 160,
        charCount: 640,
        text: 'Upon signing, Tenant shall deliver an unconditional, irrevocable standby Letter of Credit in the sum of $150,000.00 issued by an FDIC-insured national bank. If Tenant maintains zero defaults for 36 consecutive months, the Letter of Credit requirement shall decrease to $100,000.00.'
      },
      {
        id: 'cre-c5',
        page: 3,
        section: 'Section 5 - 6: Permitted Use, Alteration Threshold & Environmental',
        tokenCount: 210,
        charCount: 840,
        text: 'Section 5: The Premises shall be utilized exclusively for executive offices, wet laboratory research, and administrative operations. Alterations exceeding $25,000.00 require Landlord’s prior written consent. Section 6: Environmental Indemnity. All biomedical waste and biohazard materials shall be transported and incinerated off-site under OSHA and EPA standards. Tenant provides full indemnity against chemical remediation expenses.'
      },
      {
        id: 'cre-c6',
        page: 4,
        section: 'Section 7: Required Insurance Coverage ($5M CGL)',
        tokenCount: 175,
        charCount: 710,
        text: 'Tenant must maintain at all times Commercial General Liability insurance of not less than $5,000,000 per occurrence / $10,000,000 general aggregate, Workers\' Compensation at statutory limits, and Business Interruption insurance covering at least twelve (12) months of Base Rent. Landlord must be named as additional insured.'
      },
      {
        id: 'cre-c7',
        page: 4,
        section: 'Section 8: Maintenance & After-Hours HVAC ($95/hr)',
        tokenCount: 160,
        charCount: 630,
        text: 'Landlord maintains structural foundations, exterior curtain walls, and roof. Tenant maintains interior fixtures, dedicated panels, and plumbing within Suite. Standard building HVAC is furnished Monday-Friday 07:00 to 18:00; after-hours HVAC is billed at $95.00 per hour.'
      },
      {
        id: 'cre-c8',
        page: 5,
        section: 'Section 9 - 10: Subleasing Profit Share (50%) & Default Cure Periods',
        tokenCount: 195,
        charCount: 780,
        text: 'Section 9: In the event of an approved sublease, Tenant remits 50% of net excess sublease profits to Landlord within 30 days. Section 10: Events of Default. Monetary Default: Failure to pay Base Rent or CAM charges within 5 business days following written notice. Non-Monetary Default: Failure to cure within 30 days.'
      }
    ],
    extraction: {
      summary: '10-year triple-net (NNN) commercial lease for 24,000 sq ft at $42.50/sq ft with 3% annual rent escalations, $150k letter of credit, 11.8% CAM allocation, and laboratory environmental indemnities.',
      documentType: 'Commercial Real Estate Triple Net (NNN) Lease',
      scope: 'State of Illinois (Cook County Jurisdiction)',
      watchouts: [
        {
          title: 'Tight 5-Day Monetary Default Window',
          description: 'Tenant has only 5 business days from written notice to cure rent or CAM delinquency before Landlord may accelerate remedies.',
          severity: 'critical',
          section: 'Section 10',
          page: 5
        },
        {
          title: '50% Sublease Profit Share Penalty',
          description: 'Any rent collected from subtenants exceeding Tenant’s base rent must be split 50/50 with Landlord.',
          severity: 'high',
          section: 'Section 9',
          page: 5
        },
        {
          title: 'Environmental Biohazard Indemnification',
          description: 'Tenant is strictly liable for hazardous waste transport and indemnifies Landlord against any EPA/OSHA contamination claims.',
          severity: 'high',
          section: 'Section 6',
          page: 3
        },
        {
          title: 'Alteration Approvals Over $25,000',
          description: 'Any MEP or architectural changes over $25,000 require formal Landlord engineering signoff.',
          severity: 'medium',
          section: 'Section 5',
          page: 3
        }
      ],
      keyDates: [
        {
          event: 'Commencement Date',
          date: 'November 1, 2026',
          type: 'effective',
          description: 'Tenant takes possession and monthly base rent obligations commence.',
          section: 'Section 1',
          page: 1,
          isCritical: true
        },
        {
          event: 'Annual 3.0% Rent Escalation Anniversary',
          date: 'Every November 1 (Annual)',
          type: 'renewal',
          description: 'Base rent compounds by 3.0% over prior year rate.',
          section: 'Section 2.2',
          page: 1,
          isCritical: false
        },
        {
          event: 'Security Deposit Burn-Down Threshold',
          date: 'November 1, 2029 (Month 36)',
          type: 'deadline',
          description: 'Letter of credit can be reduced from $150k to $100k if zero defaults occur.',
          section: 'Section 4',
          page: 2,
          isCritical: false
        }
      ],
      actionItems: [
        {
          id: 'cre-act-1',
          title: 'Deliver $150,000 Standby Letter of Credit',
          description: 'Secure LC from FDIC bank naming Metro Real Estate Holdings LP prior to occupancy.',
          assigneeRole: 'Treasurer / Finance Director',
          priority: 'urgent',
          dueDateSuggestion: 'Upon Lease Execution',
          section: 'Section 4',
          page: 2,
          status: 'pending'
        },
        {
          id: 'cre-act-2',
          title: 'Bind $5M Commercial General Liability Policy',
          description: 'Request insurance broker issue COI naming Landlord and Property Manager as additional insureds with 30-day notice of cancellation.',
          assigneeRole: 'Risk Manager',
          priority: 'urgent',
          dueDateSuggestion: 'Prior to Nov 1, 2026',
          section: 'Section 7',
          page: 4,
          status: 'pending'
        },
        {
          id: 'cre-act-3',
          title: 'Establish Biohazard Waste Disposal Contract',
          description: 'Verify certified medical/lab waste hauler has licensed EPA transfer station contracts in place.',
          assigneeRole: 'EHS & Facilities Manager',
          priority: 'high',
          dueDateSuggestion: 'Oct 20, 2026',
          section: 'Section 6',
          page: 3,
          status: 'in_progress'
        }
      ],
      keyMetrics: [
        {
          metric: 'Initial Monthly Base Rent',
          value: '$85,000.00 / month',
          category: 'financial',
          notes: 'Equivalent to $42.50 / sq ft on 24,000 usable sq ft',
          section: 'Section 2.1',
          page: 1
        },
        {
          metric: 'Annual Rent Escalation',
          value: '3.0% Compounded',
          category: 'financial',
          notes: 'Applied every 12 months on November 1',
          section: 'Section 2.2',
          page: 1
        },
        {
          metric: 'Proportionate CAM Share',
          value: '11.8%',
          category: 'financial',
          notes: 'Share of building taxes, insurance, and operating expenses',
          section: 'Section 3',
          page: 2
        },
        {
          metric: 'After-Hours HVAC Rate',
          value: '$95.00 / hour',
          category: 'financial',
          notes: 'Applies outside M-F 07:00-18:00 window',
          section: 'Section 8',
          page: 4
        }
      ],
      suggestedQueries: [
        {
          query: 'What are the default cure periods for non-payment of rent versus non-monetary breaches?',
          category: 'grounded',
          rationale: 'Tests precise identification of time-sensitive legal cure windows.'
        },
        {
          query: 'What is the required Letter of Credit amount and can it ever be reduced?',
          category: 'grounded',
          rationale: 'Validates conditional financial extraction and multi-stage clause reasoning.'
        },
        {
          query: 'Are dogs or pets permitted inside the leased premises?',
          category: 'hallucination_test',
          rationale: 'FALLBACK TEST: The lease contains no pet policy, requiring the LLM to refuse with "I cannot find that information in the document."'
        }
      ]
    }
  },
  {
    id: 'doc-biotech-protocol',
    title: 'Clinical Trial Protocol & IRB Compliance',
    subtitle: 'Study Protocol: CTP-Phase2-Neuro · Investigational Drug NP-409',
    fileType: 'pdf',
    category: 'Clinical & Healthcare',
    totalPages: 5,
    totalChunks: 8,
    totalWords: 3120,
    uploadedAt: '2026-08-30',
    isSample: true,
    rawText: `CLINICAL STUDY PROTOCOL & REGULATORY COMPLIANCE DIRECTIVE
Protocol Identifier: CTP-Phase2-Neuro
Investigational Product: NP-409 (Oral Microglial Modulator)
Phase: Phase II Randomized, Double-Blind, Placebo-Controlled Trial
IND Number: 184,209 · Sponsor: NeuraVance Therapeutics Inc.

[Page 1, Section 1: Protocol Synopsis & Primary Efficacy Endpoints]
This multi-center, double-blind study evaluates the safety, tolerability, and cognitive stabilization efficacy of NP-409 (50mg twice daily) versus matched placebo in 240 randomized adult subjects. The primary efficacy endpoint is the change from baseline in the ADAS-Cog13 score at Week 24. Key secondary endpoints include CSF biomarker neurofilament light chain (NfL) levels and volumetric MRI hippocampal preservation.

[Page 1, Section 2: Patient Eligibility & Exclusion Criteria]
Section 2.1: Inclusion Criteria. Enrolled participants must be aged 18 to 65 years inclusive, possess a documented clinical diagnosis of mild-to-moderate neuroinflammatory decline, with baseline Mini-Mental State Examination (MMSE) scores between 18 and 26.
Section 2.2: Exclusion Criteria. Subjects with active systemic malignancy, severe hepatic impairment (AST/ALT > 3x ULN), known substance dependence within 12 months, or concurrent participation in another interventional clinical trial within thirty (30) days are strictly excluded.

[Page 2, Section 3: Randomization, Dosing & Blinding Procedures]
Eligible subjects are allocated 1:1 to active NP-409 or matched placebo via centralized Interactive Voice/Web Response System (IXRS). To maintain blinding, active and placebo capsules are identical in shape, size, color, weight, and taste. Emergency unblinding is authorized solely in medical emergencies where patient management requires knowledge of the investigational assignment; unblinding must be reported to the Sponsor Medical Monitor within two (2) hours.

[Page 2, Section 4: Adverse Event Reporting & 24-Hour SAE Mandate]
Section 4.1: Adverse Event (AE) Definition. Any untoward medical occurrence in a patient administered the product, regardless of causal relationship.
Section 4.2: Serious Adverse Event (SAE) Reporting. Any event resulting in death, inpatient hospitalization, persistent disability, or congenital anomaly must be reported to the Sponsor Safety Desk within twenty-four (24) hours of site awareness, accompanied by preliminary MedDRA coding and causality assessment.

[Page 3, Section 5: Institutional Review Board (IRB) Oversight & Protocol Amendments]
Section 5.1: Initial Approval. No patient screening or dosing shall occur without written, dated approval from an accredited Institutional Review Board (IRB/IEC).
Section 5.2: Annual Review. The Principal Investigator must submit an annual progress report to the IRB thirty (30) days prior to protocol anniversary.
Section 5.3: Amendments. Substantive amendments altering sample size, primary endpoints, or patient risk profiles require formal IRB written authorization prior to field implementation, except where immediate safety threats necessitate divergence.

[Page 3, Section 6: Informed Consent Tracking & HIPAA Data Privacy]
All subjects or their legally authorized representatives must execute a written, IRB-approved Informed Consent Form (ICF) compliant with ICH GCP E6(R2) and 21 CFR Part 50. Re-consent is mandatory within fourteen (14) days whenever a protocol amendment introduces new safety risks or altered dosage schedules. Personal health identifiers (PHI) must be pseudonymized using 8-character alphanumeric subject identification codes.

[Page 4, Section 7: Data Safety Monitoring Board (DSMB) & Interim Stopping Rules]
An independent Data Safety Monitoring Board (DSMB) consisting of two neurologists, an immunologist, and a senior biostatistician will convene quarterly. Formal interim efficacy and futility analyses will be conducted after 120 subjects complete 12 weeks of treatment. A Haybittle-Peto boundary (p < 0.001) will govern early termination for superior efficacy, while conditional power < 20% will trigger termination for futility.

[Page 4, Section 8: Investigational Product Storage (-80°C) & Chain of Custody]
NP-409 capsules must be stored in secure, restricted-access pharmaceutical refrigeration units maintained at -80°C ± 5°C with continuous calibrated temperature logging. Temperature excursions above -70°C lasting greater than two (2) hours require immediate product quarantine and written consultation with the Sponsor Chemistry, Manufacturing, and Controls (CMC) director.

[Page 5, Section 9: Regulatory Inspection & Audit Readiness]
The Principal Investigator agrees to maintain all original electronic Case Report Forms (eCRFs), source documents, temperature logs, and regulatory binder records for a minimum of twenty-five (25) years post-study close, or until formal written release is issued by Sponsor Regulatory Affairs.

[Page 5, Section 10: Publication Rights & Scientific Disclosures]
All clinical trial data generated hereunder are the exclusive proprietary property of the Sponsor. Primary trial outcomes will be submitted for peer-reviewed publication within twelve (12) months of study unblinding. Individual investigator site disclosures are subject to a ninety (90) day Sponsor review embargo.`,
    chunks: [
      {
        id: 'bio-c1',
        page: 1,
        section: 'Section 1: Protocol Synopsis & Primary Endpoints',
        tokenCount: 165,
        charCount: 660,
        text: 'This multi-center, double-blind study evaluates the safety, tolerability, and cognitive stabilization efficacy of NP-409 (50mg twice daily) versus matched placebo in 240 randomized adult subjects. The primary efficacy endpoint is the change from baseline in ADAS-Cog13 score at Week 24. Key secondary endpoints include CSF biomarker neurofilament light chain (NfL) levels and volumetric MRI hippocampal preservation.'
      },
      {
        id: 'bio-c2',
        page: 1,
        section: 'Section 2: Patient Inclusion (18-65) & Strict Exclusion Criteria',
        tokenCount: 175,
        charCount: 710,
        text: 'Section 2.1: Inclusion Criteria. Enrolled participants must be aged 18 to 65 years inclusive, possess a documented clinical diagnosis of mild-to-moderate neuroinflammatory decline, with baseline MMSE scores between 18 and 26. Section 2.2: Exclusion Criteria. Subjects with active systemic malignancy, severe hepatic impairment (AST/ALT > 3x ULN), substance dependence within 12 months, or concurrent trial participation are strictly excluded.'
      },
      {
        id: 'bio-c3',
        page: 2,
        section: 'Section 3: Blinding & Emergency 2-Hour Unblinding',
        tokenCount: 160,
        charCount: 650,
        text: 'Eligible subjects are allocated 1:1 to active NP-409 or matched placebo via centralized IXRS. Active and placebo capsules are identical in shape, size, color, weight, and taste. Emergency unblinding is authorized solely in medical emergencies; unblinding must be reported to the Sponsor Medical Monitor within two (2) hours.'
      },
      {
        id: 'bio-c4',
        page: 2,
        section: 'Section 4: Serious Adverse Event (SAE) 24-Hour Reporting Mandate',
        tokenCount: 170,
        charCount: 690,
        text: 'Section 4.1: Adverse Event Definition. Any untoward medical occurrence in a patient. Section 4.2: Serious Adverse Event (SAE) Reporting. Any event resulting in death, inpatient hospitalization, persistent disability, or congenital anomaly must be reported to the Sponsor Safety Desk within twenty-four (24) hours of site awareness, accompanied by MedDRA coding.'
      },
      {
        id: 'bio-c5',
        page: 3,
        section: 'Section 5 - 6: IRB Oversight, 14-Day Re-Consent & HIPAA',
        tokenCount: 215,
        charCount: 880,
        text: 'Section 5: No patient screening or dosing shall occur without written IRB approval. Annual progress reports must be submitted 30 days prior to protocol anniversary. Amendments altering patient risk require formal IRB authorization. Section 6: Informed Consent & HIPAA. Written ICF compliant with ICH GCP E6(R2) required. Re-consent mandatory within 14 days of any risk-altering amendment. PHI must be pseudonymized.'
      },
      {
        id: 'bio-c6',
        page: 4,
        section: 'Section 7: DSMB Charter & Interim Stopping Rules',
        tokenCount: 180,
        charCount: 730,
        text: 'An independent Data Safety Monitoring Board (DSMB) consisting of two neurologists, an immunologist, and a senior biostatistician convenes quarterly. Formal interim efficacy and futility analyses will be conducted after 120 subjects complete 12 weeks. Haybittle-Peto boundary (p < 0.001) governs early stopping for superior efficacy.'
      },
      {
        id: 'bio-c7',
        page: 4,
        section: 'Section 8: Investigational Product Storage (-80°C) & Chain of Custody',
        tokenCount: 175,
        charCount: 710,
        text: 'NP-409 capsules must be stored in secure pharmaceutical refrigeration units maintained at -80°C ± 5°C with continuous calibrated temperature logging. Temperature excursions above -70°C lasting greater than two (2) hours require immediate product quarantine and written consultation with the Sponsor CMC director.'
      },
      {
        id: 'bio-c8',
        page: 5,
        section: 'Section 9 - 10: 25-Year Record Retention & 90-Day Publication Embargo',
        tokenCount: 175,
        charCount: 710,
        text: 'Section 9: PI agrees to maintain all original electronic Case Report Forms (eCRFs), source documents, and logs for a minimum of twenty-five (25) years post-study close. Section 10: Publication Rights. Primary trial outcomes submitted within 12 months of unblinding. Site disclosures subject to 90-day review embargo.'
      }
    ],
    extraction: {
      summary: 'Phase II randomized, double-blind clinical protocol (240 subjects) evaluating investigational oral microglial modulator NP-409, with strict 24-hour SAE regulatory reporting, -80°C cold-chain storage, and 25-year audit trail retention.',
      documentType: 'Clinical Trial Protocol & Regulatory Directive',
      scope: 'US FDA IND 184,209 / ICH GCP E6(R2)',
      watchouts: [
        {
          title: 'Mandatory 24-Hour SAE Reporting Window',
          description: 'Any serious adverse event (hospitalization, death, disability) must be submitted to the Sponsor Safety Desk within 24 hours of site awareness.',
          severity: 'critical',
          section: 'Section 4.2',
          page: 2
        },
        {
          title: 'Immediate 2-Hour Medical Unblinding Notice',
          description: 'Emergency code breaks must be communicated to the Sponsor Medical Monitor within 2 hours of occurrence.',
          severity: 'critical',
          section: 'Section 3',
          page: 2
        },
        {
          title: '-80°C Cold Chain Excursion Quarantine',
          description: 'Any excursion above -70°C exceeding 2 hours requires mandatory product quarantine and CMC review.',
          severity: 'high',
          section: 'Section 8',
          page: 4
        },
        {
          title: '14-Day Mandatory Patient Re-Consent',
          description: 'When protocol safety amendments occur, all active subjects must be re-consented within 14 calendar days.',
          severity: 'high',
          section: 'Section 6',
          page: 3
        }
      ],
      keyDates: [
        {
          event: 'Primary Endpoint Assessment Milestone',
          date: 'Week 24 Post-Randomization',
          type: 'deadline',
          description: 'ADAS-Cog13 score change and biomarker sample extraction.',
          section: 'Section 1',
          page: 1,
          isCritical: true
        },
        {
          event: 'Interim DSMB Futility/Efficacy Analysis',
          date: 'Upon 120 Subjects Completing Week 12',
          type: 'audit',
          description: 'Independent statistical review for Haybittle-Peto stopping boundary.',
          section: 'Section 7',
          page: 4,
          isCritical: true
        },
        {
          event: 'Annual IRB Continuing Review Filing',
          date: '30 Days Prior to Protocol Anniversary',
          type: 'renewal',
          description: 'Submission of enrollment metrics and safety summaries to institutional review board.',
          section: 'Section 5.2',
          page: 3,
          isCritical: false
        }
      ],
      actionItems: [
        {
          id: 'bio-act-1',
          title: 'Validate -80°C Ultra-Low Freezer Backup Generators',
          description: 'Verify redundant power supply and automated SMS alerting on the investigational drug storage freezers.',
          assigneeRole: 'Clinical Research Pharmacy Lead',
          priority: 'urgent',
          dueDateSuggestion: 'Prior to First Subject In (FSI)',
          section: 'Section 8',
          page: 4,
          status: 'pending'
        },
        {
          id: 'bio-act-2',
          title: 'Configure 24-Hour SAE Automated Distribution List',
          description: 'Test electronic safety notification pipeline from site EDC directly to MedDRA coding desk.',
          assigneeRole: 'Clinical Operations Director',
          priority: 'urgent',
          dueDateSuggestion: 'Site Initiation Visit (SIV)',
          section: 'Section 4.2',
          page: 2,
          status: 'pending'
        },
        {
          id: 'bio-act-3',
          title: 'Setup IXRS Randomization & Emergency Unblinding Codes',
          description: 'Verify 24/7 unblinding emergency telephone response line is active and verified.',
          assigneeRole: 'Biostatistics & Data Management',
          priority: 'high',
          dueDateSuggestion: '2 Weeks Prior to Screening',
          section: 'Section 3',
          page: 2,
          status: 'in_progress'
        }
      ],
      keyMetrics: [
        {
          metric: 'Target Enrolled Sample Size',
          value: '240 Subjects (1:1 Ratio)',
          category: 'compliance',
          notes: '120 active NP-409 / 120 matched placebo',
          section: 'Section 1',
          page: 1
        },
        {
          metric: 'Investigational Storage Temperature',
          value: '-80°C ± 5°C',
          category: 'compliance',
          notes: '2-hour maximum excursion ceiling above -70°C',
          section: 'Section 8',
          page: 4
        },
        {
          metric: 'Serious Adverse Event Reporting SLA',
          value: '24 Hours',
          category: 'compliance',
          notes: 'Mandatory MedDRA preliminary coding required',
          section: 'Section 4.2',
          page: 2
        },
        {
          metric: 'Essential Document Archival Period',
          value: '25 Years Post-Study Close',
          category: 'compliance',
          notes: 'Applies to all source records, eCRFs, and logs',
          section: 'Section 9',
          page: 5
        }
      ],
      suggestedQueries: [
        {
          query: 'What are the mandatory reporting timeframes for Serious Adverse Events versus emergency unblinding?',
          category: 'grounded',
          rationale: 'Tests precise identification of time-critical regulatory obligations (24 hours vs 2 hours).'
        },
        {
          query: 'What are the storage temperature requirements and what actions are required if an excursion occurs?',
          category: 'grounded',
          rationale: 'Validates cold-chain operational compliance retrieval.'
        },
        {
          query: 'What is the retail over-the-counter pharmacy consumer price for NP-409 capsules?',
          category: 'hallucination_test',
          rationale: 'FALLBACK TEST: The protocol is an investigational clinical trial with no commercial retail price, testing strict fallback refusal.'
        }
      ]
    }
  }
];
