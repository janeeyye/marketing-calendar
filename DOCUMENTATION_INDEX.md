# Marketing Calendar Documentation / 마케팅 캘린더 문서

이 레포지토리에는 view-only 마케팅 캘린더를 만들기 위한 완전한 UI 사양과 구조 문서가 포함되어 있습니다.

This repository contains complete UI specifications and structure documentation for creating a view-only marketing calendar.

---

## 📚 Documentation Files / 문서 파일

### 1. [QUICK_START_GUIDE.md](./QUICK_START_GUIDE.md) ⚡
**빠른 시작을 위한 간단한 가이드**
- Essential dimensions and colors summary
- Step-by-step implementation guide
- Ready-to-use CSS and HTML templates
- Copy-paste minimal working example
- Perfect for getting started quickly

**추천**: 빠르게 시작하고 싶다면 여기서 시작하세요!

---

### 2. [CALENDAR_UI_SPECS.md](./CALENDAR_UI_SPECS.md) 📋
**완전한 기술 사양서**
- Complete technical specifications
- Exact measurements and dimensions
- Color scheme with OKLCH values
- Typography specifications
- Component structure details
- CSS class reference
- Theme variables
- Implementation checklist

**추천**: 정확한 치수와 기술 세부사항이 필요할 때 참고하세요.

---

### 3. [CALENDAR_VISUAL_GUIDE.md](./CALENDAR_VISUAL_GUIDE.md) 🎨
**시각적 구조 가이드**
- ASCII diagrams showing layout
- Visual structure breakdowns
- Day cell structure diagrams
- Event card examples
- Multi-day event flow
- Spacing system visualization
- Color system examples
- Measurements cheat sheet
- HTML/CSS implementation examples

**추천**: 시각적으로 구조를 이해하고 싶을 때 참고하세요.

---

## 🚀 How to Use These Documents / 문서 사용 방법

### For Quick Implementation / 빠른 구현용
1. Start with **QUICK_START_GUIDE.md**
2. Copy the minimal working example
3. Customize with your data
4. Refer to other docs for specific details

### For Detailed Implementation / 상세 구현용
1. Read **CALENDAR_UI_SPECS.md** for complete specifications
2. Use **CALENDAR_VISUAL_GUIDE.md** for visual reference
3. Implement step-by-step following the checklists
4. Use **QUICK_START_GUIDE.md** for code templates

### For Understanding Structure / 구조 이해용
1. Start with **CALENDAR_VISUAL_GUIDE.md** diagrams
2. Review **CALENDAR_UI_SPECS.md** for technical details
3. Reference actual code in `/src` directory
4. Use **QUICK_START_GUIDE.md** for quick lookups

---

## 🎯 Key Features Documented / 문서화된 주요 기능

### Layout & Structure / 레이아웃 & 구조
- ✅ 2400px max-width container
- ✅ 7-column CSS Grid layout
- ✅ Auto-expanding day cells (100px minimum)
- ✅ Week row structure

### Event Display / 이벤트 표시
- ✅ Full event cards with 5px colored border
- ✅ Continuation cards for multi-day events (24px height)
- ✅ Event stacking with 6px gaps
- ✅ Solution color coding

### Styling / 스타일링
- ✅ Color scheme (warm beige background, white cards)
- ✅ Typography (Noto Sans KR, Segoe UI)
- ✅ Spacing and padding specifications
- ✅ Border and shadow details

### Responsive / 반응형
- ✅ Mobile font size adjustments
- ✅ Responsive padding values
- ✅ Auto-expand behavior maintenance

---

## 📊 Quick Reference / 빠른 참조

### Core Dimensions / 핵심 치수
```
Container:         2400px max-width, 24px padding
Day Cells:         100px min-height, auto-expand
Full Event Card:   5px left border, 10px padding
Continuation:      24px fixed height
```

### Core Colors / 핵심 색상
```
Background:    oklch(0.97 0.01 75)    Warm beige
Card:          oklch(1 0 0)           White
Text:          oklch(0.25 0 0)        Charcoal
Border:        oklch(0.88 0.01 75)    Light gray
```

### Solution Colors / 솔루션 색상
```
AI Business:   oklch(0.62 0.15 35)    Orange
Cloud & AI:    oklch(0.65 0.12 160)   Green
Security:      oklch(0.55 0.15 240)   Blue
All CSAs:      oklch(0.60 0.18 290)   Purple
```

### Typography / 타이포그래피
```
Font Family:   'Noto Sans KR', 'Segoe UI', 'Malgun Gothic'
Day Numbers:   14px, weight 500
Event Titles:  12px, weight 500, max 2 lines
Location:      11px, weight 400
```

