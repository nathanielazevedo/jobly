import "./App.css";
import image from "./images/ima.jpg"

function Home() {
  return (
    <>
      <h1 className="homeText">Find Your Dream Job Today</h1>
      <img src={image} className="homeImage"/>
    </>
  );
}

export default Home;
