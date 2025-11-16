# Rework Scenario - Service Quality Recovery

## Overview
The Rework scenario handles service quality issues that require corrective action. It operates entirely within the **service domain** with no sales involvement. The customer never pays for rework, but provider payment follows specific conditional logic.

---

## Trigger Events

### 1. WCF Rejection / Reserves (Immediate)
- **Context**: Service just completed, customer inspects work
- **Trigger**: Customer refuses to sign WCF OR signs with reserves/complaints
- **Timeline**: Happens immediately after execution
- **Example**: "Grout lines uneven, waterproofing test failed in shower corner"

### 2. Warranty Claim (Delayed)
- **Context**: Service was completed and accepted weeks/months ago
- **Trigger**: Customer discovers defect within warranty period
- **Timeline**: Can be days, weeks, or months after original completion
- **Example**: "Shower leaking after 2 months - tiles appear properly installed but waterproofing failing"

---

## Business Rules

### Customer Payment
- **Amount**: €0.00 - Customer NEVER pays for rework
- **Rationale**: Quality issue stems from original service execution failure
- **Domain**: Service domain handles entirely (no sales quotation needed)

### Provider Payment (Conditional Logic)

#### Scenario A: SAME Provider Does Rework
- **Payment**: €0.00 - Provider receives NO payment
- **Rationale**: Provider fixes their own mistake at their expense
- **Responsibility**: Original provider's warranty/quality obligation

#### Scenario B: DIFFERENT Provider Does Rework
- **Payment**: Full rework cost paid to new provider
- **Rationale**: New provider doing work unrelated to their original execution
- **Example**: If rework costs €850, QualityFix Specialists gets paid €850

### Provider Assignment Decision
**Who decides which provider?**
- **Operator decision** based on:
  1. Original provider availability
  2. Original provider track record
  3. Urgency of fix required
  4. Customer preference/trust issues
  5. Original provider dispute of responsibility

**Typical scenarios:**
- **Minor issues**: Same provider gets first chance to fix
- **Major issues**: Different provider assigned (customer trust broken)
- **Provider disputes**: Different provider assigned, operator arbitrates later
- **Warranty claims**: Often same provider (if still active/available)

---

## Workflow Structure

### Rework Flow (WCF Rejection)
```
1. WCF Rejection Event
   - Customer signs with reserves
   - Complaint details logged
   - Photos/evidence captured

2. Problem Assessment
   - Operator reviews complaint
   - Operator inspects evidence (photos, measurements)
   - Operator validates issue legitimacy
   - Operator documents root cause

3. Rework Decision
   - Operator creates rework Service Order
   - Links to original SO
   - Documents required corrective action
   - No customer payment (€0.00)

4. Provider Assignment
   - System suggests: Same provider first (if appropriate)
   - Operator can override to different provider
   - Provider notification sent
   - Provider accepts rework assignment

5. Go Exec Gate
   - Verify readiness for rework execution
   - Check materials availability
   - Confirm access to site
   - Review corrective action plan

6. Crew Execution (Rework)
   - Crew performs corrective work
   - Photos of before/after
   - Crew confirms issue resolved
   - Crew updates mobile app

7. Quality Check
   - Operator or independent inspector validates
   - Confirms problem fully resolved
   - Ensures no new issues introduced
   - Photos documented

8. WCF (Final Acceptance)
   - Customer signs WCF
   - Confirms satisfaction with fix
   - No reserves this time
   - Rework accepted

9. Payment Authorization (Conditional)
   - IF same provider → No payment authorized
   - IF different provider → Full payment authorized
   - System processes automatically based on provider match

10. Rework Complete
    - Original SO updated (rework completed)
    - Case closed
    - Quality metrics updated
```

---

## Example Case: Bathroom Tiling Rework

### Original Service Context
- **Customer**: Sofia Rodrigues (Premium residential, Lisboa)
- **Original SO**: SO-2024-11892
- **Service**: "Tiling & Waterproofing" (Phase 2 of bathroom renovation)
- **Original Provider**: HomePro Renovations
- **Original Value**: €4,875.40
- **Original Completion**: October 28, 2024
- **WCF Status**: Signed with reserves - quality issues noted

### Rework Service Order
- **Rework SO**: SO-2024-12456 (NEW SO linked to original)
- **Trigger**: WCF signed with reserves
- **Problem Description**: 
  - Grout lines uneven and inconsistent width (2-5mm variation)
  - Waterproofing test failed in shower corner (moisture detected)
  - Tile alignment off by 3mm in visible area
  - Professional finish standards not met
  
- **Root Cause**: Rushed execution, inadequate waterproofing membrane overlap
- **Customer Complaint Date**: October 29, 2024 (day after completion)
- **Rework Assigned**: Different provider (customer trust issue)

