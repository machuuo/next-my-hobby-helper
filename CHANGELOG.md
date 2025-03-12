# **CHANGELOG**

## 📌 **CHANGELOG 형식 요약**

- > **✅ 추가**
  > : 새롭게 추가된 기능
- > **🔄 변경**
  > : 기존 기능 변경
- > **🛠️ 수정**
  > 버그 수정
- > **❌ 제거**
  > 제거된 기능

---

### 2025-03-11

### **🔄 변경**

- > todo template 생성
  - 도메인에 맞는 컴포넌트 감싸기용 (wrapper)
- > Todo.module.css 에서 모든 스타일을 관리 -> 각 컴포넌트별 모듈 CSS 추가 -> 다른 도메인의 컴포넌트도 이런 방식으로 하자..
- > todo 도메인 관련 barrel export (index.ts) 방식으로 변경
  - import 하는 방법
    ```ts
    import {
      TodoHeader,
      TodoColumn,
      TodoModalItem,
    } from "@/components/organisms/todo";
    ```

---

### 2025-03-10

### **✅ 추가**

- > 동적 라우팅을 위한 메뉴 구조 개선
  - 메뉴, 서브메뉴 구분
    - 각 라우팅에 해당하는 메뉴, 서브메뉴 생성을 위한 인덱스 시그니쳐 추가
    - `dynamic import`를 활용하여 메뉴 or 서브메뉴 id와 컴포넌트로 이뤄진 객체 생성
    - 메뉴
      - /app/[category]
    - 서브메뉴
      - /app/[category]/[subCategory]
    - > todo 도메인의 경우 wrapper template를 생성하여 동적 라우팅할 지 고민..
    - 서브메뉴가 있을 경우 organisms/[domain]/blabla... 형식으로 관리

### **🔄 변경**

- > todo 도메인 구조 변경
  - 기존
    - /app/pages/todo.tsx 파일에 투두 리스트만 보여주는 방식
  - 변경
    - options 기능 추가
      - 추가된 투두 리스트 관리용
      - 반복작업여부 설정/해제
    - 기능 추가에 따른 구조 변경
      - TodoList, TodoOptions 컴포넌트를 organisms/todo 디렉토리에 생성
      - wrapper template를 생성하여 동적 라우팅할 지 고민..

### **❌ 제거**

- > recoil 제거

---

### 2025-03-05

### **✅ 추가**

- > Todo list 상태 변경 추가

  - 체크박스 클릭 시 상태 변경
    - `todoStore - updateTodoStatus`, `onChange` 활용하여 상태 변경

### **🔄 변경**

- > `zustand`로 상태 관리

  - todo 도메인 용 store 추가 (`/stores/todoStore.ts`) (props drilling 대부분 제거)
    - state
      - todos : 투두 리스트
    - action
      - setTodos : 투두 리스트 설정
      - loadTodos : localStorage에 저장된 투두 리스트 설정
      - handleSubmit : 신규 todo 추가 (form 형식)
      - updateTodo : 투두 아이템 수정(드래그앤드롭, 체크박스 이벤트로 todo status 수정 목적)

---

### 2025-03-04

### **🛠️ 수정**

- > Todo list data 설정 개선 (with localStorage)
  - 기존 : todoList state를 생성하고 useEffect를 통해 todos여부 확인 후 todoList 설정
    - props drilling한 의미가 없음
  - 변경 : 부모 컴포넌트에서 todos 업데이트 함수를 전달받아 드래그앤드롭 시 상태 변경되도록 수정
    - todos.tsx : handleTodos 함수 추가 (todos 업데이트)
    - TodoList.tsx : handleTodos 호출하는 onDrop 함수 추가 (id, mode 매개변수)
      - 드래그앤드롭 훅에서 직접 DOM 접근 및 제어를 위한 설정 속성 제거
    - useDragAndDrop
      - 기존 : 직접 DOM 접근하여 변경하는 형식
      - 변경 : 상태만 변경 -> 리액트가 변경을 감지 -> 리렌더링하는 형식
        - 드래그 시작 시 dataTransfer에 선택한 요소의 data-id 값 설정 (사전 설정 필요 - li 태그에 지정)
        - 드래그한 요소의 data-id, 드롭한 위치의 mode를 가지고 onDrop (전달받을 함수)의 매개변수로 전달 (optional, TodoList 컴포넌트의 onDrop 함수 전달 받음)
        - 드래그앤드롭 이벤트 완료 시 상태 변경 완료