---

## 🔍 What's Included / 포함된 내용

### Comprehensive Specifications / 종합 사양
- [x] Exact measurements for all components
- [x] Complete color palette with OKLCH values
- [x] Typography specifications
- [x] Spacing and padding values
- [x] Border and shadow specifications

### Visual Guides / 시각 가이드
- [x] ASCII diagrams of layout structure
- [x] Day cell structure visualization
- [x] Event card examples
- [x] Multi-day event flow diagrams
- [x] Spacing system visualization

### Implementation Help / 구현 도움말
- [x] Step-by-step implementation guide
- [x] Ready-to-use CSS templates
- [x] Sample HTML structure
- [x] Copy-paste working examples
- [x] Implementation checklists

### Code Examples / 코드 예제
- [x] Complete HTML structure
- [x] Complete CSS stylesheet
- [x] Minimal working example
- [x] Responsive media queries
- [x] Solution color classes

---

## 💡 Tips / 팁

### For Developers / 개발자용
- Start with the QUICK_START_GUIDE.md for rapid prototyping
- Use CALENDAR_UI_SPECS.md as your reference during implementation
- Check CALENDAR_VISUAL_GUIDE.md when you need to visualize structure
- All dimensions are specified in pixels for easy implementation

### For Designers / 디자이너용
- CALENDAR_VISUAL_GUIDE.md provides visual structure diagrams
- CALENDAR_UI_SPECS.md has complete color and typography specs
- All colors use OKLCH format for better color accuracy
- Solution colors are designed to be distinct and accessible

### For Project Managers / 프로젝트 매니저용
- Use implementation checklists to track progress
- All documents include Korean translations
- Documents can be used as specification for contractors
- Complete enough to estimate development time accurately

---

## 🎓 Learning Path / 학습 경로

### Beginner / 초급
1. Read QUICK_START_GUIDE.md introduction
2. Review the minimal working example
3. Try modifying the example with sample data
4. Refer to CALENDAR_VISUAL_GUIDE.md for understanding

### Intermediate / 중급
1. Study CALENDAR_UI_SPECS.md thoroughly
2. Follow the implementation checklist
3. Build component by component
4. Use CALENDAR_VISUAL_GUIDE.md for reference

### Advanced / 고급
1. Review all three documents
2. Examine source code in `/src` directory
3. Compare documentation with actual implementation
4. Customize and extend as needed

---

## 📝 Additional Resources / 추가 자료

### In This Repository / 이 레포지토리 내
- `/src/App.tsx` - Main application component
- `/src/components/CalendarGrid.tsx` - Calendar grid implementation
- `/src/components/EventCard.tsx` - Event card implementation
- `/src/lib/types.ts` - Type definitions and solution colors
- `/src/lib/calendar.ts` - Calendar generation logic
- `/src/index.css` - Global styles and theme variables

### Technologies Used / 사용된 기술
- React 19
- TypeScript
- Tailwind CSS 4
- Vite
- Radix UI components

---

## ❓ FAQ / 자주 묻는 질문

### Q: 어떤 문서를 먼저 봐야 하나요?
**A:** 빠르게 시작하려면 QUICK_START_GUIDE.md를 먼저 보세요. 정확한 사양이 필요하면 CALENDAR_UI_SPECS.md를 참고하세요.

### Q: Which document should I read first?
**A:** For quick start, read QUICK_START_GUIDE.md first. For exact specifications, refer to CALENDAR_UI_SPECS.md.

### Q: view-only 페이지에는 무엇이 필요한가요?
**A:** 기본적으로 HTML, CSS만 있으면 됩니다. 반응형이 필요하면 미디어 쿼리를 추가하세요.

### Q: What do I need for a view-only page?
**A:** Basically just HTML and CSS. Add media queries if you need responsive behavior.

### Q: 모바일 대응은 어떻게 하나요?
**A:** QUICK_START_GUIDE.md의 "Responsive Adjustments" 섹션을 참고하세요.

### Q: How do I handle mobile responsiveness?
**A:** Check the "Responsive Adjustments" section in QUICK_START_GUIDE.md.

---

## 📞 Support / 지원

이 문서에 대한 질문이나 피드백이 있으시면 이슈를 생성해 주세요.

If you have questions or feedback about these documents, please create an issue.

---

## 📄 License / 라이선스

These documentation files are part of the marketing calendar project and follow the same MIT license.

---

**Last Updated / 마지막 업데이트**: 2025-12-21

**Documentation Version / 문서 버전**: 1.0.0
