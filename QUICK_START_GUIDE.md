# Quick Start Guide for View-Only Calendar / View-Only 캘린더 빠른 시작 가이드

This is a simplified guide to quickly replicate the marketing calendar's UI in a view-only page.

---

## 📋 Essential Information / 필수 정보

### Core Dimensions / 핵심 치수
- **Container**: 2400px max-width, 24px padding
- **Day Cells**: 100px minimum height, auto-expanding
- **Full Event Cards**: Auto height, 10px padding, 5px left color border
- **Continuation Cards**: 24px fixed height, 8px horizontal padding

### Core Colors / 핵심 색상
```css
Background:      oklch(0.97 0.01 75)   /* Warm beige */
Card:            oklch(1 0 0)          /* White */
Text:            oklch(0.25 0 0)       /* Charcoal */
Border:          oklch(0.88 0.01 75)   /* Light gray */

Solution Colors:
AI Business:     oklch(0.62 0.15 35)   /* Orange */
Cloud & AI:      oklch(0.65 0.12 160)  /* Green */
Security:        oklch(0.55 0.15 240)  /* Blue */
All CSAs:        oklch(0.60 0.18 290)  /* Purple */
```

### Core Typography / 핵심 타이포그래피
```
Font Family: 'Noto Sans KR', 'Segoe UI', 'Malgun Gothic', sans-serif

Day Numbers:     14px, weight 500
Event Titles:    12px, weight 500
Location/Links:  11px, weight 400-500
```

---

## 🎯 Implementation Steps / 구현 단계

### Step 1: Container Setup
```html
<div class="container">
  <!-- max-width: 2400px -->
  <!-- margin: 0 auto -->
  <!-- padding: 24px -->
  <!-- background-color: oklch(0.97 0.01 75) -->
</div>
```

### Step 2: Calendar Grid
```html
<div class="calendar">
  <!-- background: white -->
  <!-- border-radius: 12px -->
  <!-- border: 1px solid oklch(0.88 0.01 75) -->
  
  <div class="weekday-header">
    <!-- 7 columns: Sun, Mon, Tue, Wed, Thu, Fri, Sat -->
  </div>
  
  <div class="week-rows">
    <!-- 4-6 week rows, each with 7 day cells -->
  </div>
</div>
```

### Step 3: Day Cell Structure
```html
<div class="day-cell">
  <!-- min-height: 100px -->
  <!-- padding: 10px -->
  <!-- display: flex, flex-direction: column -->
  <!-- gap: 6px -->
  
  <div class="day-number">15</div>
  
  <div class="events">
    <!-- Event cards stacked with 6px gap -->
  </div>
</div>
```

### Step 4: Event Cards
```html
<!-- Full Event Card -->
<div class="event-card full">
  <!-- border-left: 5px solid [solution-color] -->
  <!-- padding: 10px -->
  <!-- background: white -->
  <!-- border-radius: 8px -->
  
  <h3>Event Title</h3>        <!-- 12px, max 2 lines -->
  <div class="location">      <!-- 11px with icon -->
    📍 Location
  </div>
  <div class="links">         <!-- 11px, optional -->
    🔗 Reg  🔗 Viva
  </div>
</div>

<!-- Continuation Card (for multi-day events) -->
<div class="event-card continuation">
  <!-- height: 24px -->
  <!-- border-left: 5px solid [solution-color] -->
  <!-- background: oklch(0.98 0.005 75) -->
  <!-- padding: 0 8px -->
  
  → <span>Event Title</span>  <!-- 11px, italic, truncate -->
</div>
```

---

## 🎨 CSS Template / CSS 템플릿

