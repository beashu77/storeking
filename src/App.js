import "./App.css";
import ProductListDashboard from "./Components/ProductListDashboard";

function App() {
  return (
    <div
      className="App d-flex justify-content-center"
      style={{
        minHeight:'100vh',
        backgroundImage: `url('https://wallpapercave.com/wp/wp2593229.jpg')`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="container-lg mt-5 rounded" >
        <ProductListDashboard />
      </div>
    </div>
  );
}

export default App;
