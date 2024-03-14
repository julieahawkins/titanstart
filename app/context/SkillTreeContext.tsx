"use client";
import { createContext, useState } from "react";

export interface Skill {
  name: string;
  status: string;
  id: number;
  prereq: { id: number } | null;
  bonusTypes?: Array<string>;
}
export interface SkillPath {
  id: number;
  title: string;
  skills: Array<{ id: number }>;
}

export type SkillTreeContextType = {
  skills: Array<Skill>;
  skillPaths: Array<SkillPath>;
  totalPoints: number;
  pointsSpent: number;
  updateSkill: (id: number, status: string) => void;
  spendSkillPoint: (id: number) => void;
  refundSkillPoint: (id: number) => void;
  toggleGodMode: () => void;
  isGodMode: boolean;
};

export const SkillTreeContext = createContext<SkillTreeContextType>({
  skills: [],
  skillPaths: [],
  totalPoints: 0,
  pointsSpent: 0,
  updateSkill: () => {},
  spendSkillPoint: () => {},
  refundSkillPoint: () => {},
  toggleGodMode: () => {},
  isGodMode: false,
});

export const SkillTreeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [totalPoints, setTotalPoints] = useState<number>(6);
  const [pointsSpent, setPointsSpent] = useState<number>(0);
  const [isGodMode, setGodMode] = useState<boolean>(false);

  const [skillPaths] = useState<Array<SkillPath>>([
    {
      id: 1,
      title: "Talent Path 1",
      skills: [
        {
          id: 1,
        },
        {
          id: 2,
        },
        {
          id: 3,
        },
        {
          id: 4,
        },
      ],
    },
    {
      id: 2,
      title: "Talent Path 2",
      skills: [
        {
          id: 5,
        },
        {
          id: 6,
        },
        {
          id: 7,
        },
        {
          id: 8,
        },
      ],
    },
  ]);

  const [skills, setSkill] = useState<Array<Skill>>([
    {
      id: 1,
      name: "skill_1",
      status: "inactive",
      prereq: null,
    },
    {
      id: 2,
      name: "skill_2",
      status: "inactive",
      prereq: { id: 1 },
    },
    {
      id: 3,
      name: "skill_3",
      status: "inactive",
      prereq: { id: 2 },
    },
    {
      id: 4,
      name: "skill_4",
      status: "inactive",
      prereq: { id: 3 },
      bonusTypes: ["crown"],
    },
    {
      id: 5,
      name: "skill_5",
      status: "inactive",
      prereq: null,
    },
    {
      id: 6,
      name: "skill_6",
      status: "inactive",
      prereq: { id: 5 },
    },
    {
      id: 7,
      name: "skill_7",
      status: "inactive",
      prereq: { id: 6 },
    },
    {
      id: 8,
      name: "skill_8",
      status: "inactive",
      prereq: { id: 7 },
      bonusTypes: ["skull"],
    },
  ]);

  const updateSkill = (id: number, status: string) => {
    setSkill((prevSkills) => {
      return prevSkills.map((skill) => {
        if (skill.id === id && skill.status !== status) {
          return {
            ...skill,
            status,
          };
        }

        return skill;
      });
    });
  };

  const spendSkillPoint = (id: number) => {
    setPointsSpent((prevPointsSpent) => {
      const currentSkill = skills.find((skill) => skill.id === id);

      if (!currentSkill) {
        return prevPointsSpent;
      }

      const skillStatus = currentSkill.status ?? "";
      const prereq = currentSkill.prereq;
      const hasPrereqs: boolean =
        prereq === null ||
        skills.find((skill) => skill.id === prereq.id)?.status === "active";
      const canSpend =
        prevPointsSpent < totalPoints && skillStatus !== "active" && hasPrereqs;

      if (canSpend) {
        updateSkill(id, "active");
      }

      return canSpend ? prevPointsSpent + 1 : prevPointsSpent;
    });
  };

  const refundSkillPoint = (id: number) => {
    setPointsSpent((prevPointsSpent) => {
      const currentSkill = skills.find((skill) => skill.id === id);

      if (!currentSkill) {
        return prevPointsSpent;
      }

      const skillStatus = currentSkill.status ?? "";

      const isPrereq =
        skills.find((skill) => skill.prereq?.id === currentSkill.id)?.status ===
        "active";
      const shouldRefund =
        prevPointsSpent !== 0 && skillStatus !== "inactive" && !isPrereq;
      if (shouldRefund) {
        updateSkill(id, "inactive");
      }

      return shouldRefund ? prevPointsSpent - 1 : prevPointsSpent;
    });
  };

  const toggleGodMode = () => {
    setGodMode((prevMode) => {
      if (prevMode === true) {
        setTotalPoints(6);
      } else {
        setTotalPoints(8);
      }

      return !prevMode;
    });

  };

  return (
    <SkillTreeContext.Provider
      value={{
        skills,
        skillPaths,
        totalPoints,
        pointsSpent,
        updateSkill,
        spendSkillPoint,
        refundSkillPoint,
        toggleGodMode,
        isGodMode,
      }}
    >
      <div>{children}</div>
    </SkillTreeContext.Provider>
  );
};
