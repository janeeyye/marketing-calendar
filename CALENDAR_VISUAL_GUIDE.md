# Calendar Visual Structure Guide / 캘린더 시각적 구조 가이드

This document provides visual representations of the calendar structure to complement the technical specifications.

---

## Calendar Layout Visualization / 캘린더 레이아웃 시각화

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│                         Max-width: 2400px                                       │
│  ┌──────────────────────────────────────────────────────────────────────────┐   │
│  │  Padding: 24px (p-6)                                                     │   │
│  │                                                                          │   │
│  │  ┌────────────────────────────────────────────────────────────────────┐ │   │
│  │  │  Calendar Container (White background, rounded-xl)                 │ │   │
│  │  │                                                                    │ │   │
│  │  │  ┌──────────────────────────────────────────────────────────────┐ │ │   │
│  │  │  │  Weekday Header (7 columns, bg-muted/30)                     │ │ │   │
│  │  │  │  Sun   Mon   Tue   Wed   Thu   Fri   Sat                     │ │ │   │
│  │  │  │  (padding: 12px, font: 14px/600)                             │ │ │   │
│  │  │  └──────────────────────────────────────────────────────────────┘ │ │   │
│  │  │                                                                    │ │   │
│  │  │  ┌──────────────────────────────────────────────────────────────┐ │ │   │
│  │  │  │  Week Row 1 (Auto-height, grid-cols-7)                       │ │ │   │
│  │  │  │  ┌─────┬─────┬─────┬─────┬─────┬─────┬─────┐                │ │ │   │
│  │  │  │  │ 28  │ 29  │ 30  │  1  │  2  │  3  │  4  │                │ │ │   │
│  │  │  │  │     │     │     │[Evt]│[Evt]│     │     │  Min: 100px    │ │ │   │
│  │  │  │  │     │     │     │[Evt]│     │     │     │  Auto-expand   │ │ │   │
│  │  │  │  └─────┴─────┴─────┴─────┴─────┴─────┴─────┘                │ │ │   │
│  │  │  └──────────────────────────────────────────────────────────────┘ │ │   │
│  │  │                                                                    │ │   │
│  │  │  ┌──────────────────────────────────────────────────────────────┐ │ │   │
│  │  │  │  Week Row 2-5 (Same structure as Week Row 1)                 │ │ │   │
│  │  │  │  ...                                                          │ │ │   │
│  │  │  └──────────────────────────────────────────────────────────────┘ │ │   │
│  │  │                                                                    │ │   │
│  │  └────────────────────────────────────────────────────────────────────┘ │   │
│  │                                                                          │   │
│  └──────────────────────────────────────────────────────────────────────────┘   │
│                                                                                 │
└─────────────────────────────────────────────────────────────────────────────────┘
```

---

## Day Cell Structure / 일자 셀 구조

```
┌──────────────────────────────────────┐
│ Day Cell (min-h: 100px, p: 10px)    │
│ ┌──────────────────────────────────┐ │
│ │ 15                               │ │  ← Day number (14px, font-medium)
│ │ (text-sm font-medium)            │ │
│ └──────────────────────────────────┘ │
│                                      │
│ ┌──────────────────────────────────┐ │
│ │ Event Stack (gap: 6px)           │ │
│ │                                  │ │
│ │ ┌──────────────────────────────┐ │ │
│ │ ║ Event Card 1                 │ │ │  ← 5px colored border left
│ │ ║ (Full card or continuation)  │ │ │
│ │ └──────────────────────────────┘ │ │
│ │                                  │ │
│ │ ↓ 6px gap                        │ │
│ │                                  │ │
│ │ ┌──────────────────────────────┐ │ │
│ │ ║ Event Card 2                 │ │ │
│ │ ║                              │ │ │
│ │ └──────────────────────────────┘ │ │
│ │                                  │ │
│ │ ... (more events auto-expand)   │ │
│ │                                  │ │
│ └──────────────────────────────────┘ │
│                                      │
└──────────────────────────────────────┘
```

---

## Full Event Card Structure / 전체 이벤트 카드 구조

```
┌──────────────────────────────────────────────────────┐
║ Full Event Card                                      │  ← 5px solution color border left
║ (bg: white, rounded-lg, p: 10px)                     │
║                                                      │
║ ┌──────────────────────────────────────────────────┐ │
║ │ Event Title (1-2 lines)                          │ │  ← 12px font-medium
║ │ (text-xs font-medium, line-clamp-2)         →   │ │  ← Arrow if multi-day
║ └──────────────────────────────────────────────────┘ │
║                                                      │
║ ┌──────────────────────────────────────────────────┐ │
║ │ 📍 마이크로소프트 13층                            │ │  ← 11px with MapPin icon
║ └──────────────────────────────────────────────────┘ │
║                                                      │
║ ┌──────────────────────────────────────────────────┐ │
║ │ 🔗 Reg    🔗 Viva                               │ │  ← 11px links (if URLs exist)
║ └──────────────────────────────────────────────────┘ │
║                                                      │
└──────────────────────────────────────────────────────┘

