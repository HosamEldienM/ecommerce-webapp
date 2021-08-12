import { useContext } from "react";
import { Carousel } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import c1 from "../assets/img/back1.jpg";
import c2 from "../assets/img/back2.jpg";
import c3 from "../assets/img/back3.jpg";
import { LangContext } from "../contexts/contexts";

const HomeCarousel = () => {
  const history = useHistory();
  const { Lang } = useContext(LangContext);
  const caption = (
    <Carousel.Caption>
      <p className="h3  txtshadow ">
        {Lang === "en"
          ? "We provide top-quality handmade products made in Aswan and out of Aswan"
          : "نقدم منتجات يدوية مصنوعة في أسوان وخارجها بأفضل جودة ممكنة"}
      </p>
      <br />
      <button
        className="btn btn-lg btn-one rounded p-2 px-4"
        onClick={() => history.push("./products")}
      >
        {Lang === "en" ? "SHOP NOW" : "تسوق الآن"}
      </button>
    </Carousel.Caption>
  );
  return (
    <div className="myshadow">
      <Carousel fade>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={c1}
            alt="First slide"
            style={{ minHeight: 300, maxHeight: 500 }}
          />
          {caption}
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={c2}
            alt="Second slide"
            style={{ minHeight: 300, maxHeight: 500 }}
          />

          {caption}
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={c3}
            alt="Third slide"
            style={{ minHeight: 300, maxHeight: 500 }}
          />
          {caption}
        </Carousel.Item>
      </Carousel>
    </div>
  );
};

export default HomeCarousel;
