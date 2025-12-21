# Marketing Calendar UI Specification / 마케팅 캘린더 UI 사양

이 문서는 마케팅 캘린더의 UI 설정 및 구조를 설명합니다. view-only 페이지를 위해 동일한 비율 및 크기의 캘린더를 만들 때 참고하세요.

This document describes the UI settings and structure of the marketing calendar. Use this as a reference when creating a view-only calendar with the same proportions and sizes.

---

## 1. 전체 레이아웃 (Overall Layout)

### Container
- **Maximum Width**: `2400px` (max-w-[2400px])
- **Container Padding**: `24px` (p-6)
- **Background Color**: Warm beige `oklch(0.97 0.01 75)`
- **Center Alignment**: `mx-auto` (horizontally centered)

### Calendar Container
- **Background**: White `oklch(1 0 0)`
- **Border**: `1px solid oklch(0.88 0.01 75)`
- **Border Radius**: `12px` (rounded-xl)
- **Box Shadow**: Subtle shadow `shadow-sm`
- **Overflow**: Hidden to maintain rounded corners

---

## 2. 캘린더 그리드 구조 (Calendar Grid Structure)

### Grid Configuration
- **Display**: CSS Grid with 7 columns (one per weekday)
- **Column Configuration**: `grid-cols-7` (equal width columns)
- **Week Rows**: Auto-expanding height based on content

### Weekday Header
- **Grid**: 7 columns matching calendar days
- **Height**: Auto (based on padding)
- **Padding**: `12px` (p-3)
- **Text**:
  - Font Size: `14px` (text-sm)
  - Font Weight: `600` (font-semibold)
  - Color: `oklch(0.50 0 0)` (text-muted-foreground)
  - Alignment: Center
- **Background**: `oklch(0.94 0.01 75)` with 30% opacity (bg-muted/30)
- **Border Bottom**: `1px solid oklch(0.88 0.01 75)`
- **Weekday Names**: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

### Day Cells
- **Display**: Flexbox with vertical layout
- **Padding**: `10px` (p-2.5)
- **Min Height**: `100px` per cell (min-h-[100px])
- **Border Right**: `1px solid oklch(0.88 0.01 75)` (last cell has no border)
- **Border Bottom**: `1px solid oklch(0.88 0.01 75)` (last row has no border)
- **Gap Between Events**: `6px` (gap-1.5)

#### Current Month Days
- **Background**: White `oklch(1 0 0)`
- **Day Number Color**: `oklch(0.25 0 0)` (text-foreground)

#### Other Month Days
- **Background**: `oklch(0.94 0.01 75)` with 20% opacity (bg-muted/20)
- **Day Number Color**: `oklch(0.50 0 0)` (text-muted-foreground)

#### Day Number
- **Font Size**: `14px` (text-sm)
- **Font Weight**: `500` (font-medium)
- **Display**: Top of the cell

---

## 3. 이벤트 카드 (Event Cards)

### Full Event Card (Start Date or Single-Day Event)
- **Background**: White `oklch(1 0 0)` (bg-card)
- **Border Radius**: `8px` (rounded-lg)
- **Padding**: `10px` (p-2.5)
- **Border Left**: `5px solid` with solution color (border-l-[5px])
- **Flex Layout**: Column direction with `4px` gap (gap-1)
- **Box Shadow**: Default subtle, increases on hover
- **Transition**: `150ms` duration for smooth hover effect
- **Cursor**: `pointer`

#### Event Card Title
- **Font Size**: `12px` (text-xs)
- **Font Weight**: `500` (font-medium)
- **Line Height**: `1.4` (leading-snug)
- **Text Clamp**: 2 lines maximum (line-clamp-2)
- **Color**: `oklch(0.25 0 0)` (foreground)

#### Location Display
- **Font Size**: `11px` (text-[11px])
- **Color**: `oklch(0.50 0 0)` (text-muted-foreground)
- **Icon**: MapPin (Phosphor Icons) at `11px` with fill weight
- **Layout**: Flex row with `6px` gap (gap-1.5)
- **Text**: Truncate with ellipsis

