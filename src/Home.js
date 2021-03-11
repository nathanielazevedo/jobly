import "./App.css";
import image from "./images/ima.jpg"


//Welcome page. Introuctory message with login / signup buttons.
//Route = /
//App -> Routes -> Home

function Home() {
  return (
    <>
      <div className="homeDiv">
        <h1 className="text">Find Your Dream Job Today</h1>
      </div>
      <img src={image} className="homeImage" alt="background meadow"/>
    </>
  );
}

export default Home;