```css
/* Container */
.container {
  max-width: 2400px;
  margin: 0 auto;
  padding: 24px;
  background-color: oklch(0.97 0.01 75);
  font-family: 'Noto Sans KR', 'Segoe UI', 'Malgun Gothic', sans-serif;
}

/* Calendar */
.calendar {
  background: white;
  border-radius: 12px;
  border: 1px solid oklch(0.88 0.01 75);
  overflow: hidden;
}

/* Weekday Header */
.weekday-header {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  border-bottom: 1px solid oklch(0.88 0.01 75);
}

.weekday-header > div {
  padding: 12px;
  text-align: center;
  font-size: 14px;
  font-weight: 600;
  color: oklch(0.50 0 0);
  background-color: oklch(0.94 0.01 75 / 0.3);
}

/* Week Row */
.week-row {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  border-bottom: 1px solid oklch(0.88 0.01 75);
}

.week-row:last-child {
  border-bottom: none;
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

.day-cell.other-month {
  background-color: oklch(0.94 0.01 75 / 0.2);
}

.day-number {
  font-size: 14px;
  font-weight: 500;
  color: oklch(0.25 0 0);
}

.day-cell.other-month .day-number {
  color: oklch(0.50 0 0);
}

/* Events Container */
.events {
  display: flex;
  flex-direction: column;
  gap: 6px;
  flex: 1;
}

/* Full Event Card */
.event-card.full {
  background: white;
  border-radius: 8px;
  padding: 10px;
  border-left: 5px solid;
  cursor: pointer;
  transition: box-shadow 150ms;
}

.event-card.full:hover {
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
}

.event-card.full h3 {
  font-size: 12px;
  font-weight: 500;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  margin: 0 0 4px 0;
}

.event-card.full .location {
  font-size: 11px;
  color: oklch(0.50 0 0);
  display: flex;
  align-items: center;
  gap: 6px;
}

.event-card.full .links {
  font-size: 11px;
  font-weight: 500;
  color: oklch(0.60 0.15 240);
  display: flex;
  gap: 8px;
  margin-top: 2px;
}

/* Continuation Event Card */
.event-card.continuation {
  height: 24px;
  border-radius: 4px;
  padding: 0 8px;
  border-left: 5px solid;
  background-color: oklch(0.98 0.005 75);
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
}

.event-card.continuation span {
  font-size: 11px;
  font-style: italic;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  flex: 1;
}

/* Solution Color Classes */
.solution-ai-business {
  border-left-color: oklch(0.62 0.15 35);
}

.solution-cloud-ai {
  border-left-color: oklch(0.65 0.12 160);
}

.solution-security {
  border-left-color: oklch(0.55 0.15 240);
}

.solution-all-csa {
  border-left-color: oklch(0.60 0.18 290);
}

.continuation.solution-ai-business span,
.continuation.solution-ai-business::before {
  color: oklch(0.62 0.15 35);
}

.continuation.solution-cloud-ai span,
.continuation.solution-cloud-ai::before {
  color: oklch(0.65 0.12 160);
}

.continuation.solution-security span,
.continuation.solution-security::before {
  color: oklch(0.55 0.15 240);
}

.continuation.solution-all-csa span,
.continuation.solution-all-csa::before {
  color: oklch(0.60 0.18 290);
}

.continuation::before {
  content: '→';
  font-weight: bold;
  font-size: 12px;
}
```

---

## 📊 Sample HTML Structure / 샘플 HTML 구조

```html
<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Marketing Calendar - View Only</title>
  <link rel="stylesheet" href="calendar.css">
  <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;500;600&display=swap" rel="stylesheet">
</head>
<body>
  <div class="container">
    <div class="calendar">
      
      <!-- Weekday Header -->
      <div class="weekday-header">
        <div>Sun</div>
        <div>Mon</div>
        <div>Tue</div>
        <div>Wed</div>
        <div>Thu</div>
        <div>Fri</div>
        <div>Sat</div>
      </div>
      
      <!-- Week Row Example -->
      <div class="week-row">
        
        <!-- Sunday (Previous Month) -->
        <div class="day-cell other-month">
          <div class="day-number">29</div>
          <div class="events"></div>
        </div>
        
        <!-- Monday (Previous Month) -->
        <div class="day-cell other-month">
          <div class="day-number">30</div>
          <div class="events"></div>
        </div>
        
        <!-- Tuesday (Current Month - Day 1) -->
        <div class="day-cell">
          <div class="day-number">1</div>
          <div class="events">
            <!-- Full Event Card -->
            <div class="event-card full solution-ai-business">
              <h3>AI Business Solutions Workshop</h3>
              <div class="location">📍 마이크로소프트 13층</div>
              <div class="links">
                🔗 Reg
              </div>
            </div>
          </div>
        </div>
        
        <!-- Wednesday (Current Month - Day 2) -->
        <div class="day-cell">
          <div class="day-number">2</div>
          <div class="events">
            <!-- Continuation Card -->
            <div class="event-card continuation solution-ai-business">
              <span>AI Business Solutions Workshop</span>
            </div>
            
            <!-- Another Full Event -->
            <div class="event-card full solution-cloud-ai">
              <h3>Cloud Platform Training</h3>
              <div class="location">📍 Digital(한국어)</div>
            </div>
          </div>
        </div>
        
        <!-- Thursday (Current Month - Day 3) -->
        <div class="day-cell">
          <div class="day-number">3</div>
          <div class="events">
            <div class="event-card continuation solution-cloud-ai">
              <span>Cloud Platform Training</span>
            </div>
          </div>
        </div>
        
        <!-- Friday (Current Month - Day 4) -->
        <div class="day-cell">
          <div class="day-number">4</div>
          <div class="events">
            <div class="event-card full solution-security">
              <h3>Security Best Practices Seminar</h3>
              <div class="location">📍 마이크로소프트 13층</div>
              <div class="links">
                🔗 Reg 🔗 Viva
              </div>
            </div>
          </div>
        </div>
        
        <!-- Saturday (Current Month - Day 5) -->
        <div class="day-cell">
          <div class="day-number">5</div>
          <div class="events"></div>
        </div>
        
      </div>
      
      <!-- Add more week rows as needed -->
      
    </div>
  </div>
</body>
</html>
```

---

