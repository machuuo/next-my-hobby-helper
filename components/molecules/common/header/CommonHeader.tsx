import Link from "next/link";
// import Image from "next/image";
import styles from "./CommonHeader.module.css";

function CommonHeader() {
  return (
    <header className={styles.header}>
      <Link href={"/"}>
        <div className={styles.logoBox}>
          {/* <Image src={} alt="" /> */}
          <span className={styles.logo}>(❁´◡`❁)</span>
          <span className={styles.title}>취미나라</span>
        </div>
      </Link>
      <div className={styles.profileBox}>
        <button className={styles.headerButton}>사진제출(UI만)</button>
        <button className={styles.headerButton}>북마크(UI만)</button>
        <span className={styles.userName}>tester94@test.com</span>
      </div>
    </header>
  );
}

export default CommonHeader;