Height: Auto (based on content)
Hover: Shadow increases, cursor: pointer
Transition: 150ms
```

---

## Continuation Card Structure / 연속 이벤트 카드 구조

```
┌──────────────────────────────────────────────────────┐
║ → Event Title (italic, truncate)                     │  ← 5px solution color border left
║ (h: 24px, px: 8px)                                   │
└──────────────────────────────────────────────────────┘

Components:
- Arrow icon: 12px, bold weight, solution color
- Text: 11px italic, solution color, truncate
- Background: oklch(0.98 0.005 75) - very light
- Height: Fixed 24px (compact)
```

---

## Multi-Day Event Flow / 다일 이벤트 흐름

```
Day 1 (Start)         Day 2 (Middle)        Day 3 (Middle)        Day 4 (End)
┌──────────────┐      ┌──────────────┐      ┌──────────────┐      ┌──────────────┐
║ Full Card    │      ║ → Title      │      ║ → Title      │      ║ → Title      │
║ Title     →  │      ║ (24px)       │      ║ (24px)       │      ║ (24px)       │
║ 📍 Location  │      └──────────────┘      └──────────────┘      └──────────────┘
║ 🔗 Links     │
└──────────────┘

- Start: Full card with all details, right arrow
- Middle: Compact continuation card (24px), right arrow
- End: Compact continuation card (24px), no arrow
- All cards: Same solution color, all clickable
```

---

## Solution Color System / 솔루션 색상 시스템

```
AI Business Solutions
┌──────────────────────────────┐
║ oklch(0.62 0.15 35)          │  Bright Orange
║ Example Event                │  RGB: ~190, 105, 50
║ 📍 Location                  │
└──────────────────────────────┘

Cloud and AI Platforms
┌──────────────────────────────┐
║ oklch(0.65 0.12 160)         │  Vibrant Green
║ Example Event                │  RGB: ~70, 175, 130
║ 📍 Location                  │
└──────────────────────────────┘

Security
┌──────────────────────────────┐
║ oklch(0.55 0.15 240)         │  Strong Blue
║ Example Event                │  RGB: ~55, 100, 180
║ 📍 Location                  │
└──────────────────────────────┘

All CSAs
┌──────────────────────────────┐
║ oklch(0.60 0.18 290)         │  Rich Purple
║ Example Event                │  RGB: ~165, 85, 175
║ 📍 Location                  │
└──────────────────────────────┘
```

---

## Spacing System / 간격 시스템

```
Vertical Spacing Flow:

Container Top Padding (24px)
  ↓
Header Section
  ↓ 32px (mb-8)
Filter Section
  ↓ 28px (mb-7)
Calendar Grid
  ├─ Weekday Header (p: 12px)
  ├─ Border (1px)
  ├─ Week Row 1
  │   ├─ Day Cell (p: 10px)
  │   │   ├─ Day Number
  │   │   ├─ Event Card 1
  │   │   ├─ Gap (6px)
  │   │   ├─ Event Card 2
  │   │   ├─ Gap (6px)
  │   │   └─ Event Card 3 (auto-expand)
  │   └─ Border Right (1px)
  ├─ Border Bottom (1px)
  ├─ Week Row 2-5 (same structure)
  └─ Border (1px)
  ↓
