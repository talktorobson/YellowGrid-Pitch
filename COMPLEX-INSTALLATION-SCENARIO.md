# Complex Installation Project Scenario

## Overview
The Complex Installation scenario demonstrates YellowGrid's capability to handle **premium, multi-service projects** spanning multiple days with strict dependencies, quality gates, and milestone-based payment authorization. This scenario showcases the platform's ability to orchestrate complex workflows using an **iterative loop mechanism** where multiple services are executed sequentially through the same workflow stations.

## Business Context
**Customer:** Sofia Rodrigues (Premium residential client)  
**Project:** Complete bathroom renovation including demolition, tiling, fixtures, and finishing  
**Total Value:** €16,233.15  
**Duration:** ~15 days  
**Services:** 4 separate services with dependencies

## Key Features Demonstrated

### 1. Multi-Service Order Structure
- **Single Project** (`PROJ-2025-8840`) contains 4 separate service orders
- Each service becomes its own service order but shares project context
- All services handled by same provider (TechInstall Pro)

### 2. Critical Path & Dependencies
```
Demolition & Prep (SRV-001)
    ↓ [Quality Check + Payment]
Tiling & Waterproofing (SRV-002)
    ↓ [Quality Check + Payment]
Fixtures Installation (SRV-003)
    ↓ [Quality Check + Payment]
Finishing & Painting (SRV-004)
```

Each service has explicit precedence rules:
- **SRV-001 (Demolition):** No dependencies - can start immediately
- **SRV-002 (Tiling):** Requires SRV-001 complete
- **SRV-003 (Fixtures):** Requires SRV-001 AND SRV-002 complete
- **SRV-004 (Finishing):** Requires ALL services complete

### 3. Go-Gate Validation Rules
Each service's go-gate checks:
- ✅ **Required products delivered** (specific products per service)
- ✅ **Payment milestone met** (30% → 50% → 80% → 80%)
- ✅ **Dependencies completed** (previous services done)
- ✅ **Quality checks passed** (for dependent services)

**Example:** SRV-002 go-gate validates:
- PROD-002 (Tiles) are on site
- Customer has paid 50% milestone (€8,116.58)
- SRV-001 (Demolition) is completed AND quality-approved

### 4. Iterative Loop Mechanism
The workflow **loops through the same stations multiple times** - once per service:

**Initial Setup (Run Once):**
1. Integration → Kafka → Enrichment → Project Creation
2. AI Analysis & Dependency Graph
3. Operator Triage
4. Contract
5. Provider Matching (single provider for all services)

**Per-Service Loop (Runs 4 Times):**
6. **Go-Gate** [Service-specific validation]
7. **Crew Execution** [Service performance]
8. **Quality Check Visit** [Independent specialist inspection]
9. **Payment Authorization** [Automatic upon quality acceptance]
10. **Phase Unlock** [System unblocks next service]

**Final Steps:**
11. **WCF** [Single customer sign-off after ALL services]
12. Project Complete

### 5. Milestone Payment Structure
```
Initial Payment (30%):    €4,869.95  [Paid upfront]
Tiling Complete (20%):    €3,246.63  [Unlocks SRV-003]
Fixtures Complete (30%):  €4,869.95  [Unlocks SRV-004]
Final (20%):              €3,246.62  [After finishing]
```

**Quality Visit & Payment Flow:**
1. Service execution completes
2. **Quality specialist performs on-site inspection**
3. Quality acceptance triggers:
   - **Automatic payment authorization**
   - **Next service phase unlock**
4. Provider receives payment notification
5. Customer signs WCF once (after all services complete)

### 6. Service Execution Details

#### Service 1: Demolition & Prep (Phase 1)
- **Duration:** 8 hours (480 min)
- **Team:** 2 technicians (Plumber + Electrician)
- **Products:** None (demolition phase)
- **Payment Required:** 30% (already paid)
- **Dependencies:** None
- **Status:** Ready

#### Service 2: Tiling & Waterproofing (Phase 2)
- **Duration:** 9 hours (540 min)
- **Team:** 2 tile specialists
- **Products:** 35x Revigres Premium Porcelain Tiles
- **Payment Required:** 50% cumulative
- **Dependencies:** Demolition complete + quality check
- **Status:** Blocked until Phase 1 complete

#### Service 3: Fixtures Installation (Phase 3)
- **Duration:** 8 hours (480 min)
- **Team:** 2 technicians (Plumber + Installer)
- **Products:** Roca Bathroom Suite + Novellini Shower Enclosure
- **Payment Required:** 80% cumulative
- **Dependencies:** Demolition AND Tiling complete
- **Status:** Blocked until Phase 2 complete

#### Service 4: Finishing & Painting (Phase 4)
- **Duration:** 7 hours (420 min)
- **Team:** 2 technicians (Painter + General Installer)
- **Products:** Acova Electric Heated Towel Rail + accessories
- **Payment Required:** 80% cumulative
- **Dependencies:** ALL services complete
- **Status:** Blocked until Phase 3 complete

## Business Rules Enforced

### ✅ Service Domain Boundaries
- **No price adjustments** in service execution
- **No product sales** during service
- **No cancellations** at service level
- All changes must originate from **sales domain via SO updates**

### ✅ Quality Gates
- **Mandatory operator approval** after each service
- **Customer sign-off** (WCF) required before quality check
- **Photo/documentation** uploaded by crew
- **No next phase without quality approval**

