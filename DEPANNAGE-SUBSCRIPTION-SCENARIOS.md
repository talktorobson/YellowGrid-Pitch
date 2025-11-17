# Dépannage & Subscription Scenarios - Design Document

## Overview
Two new service types that extend YellowGrid's service domain capabilities beyond standard installations and maintenance.

---

## 1. DÉPANNAGE (Urgent Service / Emergency Repair)

### Definition
Emergency/urgent service requiring same-day or next-day response. Customer has a broken/failed asset that needs immediate repair or replacement.

### Key Characteristics
- ⚡ **URGENT**: Same-day or next-day execution required
- 🚨 **Priority Routing**: Jumps queue, higher provider rates
- 📞 **24/7 Availability**: Can be requested outside business hours
- 💰 **Premium Pricing**: Urgency fee applied (20-40% markup)
- 🔧 **Fix or Replace**: May require emergency product procurement
- ⏱️ **Time-Critical**: Every hour matters to customer

### Business Rules

#### 1. Urgency Levels
- **Critical** (0-4 hours): No hot water, no heating in winter, flooding
- **High** (4-12 hours): Broken appliance needed daily, gas leak
- **Medium** (12-24 hours): Malfunctioning but operational
- **Standard** (24-48 hours): Non-critical repair

#### 2. Pricing Model
- **Base Service Price**: Standard repair/replacement cost
- **Urgency Fee**: 25-40% markup depending on urgency level
- **Emergency Call-out**: Fixed fee (€50-80) if outside business hours
- **Parts Premium**: If emergency stock needed, 15% markup
- **Transparent Breakdown**: Customer sees urgency costs clearly

#### 3. Provider Selection
- **Emergency Specialist Network**: Pre-qualified providers with emergency capability
- **Geographic Proximity**: Prioritize nearest provider (< 30 min travel)
- **Availability Check**: Real-time provider availability API
- **Emergency Stock**: Providers with parts inventory preferred
- **Response Time SLA**: Provider commits to response window

#### 4. Workflow Acceleration
- **No Contract Signing Wait**: Verbal agreement + SMS confirmation sufficient
- **Conditional Go Exec**: Provider can start before products arrive (assessment)
- **Fast-track Payment**: Pre-authorization or deposit taken upfront
- **Minimal Operator Touch**: AI handles most triage automatically

### Use Case Example: Water Heater Emergency

**Customer**: Maria Santos
**Issue**: Gas water heater stopped working - no hot water for family of 4
**Time**: Saturday 6:45 PM (outside business hours)
**Urgency**: High (12-hour window - family needs hot water by morning)

**Scenario Flow**:
1. Customer submits urgent request via mobile app/hotline
2. AI analyzes: "Gas water heater failure, family impact, weekend"
3. System identifies: Emergency repair OR replacement needed
4. Emergency provider network activated (5 providers within 30 min)
5. Best provider auto-selected: EmergencyPlumb 24/7 (15 min away, has stock)
6. SMS sent to customer: "Technician João arriving in 45 minutes"
7. Technician assesses: Replacement needed (beyond repair)
8. Technician has compatible unit in van (emergency stock)
9. Replacement completed in 2 hours
10. Customer pays: €650 (€450 unit + €120 install + €80 emergency fee)

**Price Breakdown**:
- Water heater unit: €450 (emergency stock - slight premium)
- Installation service: €120
- Emergency call-out: €80 (weekend, after-hours)
- **Total: €650** (vs €500 for planned replacement)

### Metro Stations for Dépannage

1. **Emergency Request** (Customer) - Urgent service request submitted
2. **Urgency Triage** (AI/System) - AI determines urgency level & response window
3. **Emergency Provider Match** (System) - Real-time provider availability check
4. **Provider Emergency Dispatch** (Provider) - Provider accepts & commits response time
5. **Customer Notification** (Customer) - SMS/call with provider ETA
6. **On-Site Assessment** (Crew) - Technician evaluates issue (fix vs replace)
7. **Solution Confirmation** (Customer) - Customer approves proposed solution & cost
8. **Emergency Execution** (Crew) - Repair/replacement performed urgently
9. **WCF Signature** (Customer) - Work completion form
10. **Emergency Payment** (System) - Immediate payment processing
11. **Service Complete** (System) - Issue resolved, system restored