Container Bottom Padding (24px)

Horizontal Spacing:
Container: 24px padding left/right
Day Cells: 10px padding left/right
Event Cards: 10px padding left/right
Continuation Cards: 8px padding left/right
```

---

## Typography Scale / 타이포그래피 스케일

```
24px (text-2xl)    ━━━━━━━ Month Title (Semibold)
                   
20px              ━━━━━━━ Modal Titles (Semibold)

14px (text-sm)    ━━━━━━━ Day Numbers (Medium)
                  ━━━━━━━ Weekday Headers (Semibold)

12px (text-xs)    ━━━━━━━ Event Card Titles (Medium)

11px (text-[11px]) ━━━━━━ Location Text (Regular)
                  ━━━━━━ Link Text (Medium)
                  ━━━━━━ Continuation Text (Regular Italic)
```

---

## Grid Layout Dimensions / 그리드 레이아웃 치수

```
Container Width Breakdowns:

Desktop (2400px max-width):
┌────────────────────────────────────────────────────────────┐
│ 24px │         Calendar Grid (2352px)               │ 24px │
│      │                                               │      │
│      │  ┌──────────────────────────────────────────┐│      │
│      │  │ 7 Columns × ~336px each = 2352px total  ││      │
│      │  │                                          ││      │
│      │  │  Each Day Cell: ~336px width            ││      │
│      │  │  (Calculated: 2352px / 7 = 336px)       ││      │
│      │  │                                          ││      │
│      │  │  Cell Content Area: ~316px              ││      │
│      │  │  (Minus 10px padding on each side)      ││      │
│      │  └──────────────────────────────────────────┘│      │
│      │                                               │      │
└────────────────────────────────────────────────────────────┘

Height Calculations:

Minimum Week Row Height:
- Day cell min-height: 100px
- Includes: Day number + at least 1-2 event cards
- Auto-expands based on content

Typical Event Card Heights:
- Full card: ~60-80px (varies by content)
- Continuation card: 24px (fixed)
- Gap between cards: 6px

Example with 3 events:
Day Number:     ~20px
Gap:            ~4px
Event 1 (Full): ~70px
Gap:             6px
Event 2 (Full): ~70px
Gap:             6px
Event 3 (Cont): 24px
─────────────────────
Total:         ~200px (cell auto-expands to this height)
```

---

## Color Variables Reference / 색상 변수 참조

```css
/* Main Background Colors */
--background: oklch(0.97 0.01 75);       /* Warm beige page bg */
--card: oklch(1 0 0);                    /* White card bg */
--muted: oklch(0.94 0.01 75);            /* Muted backgrounds */

/* Text Colors */
--foreground: oklch(0.25 0 0);           /* Charcoal - main text */
--muted-foreground: oklch(0.50 0 0);     /* Gray - secondary text */

/* Border Colors */
--border: oklch(0.88 0.01 75);           /* Light gray borders */
--ring: oklch(0.60 0.15 240);            /* Blue - focus rings */