---

### 2025-03-02

### **🔄 변경**

- > 특정 도메인의 module.css는 통합하여 관리
  - 기존 : Todo 도메인의 자식 컴포넌트들에 대하여 각자의 module css를 생성하여 관리
  - 변경 : Todo.module.css를 생성하여 통합적으로 관리하도록 변경
  - 추가 룰
    - default : 기본/고정 양식만 지정
    - 인풋, 버튼 등 특수한 스타일 변경이 필요하면 여기에 추가 X
    - 큰 범위 -> 작은 범위 순으로 작성
  - ※ Next.js에서 CSS 우선순위, 동작 방식에 따른 스타일 적용 여부 주의 (로드 순서)
    - ## 클라이언트 측 렌더링 (하이드레이션) 시점에 삽입
      - 모듈 CSS가 Webpack/Vite로 컴파일 => `<link>` 태그(Next 13 이후)로 동적 삽입
      - 페이지별/컴포넌트별 동적 삽입 => Next.js에서는 모듈 CSS가 Tailwind 이후 로드 => `!important` 무시함

---

### 2025-02-27

### **✅ 추가**

- > zustand 추가

  - 라이트/다크 테마 상태 관리
  - 모달 내부 컨텐츠 및 호출 여부 상태 관리

- > 라이트/다크 테마 추가

  - 모든 요소에 적용되도록 기본 스타일 레이어 추가(`@layer base`)
  - themeStore.ts 생성
    - zustand 활용
      - 색상 테마 상태 관리
      - state
        - 기본 테마값 설정
        - 테마 설정
      - action
        - 테마 토글 메소드 생성
  - ThemeProvider.tsx 추가
    - 클라이언트 컴포넌트화
    - 색상 테마 전역 설정
    - window.matchMedia("(prefers-color-scheme: dark)").matches 활용하여 기본 선호 테마 확인 및 설정
    - layout.tsx에 추가

- > 모달 추가

  - modalStore.ts 생성
    - zustand 활용
      - 모달 상태 관리
      - state
        - 열림 여부로 모달 여닫기
        - 제목, 본문 내용(태그) 설정
      - action
        - 모달 열기 : 열기 true
        - 모달 닫기 : 열기 false (닫기)
  - 컴포넌트 생성
    - 뒷배경, 컨텐츠 div 구분
    - 이벤트 버블링 활용하여 뒷배경 클릭 시 모달창 닫기
  - 모달 래퍼 생성
    - 클라이언트 컴포넌트화
    - 모달 전역 설정
    - 기본 전역 상태 활용하여 그대로 주입
    - 최종 모달 컴포넌트 리턴
  - 사용 예시

    ```tsx
    // 모달 타이틀, 컨텐츠 설정
    const handleOpenModal = () => {
      openModal(
        "Todo 추가",
        <div className={styles.todoInput}>
          <form className="flex gap-4" onSubmit={handleSubmit}>
            <StyledInput
              name="todo"
              as="textarea"
              required
              className="min-w-[300px] h-30"
              placeholder="할 일 입력"
            />
            <StyledButton
              type="submit"
              size="xl"
              className="bg-slate-50 text-gray-600 w-[100px]"
            >
              추가
            </StyledButton>
          </form>
        </div>
      ); // 모달 내용 추가 필요

      // 적용
      <BaseButton className={styles.newTodoButton} onClick={handleOpenModal}>
        Todo 추가
      </BaseButton>;
    };
    ```

### **🛠️ 수정**

