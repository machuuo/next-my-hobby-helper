# **CHANGELOG**

## 📌 **CHANGELOG 형식 요약**

🔹 **[버전] - (날짜)**

- **✅ 추가 (Added) :** 새롭게 추가된 기능
- **🔄 변경 (Changed) :** 기존 기능 변경
- **🛠️ 수정 (Fixed) :** 버그 수정
- **❌ 제거 (Removed) :** 제거된 기능

💡 **팁:**

- **중요 변경 사항**은 ✅/🔹/🛠️ 같은 이모지를 활용하여 가독성 향상
- **날짜 포맷**은 `YYYY-MM-DD`로 통일

📌 버전 번호 형식 (MAJOR.MINOR.PATCH)

- **MAJOR (주 버전)** : 기존 버전과 호환되지 않는 <span style="color: red">**대규모 변경**</span>이 있을 때 증가
- **MINOR (부 버전)** : 기존 기능과 <span style="color: yellow">**호환되면서 새로운 기능 추가**</span>
- **PATCH (수정 버전)** : 기존 기능과 <span style="color: skyblue">**호환되는 버그 수정**</span>

---

### [1.0.1] - (2025-02-17)

### **✅ 추가**

- > **버튼 컴포넌트 추가**
  - BaseButton : 확장성을 위한 버튼 컴포넌트
    - 여러 종류 버튼 생성을 위한 기본 버튼 컴포넌트
    - 기본적인 스타일만 정의, 필요한 경우 확장 가능
  - FixedButton : 재사용성을 위한 버튼 컴포넌트
    - `BaseButton`을 활용하여 특정 디자인을 유지하거나 기능이 추가된 버튼 컴포넌트 예시
    - 네이밍을 통해 역할 구분 (Submit, Cancel 버튼 같은 것도 필요하면 추가)
- > **버튼 컴포넌트들을 관리하기 위한 디렉토리 추가**

  - 디렉토리 경로 추가 : `/components/atoms/button`
    ```cpp
    /components
      /atoms
        /button
          ├── BaseButton.tsx      // 기번 버튼 컴포넌트
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
  - 현재 : `/components/organisms` 로 이동
  - ※ 레이아웃 관련 컴포넌트 = `CommonHeader`, `CommonNav`, `CommonFooter` 등

### 참조자료

- 버튼 컴포넌트 만들기 참조자료

  - https://velog.io/@mrbartrns/%EC%9E%AC%EC%82%AC%EC%9A%A9-%EA%B0%80%EB%8A%A5%ED%95%9C-%EB%B2%84%ED%8A%BC-%EC%BB%B4%ED%8F%AC%EB%84%8C%ED%8A%B8-%EB%A7%8C%EB%93%A4%EA%B8%B0-React
  - https://fe-developers.kakaoent.com/2024/240116-common-component/

- 아토믹 디자인 참조자료
  - https://east-star.tistory.com/42

---

### [1.0.0] - (2025-02-12)

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
