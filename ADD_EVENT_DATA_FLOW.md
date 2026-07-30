# Add Event 데이터 저장 흐름 설명

이 문서는 마케팅 캘린더에서 사용자가 "Add Event" 버튼을 클릭하여 이벤트를 추가할 때 데이터가 어떻게 저장되는지 설명합니다.

## 전체 흐름 요약

1. **사용자 입력** → AddEventModal 컴포넌트의 폼 필드
2. **폼 제출** → handleSubmit 함수에서 유효성 검사
3. **데이터 전달** → onAddEvent 콜백 함수 호출
4. **상태 업데이트** → App.tsx의 handleAddEvent 함수
5. **영구 저장** → GitHub Spark의 useKV 훅을 통한 Key-Value 저장소

---

## 상세 데이터 흐름

### 1️⃣ 사용자 입력 단계 (AddEventModal.tsx)

**파일 위치**: `src/components/AddEventModal.tsx`

사용자가 입력하는 필드들:

```typescript
// 필수 필드 (*)
- title: 이벤트 제목
- solution: 솔루션 선택 (AI Business Solutions, Cloud and AI Platforms, Security, All CSAs)
- startDate: 시작 날짜
- location: 위치 (드롭다운 또는 직접입력)

// 선택 필드
- endDate: 종료 날짜 (비어있으면 단일 날짜 이벤트)
- time: 시간 (예: "2:00 PM - 4:00 PM")
- registrationUrl: 등록 페이지 URL
- vivaEngageUrl: Viva Engage URL
```

각 필드는 React의 `useState` 훅을 사용하여 로컬 상태로 관리됩니다:

```typescript
const [title, setTitle] = useState("");
const [solution, setSolution] = useState<Solution | "">("");
const [startDate, setStartDate] = useState("");
// ... 기타 필드들
```

### 2️⃣ 폼 유효성 검사 (AddEventModal.tsx)

**함수**: `validateForm()`

"Add Event" 버튼을 클릭하면 `handleSubmit` 함수가 실행되며, 먼저 `validateForm()`으로 유효성을 검사합니다:

```typescript
const validateForm = (): boolean => {
  const newErrors: Record<string, string> = {};

  // 필수 필드 검사
  if (!title.trim()) {
    newErrors.title = "Event title is required";
  }
  if (!solution) {
    newErrors.solution = "Solution is required";
  }
  if (!startDate) {
    newErrors.startDate = "Start date is required";
  }
  
  // 날짜 범위 검사
  if (startDate && endDate && startDate > endDate) {
    newErrors.endDate = "End date must be after start date";
  }
  
  // 위치 검사
  if (!locationOption) {
    newErrors.location = "Location is required";
  }
  if (locationOption === "직접입력" && !customLocation.trim()) {
    newErrors.customLocation = "Please enter a location";
  }

  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
};
```

유효성 검사를 통과하지 못하면 에러 메시지가 표시되고 제출이 중단됩니다.

### 3️⃣ 데이터 객체 생성 및 전달 (AddEventModal.tsx)

**함수**: `handleSubmit()`

유효성 검사를 통과하면 이벤트 데이터 객체를 생성하여 부모 컴포넌트로 전달합니다:

```typescript
const handleSubmit = () => {
  if (!validateForm()) {
    return;
  }

  // 위치 결정 (드롭다운 선택 또는 직접입력)
  const location = locationOption === "직접입력" ? customLocation : locationOption;

  // 이벤트 데이터 객체 생성
  onAddEvent({
    title: title.trim(),
    solution: solution as Solution,
    startDate,
    endDate: endDate.trim() || undefined,
    time: time.trim() || undefined,
    location,
    registrationUrl: registrationUrl.trim() || undefined,
    vivaEngageUrl: vivaEngageUrl.trim() || undefined,
  });

  handleClose();
};
```

여기서 `onAddEvent`는 App.tsx에서 전달받은 콜백 함수입니다.

### 4️⃣ 이벤트 추가 및 ID 생성 (App.tsx)

**파일 위치**: `src/App.tsx`
**함수**: `handleAddEvent()`

AddEventModal에서 전달받은 데이터를 처리하고 고유 ID를 생성합니다:

