import Link from "next/link";
// import Image from "next/image";
import styles from "./CommonHeader.module.css";
import ProfileBox from "@/components/molecules/profileBox/ProfileBox";

function CommonHeader() {
  return (
    <header className={styles.header}>
      <Link href={"/"}>
        <div className={styles.logoBox}>
          <span className={styles.logo}>(❁´◡`❁)</span>
          <span className={styles.title}>취미나라</span>
        </div>
      </Link>
      <ProfileBox />
    </header>
  );
}

export default CommonHeader;