## 🔍 Key Points to Remember / 주요 포인트

### Layout
✅ Use CSS Grid with 7 equal columns  
✅ Day cells have min-height 100px but auto-expand  
✅ All cells in a row share the same height  
✅ No scrolling within cells

### Event Cards
✅ Full cards: 5px colored left border, 10px padding  
✅ Continuation cards: 24px fixed height, arrow indicator  
✅ Stack vertically with 6px gap  
✅ Use solution color for left border

### Colors
✅ 4 distinct solution colors (orange, green, blue, purple)  
✅ Warm beige background (#F9F7F4 approximately)  
✅ White event cards  
✅ Charcoal text (#404040 approximately)

### Typography
✅ Use Noto Sans KR for Korean support  
✅ Event titles: 12px, max 2 lines  
✅ Location: 11px with icon  
✅ Continuation text: 11px italic

### Spacing
✅ Container: 24px padding  
✅ Day cells: 10px padding  
✅ Event gaps: 6px  
✅ Weekday header: 12px padding

---

## 📱 Responsive Adjustments / 반응형 조정

For mobile (< 768px):
```css
@media (max-width: 768px) {
  .container {
    padding: 12px;
  }
  
  .day-cell {
    padding: 6px;
  }
  
  .day-number {
    font-size: 13px;
  }
  
  .event-card.full h3 {
    font-size: 11px;
    -webkit-line-clamp: 1;
  }
  
  .event-card.full .location,
  .event-card.full .links,
  .event-card.continuation span {
    font-size: 10px;
  }
}
```

---

## 🚀 Testing Checklist / 테스트 체크리스트

- [ ] Calendar displays 7 columns correctly
- [ ] Day cells auto-expand with multiple events
- [ ] Multi-day events show continuation cards
- [ ] Solution colors applied correctly
- [ ] Text truncates properly (no overflow)
- [ ] Borders align correctly
- [ ] Background colors match specification
- [ ] Font sizes match specification
- [ ] Spacing/padding matches specification
- [ ] Mobile responsive (if needed)

---

## 📚 Full Documentation / 전체 문서

For complete details, refer to:
- **CALENDAR_UI_SPECS.md**: Comprehensive technical specifications
- **CALENDAR_VISUAL_GUIDE.md**: Visual diagrams and detailed examples

---

## 💡 Tips / 팁

1. **Start with structure first**: Get the grid layout working before adding events
2. **Test with many events**: Ensure auto-expand works properly
3. **Use solution color variables**: Makes it easier to adjust colors
4. **Add hover states last**: Focus on static layout first
5. **Test different screen sizes**: Ensure responsive behavior works

---

## ⚡ Quick Copy-Paste / 빠른 복사-붙여넣기

### Minimal Working Example
Save this as `index.html` and open in a browser:

```html
<!DOCTYPE html>
<html>
<head>
<style>
* { margin: 0; padding: 0; box-sizing: border-box; }
body { font-family: 'Segoe UI', sans-serif; background: #F9F7F4; }
.container { max-width: 2400px; margin: 0 auto; padding: 24px; }
.calendar { background: white; border-radius: 12px; border: 1px solid #E2DFD9; overflow: hidden; }
.weekday { display: grid; grid-template-columns: repeat(7, 1fr); border-bottom: 1px solid #E2DFD9; }
.weekday > div { padding: 12px; text-align: center; font-size: 14px; font-weight: 600; background: #F1EFE9; }
.week { display: grid; grid-template-columns: repeat(7, 1fr); }
.day { min-height: 100px; padding: 10px; border-right: 1px solid #E2DFD9; border-bottom: 1px solid #E2DFD9; }
.day:nth-child(7n) { border-right: none; }
.day-num { font-size: 14px; font-weight: 500; margin-bottom: 6px; }
.event { background: white; border-radius: 8px; padding: 10px; border-left: 5px solid #C96A32; margin-bottom: 6px; }
.event h3 { font-size: 12px; font-weight: 500; margin-bottom: 4px; }
.event .loc { font-size: 11px; color: #808080; }
</style>
</head>
<body>
<div class="container">
  <div class="calendar">
    <div class="weekday">
      <div>Sun</div><div>Mon</div><div>Tue</div><div>Wed</div><div>Thu</div><div>Fri</div><div>Sat</div>
    </div>
    <div class="week">
      <div class="day"><div class="day-num">1</div></div>
      <div class="day"><div class="day-num">2</div>
        <div class="event">
          <h3>Sample Event</h3>
          <div class="loc">📍 Location</div>
        </div>
      </div>
      <div class="day"><div class="day-num">3</div></div>
      <div class="day"><div class="day-num">4</div></div>
      <div class="day"><div class="day-num">5</div></div>
      <div class="day"><div class="day-num">6</div></div>
      <div class="day"><div class="day-num">7</div></div>
    </div>
  </div>
</div>
</body>
</html>
```

---

좋은 캘린더를 만드세요! / Happy calendar building! 🎉
