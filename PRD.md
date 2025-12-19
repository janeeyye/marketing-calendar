# Planning Guide

A monthly calendar-based marketing event management application that provides visual clarity for multi-solution event tracking with intelligent auto-expanding day cells that grow to accommodate multiple events.

**Experience Qualities**:
1. **Effortless** - Filter toggles instantly show/hide events without friction, and the auto-expanding calendar adapts naturally to content
2. **Professional** - Clean corporate aesthetic with solution-branded colors and structured information hierarchy
3. **Spacious** - Generous whitespace and auto-expanding cells ensure no information is hidden or truncated on desktop

**Complexity Level**: Light Application (multiple features with basic state)
This app manages calendar state, filter toggles, modal interactions, and form validation with persistent event storage, but doesn't require complex routing or multi-view architecture.

## Essential Features

**Solution Filter Toggles**
- Functionality: Four pill-shaped toggle buttons that control event visibility by solution type
- Purpose: Allow users to focus on specific business solutions without clutter
- Trigger: User clicks any of the four solution filter buttons
- Progression: Click button → Button toggles on/off → Calendar instantly shows/hides matching events → Multiple filters work with OR logic
- Success criteria: Events appear/disappear immediately, all filters can be toggled independently, visual state clearly shows active/inactive

**Auto-Expanding Calendar Grid**
- Functionality: Day cells and week rows automatically grow in height to display all events without scrolling or truncation
- Purpose: Ensure all event information is visible at a glance without hidden overflow
- Trigger: Events are added/filtered causing cell content to change
- Progression: Event count increases → Day cell expands vertically → Entire week row height adjusts to tallest cell → All events remain fully visible
- Success criteria: No scrolling within cells, no "+n more" indicators, entire week row shares same height, cards never overlap or get cut off

**Event Detail Modal**
- Functionality: Displays complete event information in a centered modal overlay
- Purpose: Provide full event details including URLs and metadata
- Trigger: User clicks any event card (including multi-day continuation cards)
- Progression: Click event card → Modal fades in with dim background → Display title/solution/dates/location/URLs → Click X or background to close
- Success criteria: All event fields display correctly, URLs are clickable, modal centers properly, clicking continuation mini-cards opens same modal

**Add Marketing Event Modal**
- Functionality: Form modal for creating new marketing events with validation
- Purpose: Enable users to add events with required and optional fields
- Trigger: User clicks "+ Add Event" button in top-right
- Progression: Click button → Modal opens with empty form → Fill required fields (marked with *) → Select or input location → Click Add Event → Validation checks → Event created and modal closes → Calendar updates immediately
- Success criteria: Required field validation works, location dropdown + custom input functions, dates validate properly, new events appear immediately in correct date cells

**Multi-Day Event Visualization**
- Functionality: Events spanning multiple days show as full card on start date, compact continuation bars on subsequent days
- Purpose: Clearly communicate event duration across multiple calendar days
- Trigger: Event is created with startDate ≠ endDate
- Progression: Event added → Full card appears on startDate with → indicator → Compact mini-cards (18-24px) appear on middle dates with ← → indicators → End date shows mini-card with only ← indicator → All cards share solution color
- Success criteria: Visual continuity is clear, arrows indicate direction, any part of multi-day event is clickable, mini-cards stack properly with other events

**Month Navigation**
- Functionality: Previous/next buttons to move between months
- Purpose: Allow users to view and plan events across different time periods
- Trigger: User clicks left/right arrow buttons near month title
- Progression: Click arrow → Month changes → Calendar grid rebuilds for new month → Events for that month load → Filter state persists
- Success criteria: Month transitions smoothly, events load correctly, filters remain active, current month displays clearly

## Edge Case Handling

- **All Filters Off**: Display empty calendar or show message that no solutions are selected
- **No Events in Month**: Show clean empty calendar grid without errors
- **Multi-Day Event Crosses Month Boundary**: Display event cards only for days within current visible month
- **Invalid Date Range**: End date before start date - show validation error in Add Event modal
- **Missing Required Fields**: Prevent submission and highlight missing fields with error styling
- **Very Long Event Title**: Truncate with ellipsis after 2 lines on full card, no text on mini continuation cards
- **Custom Location Text Too Long**: Truncate gracefully in card view, show full text in detail modal
- **Many Events on One Day**: Cell and row expand automatically, no arbitrary limits
- **URL Without Protocol**: Accept and display URLs, ensure links work with http/https

## Design Direction

The design should evoke Microsoft's professional enterprise aesthetic - clean, organized, and confidence-inspiring. It should feel like a tool designed for busy marketing professionals who need instant visual clarity and efficient event management. The warm beige background provides a softer alternative to stark white, reducing eye strain during extended planning sessions. Solution colors should be bold and instantly recognizable, creating visual "swim lanes" through the calendar.

## Color Selection

A warm, professional palette with distinctive solution colors for instant recognition.