```typescript
const handleAddEvent = (eventData: Omit<Event, "id">) => {
  if (editingEvent) {
    // 편집 모드: 기존 이벤트 업데이트
    setEvents((currentEvents) =>
      (currentEvents || []).map((e) =>
        e.id === editingEvent.id ? { ...eventData, id: editingEvent.id } : e
      )
    );
    toast.success("Event updated successfully!");
    setEditingEvent(null);
  } else {
    // 새 이벤트 추가
    const newEvent: Event = {
      ...eventData,
      id: `event-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    };
    
    setEvents((currentEvents) => [...(currentEvents || []), newEvent]);
    toast.success("Event added successfully!");
  }
};
```

**ID 생성 방식**:
- 형식: `event-{타임스탬프}-{랜덤문자열}`
- 예시: `event-1703152839456-k3j9x4m2a`
- `Date.now()`: 현재 타임스탬프 (밀리초)
- `Math.random().toString(36).substr(2, 9)`: 9자리 랜덤 영숫자 문자열

### 5️⃣ 영구 저장소에 저장 (GitHub Spark useKV)

**파일 위치**: `src/App.tsx`
**저장 메커니즘**: GitHub Spark의 `useKV` 훅

```typescript
const [events, setEvents] = useKV<Event[]>("marketing-events", []);
```

#### useKV 훅이란?

`useKV`는 GitHub Spark에서 제공하는 Key-Value 저장소 훅입니다:

- **Key**: `"marketing-events"` - 데이터를 식별하는 고유 키
- **기본값**: `[]` - 초기 데이터가 없을 때 사용할 빈 배열
- **타입**: `Event[]` - 이벤트 객체의 배열

#### 저장 방식

1. **자동 동기화**: `setEvents()` 함수를 호출하면 useKV가 자동으로 데이터를 영구 저장소에 저장합니다.
2. **즉시 반영**: 상태가 변경되면 즉시 UI에 반영됩니다.
3. **영구 보존**: 브라우저를 닫았다가 다시 열어도 데이터가 유지됩니다.
4. **GitHub Spark 관리**: 실제 저장소는 GitHub Spark 플랫폼이 관리합니다.

```typescript
// 이벤트 추가 시
setEvents((currentEvents) => [...(currentEvents || []), newEvent]);

// 내부적으로 발생하는 일:
// 1. currentEvents 배열에 newEvent 추가
// 2. 새로운 배열 생성
// 3. useKV가 "marketing-events" 키로 저장소에 저장
// 4. React 상태 업데이트로 UI 리렌더링
```

---

## 데이터 구조

### Event 타입 정의 (src/lib/types.ts)

```typescript
export interface Event {
  id: string;              // 고유 식별자 (자동 생성)
  title: string;           // 이벤트 제목
  solution: Solution;      // 솔루션 카테고리
  startDate: string;       // 시작 날짜 (YYYY-MM-DD)
  endDate?: string;        // 종료 날짜 (선택)
  time?: string;           // 시간 (선택)
  location: string;        // 위치
  registrationUrl?: string;  // 등록 URL (선택)
  vivaEngageUrl?: string;    // Viva Engage URL (선택)
}
```

### 저장소에 저장된 데이터 예시

```json
[
  {
    "id": "event-1703152839456-k3j9x4m2a",
    "title": "AI 비즈니스 솔루션 웨비나",
    "solution": "AI Business Solutions",
    "startDate": "2024-12-25",
    "endDate": "2024-12-26",
    "time": "2:00 PM - 4:00 PM",
    "location": "마이크로소프트 13층",
    "registrationUrl": "https://example.com/register",
    "vivaEngageUrl": "https://engage.cloud.microsoft/main/feed"
  },
  {
    "id": "event-1703153945123-p7m8n2q5x",
    "title": "클라우드 플랫폼 세미나",
    "solution": "Cloud and AI Platforms",
    "startDate": "2024-12-28",
    "location": "Digital(한국어)"
  }
]
```

---

## 전체 흐름도

```
┌─────────────────────────────────────────────────────────────┐
│ 1. 사용자가 "Add Event" 버튼 클릭                              │
│    (App.tsx: setIsAddModalOpen(true))                       │
└────────────────────┬────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────┐
│ 2. AddEventModal 컴포넌트 열림                                 │
│    - 폼 필드에 데이터 입력                                       │
│    - 각 필드는 useState로 관리                                  │
└────────────────────┬────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────┐
│ 3. "Add Event" 버튼 클릭 (handleSubmit 실행)                  │
│    - validateForm()으로 유효성 검사                            │
│    - 검사 실패 시: 에러 메시지 표시 및 중단                       │
│    - 검사 성공 시: 다음 단계 진행                                │
└────────────────────┬────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────┐
│ 4. onAddEvent() 콜백 함수 호출                                 │
│    - 이벤트 데이터 객체 생성 (id 제외)                           │
│    - 선택 필드는 undefined 처리                                 │
└────────────────────┬────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────┐
│ 5. App.tsx의 handleAddEvent() 실행                           │
│    - 고유 ID 생성: event-{timestamp}-{random}                │
│    - 새 이벤트 객체 생성                                         │
└────────────────────┬────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────┐
│ 6. setEvents() 호출                                          │
│    - 현재 이벤트 배열에 새 이벤트 추가                            │
│    - [...currentEvents, newEvent]                           │
└────────────────────┬────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────┐
│ 7. useKV 훅이 자동으로 저장소에 저장                             │
│    - Key: "marketing-events"                                │
│    - Value: Event[] (전체 이벤트 배열)                         │
│    - GitHub Spark 영구 저장소에 보관                           │
└────────────────────┬────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────┐
│ 8. UI 업데이트                                                 │
│    - React 리렌더링                                            │
│    - 캘린더 그리드에 새 이벤트 표시                               │
│    - 성공 토스트 메시지: "Event added successfully!"          │
│    - 모달 닫힘                                                  │
└─────────────────────────────────────────────────────────────┘
```

---

## 중요 특징

### 1. 데이터 영속성 (Persistence)
- **저장 위치**: GitHub Spark의 Key-Value 저장소
- **지속성**: 페이지 새로고침, 브라우저 종료 후에도 데이터 유지
- **자동 동기화**: 상태 변경 시 자동으로 저장

### 2. 고유 ID 생성
- **형식**: `event-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
- **충돌 방지**: 타임스탬프 + 랜덤 문자열로 고유성 보장
- **사용 목적**: 이벤트 식별, 편집, 삭제 작업에 사용