- > useDragAndDropEle 수정
  - `ul, li 태그 한정`으로 drop 대상 설정 => ul height 중요(flex: 1 1 0%)
    - drop 대상이 ul일 경우 : 해당 리스트의 맨 아래에 li 이동
    - drop 대상이 li일 경우 : 해당 아이템의 바로 앞에 li 이동
  - "시작" 영역의 ul에서 `Todo 추가` 버튼 `최하단 유지` 시키기 위한 "data-fixed" 속성 추가
    - drop 대상이 ul일 경우 data-fixed 속성이 있는 태그라면 (여기선 li) 해당 아이템 바로 앞에 li 이동

---

### 2025-02-25

### **✅ 추가**

- > Tag 컴포넌트 추가
- > useDragAndDropEle 커스텀 훅 추가
  - HTML5 드래그 앤 드롭 API 활용
  - event.preventDefault() 기본 동작 제어 후 커스텀 이벤트 동작 추가
  - dragstart, drop 커스텀 이벤트 설정 (선택적)
  - "data-droppable" 속성값으로 drop 가능 여부 확인

---

### 2025-02-23

### **🔄 변경**

- > 역할 명확성을 위한 컴포넌트 명명 변경
  - 스타일이 지정된 기본 버튼, 입력 컴포넌트 (FixedButton, FixedInput)의 이름을 `Styled~~~` 로 변경

---

### 2025-02-21

### **✅ 추가**

- > **인풋 컴포넌트 추가**

  - input type 추가

    ```ts
    // input props
    export interface BaseInputProps {
      as?: "input" | "textarea";
      className?: string;
    }

    export interface InputProps
      extends BaseInputProps,
        InputHTMLAttributes<HTMLInputElement> {}

    export interface TextAreaProps
      extends BaseInputProps,
        TextareaHTMLAttributes<HTMLTextAreaElement> {}
    ```

  - BaseInput
    - props.as : `input` or `textarea` 태그 선택
    - 추가적인 스타일 적용 가능
  - FixedInput
    - `BaseInput` 을 활용하여 기본 스타일 + 추가 스타일 가능

- > **인풋 컴포넌트들을 관리하기 위한 디렉토리 추가** (다음부턴 로그 안남김)

  - 디렉토리 경로 추가 : `/components/atoms/input`
    ```cpp
    /components
      /atoms
        /input
          ├── BaseInput.tsx      // 기본 버튼 컴포넌트
          ├── FixedInput.tsx     // 스타일 지정된 버튼 (BaseInput 활용)
          ├── index.ts           // 인풋 컴포넌트들을 한 곳에서 export
    ```
  - 구조 정리 : `index.ts` 를 추가하여 import 편의성 제공

    ```ts
    // index.ts
    export { default as BaseInput } from "./BaseInput";
    export { FixedInput } from "./FixedInput";

    // 사용 예제
    import { FixedInput } from "@/components/atoms/input";

    <FixedInput as="textarea" className="w-[500px] h-40"></FixedInput>
    ...
    ```

- > **공통 util 함수 추가**

  - `util.ts`
    - formatDate 함수 추가

- > **Todo List 추가 (진행중)**
  - Todo Item 객체 인터페이스 설정
    ```ts
    export interface TodoItem {
      id: string;
      tag: string[];
      content: string;
      isCompleted: boolean;
      readonly createdAt: Date;
      dueDate?: Date;
      priority?: "high" | "medium" | "low";
      updatedAt?: Date;
    }
    ```
  - Todo 페이지 작성중 (`/components/pages/todo.tsx`)
    - `localStorage` 사용하여 데이터 임시 관리
    - `FixedInput`, `FixedButton` 사용
    - Todo Item 추가, 리스트 보기 기능만 추가
    - _(예정) 비즈니스 로직 분리_
  - 컴포넌트 모듈화
    - `/components/molecules/TodoItem`
    - `/components/organisms/TodoList`
    - 각 컴포넌트별 간단한 스타일 적용
- > **카드 컴포넌트 추가**

