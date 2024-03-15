"use client";
import { useContext } from "react";
import { SkillPath, SkillTreeContext } from "../context/SkillTreeContext";
import styles from "./SkillTree.module.css";

type PathProps = {
  skillPath: SkillPath
}

export const Path = ({ skillPath }: PathProps) => {
  const { skills, spendSkillPoint, refundSkillPoint } = useContext(SkillTreeContext);

  return (
    <div className={styles.path} data-testid={'skill-tree-container'}>
      <p className={styles.title}>{skillPath.title}</p>
      <ul className={styles.tree}>
        {skillPath.skills.map(({ id }, index) => {
          const skillData = skills.find((skill) => skill.id === id);
          if (!skillData) {
            return;
          }

          let iconClassNames: Array<string> = [
            styles.icon,
            styles[skillData.name],
          ];

          let dividerClassNames: Array<string> = [styles.divider];

          if (skillData && skillData.status === "active") {
            iconClassNames.push(`${styles.active}`);
            dividerClassNames.push(`${styles.active}`);
          }

          if (skillData.bonusTypes?.length) {
            skillData.bonusTypes.map((type) =>
              iconClassNames.push(styles[type])
            );
          }

          return (
            <div className={styles.wrapper} key={`path-key-${index}`}>
              <li
                data-id={index}
                className={iconClassNames.join(" ")}
                onClick={(e) => {
                  e.preventDefault();
                  spendSkillPoint(id);
                }}
                onContextMenu={(e) => {
                  e.preventDefault();
                  refundSkillPoint(id);
                }}
              ></li>
              <div className={dividerClassNames.join(" ")}></div>
            </div>
          );
        })}
      </ul>
    </div>
  );
}

export default function SkillTree() {
  const { skillPaths } = useContext(SkillTreeContext);

  return (
    <div className={styles.container}>
      {skillPaths.map((skillPath, index) => <Path skillPath={skillPath} key={index} />)}
    </div>
  );
}

