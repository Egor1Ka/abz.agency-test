import React from "react";
import { Button } from "../Button";
import styles from "./styles.module.scss";

export const Landing: React.FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.header}>
          Test assignment for front-end developer
        </h1>
        <p className={styles.description}>
          What defines a good front-end developer is one that has skilled
          knowledge of HTML, CSS, JS with a vast understanding of User design
          thinking as they’ll be building web interfaces with accessibility in
          mind. They should also be excited to learn, as the world of Front-End
          Development keeps evolving.
        </p>
        <Button onClick={() => console.log("Sign up button clicked")}>
          Sign up
        </Button>
      </div>
    </div>
  );
};
