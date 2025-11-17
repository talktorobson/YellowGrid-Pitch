# Complete Flow Integration - Dépannage & Subscription

## Executive Summary

Both **Dépannage (Emergency Service)** and **Subscription (Recurring Service)** scenarios now include the complete end-to-end flow from retail sales to provider payment:

1. **Sales Integration** (Kafka → Enrichment → SO Creation → AI → Operator)
2. **Service Execution** (Emergency/Subscription-specific workflow)
3. **Provider Payment** (Pro Forma Invoice → Authorization → Payment)

This matches the standard YellowGrid platform pattern used in all other scenarios.

---

## What Changed

### 1. Dépannage (Emergency Service)

#### BEFORE (12 cards):
- Started directly with "Emergency Request"
- Ended with "Customer Payment" only
- Missing: Sales integration + Provider payment

#### AFTER (21 cards):
**Sales Integration (5 cards):**
1. Kafka Message - Sales system sends emergency service request
2. Enrichment - Data validation and augmentation
3. SO Creation - Sales order created with emergency flag
4. AI Analysis - Urgency assessment and routing
5. Operator Triage - Manual review for high-value emergencies

**Emergency Execution (10 cards):**
6. Emergency Request
7. Urgency Triage
8. Emergency Provider Match
9. Provider Emergency Dispatch
10. Customer ETA
11. Onsite Assessment
12. Solution Confirmation
13. Emergency Execution
14-15. WCF Notification + Signature

**Provider Payment (4 cards):**
16. Pro Forma Invoice (Provider submits invoice)
17. Invoice Dataflow (System processes invoice)
18. Payment Authorization (Platform approves payment)
19. Provider Payment (€620.90 paid to provider)

**Customer Payment (2 cards):**
20. Customer Payment (€774.90 charged immediately)
21. Emergency Complete

---

### 2. Subscription (Recurring Service)

#### BEFORE (11 cards):
- Started directly with "Service Reminder"
- Ended with "Subscription Continues" only
- Missing: Sales integration + Provider payment

#### AFTER (20 cards):
**Sales Integration (5 cards):**
1. Kafka Message - Sales system sends subscription purchase
2. Enrichment - Customer and asset data enriched
3. SO Creation - Subscription contract created
4. AI Analysis - Service scheduling and provider matching
5. Operator Triage - Manual review for subscription setup

**Service Execution (11 cards):**
6. Service Reminder
7. Schedule Confirmation
8. Provider Assignment
9. Provider Notification
10. Asset History
11. Crew Execution
12-13. WCF Notification + Signature
14. Service Report (Health tracking)

**Provider Payment (4 cards):**
15. Pro Forma Invoice (Provider submits quarterly invoice)
16. Invoice Dataflow (System processes invoice)
17. Payment Authorization (Platform approves payment)
18. Provider Payment (€48 paid to provider)

**Subscription Continuation (2 cards):**
19. Auto-Schedule Next (Books next service)
20. Subscription Continues (Contract remains active)

---

## Financial Flows

### Dépannage Provider Payment
```
Customer pays:     €774.90 (emergency premium pricing)
  ├─ Product:      €420.00
  ├─ Service:      €150.00
  ├─ Emergency:    €60.00 (callout fee)
  ├─ Urgency:      €30.00 (premium)
  └─ Tax (23%):    €144.90

Provider receives: €620.90
  ├─ Gross:        €774.90
  └─ Platform Fee: -€154.00 (20%)

Platform keeps:    €154.00
```

**Pro Forma Invoice Details:**
- Invoice Number: INV-DEP-2025-11-4789
- Payment Terms: Net 7 days
- Status: Pending Provider Acceptance
- Provider must accept invoice before payment released

---

### Subscription Provider Payment
```
Customer pays:     €0 (covered by subscription)
  └─ Monthly:      €16.99 (ongoing subscription billing)

Provider receives: €48.00 (per service visit)
  ├─ Service Rate: €60.00
  └─ Platform Fee: -€12.00 (20%)

Platform keeps:    €12.00 (per visit) + subscription margin

Annual Economics:
  ├─ Customer pays:        €203.88/year (€16.99 × 12)
  ├─ Provider receives:    €192.00/year (€48 × 4 visits)
  ├─ Platform revenue:     €48.00/year (fees)
  └─ Customer saves:       €36.12 vs standard pricing
```

**Pro Forma Invoice Details:**
- Invoice Number: INV-SUB-2025-12-4421-Q4
- Payment Terms: Net 7 days
- Status: Pending Provider Acceptance
- Note: "Service performed under subscription contract. Customer billed monthly."

---

## Business Logic

### Sales Channel Integration

Both scenarios originate from **retail sales channels**:

1. **Web Portal** - Customer purchases emergency service package or subscription online
2. **Physical Store** - Customer signs up at retail location
3. **Mobile App** - Customer buys service through mobile application

**Kafka Message Payload** includes:
- Order ID, Customer ID, Service Type
- Channel (web/store/app), Timestamp
- Payment method, Delivery address
- Emergency flags (for Dépannage)
- Subscription tier (for Subscription)

