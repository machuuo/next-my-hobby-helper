"use client";

import { FixedButton } from "@/components/atoms/button";
import styles from "./ProfileBox.module.css";

const ProfileBox = () => {
  const clickHandler = (e: React.MouseEvent<HTMLButtonElement>): void => {
    alert(e.currentTarget.innerText);
  };

  return (
    <div className={styles.profileBox}>
      <FixedButton onClick={clickHandler}>사진제출(UI만)</FixedButton>
      <FixedButton onClick={clickHandler}>북마크(UI만)</FixedButton>
      <span className={styles.userName}>tester94@test.com</span>
    </div>
  );
};

export default ProfileBox;