/* Solution Colors */
--solution-ai-business: oklch(0.62 0.15 35);    /* Orange */
--solution-cloud-ai: oklch(0.65 0.12 160);      /* Green */
--solution-security: oklch(0.55 0.15 240);      /* Blue */
--solution-all-csa: oklch(0.60 0.18 290);       /* Purple */
```

---

## Implementation Quick Reference / 구현 빠른 참조

### Essential HTML Structure

```html
<div class="max-w-[2400px] mx-auto p-6 bg-background">
  
  <!-- Calendar Container -->
  <div class="bg-white rounded-xl shadow-sm border border-border">
    
    <!-- Weekday Header -->
    <div class="grid grid-cols-7 border-b border-border">
      <div class="p-3 text-center text-sm font-semibold text-muted-foreground bg-muted/30">
        Sun
      </div>
      <!-- Repeat for Mon-Sat -->
    </div>
    
    <!-- Week Rows -->
    <div class="grid grid-cols-7 border-b border-border">
      
      <!-- Day Cell -->
      <div class="p-2.5 border-r border-border flex flex-col gap-1.5 min-h-[100px]">
        <div class="text-sm font-medium">1</div>
        
        <!-- Event Stack -->
        <div class="flex flex-col gap-1.5 flex-1">
          
          <!-- Full Event Card -->
          <div class="bg-card rounded-lg p-2.5 border-l-[5px]" 
               style="border-left-color: oklch(0.62 0.15 35)">
            <h3 class="text-xs font-medium line-clamp-2">Event Title</h3>
            <div class="flex items-center gap-1.5 text-[11px] text-muted-foreground">
              <svg><!-- MapPin icon --></svg>
              <span>Location</span>
            </div>
          </div>
          
          <!-- Continuation Card -->
          <div class="h-6 rounded flex items-center gap-2 px-2 border-l-[5px]"
               style="border-left-color: oklch(0.65 0.12 160); 
                      background-color: oklch(0.98 0.005 75)">
            <svg><!-- ArrowRight icon --></svg>
            <span class="text-[11px] italic truncate" 
                  style="color: oklch(0.65 0.12 160)">
              Event Title
            </span>
          </div>
          
        </div>
      </div>
      
      <!-- Repeat for other days -->
    </div>
    
    <!-- More week rows -->
  </div>
</div>
```

### CSS Grid Setup

```css
/* Container */
.calendar-container {
  max-width: 2400px;
  margin: 0 auto;
  padding: 24px;
}

/* Calendar Grid */
.calendar-grid {
  display: grid;
  grid-template-columns: repeat(7, minmax(0, 1fr));
}

/* Week Row */
.week-row {
  display: grid;
  grid-template-columns: repeat(7, minmax(0, 1fr));
  border-bottom: 1px solid oklch(0.88 0.01 75);
}

/* Day Cell */
.day-cell {
  display: flex;
  flex-direction: column;
  gap: 6px;
  min-height: 100px;
  padding: 10px;
  border-right: 1px solid oklch(0.88 0.01 75);
}

.day-cell:last-child {
  border-right: none;
}
```

---

## Measurements Cheat Sheet / 측정 치트시트

| Element | Width | Height | Padding | Gap/Margin |
|---------|-------|--------|---------|------------|
| Container | 2400px max | Auto | 24px all | - |
| Calendar Grid | 100% | Auto | 0 | - |
| Week Row | 100% | Auto | 0 | 0 |
| Day Cell | ~14.28% | 100px min | 10px all | 6px vertical |
| Weekday Header | ~14.28% | Auto | 12px all | 0 |
| Full Event Card | 100% | Auto | 10px all | 6px between |
| Continuation Card | 100% | 24px | 0 8px | 6px between |
| Day Number | Auto | Auto | 0 | 4px bottom |
| Event Title | 100% | Auto | 0 | 2-4px bottom |
| Location Row | 100% | Auto | 0 | 2px bottom |
| Link Row | 100% | Auto | 0 | 0 |

---

## Implementation Priority Checklist / 구현 우선순위 체크리스트

### Phase 1: Core Structure
- [ ] Set up container with 2400px max-width and 24px padding
- [ ] Create 7-column grid for calendar
- [ ] Add weekday header row with proper styling
- [ ] Implement day cells with min-height 100px
- [ ] Add borders between cells and rows

### Phase 2: Event Display
- [ ] Create full event card component with 5px left border
- [ ] Add event title with 2-line clamp
- [ ] Add location display with icon
- [ ] Implement solution color system
- [ ] Add continuation card for multi-day events

### Phase 3: Content & Data
- [ ] Connect event data to calendar grid
- [ ] Implement date range logic for multi-day events
- [ ] Add event positioning logic (start/middle/end)
- [ ] Ensure proper event stacking with gaps

### Phase 4: Polish
- [ ] Add hover states (if interactive)
- [ ] Add URL links (if needed)
- [ ] Test with various event counts
- [ ] Verify auto-expand behavior
- [ ] Check responsive behavior

---

이 문서가 view-only 캘린더를 만드는 데 도움이 되기를 바랍니다!
Hope this guide helps you create your view-only calendar!
