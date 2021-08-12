import Im1 from "../assets/img/n.jpeg";
import Im2 from "../assets/img/a.jpeg";
import Im3 from "../assets/img/h.jpeg";
import Im4 from "../assets/img/m.jpeg";

import HomeCarousel from "../components/Carousel";
import { useContext } from "react";
import { LangContext } from "../contexts/contexts";
import TeamMember from "../components/teammember";

const About = () => {
  const { Lang } = useContext(LangContext);
  return (
    <>
      <HomeCarousel />

      <div className="row  px-sm-5 mx-4 text-center justify-content-around mb-4">
        <div className="h1  txtone p-4 pt-5">
          {Lang === "en" ? "OUR TEAM " : "أعضاء الفريق"}
        </div>
        <TeamMember
          name={Lang === "en" ? "Nader Abdelazeem" : "نادر عبدالعظيم"}
          img={Im1}
        />
        <TeamMember
          name={Lang === "en" ? "Abdallah Khairy" : "عبدالله خيري"}
          img={Im2}
        />
        <TeamMember
          name={Lang === "en" ? "HosamEldien Mohamed" : "حسام الدين محمد"}
          img={Im3}
        />
        <TeamMember
          name={Lang === "en" ? "Mohamed Ahmed" : "محمد أحمد"}
          img={Im4}
        />
      </div>
    </>
  );
};

export default About;