#### URL Links (Registration & Viva Engage)
- **Font Size**: `11px` (text-[11px])
- **Font Weight**: `500` (font-medium)
- **Color**: `oklch(0.60 0.15 240)` (text-ring - blue)
- **Icon**: Link icon (Phosphor Icons) at `11px` with bold weight
- **Layout**: Flex row with `8px` gap between links (gap-2)
- **Hover**: Underline
- **Button Labels**: "Reg" for Registration, "Viva" for Viva Engage

### Continuation Cards (Multi-Day Events)
- **Height**: `24px` (h-6) - compact size
- **Border Radius**: `4px` (rounded)
- **Padding**: `8px` (px-2)
- **Border Left**: `5px solid` with solution color
- **Background**: `oklch(0.98 0.005 75)` - very light neutral
- **Flex Layout**: Row with `8px` gap (gap-2)
- **Alignment**: Items centered vertically

#### Continuation Indicators
- **Arrow Icons**: ArrowRight (Phosphor Icons) at `12px` with bold weight
- **Arrow Color**: Solution color
- **Title Text**:
  - Font Size: `11px` (text-[11px])
  - Style: Italic
  - Color: Solution color
  - Truncate: Single line with ellipsis

---

## 4. 솔루션 색상 (Solution Colors)

Each solution has a distinctive color used for borders, text, and indicators:

### AI Business Solutions
- **Color**: `oklch(0.62 0.15 35)` - Bright orange
- **Usage**: Border left on cards, continuation text/icons, filter pills

### Cloud and AI Platforms
- **Color**: `oklch(0.65 0.12 160)` - Vibrant green
- **Usage**: Border left on cards, continuation text/icons, filter pills

### Security
- **Color**: `oklch(0.55 0.15 240)` - Strong blue
- **Usage**: Border left on cards, continuation text/icons, filter pills

### All CSAs
- **Color**: `oklch(0.60 0.18 290)` - Rich purple
- **Usage**: Border left on cards, continuation text/icons, filter pills

---

## 5. 타이포그래피 (Typography)

### Font Family
```css
font-family: 'Noto Sans KR', 'Segoe UI', 'Malgun Gothic', -apple-system, BlinkMacSystemFont, sans-serif;
```

### Font Sizes and Weights
- **Month Title (H1)**: 24px / 600 weight (text-2xl font-semibold)
- **Day Numbers**: 14px / 500 weight (text-sm font-medium)
- **Weekday Headers**: 14px / 600 weight (text-sm font-semibold)
- **Event Card Title**: 12px / 500 weight (text-xs font-medium)
- **Location & Links**: 11px / 400 weight for location, 500 for links (text-[11px])
- **Continuation Cards**: 11px / 400 weight italic (text-[11px] italic)

---

## 6. 간격 및 패딩 (Spacing and Padding)

### Calendar Level
- **Outer Container**: `24px` padding (p-6)
- **Header Margin Bottom**: `32px` (mb-8)
- **Filter Margin Bottom**: `28px` (mb-7)

### Grid Level
- **Weekday Header Padding**: `12px` (p-3)
- **Day Cell Padding**: `10px` (p-2.5)
- **Event Stack Gap**: `6px` (gap-1.5)

### Card Level
- **Full Card Padding**: `10px` (p-2.5)
- **Continuation Card Padding**: `8px horizontal` (px-2)
- **Card Internal Gap**: `4px` (gap-1)
- **Location/Links Gap**: `6px` (gap-1.5)
- **Between Links**: `8px` (gap-2)

---

## 7. 반응형 동작 (Responsive Behavior)

### Auto-Expanding Cells
- Day cells use `flex-col` with `flex-1` on the event container
- Minimum height is `100px` but cells expand automatically
- All cells in a week row share the same height (grid row behavior)
- No scrolling within cells
- No "+n more" indicators