### Provider Invoice Process

**Pro Forma Invoice** is the key control mechanism:

1. **After WCF Signature** - Work completion confirmed by customer
2. **Provider Submits Invoice** - Via provider portal (mobile/web)
3. **System Validates** - Checks against sales order, WCF, and pricing
4. **Operator Review** (if needed) - For disputes or exceptions
5. **Payment Authorization** - System approves payment
6. **Provider Payment Released** - Net amount after platform fee
7. **Payment Terms** - Net 7 days (provider receives within 7 days)

**Provider must accept invoice** before payment is processed. This creates a formal agreement on the amount due.

---

## Data Structure Changes

### Dépannage - Added Sections

```javascript
financials: {
  customerPayment: 774.90,
  providerPayment: 620.90,
  platformFee: 154,
  paymentCondition: 'emergency-service',
  providerBreakdown: {
    productCost: 420,
    serviceCost: 150,
    emergencyCallout: 60,
    subtotal: 630,
    urgencyPremium: 30,
    tax: 144.90,
    gross: 774.90,
    platformFee: 154,
    netToProvider: 620.90
  }
}

providerInvoice: {
  invoiceNumber: 'INV-DEP-2025-11-4789',
  invoiceType: 'Pro Forma',
  paymentTerms: 'Net 7 days',
  lineItems: [
    { description: 'Water Heater Emergency Replacement', amount: 420 },
    { description: 'Installation Service', amount: 150 },
    { description: 'Emergency Callout Fee', amount: 60 }
  ],
  subtotal: 630,
  platformFee: -154,
  totalDue: 620.90,
  status: 'Pending Provider Acceptance'
}
```

### Subscription - Added Sections

```javascript
financials: {
  customerPayment: 0,
  providerPayment: 48,
  platformFee: 12,
  paymentCondition: 'subscription-service',
  subscriptionEconomics: {
    monthlyCustomerPayment: 16.99,
    annualCustomerPayment: 203.88,
    servicesPerYear: 4,
    annualProviderPayout: 192,
    annualPlatformRevenue: 48,
    customerSavings: 36.12
  }
}

providerInvoice: {
  invoiceNumber: 'INV-SUB-2025-12-4421-Q4',
  invoiceType: 'Pro Forma',
  paymentTerms: 'Net 7 days',
  lineItems: [
    { description: 'Quarterly AC Maintenance (Q4 2025)', amount: 60 }
  ],
  subtotal: 60,
  platformFee: -12,
  totalDue: 48,
  status: 'Pending Provider Acceptance',
  subscriptionNote: 'Service performed under subscription contract. Customer billed monthly at €16.99.'
}
```

---

## Card Workflow Updates

### Dépannage: 21 Total Cards

| Step | Card ID | Actor | Description |
|------|---------|-------|-------------|
| **SALES** | | | |
| 1 | kafka-message | DATA | Sales system → Platform |
| 2 | enrichment | SYSTEM | Data validation |
| 3 | project-creation | SYSTEM | SO creation |
| 4 | ai-reasoning | AI | Urgency assessment |
| 5 | operator-cockpit | OPERATOR | Manual triage |
| **EMERGENCY** | | | |
| 6 | emergency-request | CUSTOMER | Issue reported |
| 7 | urgency-triage | AI | Severity analysis |
| 8 | emergency-provider-match | SYSTEM | Real-time availability |
| 9 | provider-emergency-dispatch | PROVIDER | Accepts + ETA |
| 10 | customer-eta | CUSTOMER | SMS notification |
| 11 | onsite-assessment | CREW | Fix vs replace |
| 12 | solution-confirmation | CUSTOMER | Approves solution |
| 13 | emergency-execution | CREW | Urgent work |
| 14 | wcf-notification | CUSTOMER | Completion email |
| 15 | wcf-portal | CUSTOMER | Signature |
| **PROVIDER PAY** | | | |
| 16 | invoice-portal-dep | PROVIDER | Invoice submission |
| 17 | invoice-dataflow | DATA | Invoice processing |
| 18 | payment-authorization-dep | SYSTEM | Payment approval |
| 19 | payment-portal-dep | PROVIDER | Payment received |
| **CUSTOMER PAY** | | | |
| 20 | emergency-payment | CUSTOMER | Immediate charge |
| 21 | emergency-complete | SYSTEM | Service complete |

### Subscription: 20 Total Cards

