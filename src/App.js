import { BrowserRouter as Router,Routes,Route } from "react-router-dom";
import Categories from "./Administrator/Categories/Categories";
import SubCategories from "./Administrator/Subcategoies/SubCategories";
import DisplayAllCategories from "./Administrator/Categories/DisplayAllCategories";
import DisplayAllSubCategories from "./Administrator/Subcategoies/DisplayAllSubCategories";
import Brand from "./Administrator/Brand/Brand";
import DisplayBrand from "./Administrator/Brand/DisplayBrand";
import Header from "./UserInterFace/Header";
import Home from "./UserInterFace/Home";
import SliderOwn from "./UserInterFace/Slider";
import Product from "./Administrator/products/product"
import DisplayProduct from "./Administrator/products/displayallproduct";
import MyDrawer from "./UserInterFace/Drawer";
import Dashboard from "./Administrator/Admin/DashBoard";
import AdminLogin from "./Administrator/Admin/AdminLogin";
import ProductImage from "./Administrator/products/ProductImage";
import Reduxpractice from "./Services/ReduxPractice";
import ReduxData from "./Services/storereduxdata";
function App() {
  return (
   <div>
    <Router>
      <Routes>
      <Route element={ <Categories/>} path="/category"/>
      <Route element={ <DisplayAllCategories/>} path="/displayallcategory"/>
        <Route element={ <SubCategories/>} path="/subcategory"/>
       <Route element={<DisplayAllSubCategories/>}path="/displayallsubcategory"/> 
       <Route element={<Brand/>} path="/brand"/>
       <Route element={<DisplayBrand/>} path="/displaybrand"/>
       <Route element={<Product/>} path="/product"/>
       <Route element={<DisplayProduct/>} path="/displayproduct"/>4
       <Route element={<ProductImage/>} path="/productimage"/>

       <Route element={<Header/>} path="/header"/>
       <Route element={<Home/>} path="/home"/>
       <Route element={<Dashboard/>} path="/dashboard"/>
       <Route element={<AdminLogin/>} path="/adminlogin"/>

       <Route element={<SliderOwn/>} path="/slider"/>
       <Route element={<MyDrawer/>} path="/drawer"/>
       <Route element={<Reduxpractice/>} path="/redux"/>
       <Route element={<ReduxData/>} path="/storereduxdata"/>
      </Routes>

    </Router>
  
   </div>
  );
}

export default App;
