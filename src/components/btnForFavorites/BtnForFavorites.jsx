import React from 'react';
import { MdOutlineFavoriteBorder } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../redux/reducers/user";
import axios from "../../axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const BtnForFavorites = ({ item, product }) => {
    const user = useSelector(s => s.user.user);
    const favorites = user.favorites || []; // Ensure favorites is an array
    const dispatch = useDispatch();

    const addFavoritesForUser = (obj) => {
        axios.patch(`/users/favorites/${user._id}`, { favorites: obj.favorites })
            .then((res) => {
                dispatch(registerUser({ obj: res.data }));
                localStorage.setItem('user', JSON.stringify(res.data));
                if (obj.status === 'del') {
                    toast("Удалено из Избранных!");
                } else {
                    toast("Добавлено в Избранное!");
                }
            })
            .catch((err) => console.log(err));
    };

    const isFavorite = favorites.findIndex(el => el._id === item._id) >= 0;

    return (
        <>
            {
                product
                    ? <button className='product__btn2'
                              style={{
                                  background: isFavorite ? "tomato" : '',
                                  color: isFavorite ? "white" : '',
                                  border: isFavorite ? "none" : ''
                              }}
                              onClick={() => {
                                  addFavoritesForUser({
                                      favorites: isFavorite ? favorites.filter(el => el._id !== item._id) : [...favorites, item],
                                      status: isFavorite ? 'del' : 'add'
                                  });
                              }}>
                        {isFavorite ? 'Добавлено в Избранное' : 'Добавить в избранное'}
                    </button>
                    : <button className='catalog__content-fav'
                              style={{ color: isFavorite ? "tomato" : '' }}
                              onClick={() => {
                                  addFavoritesForUser({
                                      favorites: isFavorite ? favorites.filter(el => el._id !== item._id) : [...favorites, item],
                                      status: isFavorite ? 'del' : 'add'
                                  });
                              }}>
                        <MdOutlineFavoriteBorder />
                    </button>
            }
            <ToastContainer
                position="bottom-left"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </>
    );
};

export default BtnForFavorites;