### **🔄 변경**

- > **네비게이터 active 추가**

  - `usePathname`, `startsWith` 활용

- > **공통 헤더 수정**

- > 로고박스 컴포넌트 molecules로 이동
  - 자식 컴포넌트 이모지, 텍스트는 atoms로 따로 분리
  - 이모지, 텍스트에 props 사용하여 유연성 추가

---

### 2025-02-17

### **✅ 추가**

- > **버튼 컴포넌트 추가**
  - BaseButton : 확장성을 위한 버튼 컴포넌트
    - 여러 종류 버튼 생성을 위한 기본 버튼 컴포넌트
    - 추가적인 스타일 적용 가능
  - FixedButton : 재사용성을 위한 버튼 컴포넌트
    - `BaseButton`을 활용하여 특정 디자인을 유지하거나 기능이 추가된 버튼 컴포넌트 예시
    - 네이밍을 통해 역할 구분 (Submit, Cancel 버튼 같은 것도 필요하면 추가)
- > **버튼 컴포넌트들을 관리하기 위한 디렉토리 추가**

  - 디렉토리 경로 추가 : `/components/atoms/button`
    ```cpp
    /components
      /atoms
        /button
          ├── BaseButton.tsx      // 기본 버튼 컴포넌트
          ├── FixedButton.tsx     // 스타일 지정된 버튼 (BaseButton 활용)
          ├── index.ts            // 버튼 컴포넌트들을 한 곳에서 export
    ```
  - 구조 정리 : `index.ts` 를 추가하여 import 편의성 제공

    ```ts
    // index.ts
    export { default as BaseButton } from "./BaseButton";
    export { FixedButton } from "./FixedButton";

    // 사용 예제
    import { FixedButton } from "@/components/atoms/button";

    <FixedButton onClick={clickHandler}>사진제출</FixedButton>
    ...
    ```

- > **classNames 라이브러리 추가**
- > **color.css** 파일 수정
  - primary 관련 색상 추가
- > **네비게이터 메뉴 추가**
  - Todo리스트 추가
  - ※ `nav.json` 에 데이터 추가하면 동적으로 메뉴를 생성할 수 있도록 수정 필요

### 🔄 변경

- > **_`아토믹 디자인 방법론`_ 에 맞춰 레이아웃 관련 컴포넌트 위치 이동**
  - 기존 : `/components/molecules/common` 에 위치
  - 변경 : `/components/organisms` 로 이동
  - ※ 레이아웃 관련 컴포넌트 = `CommonHeader`, `CommonNav`, `CommonFooter` 등

### 참조자료

- 버튼 컴포넌트 만들기 참조자료

  - https://velog.io/@mrbartrns/%EC%9E%AC%EC%82%AC%EC%9A%A9-%EA%B0%80%EB%8A%A5%ED%95%9C-%EB%B2%84%ED%8A%BC-%EC%BB%B4%ED%8F%AC%EB%84%8C%ED%8A%B8-%EB%A7%8C%EB%93%A4%EA%B8%B0-React
  - https://fe-developers.kakaoent.com/2024/240116-common-component/

- 아토믹 디자인 참조자료
  - https://east-star.tistory.com/42

---

### 2025-02-12

### **✅ 추가**

- > **Next.js 프로젝트 생성**
- > **동적 라우팅 적용:** /app/[page]/page.tsx을 생성하여 동적 페이지 렌더링을 지원
- > **네비게이터 페이지 컴포넌트 구성:**
  - 개별 네비게이터 페이지를 /app/[page]/page/특정네비게이터페이지.tsx 형식으로 생성
  - **pageComponents** 객체를 활용하여 동적으로 컴포넌트를 매핑
- > **레이아웃 컴포넌트 생성**
  - header, navigator, footer 등
  - tailwindcss, css module 활용하여 스타일 지정
- > **타입 관리 영역 추가**
  - Props.ts : UI 컴포넌트의 props 설정 영역
  - Menu.ts : 네비게이터 관리 props 설정 영역
