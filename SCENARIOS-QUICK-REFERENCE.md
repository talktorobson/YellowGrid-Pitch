# YellowGrid - New Scenarios Quick Reference

## 🚨 Dépannage (Emergency Service)

### When to Use
- Customer has urgent breakdown (no hot water, heating failure, etc.)
- Same-day or within-hours resolution required
- Customer willing to pay premium for speed

### Key Metrics
- **Response Time:** 45 min - 4 hours (vs 2-3 days standard)
- **Premium:** +23% to +40% depending on urgency
- **Availability:** 24/7 including weekends/holidays
- **Stock:** Provider carries parts in van

### Example: Water Heater Emergency
```
Customer: Maria Santos (family of 4)
Issue:    11-year-old gas heater failed - no hot water
Time:     Saturday 6:45 PM (weekend, winter)
Urgency:  High (4-hour window)

Product:  Vaillant 14L heater - €420 + €30 emergency premium
Service:  Installation - €150
Fees:     Emergency callout €60 + urgency fee €30
Subtotal: €690
VAT:      €84.90 (23%)
TOTAL:    €774.90

vs Standard: €630 (saves 1-2 weeks wait but costs €144.90 more)

Provider: EmergencyPlumb 24/7
ETA:      45 minutes (7:30 PM arrival)
Complete: 10 PM same evening
```

### Workflow Highlights
1. **Emergency Request** - Customer stress level tracked
2. **Urgency Triage** - AI analyzes severity & response window
3. **Emergency Provider Match** - Real-time availability API
4. **Customer ETA** - SMS with live tracking
5. **Solution Confirmation** - Verbal approval on-site (no contract wait)
6. **Emergency Execution** - Fast-track installation
7. **Emergency Payment** - Immediate charge on completion

---

## 🔄 Subscription (Recurring Service)

### When to Use
- Customer wants preventive maintenance on schedule
- Building long-term relationship with provider
- Predictable monthly cost vs variable repair bills

### Key Metrics
- **Monthly Fee:** €9.99 - €24.99 depending on tier
- **Frequency:** Monthly, Quarterly, Semi-Annual, Annual
- **Savings:** 15-20% discount on repairs when needed
- **Benefits:** Priority emergency, same technician, free consumables

### Example: AC Quarterly Maintenance
```
Customer: Pedro Alves
Plan:     Standard Tier - €16.99/month (€204/year)
Asset:    Daikin Sensira 3.5 kW AC (3 years old)

Visit:    3 of 4 in annual plan (quarterly frequency)
Service:  Filter cleaning, coil check, refrigerant test
Cost:     €0 additional (covered by subscription)

Provider: ClimaPro
Tech:     Carlos Mendes (same tech as previous visits)
Health:   Score 92/100 (stable/improving)
Next:     Auto-scheduled March 2026

Benefits Active:
✓ Priority emergency response (if needed)
✓ 15% discount on any repairs
✓ Free replacement filters
✓ Same technician for relationship
✓ Health trend tracking
✓ Auto-scheduling (no need to remember)
```

### Subscription Tiers
| Feature | Basic (€9.99) | Standard (€16.99) | Premium (€24.99) |
|---------|---------------|-------------------|------------------|
| Frequency | Annual | Quarterly | Monthly |
| Emergency | Standard | Priority | VIP |
| Repair Discount | 10% | 15% | 20% |
| Parts | Discounted | Some free | All free |
| Tech Assignment | Random | Preferred | Dedicated |

### Workflow Highlights
1. **Service Reminder** - Auto-sent 2 weeks before due date
2. **Schedule Confirmation** - Easy reschedule if needed
3. **Provider Assignment** - Same tech when possible
4. **Asset History** - Full maintenance history shown
5. **Crew Execution** - Scheduled preventive work
6. **Service Report** - Health score updated with trends
7. **Auto-Schedule Next** - Next visit booked automatically

---

## 📊 Comparison Matrix

| Dimension | Standard | Dépannage | Subscription |
|-----------|----------|-----------|--------------|
| **Trigger** | Customer request | Emergency breakdown | Auto-scheduled |
| **Timeline** | 2-3 days | 45 min - 4 hours | 2-4 weeks notice |
| **Pricing** | Base rate | +23% to +40% | Fixed monthly |
| **Payment** | After completion | Immediate | Recurring billing |
| **Provider** | Best match | Emergency network | Preferred/same tech |
| **Stock** | Order + delivery | Van stock | Scheduled delivery |
| **Contract** | Signed document | SMS confirmation | Monthly subscription |
| **Goal** | Fix problem | Urgent resolution | Prevent problems |

---

## 🎯 Business Logic

### Dépannage Revenue Model
- **Volume:** Lower (emergencies are rare)
- **Margin:** Higher (23-40% premium justified by urgency)
- **Customer:** One-time or occasional
- **Provider:** Specialized emergency crews with van stock

**Example Economics:**
- Standard job: €630 @ 20% margin = €126 profit
- Dépannage job: €774.90 @ 35% margin = €271 profit
- **2.15x profit per emergency job** despite same work duration

### Subscription Revenue Model
- **Volume:** High (recurring every customer)
- **Margin:** Lower per visit, but predictable
- **Customer:** Long-term relationship (avg 3.2 years)
- **Provider:** Route optimization, bulk purchasing

**Example Economics:**
- Subscription: €16.99/mo × 12 = €204/year
- Service value: 4 visits @ €60 each = €240 standard value
- **Customer saves €36/year + gets priority/discounts**
- **Provider gets predictable revenue + upsell opportunities**

---

## 🚀 Demo Instructions

1. Open `demo-interactive.html`
2. Select scenario from dropdown:
   - **"Dépannage (Emergency Service)"** - See Maria's water heater emergency
   - **"Subscription Service"** - See Pedro's quarterly AC maintenance
3. Click through metro stations to see journey
4. Note different pricing models, timelines, and workflows

### Key Cards to Review

**Dépannage:**
- **Emergency Request** - Customer stress visualization
- **Urgency Triage** - AI severity analysis
- **Emergency Complete** - Premium pricing breakdown

**Subscription:**
- **Service Reminder** - Auto-scheduling flow
- **Asset History** - Health tracking over time
- **Subscription Continues** - Renewal and relationship metrics

---

## 📈 Success Metrics

### Dépannage KPIs
- Average response time < 1 hour
- Emergency resolution rate > 95% same-day
- Customer satisfaction with urgency handling
- Premium pricing acceptance rate
- Provider van stock turnover

### Subscription KPIs
- Customer lifetime value (CLV)
- Churn rate < 10% annually
- Same-technician assignment rate > 80%
- Asset health score improvement
- Upsell conversion (repairs at discount)
- Auto-renewal rate

---

*Built with YellowGrid platform - Orchestrating multi-actor service journeys*