### Mobile Considerations (< 768px)
Note: Current implementation is desktop-focused. For view-only mobile:
- Reduce font sizes by ~1-2px
- Reduce cell padding to `p-1.5` (6px)
- Maintain auto-expand behavior
- Single-line event titles with more aggressive truncation

---

## 8. 테마 변수 (Theme Variables)

### CSS Custom Properties (from index.css)
```css
:root {
  --background: oklch(0.97 0.01 75);
  --foreground: oklch(0.25 0 0);
  --card: oklch(1 0 0);
  --card-foreground: oklch(0.25 0 0);
  --muted: oklch(0.94 0.01 75);
  --muted-foreground: oklch(0.50 0 0);
  --border: oklch(0.88 0.01 75);
  --ring: oklch(0.60 0.15 240);
  --radius: 0.75rem;
}
```

### Tailwind Theme Mapping
```javascript
{
  colors: {
    background: 'var(--background)',
    foreground: 'var(--foreground)',
    card: 'var(--card)',
    'card-foreground': 'var(--card-foreground)',
    muted: 'var(--muted)',
    'muted-foreground': 'var(--muted-foreground)',
    border: 'var(--border)',
    ring: 'var(--ring)',
  },
  borderRadius: {
    lg: 'var(--radius)',
    md: 'calc(var(--radius) - 2px)',
    sm: 'calc(var(--radius) - 4px)',
  }
}
```

---

## 9. 컴포넌트 구조 (Component Structure)

### Hierarchy
```
App
├── Header
│   ├── Month Navigation (left/right buttons)
│   └── Month/Year Title
├── Calendar Grid Container
│   ├── Weekday Header Row
│   └── Week Rows (auto-expand)
│       └── Day Cells (7 per row)
│           ├── Day Number
│           └── Event Stack
│               ├── Full Event Cards (or)
│               └── Continuation Cards
```

### Key Props and State
- **weeks**: `CalendarWeek[]` - Generated by `getCalendarGrid(year, month)`
- **events**: `Event[]` - Filtered list of events
- **activeFilters**: `Set<Solution>` - Active solution filters
- **currentDate**: `Date` - Currently displayed month

---

## 10. 이벤트 데이터 구조 (Event Data Structure)

### Event Interface
```typescript
interface Event {
  id: string;
  title: string;
  solution: Solution;
  startDate: string;        // Format: "YYYY-MM-DD"
  endDate?: string;         // Optional, defaults to startDate
  time?: string;            // Optional time string
  location: string;
  registrationUrl?: string; // Optional URL
  vivaEngageUrl?: string;   // Optional URL
}
```

### Date Format
- **Format**: ISO date string `"YYYY-MM-DD"` (e.g., "2024-12-21")
- **Timezone**: Korea Standard Time (KST / UTC+9)
- **Parsing**: Uses `parseDate()` which adds `T00:00:00+09:00`

---

## 11. 캘린더 생성 로직 (Calendar Generation Logic)

### Week Grid Generation
```typescript
// From lib/calendar.ts
getCalendarGrid(year: number, month: number): CalendarWeek[]
```

1. Get first day of month and last day of month
2. Extend to include previous month days (to fill first week)
3. Extend to include next month days (to fill last week)
4. Always shows complete weeks (7 days × 4-6 weeks)
5. Each day marked with `isCurrentMonth` boolean

### Event Positioning
```typescript
getEventPosition(date: string, startDate: string, endDate?: string): 
  'start' | 'middle' | 'end' | 'single'
```

- **'single'**: One-day event (startDate === endDate)
- **'start'**: First day of multi-day event
- **'middle'**: Days between start and end
- **'end'**: Last day of multi-day event

---

## 12. 접근성 및 상호작용 (Accessibility & Interactions)

### Interactive Elements
- **Event Cards**: Clickable with pointer cursor
- **Links**: Stop propagation to prevent modal opening
- **Hover States**: 
  - Event cards: Shadow increase in 150ms
  - Links: Underline
  - Continuation cards: Opacity reduction to 90%

