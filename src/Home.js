import "./App.css";
import image from "./images/ima.jpg"

function Home() {
  return (
    <>
      <div className="homeDiv">
        <h1 className="text">Find Your Dream Job Today</h1>
      </div>
      <img src={image} className="homeImage"/>
    </>
  );
}

export default Home;
