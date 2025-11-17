# Maintenance Scenario - Design Document

## Overview
Maintenance services focus on servicing existing installations/equipment. Unlike installation scenarios, maintenance has NO product delivery phase and NO Go Exec gate. The provider brings all necessary parts, consumables, and materials as part of the service price.

## Key Differences from Installation

### What's EXCLUDED:
- ❌ Product purchase & delivery
- ❌ Go Exec gate (no product dependency)
- ❌ Product tracking in FSM
- ❌ Installation of new equipment

### What's INCLUDED:
- ✅ Asset/equipment details (model, capacity, age, specifications)
- ✅ Maintenance history and service records
- ✅ Provider-managed parts/materials (included in service price)
- ✅ Direct contract → crew execution flow
- ✅ Work completion form with maintenance checklist
- ✅ Service report generation

## Business Rules

### 1. Service Pricing
- **All-inclusive pricing**: Parts, consumables, labor included in one price
- **No separate product lines**: Provider manages inventory
- **Transparent breakdown**: Service price shows what's included
- **No Go Exec dependency**: Can execute immediately after contract signing

### 2. Asset Information (Critical!)
Every maintenance service MUST capture:
- **Equipment Details**: Brand, model, serial number
- **Technical Specs**: Capacity, power rating, fuel type, year of manufacture
- **Service History**: Last maintenance date, years in service
- **Current Status**: Working condition, known issues
- **Location Details**: Where equipment is installed

### 3. Workflow Simplification
**Standard Installation Flow:**
Contract → Provider Match → Product Delivery → Go Exec → Crew Execution → WCF → Payment

**Maintenance Flow:**
Contract → Provider Match → Crew Execution → WCF → Service Report → Payment

### 4. Provider Requirements
- Must have maintenance specialization
- Manages own parts inventory
- Provides service report with work performed
- May recommend replacements/upgrades

## Use Case Example: Boiler Annual Maintenance

**Customer**: João Ferreira
**Equipment**: Gas Boiler - Vaillant ecoTEC plus
- Model: VCW 246/5-5
- Serial: 21234567890
- Installed: 2018 (7 years in service)
- Capacity: 24 kW
- Fuel: Natural Gas
- Last Service: November 2024

**Service**: Annual Boiler Maintenance
- Inspection & cleaning of heat exchanger
- Combustion analysis & adjustment
- Safety valve testing
- Condensate trap cleaning
- Filter replacement (included)
- Burner adjustment
- Pressure check
- Full system diagnostic report

**Price**: €120 (all-inclusive - parts, labor, report)
**Provider**: HeatingPro Services (brings own parts)
**Duration**: 90 minutes
**No Go Exec Required**: Service can start immediately after contract

## Metro Stations for Maintenance

1. **Sales Order Creation** (System) - Order enters FSM from sales
2. **Contract Notification** (Customer) - Email/SMS with service details
3. **Contract Signature** (Customer) - Customer signs service contract
4. **Provider Match** (Operator) - Assign maintenance specialist
5. **Provider Notification** (Provider) - Crew receives job with asset details
6. **Crew Execution** (Crew) - On-site maintenance with checklist
7. **WCF Notification** (Customer) - Email/SMS to sign completion form
8. **WCF Signature** (Customer) - Customer signs off with satisfaction rating
9. **Service Report** (System) - Auto-generated maintenance report
10. **Payment Authorization** (System) - Automatic payment processing

## Asset Details Card (New!)

Between Provider Match and Crew Execution, show an **Asset Information Card** that displays:
- Equipment specifications
- Service history
- Known issues
- Special instructions
- Safety requirements
- Expected service duration

This gives visibility into WHAT is being maintained, compensating for the absence of product cards.

## Service Report (New!)

After WCF, generate a **Service Report Card** that shows:
- Work performed (checklist)
- Parts replaced (provider inventory)
- Findings & recommendations
- Next service due date
- Equipment health status
- Photos/documentation

## Key Metrics

For maintenance scenarios, track:
- Equipment uptime
- Mean time between maintenance
- Service completion time
- Parts replacement rate
- Customer satisfaction
- Preventive vs corrective ratio
- Contract renewal rate

## Provider Categories

Maintenance providers typically specialize:
- **HVAC Maintenance**: Boilers, AC units, heat pumps
- **Appliance Service**: Washing machines, dishwashers, ovens
- **Solar Panel Maintenance**: Panel cleaning, inverter check
- **Pool Maintenance**: Pump service, filter cleaning
- **Garden Equipment**: Lawn mower service, irrigation systems
