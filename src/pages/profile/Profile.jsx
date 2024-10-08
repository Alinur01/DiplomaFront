import React from 'react';
import History from "./history/History";
import Crumbs from "../../components/crumbs/Crumbs";

const Profile = () => {

    return (
        <div className='profile'>
            <div className="container">
                <Crumbs title='Личный кабинет'/>
            </div>
            <History/>
        </div>
    );
};

export default Profile;