### ✅ Payment Authorization
- **Operator-controlled** payment release
- **Tied to quality approval** - can't pay without quality check
- **Unlocks next phase** - next service stays blocked until payment authorized
- **Provider receives notification** when payment scheduled

### ✅ Product Delivery Coordination
- Each service specifies **required products**
- Go-gate checks product availability
- **Partial delivery support** - only required products need to be on site
- Example: Fire system can arrive later (only needed for Phase 3)

## Metro Line Visualization

The metro line dynamically expands to show all stations:

```
Initial Setup:
[Kafka] → [Enrichment] → [Project] → [AI] → [Operator] → [Contract] → [Provider Match]

Phase 1 Loop:
→ [Go-Gate Demolition] → [Crew Demolition] → [WCF Demolition] → [Quality Demolition] → [Invoice Demolition] → [Payment Auth Demolition] → [Unlock Phase 2]

Phase 2 Loop:
→ [Go-Gate Tiling] → [Crew Tiling] → [WCF Tiling] → [Quality Tiling] → [Invoice Tiling] → [Payment Auth Tiling] → [Unlock Phase 3]

Phase 3 Loop:
→ [Go-Gate Fixtures] → [Crew Fixtures] → [WCF Fixtures] → [Quality Fixtures] → [Invoice Fixtures] → [Payment Auth Fixtures] → [Unlock Phase 4]

Phase 4 Loop:
→ [Go-Gate Finishing] → [Crew Finishing] → [WCF Finishing] → [Quality Finishing] → [Invoice Finishing] → [Payment Auth Finishing] → [Unlock Complete]

Completion:
→ [Project Complete] 🎉
```

## Technical Implementation

### Card Generation
The `getCardsForScenario('complex-project')` function:
1. Creates initial setup cards (integration, AI, operator, contract, provider)
2. **Loops through `so.services[]` array** to generate phase-specific cards
3. Each service gets its own set of cards with index suffix (e.g., `go-gate-check-0`, `crew-execution-1`)
4. Cards carry `phase` and `serviceIndex` metadata
5. Final project complete card added at end

### Dynamic Rendering
The `renderCard()` function uses **pattern matching**:
- `card.id.startsWith('go-gate-check')` → renders go-gate with service context
- `card.id.startsWith('crew-execution')` → renders crew execution with service details
- `card.id.startsWith('quality-check')` → renders quality approval UI
- Card's `serviceIndex` property used to access correct service from `so.services[]`

### Data Structure
Each service in `so.services[]` contains:
```javascript
{
  serviceOrderId: 'SO-2025-8840-01',  // Unique SO per service
  dependencies: ['SRV-001'],           // Precedence rules
  precedenceRule: 'Human-readable dependency description',
  requiredProducts: ['PROD-001'],      // Products needed for this service
  requiredPayment: 0.30,               // Payment milestone % required
  status: 'Ready' | 'Blocked'          // Current state
}
```

## Use Cases Demonstrated

### Premium Home Renovation
- Multi-day, multi-service coordination
- Single provider handles all services
- Strict sequencing and dependencies
- High-quality finish requirements (marble-look tiles, premium fixtures)

### Financial Control
- Milestone-based payments reduce risk
- Operator approval gates prevent unauthorized payments
- Clear audit trail of quality checks and authorizations
- Payment tied to work completion

### Quality Assurance
- Mandatory checks after each service
- Operator verification before payment
- Customer sign-off via WCF
- Documentation requirements (photos, notes)

### Operational Excellence
- Partial product delivery support
- Critical path visualization
- Automated phase unlocking
- Same provider efficiency

## Comparison to Other Scenarios

| Feature | Simple Install | Service Pack | Complex Project |
|---------|----------------|--------------|-----------------|
| Services | 1 | 2 (TV + Install) | 4 (with dependencies) |
| Duration | Same day | 4-7 days | 20+ days |
| Loop Mechanism | No | No | Yes (4 iterations) |
| Quality Gates | WCF only | TV outcome gate | After each service |
| Payment | Single upfront | Single upfront | 4 milestones |
| Go-Gates | 1 | 1 (for install only) | 4 (one per service) |
| Provider Match | Per service | Bundle (TV+Install) | Once for all services |
| Complexity | Low | Medium | High |

## Success Metrics

Upon completion, the scenario demonstrates:
- ✅ **4 services** executed sequentially
- ✅ **4 quality checks** performed and approved
- ✅ **4 payment authorizations** issued
- ✅ **3 dependency chains** validated
- ✅ **€16,233.15** project value managed
- ✅ **~15 days** project duration coordinated
- ✅ **0 scope creep** (all changes via sales)

## Key Takeaways

1. **Same Workflow, Different Context:** The loop mechanism reuses stations (go-gate, execution, WCF, quality, payment) but with different service data each iteration

2. **Operator as Traffic Controller:** Operator decisions (quality approval, payment authorization) control project flow and phase unlocking

3. **System Intelligence:** Automated dependency checking, critical path management, and phase unlocking based on rules

4. **Financial Safety:** Payment authorization tied to quality approval - can't pay without verification

5. **Scalability:** Pattern works for 4 services or 40 services - just adjust loop iterations

---

**This scenario proves YellowGrid can handle enterprise complexity while maintaining control, quality, and financial discipline.**
