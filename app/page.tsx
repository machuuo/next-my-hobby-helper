import CommonSearchBar from "@/components/molecules/searchBar/CommonSearchBar";
// CSS
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <nav className={styles.contents}>
        <div className={styles.introBox}>
          <div className={styles.wrapper}>
            <span className={styles.title}>나의 취미생활</span>
            <span className={styles.desc}>각종 취미생활 모아놓는 곳</span>
            {/* 검색창 UI */}
            <CommonSearchBar />
          </div>
        </div>
        <div className={styles.menuBox}></div>
      </nav>
    </div>
  );
}
