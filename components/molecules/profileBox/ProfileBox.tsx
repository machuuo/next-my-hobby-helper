"use client";

import { StyledButton } from "@/components/atoms/button";
import { useThemeStore } from "@/stores/themeStore";
import styles from "./ProfileBox.module.css";

const ProfileBox = () => {
  const { theme, toggleTheme } = useThemeStore();

  const clickHandler = (e: React.MouseEvent<HTMLButtonElement>): void => {
    alert(e.currentTarget.innerText);
  };

  return (
    <div className={styles.profileBox}>
      <StyledButton onClick={toggleTheme}>Toggle Theme ({theme})</StyledButton>
      <StyledButton onClick={clickHandler}>사진제출(UI만)</StyledButton>
      <StyledButton onClick={clickHandler}>북마크(UI만)</StyledButton>
      <span className={styles.userName}>tester94@test.com</span>
    </div>
  );
};

export default ProfileBox;