### Key Metrics
- **Response Time**: Request to on-site arrival
- **Resolution Time**: Arrival to issue fixed
- **First-Time Fix Rate**: % resolved without return visit
- **Customer Relief Score**: Satisfaction with urgency response
- **Emergency Stock Utilization**: Parts carried vs needed

---

## 2. SUBSCRIPTION SERVICE (Recurring Maintenance Contract)

### Definition
Recurring service contract where customer pays periodic fee for scheduled maintenance services. Provider commitment to regular upkeep of equipment.

### Key Characteristics
- 🔄 **Recurring**: Monthly, quarterly, semi-annual, or annual
- 📅 **Pre-Scheduled**: Proactive maintenance dates booked in advance
- 💳 **Subscription Model**: Recurring billing (credit card, direct debit)
- 🎯 **Preventive**: Avoid breakdowns through regular maintenance
- 📊 **Service History Tracking**: Build longitudinal asset health data
- 🏷️ **Discount Benefits**: Lower price vs one-off maintenance

### Business Rules

#### 1. Subscription Tiers
**Basic Tier** (€9.99/month):
- Annual service (1 visit/year)
- Priority booking
- 10% discount on repairs

**Standard Tier** (€16.99/month):
- Semi-annual service (2 visits/year)
- Priority emergency response
- 15% discount on repairs
- Free filter replacements

**Premium Tier** (€24.99/month):
- Quarterly service (4 visits/year)
- 24/7 emergency priority
- 20% discount on repairs
- Free parts replacements (within limits)
- Extended equipment warranty

#### 2. Service Frequency Mapping
- **Monthly**: Pool cleaning, pest control
- **Quarterly**: AC maintenance, water filter changes
- **Semi-Annual**: Boiler check, heat pump service
- **Annual**: Solar panel cleaning, full HVAC service

#### 3. Auto-Scheduling Logic
- **Smart Scheduling**: System auto-books next service based on frequency
- **Customer Preferences**: Preferred day/time slots honored
- **Season Optimization**: AC service before summer, heating before winter
- **Provider Routing**: Same technician when possible (relationship building)
- **Reminder Cadence**: 2 weeks notice, 3 days reminder, 1 day confirmation

#### 4. Payment Handling
- **Recurring Billing**: Auto-charge on subscription date
- **Service Credits**: Unused services roll over (max 1 period)
- **Cancellation Policy**: 30-day notice, no penalty after 6 months
- **Price Lock**: Rate guaranteed for 12 months
- **Family Plans**: Multi-equipment discounts

#### 5. Contract Lifecycle
- **Activation**: Customer signs subscription agreement
- **Service Execution**: Scheduled maintenance performed
- **Health Tracking**: Asset condition recorded each visit
- **Renewal Trigger**: Auto-renew unless customer cancels
- **Upgrade/Downgrade**: Can change tier anytime (prorated)

### Use Case Example: AC Maintenance Subscription

**Customer**: Pedro Alves
**Equipment**: Split AC system (3 indoor units)
**Subscription**: Standard Tier (€16.99/month)
**Frequency**: Semi-annual (March + September)
**Start Date**: March 2025

**Contract Details**:
- €16.99/month via direct debit (€203.88/year)
- 2 maintenance visits per year (spring & fall)
- Priority emergency service if AC breaks
- 15% discount on repairs
- Free filter replacements

**Service Cycle**:
1. **March 2025** - Pre-summer maintenance
   - System booked automatically for March 15
   - Provider: ClimaPro Services (assigned)
   - Work: Filter cleaning, coolant check, drainage clear, performance test
   - Duration: 90 minutes
   - Cost: Included in subscription

2. **September 2025** - Post-summer maintenance
   - Auto-booked for September 20
   - Same provider (relationship continuity)
   - Work: Full system check, coil cleaning, thermostat calibration
   - Cost: Included in subscription

3. **July 2025** - Emergency Repair Needed
   - Indoor unit 2 stops cooling (mid-heatwave)
   - Customer requests emergency repair
   - **Priority Response**: Technician within 4 hours (vs 24h standard)
   - Issue: Capacitor failure
   - Parts: €45 | Labor: €80 | **15% discount applied**
   - Customer pays: €106.25 (instead of €125)