- **Primary Color**: Deep charcoal `oklch(0.25 0 0)` for primary text and UI elements - conveys professionalism and readability
- **Secondary Colors**: 
  - All Business Solutions: `oklch(0.62 0.15 35)` bright orange - energetic and all-encompassing
  - Cloud and AI Platforms: `oklch(0.65 0.12 160)` vibrant green - growth and innovation
  - Security: `oklch(0.55 0.15 240)` strong blue - trust and protection
  - All CSAs: `oklch(0.60 0.18 290)` rich purple - premium and strategic
- **Accent Color**: Golden yellow `oklch(0.85 0.15 85)` for the "+ Add Event" button - inviting and action-oriented
- **Foreground/Background Pairings**:
  - Background (Warm Beige `oklch(0.97 0.01 75)`): Charcoal text `oklch(0.25 0 0)` - Ratio 11.2:1 ✓
  - Card Background (White `oklch(1 0 0)`): Charcoal text `oklch(0.25 0 0)` - Ratio 12.6:1 ✓
  - Orange Solution `oklch(0.62 0.15 35)`: White text `oklch(1 0 0)` - Ratio 4.7:1 ✓
  - Add Event Button `oklch(0.85 0.15 85)`: Charcoal text `oklch(0.25 0 0)` - Ratio 9.1:1 ✓

## Font Selection

Segoe UI for clean corporate readability with 맑은 고딕 (Malgun Gothic) fallback for Korean characters, maintaining Microsoft's design language consistency.

- **Typographic Hierarchy**:
  - H1 (Month Title): Segoe UI Semibold/24px/tight - prominent but not overpowering
  - H2 (Modal Title): Segoe UI Semibold/20px/normal - clear hierarchy
  - Body (Event Title on Card): Segoe UI Regular/14px/1.4 line-height - readable at a glance
  - Small (Date Numbers): Segoe UI Regular/12px/normal - subtle but clear
  - Tiny (Continuation Indicators): Segoe UI Regular/11px/tight - minimal but functional
  - Labels (Form Fields): Segoe UI Semibold/13px/normal - clear guidance

## Animations

Animations should feel responsive and purposeful, never delaying user intent. Filter toggles should have subtle 200ms transitions for color/shadow changes. Modal entrances use a gentle 250ms fade + scale (0.95 to 1) for professional appearance. The Add Event button has a subtle hover lift (2px transform) with 150ms timing to signal interactivity. Calendar month transitions are instant (no animation) to maintain information density. Event cards have gentle hover state changes (150ms) with slight shadow increase to indicate clickability.

## Component Selection

- **Components**:
  - Dialog (Shadcn): For event detail and add event modals with backdrop dimming
  - Button (Shadcn): For filter pills, Add Event CTA, and modal actions - modified with rounded-full for pills
  - Calendar (Shadcn): Reference for date picker styling in Add Event modal
  - Label (Shadcn): Form field labels with asterisk support
  - Input (Shadcn): Text fields for title, time, URLs
  - Select (Shadcn): Dropdown for Solution and Location with custom option support
  - Card (Shadcn): Base for event cards with custom left border for solution color
  
- **Customizations**:
  - Custom CalendarGrid component with CSS Grid for week rows that auto-expand
  - Custom DayCell component with vertical flex stack for event cards
  - Custom EventCard with left color bar, title truncation, and location icon
  - Custom ContinuationMiniCard (18-24px height) with arrow indicators and solution color
  - Custom pill Button variant with solution-specific colors and active/inactive states
  
- **States**:
  - Filter pills: Active (colored background with white text) / Inactive (white background with colored border)
  - Event cards: Default (white bg, subtle shadow) / Hover (shadow increase, cursor pointer) / Multi-day continuation (compact, arrows visible)
  - Buttons: Default / Hover (slight lift/color shift) / Disabled (opacity 50%, no interaction)
  - Form inputs: Default / Focus (ring color) / Error (red border) / Filled (normal state)
  
- **Icon Selection**:
  - MapPin (Phosphor): Location indicator on event cards
  - CalendarBlank (Phosphor): Date indicators
  - CaretLeft/CaretRight (Phosphor): Month navigation arrows
  - Plus (Phosphor): Add Event button
  - X (Phosphor): Modal close buttons
  - ArrowLeft/ArrowRight (Phosphor): Multi-day event continuation indicators
  
- **Spacing**:
  - Calendar outer padding: p-6
  - Day cell padding: p-2
  - Event card gap: gap-2 (8px between stacked cards)
  - Card internal padding: p-3
  - Modal padding: p-6
  - Form field spacing: space-y-4
  
- **Mobile**:
  - Below 768px: Reduce font sizes (H1 to 20px, body to 13px)
  - Calendar cells: Reduce padding to p-1.5, maintain auto-expand behavior
  - Filter pills: Stack vertically or wrap naturally
  - Event cards: Single line titles (truncate more aggressively), smaller icons
  - Modals: Full-width on mobile with proper padding, forms remain usable
