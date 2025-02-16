import Image from "next/image";

import searchImg from "@/assets/icons/icon-search.svg";
import styles from "./CommonSearchBar.module.css";

function CommonSearchBar() {
  return (
    <div className={styles.searchBar}>
      <div className={styles.search}>
        <input
          type="text"
          placeholder="검색할 내용 (그냥 테스트용 스타일)"
          className={styles.search_input}
        />
        <Image src={searchImg} alt="" />
      </div>
    </div>
  );
}

export default CommonSearchBar;
