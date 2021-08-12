import { useContext } from "react";
import { LangContext } from "../contexts/contexts";

const TeamMember = ({ name, img }) => {
  const { Lang } = useContext(LangContext);
  return (
    <div className="col-sm-6 col-lg-3 zoom">
      <div className="m-3 myshadow rounded">
        <img
          className="w-100 rounded myshadow"
          src={img}
          style={{ height: 250 }}
        />

        <div className=" py-3">
          <h5 className=" py-3">{name}</h5>
          <span>
            {Lang === "en" ? "Front-end Developer" : "مطور واجهات ويب"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default TeamMember;