**Annual Value**:
- Subscription cost: €203.88
- 2 maintenance visits: €240 value (€120 each one-off)
- Emergency repair discount: €18.75 saved
- **Total value**: €258.75 vs €203.88 paid = **€54.87 savings**
- Plus: Peace of mind, priority service, breakdown prevention

### Metro Stations for Subscription

**Initial Subscription Setup** (once):
1. **Subscription Request** (Customer) - Customer selects plan & equipment
2. **Subscription Configuration** (System) - Frequency, billing, preferences set
3. **Contract Signature** (Customer) - Subscription agreement signed
4. **Payment Setup** (Customer) - Recurring payment method added
5. **Subscription Activated** (System) - Contract active, first service scheduled

**Each Service Visit** (recurring):
6. **Service Reminder** (Customer) - Notification 2 weeks before
7. **Schedule Confirmation** (Customer) - Customer confirms/reschedules
8. **Provider Assignment** (System) - Provider dispatched (preferably same tech)
9. **Provider Notification** (Provider) - Job details with asset history
10. **Service Execution** (Crew) - Maintenance performed with checklist
11. **Service Report** (System) - Asset health recorded, recommendations noted
12. **Next Service Scheduled** (System) - Auto-book next visit based on frequency
13. **Subscription Continues** (System) - Billing continues, contract active

### Key Metrics
- **Retention Rate**: % customers staying subscribed after 12 months
- **Asset Health Trend**: Condition improvement over time
- **Breakdown Reduction**: % decrease in emergency calls for subscribers
- **Service Completion Rate**: % of scheduled visits completed
- **Upgrade/Downgrade Ratio**: Tier movement patterns
- **Lifetime Value**: Revenue per subscriber over contract life

---

## Workflow Comparisons

### Standard Installation
Contract → Provider → Product Delivery → Go Exec → Execution → WCF → Payment

### Maintenance
Contract → Provider → Asset Info → Execution → WCF → Report → Payment

### Dépannage (Emergency)
**Emergency Request** → **Urgency Triage** → Emergency Provider → **Customer ETA** → **Assessment** → **Solution Approval** → Emergency Execution → WCF → **Immediate Payment**

### Subscription (Recurring)
**Subscription Setup** → [LOOP: **Auto-Schedule** → Reminder → Confirmation → Provider → Execution → Report → **Next Schedule**] → Renewal/Cancellation

---

## Technical Considerations

### Dépannage
- **Real-time Provider API**: Check immediate availability
- **Geolocation Matching**: Distance-based provider selection
- **SMS/Push Notifications**: Instant customer updates
- **Pre-authorization**: Payment hold before service
- **Emergency Stock Tracking**: Provider inventory visibility

### Subscription
- **Recurring Billing Engine**: Automated charging system
- **Calendar Integration**: Auto-scheduling with conflicts detection
- **Service History Database**: Longitudinal asset tracking
- **Customer Portal**: Manage subscription, view history
- **Churn Prediction**: AI identifies at-risk subscribers
- **Reminder Automation**: Multi-channel notification system

---

## Revenue Models

### Dépannage
- **Higher Margins**: Emergency premium (25-40%)
- **Volume Play**: 24/7 availability captures urgent market
- **Platform Fee**: 15-20% of emergency transaction
- **Provider Network**: Emergency-capable providers pay for priority leads

### Subscription
- **Recurring Revenue**: Predictable monthly income (SaaS model)
- **Customer Lifetime Value**: Long-term relationship (2-5 years average)
- **Upsell Opportunities**: Tier upgrades, additional equipment
- **Platform Fee**: 10-12% of subscription (lower than one-off)
- **Data Value**: Asset health insights for predictive services

---

## Key Differentiators

| Feature | Standard | Maintenance | Dépannage | Subscription |
|---------|----------|-------------|-----------|--------------|
| **Speed** | Days | Days | Hours | Scheduled |
| **Pricing** | Fixed | All-in | Premium | Recurring |
| **Products** | Yes | No | Maybe | No |
| **Go Exec** | Yes | No | Conditional | No |
| **Urgency** | Normal | Normal | Critical | Planned |
| **Contract** | Sign & Wait | Sign & Wait | Verbal OK | Long-term |
| **Payment** | After WCF | After WCF | Immediate | Monthly |
| **Provider** | Standard | Specialist | Emergency | Assigned |
| **Relationship** | Transactional | Occasional | Crisis | Ongoing |