### 3. 이벤트 수정 vs 추가
```typescript
if (editingEvent) {
  // 기존 이벤트 수정: ID 유지하며 데이터만 변경
  setEvents((currentEvents) =>
    (currentEvents || []).map((e) =>
      e.id === editingEvent.id ? { ...eventData, id: editingEvent.id } : e
    )
  );
} else {
  // 새 이벤트 추가: 새 ID 생성
  const newEvent: Event = { ...eventData, id: `event-${...}` };
  setEvents((currentEvents) => [...(currentEvents || []), newEvent]);
}
```

### 4. 데이터 무결성
- **필수 필드 검증**: title, solution, startDate, location
- **날짜 범위 검증**: endDate가 startDate보다 빠를 수 없음
- **조건부 필수 필드**: 위치를 "직접입력"으로 선택 시 customLocation 필수

### 5. 사용자 피드백
- **성공 메시지**: `toast.success("Event added successfully!")`
- **에러 메시지**: 각 필드별 유효성 검사 실패 시 개별 에러 표시
- **UI 반영**: 즉시 캘린더에 새 이벤트 표시

---

## 관련 파일 요약

| 파일 | 역할 | 주요 함수/변수 |
|------|------|---------------|
| `src/App.tsx` | 메인 애플리케이션 로직 | `useKV`, `handleAddEvent`, `setEvents` |
| `src/components/AddEventModal.tsx` | 이벤트 입력 폼 | `handleSubmit`, `validateForm`, `onAddEvent` |
| `src/lib/types.ts` | 타입 정의 | `Event`, `Solution`, `LOCATION_OPTIONS` |

---

## 결론

사용자가 "Add Event"를 클릭하여 데이터를 입력하면:

1. ✅ **폼 유효성 검사** → 필수 필드와 날짜 범위 검증
2. ✅ **고유 ID 자동 생성** → 타임스탬프 + 랜덤 문자열
3. ✅ **상태 업데이트** → React의 setEvents로 배열에 추가
4. ✅ **자동 저장** → GitHub Spark의 useKV가 영구 저장소에 저장
5. ✅ **즉시 UI 반영** → 캘린더에 새 이벤트 표시

이 모든 과정은 **자동으로** 이루어지며, 개발자가 별도의 API 호출이나 저장 로직을 작성할 필요가 없습니다. GitHub Spark의 useKV 훅이 모든 저장 및 동기화를 처리합니다.
