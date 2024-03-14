"use client";
import { useContext } from "react";
import { SkillTreeContext } from "../context/SkillTreeContext";
import Image from "next/image";

export default function PartyWizard() {
  const { isGodMode, toggleGodMode } = useContext(SkillTreeContext);

  const classNames: Array<string> = [
    "wizard"
  ];

  if (isGodMode) {
    classNames.push("god-mode");
  }

  return (
    <button className="header-button" onClick={() => toggleGodMode()}>
      <Image
        src="https://media.dndbeyond.com/mega-menu/5188e9cd133362e349708cd3c859a6d2.gif"
        width={36}
        height={36}
        alt="Party Wizard"
        className={classNames.join(' ')}
      />
    </button>
  );
}
