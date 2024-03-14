import SkillTree from "./components/SkillTree";
import PointsDisplay from "./components/PointsDisplay";
import Image from "next/image";
import PartyWizard from "./components/PartyWizard";


export default function Home() {
  return (
    <div className="main">
      <div className="header">
        <div className="header-content">
          <Image
            src="/logo.png"
            width={216}
            height={48}
            alt="TitanStar Legends Logo"
            className="logo"
          />
          <PartyWizard />
        </div>
      </div>
      <h1 className="heading">Rune Mastery Loadout Talent Calculator 9000</h1>

      <section className="content-wrapper">
        <SkillTree />
        <PointsDisplay />
      </section>
    </div>
  );
}