### Rework Provider
- **Provider**: QualityFix Specialists
- **Specialization**: Remedial tiling and waterproofing
- **Rating**: 4.9/5 (specialized in fixing poor quality work)
- **Why different provider**: Customer lost confidence in HomePro Renovations

### Rework Scope
- **Work Required**:
  1. Remove affected tiles in shower corner (approx 2m²)
  2. Re-apply waterproofing membrane with proper overlap
  3. Re-tile with proper grout line consistency
  4. Re-grout entire shower area for uniform appearance
  5. Waterproofing test (24-hour moisture test)
  
- **Duration**: 6 hours (360 minutes)
- **Materials**: Replacement tiles (from original batch), waterproofing membrane, grout
- **Rework Cost**: €850.00

### Financial Flow
- **Customer Pays**: €0.00 (no customer charge for rework)
- **QualityFix Specialists Receives**: €850.00 (full payment - different provider)
- **HomePro Renovations**: No payment (they caused the issue)
- **Platform Fee**: Not charged on rework (service domain recovery)

### Timeline
- **Oct 28**: Original service completed, WCF signed with reserves
- **Oct 29**: Customer complaint logged, operator inspects
- **Oct 30**: Rework SO created, QualityFix Specialists assigned
- **Nov 2**: Rework execution completed
- **Nov 3**: Waterproofing test passed, WCF signed without reserves
- **Nov 4**: Payment released to QualityFix Specialists

---

## Service Domain Boundaries

### What Rework Includes
✅ Problem assessment and validation  
✅ Rework SO creation (linked to original)  
✅ Provider assignment logic  
✅ Corrective action execution  
✅ Quality validation  
✅ Conditional payment processing  
✅ Customer satisfaction verification  

### What Rework Does NOT Include
❌ New sales quotation  
❌ Customer payment collection  
❌ Price negotiation  
❌ Scope expansion beyond fixing the issue  
❌ Additional services (must be separate SO)  

---

## Quality Metrics Impact

### Provider Performance
- **Original Provider**: Quality incident logged, rating potentially impacted
- **Rework Provider**: Success logged if rework accepted, positive rating boost
- **Platform**: Quality control validation, process improvement data

### Customer Satisfaction
- **Measure**: Did rework resolve issue? Was customer satisfied with fix?
- **Impact**: Customer trust restoration, loyalty impact tracked

---

## Key Differentiators

### vs. Simple Installation
- ✅ No sales process
- ✅ Linked to original SO
- ✅ No customer payment
- ✅ Conditional provider payment

### vs. Complex Project
- ✅ Single focused corrective action (not multi-phase)
- ✅ No product delivery (uses existing materials)
- ✅ Triggered by quality issue (not planned scope)

### vs. Service Pack
- ✅ No bundle logic
- ✅ Pure remedial work
- ✅ Quality recovery focus

---

## System Implementation

### Data Structure
```javascript
{
  scenario: 'rework',
  serviceOrders: [{
    soId: 'SO-2024-12456',
    originalSoId: 'SO-2024-11892',
    reworkReason: 'wcf-reserves',
    problemDescription: 'Grout lines uneven, waterproofing failed',
    customer: { ... },
    originalProvider: {
      providerId: 'PRV-1001',
      name: 'HomePro Renovations',
      isReworkProvider: false
    },
    reworkProvider: {
      providerId: 'PRV-2305',
      name: 'QualityFix Specialists',
      isReworkProvider: true,
      willGetPaid: true // Different provider = payment
    },
    services: [{
      name: 'Rework: Tiling & Waterproofing Correction',
      reworkCost: 850.00,
      duration: 360
    }],
    financials: {
      customerPayment: 0.00,
      providerPayment: 850.00,
      paymentCondition: 'different-provider'
    }
  }]
}
```

### Card Flow
1. **Rework Trigger** - WCF rejection event
2. **Problem Assessment** - Operator inspection
3. **Rework Decision** - SO creation
4. **Provider Assignment** - Same vs different logic
5. **Go Exec Gate** - Rework readiness
6. **Crew Execution** - Corrective work
7. **Quality Check** - Fix validation
8. **WCF** - Customer acceptance
9. **Payment Authorization** - Conditional logic
10. **Rework Complete** - Case closure

---

## Success Criteria

### Rework is Successful When:
✅ Problem fully resolved  
✅ Customer signs WCF without reserves  
✅ Quality standards met  
✅ Timeline kept reasonable  
✅ Correct provider payment processed  
✅ Customer trust restored  

### Platform Value Demonstrated:
✅ **Service domain autonomy** - no sales involvement needed  
✅ **Conditional payment logic** - fair cost allocation  
✅ **Quality control** - systematic problem resolution  
✅ **Customer protection** - no cost for quality issues  
✅ **Provider accountability** - same provider bears cost  
✅ **Flexibility** - can assign different provider when needed  

