# Brasaland Context

This document is the single source of truth for Brasaland across UI, backend, data, agents, and workflows.

## 1) Company Overview

- Company name: Brasaland
- Industry: Restaurant chain (grilled food)
- Regions: Colombia and Florida (USA)
- Business model: Multi-branch restaurant chain with dine-in, takeaway, and delivery revenue streams.
- Value proposition: Fast, consistent grilled meals with regional flavor, family-friendly service, and convenient ordering channels.
- Customer segments: Families, office workers (lunch demand), students, and delivery-first customers in urban areas.

## 2) Milestone Scope (Current)

- Milestone: 2
- Main objective for this milestone: Implement well-typed TypeScript utilities to model Brasaland business entities and process company data collections.
- Required deliverables: TypeScript interfaces for the main entities, reusable functions for filtering, sorting, linear search, binary search, aggregations, validations, and a documented local validation command.
- Out of scope for this milestone: Production checkout, payment gateway integration, inventory automation, and advanced analytics dashboards.

## 3) Products and Services

- Core offerings (food/services): Grilled meats, combo meals, sides, beverages, family packs, and catering-by-request.
- Pricing model and promotions: Mid-market pricing with combo discounts, lunch specials, and weekend family promotions.
- In-store vs online channels: In-store dine-in and takeaway, direct phone orders, and third-party delivery platforms.
- Loyalty or membership programs: Points-based loyalty concept is planned; final rules pending instructor briefing confirmation.

## 4) Operating Model

- Store/branch structure: Multiple branches grouped by region (Colombia and Florida) with local branch managers.
- Main operational workflows (orders, prep, delivery, support): Order intake -> kitchen prep -> packing/plating -> handoff (table, pickup, or delivery) -> feedback/support.
- Business hours and seasonality: Daily operations with lunch and dinner peaks; higher demand on weekends and holidays.
- Key stakeholders (roles): Customers, cashiers, kitchen staff, branch managers, operations lead, and marketing lead.

## 5) Users and Personas

- External users (customers): Walk-in diners, takeaway customers, and app-based delivery customers.
- Internal users (admins, ops, managers): Branch managers, operations coordinators, marketing/admin staff.
- User goals by persona: Customers want fast ordering and predictable quality; managers want visibility over branch performance and demand.
- Main pain points by persona: Customers face wait-time uncertainty; managers face fragmented branch information and manual reporting.

## 6) Domain Language and Rules

- Core domain terms and definitions: Branch, MenuItem, Combo, Ticket, Order Channel, Fulfillment Time, Peak Hour.
- Business rules and constraints: Menu availability may vary by branch; prep times differ by product category; promotions have region/date constraints.
- Compliance/region constraints (if any): Taxes, labor rules, and food labeling obligations differ between Colombia and Florida.
- Assumptions to validate: Exact menu catalog, current loyalty policy, and official branch list by city.

## 7) Data Model (Business Entities)

List the main entities used across the project.

### Entity: Branch
- Description: Physical store location operating orders and local staffing.
- Key fields: branch_id, name, city, country, timezone, status, opening_hours

### Entity: MenuItem
- Description: Sellable food or beverage item with pricing and availability.
- Key fields: item_id, name, category, price, currency, availability, allergens

### Entity: Order
- Description: Customer purchase transaction created through a specific order channel.
- Key fields: order_id, created_at, branch_id, customer_id, channel, status, total_amount

### Entity: Customer
- Description: End user placing one or more orders with optional loyalty profile.
- Key fields: customer_id, name, contact, city, loyalty_tier, preferences

### Entity: Reservation (if applies)
- Description: Optional table booking for dine-in service at selected branches.
- Key fields: reservation_id, customer_id, branch_id, datetime, party_size, status

## 8) Metrics and KPIs

- Revenue KPIs: Daily sales, average order value (AOV), sales by branch, sales by channel.
- Operations KPIs (prep time, fulfillment time, cancellations): Average prep time, order completion time, cancellation rate, on-time delivery/pickup rate.
- Customer KPIs (retention, satisfaction, repeat rate): Repeat purchase rate, customer satisfaction score (or review average), loyalty participation rate.
- Milestone 2 acceptance metrics: TypeScript entities align with Brasaland fields, utility functions run without compilation errors, business validations enforce context rules, and report helpers support branch and channel sales analysis.

## 9) Technical Context for the Repo

- UI projects expected: A manual test page is optional; the main milestone focus is the TypeScript logic layer.
- Backend/API modules expected: Current work is framework-agnostic TypeScript that can later be reused by services, UIs, and automation flows.
- Data sources available now: Instructor briefing, manual branch/menu seed data, and synthetic sample datasets for practice.
- Future AI/agent opportunities: Support FAQ assistant, operations dashboard copilot, and demand-insight assistant for managers.

## 10) Initial Backlog (Milestone 2)

Prioritize small, testable tasks.

1. Define TypeScript interfaces for Branch, MenuItem, Order, Customer, and Reservation.
2. Implement filtering and sorting helpers for entity collections.
3. Implement linear search for unsorted arrays and binary search for sorted arrays.
4. Implement aggregation helpers for sales by branch, sales by channel, category counts, totals, averages, minimums, and maximums.
5. Implement business validations that enforce Brasaland field requirements and domain constraints.
6. Document setup and validation instructions in README.

## 11) Open Questions

Track missing inputs from instructor or stakeholders.

1. What sample datasets will the instructor use to exercise the collection functions?
2. Are additional branch-level rules required for opening_hours beyond presence and format?
3. Will future milestones require these utilities to be packaged inside `packages/shared` or consumed from the root workspace?

## 12) Sources and References

- Instructor briefing/document links: Pending paste from class LMS or instructor deck.
- Any additional reference docs: Add links to milestone rubric and any approved dataset sources.

---

Update this file whenever business rules or scope changes so all folders stay aligned with the same context.