### Transitions
- **Duration**: 150ms for cards, 200ms for filters
- **Easing**: Default ease function
- **Properties**: `opacity`, `box-shadow`, `transform` (for buttons)

---

## 13. 구현 체크리스트 (Implementation Checklist)

view-only 페이지를 만들 때 다음 사항들을 포함하세요:

### Required Elements
- [ ] Container with max-width 2400px
- [ ] 7-column grid layout
- [ ] Weekday header row
- [ ] Auto-expanding day cells (min-height: 100px)
- [ ] Day numbers with proper styling
- [ ] Event cards with 5px left border (solution color)
- [ ] Continuation cards (24px height) for multi-day events
- [ ] Solution colors correctly applied
- [ ] Location icon and text display
- [ ] URL links (if applicable for view-only)
- [ ] Proper font family and sizes
- [ ] Warm beige background color
- [ ] Border and spacing matching specifications

### Optional Enhancements
- [ ] Filter pills (if filtering needed)
- [ ] Month navigation (if multiple months)
- [ ] Hover states (if interactive)
- [ ] Modal views (if detail viewing needed)

---

## 14. CSS 클래스 참조 (CSS Class Reference)

### Quick Reference for Common Styles
```css
/* Container */
.max-w-\[2400px\] { max-width: 2400px; }
.mx-auto { margin-left: auto; margin-right: auto; }
.p-6 { padding: 24px; }

/* Grid */
.grid-cols-7 { grid-template-columns: repeat(7, minmax(0, 1fr)); }

/* Cell */
.min-h-\[100px\] { min-height: 100px; }
.p-2\.5 { padding: 10px; }
.gap-1\.5 { gap: 6px; }

/* Typography */
.text-xs { font-size: 12px; }
.text-sm { font-size: 14px; }
.text-\[11px\] { font-size: 11px; }
.font-medium { font-weight: 500; }
.font-semibold { font-weight: 600; }

/* Colors */
.bg-background { background-color: oklch(0.97 0.01 75); }
.bg-card { background-color: oklch(1 0 0); }
.text-muted-foreground { color: oklch(0.50 0 0); }

/* Border */
.border-l-\[5px\] { border-left-width: 5px; }
.rounded-lg { border-radius: 8px; }
.rounded-xl { border-radius: 12px; }
```

---

## 15. 참고 파일 (Reference Files)

구현 시 다음 파일들을 참고하세요:

### Core Files
- **App.tsx**: Main layout and state management
- **CalendarGrid.tsx**: Grid rendering and event display logic
- **EventCard.tsx**: Event card rendering with solution colors
- **lib/types.ts**: Solution colors and event interface
- **lib/calendar.ts**: Calendar generation and date utilities
- **index.css**: Theme variables and global styles
- **tailwind.config.js**: Tailwind configuration

### Key Functions
- `getCalendarGrid(year, month)`: Generates week grid
- `getEventPosition(date, startDate, endDate)`: Determines event position
- `getSolutionColor(solution)`: Returns solution-specific color
- `isDateInRange(date, startDate, endDate)`: Checks if date is in event range

---

## 요약 (Summary)

### 핵심 치수 (Key Dimensions)
- Container: 2400px max-width, 24px padding
- Day cells: 100px min-height, 10px padding
- Full event cards: 5px left border, 10px padding
- Continuation cards: 24px height, 5px left border
- Event gap: 6px between stacked events

### 핵심 색상 (Key Colors)
- Background: `oklch(0.97 0.01 75)` (warm beige)
- Card: `oklch(1 0 0)` (white)
- Text: `oklch(0.25 0 0)` (charcoal)
- Border: `oklch(0.88 0.01 75)` (light gray)
- Solution colors: See section 4

### 핵심 기능 (Key Features)
- Auto-expanding day cells (no scroll, no +n more)
- 7-column CSS Grid layout
- Multi-day event visualization with continuation cards
- Solution-specific color coding
- Clean, professional Microsoft aesthetic
