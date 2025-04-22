"use client";

import { StyledButton } from "@/components/atoms/button";
import { useThemeStore } from "@/stores/theme/themeStore";
import { selectTheme, selectToggleTheme } from "@/stores/theme/themeSelectors";
import styles from "./ProfileBox.module.css";

const ProfileBox = () => {
  const theme = useThemeStore(selectTheme);
  const toggleTheme = useThemeStore(selectToggleTheme);

  return (
    <div className={styles.profileBox}>
      <StyledButton onClick={toggleTheme}>Toggle Theme ({theme})</StyledButton>
      <span className={styles.userName}>tester94@test.com</span>
    </div>
  );
};

export default ProfileBox;
