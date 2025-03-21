"use client";

import { StyledButton } from "@/components/atoms/button";
import { useThemeStore } from "@/stores/themeStore";
import styles from "./ProfileBox.module.css";

const ProfileBox = () => {
  const { theme, toggleTheme } = useThemeStore();

  return (
    <div className={styles.profileBox}>
      <StyledButton onClick={toggleTheme}>Toggle Theme ({theme})</StyledButton>
      <span className={styles.userName}>tester94@test.com</span>
    </div>
  );
};

export default ProfileBox;
