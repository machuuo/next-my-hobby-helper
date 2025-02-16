# **CHANGELOG**

## 📌 **CHANGELOG 형식 요약**

<!-- 🔹 **[버전] - (날짜)** -->

⚠️

- **✅ 추가 (Added) :** 새롭게 추가된 기능
- **🔄 변경 (Changed) :** 기존 기능 변경
- **🛠️ 수정 (Fixed) :** 버그 수정
- **❌ 제거 (Removed) :** 제거된 기능

💡 **팁:**

- **중요 변경 사항**은 ✅/🔹/🛠️ 같은 이모지를 활용하여 가독성 향상
<!-- - **날짜 포맷**은 `YYYY-MM-DD`로 통일 -->

📌 버전 번호 형식 (MAJOR.MINOR.PATCH)

- **MAJOR (주 버전)** : 기존 버전과 호환되지 않는 <span style="color: red">**대규모 변경**</span>이 있을 때 증가
- **MINOR (부 버전)** : 기존 기능과 <span style="color: yellow">**호환되면서 새로운 기능 추가**</span>
- **PATCH (수정 버전)** : 기존 기능과 <span style="color: skyblue">**호환되는 버그 수정**</span>

---

### [1.0.0]

### **✅ 추가**

- **Next.js 프로젝트 생성**
- **동적 라우팅 적용:** /app/[page]/page.tsx을 생성하여 동적 페이지 렌더링을 지원
- **네비게이터 페이지 컴포넌트 구성:**
  - 개별 네비게이터 페이지를 /app/[page]/page/특정네비게이터페이지.tsx 형식으로 생성
  - **pageComponents** 객체를 활용하여 동적으로 컴포넌트를 매핑
- **레이아웃 컴포넌트 생성**
  - header, navigator, footer 등
  - tailwindcss, css module 활용하여 스타일 지정
- **타입 관리 영역 추가**
  - Props.ts : UI 컴포넌트의 props 설정 영역
  - Menu.ts : 네비게이터 관리 props 설정 영역
