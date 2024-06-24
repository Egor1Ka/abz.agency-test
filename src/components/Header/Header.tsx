import React from "react";
import styles from "./styles.module.scss";
import { ReactComponent as HeaderIcon } from "../../assets/svg/Logo.svg";
import { Button } from "../Button";

export const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <HeaderIcon />
        <div className={styles.buttonGroup}>
          <Button>Users</Button>
          <Button>Sign up</Button>
        </div>
      </div>
    </header>
  );
};
