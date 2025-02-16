import Image from "next/image";
import styles from "./CommonFooter.module.css";
import arrowLeft from "@/assets/icons/icon-arrowLeft.svg";
import arrowRight from "@/assets/icons/icon-arrowRight.svg";

function CommonFooter() {
  return (
    <footer className={styles.footer}>
      <div className={styles.pagination}>
        <button className={styles.footerButton}>
          <Image src={arrowLeft} alt="" />
        </button>
        {/* 페이지 개수 UI */}
        <span className={styles.footerSpan}>1</span>
        <button>
          <Image src={arrowRight} alt="" />
        </button>
      </div>
    </footer>
  );
}

export default CommonFooter;