| Step | Card ID | Actor | Description |
|------|---------|-------|-------------|
| **SALES** | | | |
| 1 | kafka-message | DATA | Subscription purchase |
| 2 | enrichment | SYSTEM | Data enrichment |
| 3 | project-creation | SYSTEM | Contract creation |
| 4 | ai-reasoning | AI | Scheduling setup |
| 5 | operator-cockpit | OPERATOR | Manual review |
| **SERVICE** | | | |
| 6 | service-reminder | CUSTOMER | Auto-sent reminder |
| 7 | schedule-confirmation | CUSTOMER | Confirms date |
| 8 | provider-assignment-sub | SYSTEM | Assigns tech |
| 9 | provider-notification-sub | PROVIDER | Job notification |
| 10 | asset-history | SYSTEM | Service history |
| 11 | crew-execution-sub | CREW | Maintenance work |
| 12 | wcf-notification | CUSTOMER | Completion email |
| 13 | wcf-portal | CUSTOMER | Signature |
| 14 | service-report-sub | SYSTEM | Health update |
| **PROVIDER PAY** | | | |
| 15 | invoice-portal-sub | PROVIDER | Invoice submission |
| 16 | invoice-dataflow | DATA | Invoice processing |
| 17 | payment-authorization-sub | SYSTEM | Payment approval |
| 18 | payment-portal-sub | PROVIDER | Payment received |
| **CONTINUATION** | | | |
| 19 | auto-schedule-next | SYSTEM | Books next visit |
| 20 | subscription-continues | SYSTEM | Contract active |

---

## Routing Logic

New card IDs added to `renderCard()` function:

```javascript
// Dépannage invoice/payment cards
} else if (card.id === 'invoice-portal-dep') {
  html = renderInvoicePortalCard(so, card);
} else if (card.id === 'payment-authorization-dep') {
  html = renderPaymentAuthorizationCard(so, card);
} else if (card.id === 'payment-portal-dep') {
  html = renderPaymentPortalCard(so, card);

// Subscription invoice/payment cards  
} else if (card.id === 'invoice-portal-sub') {
  html = renderInvoicePortalCard(so, card);
} else if (card.id === 'payment-authorization-sub') {
  html = renderPaymentAuthorizationCard(so, card);
} else if (card.id === 'payment-portal-sub') {
  html = renderPaymentPortalCard(so, card);
```

These card IDs reuse existing render functions:
- `renderInvoicePortalCard` (provider portal)
- `renderPaymentAuthorizationCard` (system authorization)
- `renderPaymentPortalCard` (provider payment)

---

## Key Insights

### 1. **Consistent Platform Pattern**

All scenarios now follow the same structure:
- **Sales → Execution → Provider Payment → Customer Payment**
- This consistency makes the platform predictable and scalable

### 2. **Provider Payment Control**

Pro forma invoice creates checkpoint:
- Provider must review and accept invoice
- Platform validates against sales order and WCF
- Payment released only after authorization
- Net 7 day terms (provider liquidity)

### 3. **Subscription Economics**

Customer wins:
- €203.88/year vs €240 standard pricing (€36.12 savings)
- Priority service, loyalty discounts, free parts

Provider wins:
- €192/year guaranteed revenue (vs unpredictable one-off jobs)
- Route optimization (scheduled visits)
- Customer relationship (repeat business)

Platform wins:
- €48/year recurring revenue per customer
- Predictable cash flow
- Reduced acquisition costs (retained customers)

### 4. **Emergency Premium Justification**

Dépannage premium broken down transparently:
- Base cost: €630 (product + service)
- Emergency callout: €60 (24/7 availability)
- Urgency premium: €30 (same-day commitment)
- Total: €774.90 (23% premium justified by speed)

Provider compensated fairly:
- €620.90 net (80% of gross after platform fee)
- Emergency callout fee fully passed to provider
- Urgency premium helps cover emergency stock costs

---

## Testing Checklist

### Dépannage Flow
- [ ] Select "Dépannage (Emergency Service)" from dropdown
- [ ] Verify Kafka message shows emergency flags
- [ ] Check AI reasoning highlights urgency
- [ ] Confirm operator cockpit shows priority
- [ ] Navigate through emergency execution cards
- [ ] Verify WCF signature captured
- [ ] Check invoice portal shows €620.90 provider payment
- [ ] Verify payment authorization processes correctly
- [ ] Confirm customer payment €774.90
- [ ] Check emergency complete summary

### Subscription Flow
- [ ] Select "Subscription Service" from dropdown
- [ ] Verify Kafka message shows subscription tier
- [ ] Check AI reasoning sets up scheduling
- [ ] Confirm operator reviews subscription setup
- [ ] Navigate through service reminder and confirmation
- [ ] Verify same technician assigned (continuity)
- [ ] Check asset history displays previous visits
- [ ] Verify WCF signature captured
- [ ] Check service report updates health score
- [ ] Check invoice portal shows €48 provider payment
- [ ] Verify payment authorization processes correctly
- [ ] Confirm no customer payment (subscription covered)
- [ ] Check auto-schedule books next visit

---

## Summary

Both Dépannage and Subscription scenarios now have **complete end-to-end flows** that match the YellowGrid platform standard:

✅ **Sales integration** via Kafka from retail channels  
✅ **AI-powered routing** and operator triage  
✅ **Service-specific execution** workflows  
✅ **Pro forma invoicing** for provider payments  
✅ **Payment authorization** and processing  
✅ **Customer payment** (immediate or subscription)  

This creates a **consistent, auditable, and financially transparent** platform that handles diverse service types while maintaining operational predictability.
