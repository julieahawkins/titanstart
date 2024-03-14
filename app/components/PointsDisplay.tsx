"use client";
import { useContext } from "react";
import { SkillTreeContext } from "../context/SkillTreeContext";
import styles from "./PointsDisplay.module.css";

export default function PointsDisplay() {
  const { totalPoints, pointsSpent, isGodMode } = useContext(SkillTreeContext);

  const classNames: Array<string> = [
    styles.container,
  ];

  if (isGodMode) {
    classNames.push(styles["god-mode"]);
  }

  return (
    <div className={classNames.join(' ')}>
      <p className={styles.total}>
        <span className={styles.spent}>{`${pointsSpent} / `}</span>
        {totalPoints}
      </p>
      <p className={styles.label}>Points Spent</p>
    </div>
  );
}
