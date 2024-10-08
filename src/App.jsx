import {Route, Routes} from 'react-router-dom'
import {useEffect} from "react";
import axios from "./axios";
import {useDispatch, useSelector} from "react-redux";
import {getAll} from "./redux/reducers/clothes";
import {registerUser} from "./redux/reducers/user";
import './App.scss'
import {getFromLocalStorage} from './redux/reducers/basket'
import Layout from "./layout/Layout";
import Home from "./pages/home/Home";
import Catalog from "./pages/catalog/Catalog";
import Product from "./pages/product/Product";
import Basket from "./pages/basket/Basket";
import Profile from "./pages/profile/Profile";
import Favorites from "./pages/favorites/Favorites";
import Contact from "./pages/contact/Contact";
import AdminPanel from "./pages/adminPanel/AdminPanel";
import Delivery from "./pages/delivery/Delivery";
import CustomizedAccordions from "./pages/questions/Questions";
import Care from "./pages/care/Care";
import Loyal from "./pages/loyal/Loyal";
import Register from "./pages/register/Register";
import Login from "./pages/login/Login";
import NotFound from "./pages/notFound/NotFound";


function App() {

    const dispatch = useDispatch()
    const basket = useSelector(s => s.basket.basket)

    console.log(process.env)


    useEffect(() => {
        axios('/clothes').then(({data}) => dispatch(getAll({arr: data})))


    }, []);

    useEffect(() => {
        if (localStorage.getItem('user') !== null){
            dispatch(registerUser({obj: JSON.parse(localStorage.getItem('user'))}))
        }

        if (localStorage.getItem('basket') !== null){
            dispatch(getFromLocalStorage({arr: JSON.parse(localStorage.getItem('basket'))}))
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('basket', JSON.stringify(basket))
    },[basket])

    return (
        <div className="App">
            <Routes>
                <Route path='/' element={<Layout/>}>
                    <Route path='' element={<Home/>}/>
                    <Route path='catalog/:category' element={<Catalog/>}/>
                    <Route path='product/:id' element={<Product/>}/>
                    <Route path='basket' element={<Basket/>}/>
                    <Route path='profile' element={<Profile/>}/>
                    <Route path='favorites' element={<Favorites/>}/>
                    <Route path='contact' element={<Contact/>}/>
                    <Route path='admin/*' element={<AdminPanel/>}/>
                    <Route path='info' element={<Delivery/>}/>
                    <Route path='questions' element={<CustomizedAccordions/>}/>
                    <Route path='care' element={<Care/>}/>
                    <Route path='loyal' element={<Loyal/>}/>
                </Route>
                <Route path='/register' element={<Register/>}/>
                <Route path='/login' element={<Login/>}/>
                <Route path='/*' element={<NotFound/>}/>
            </Routes>
        </div>
    );
}

export default App;
