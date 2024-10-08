import React, {useState} from 'react';
import {BsWhatsapp, BsInstagram, BsTelegram} from 'react-icons/bs'
import First from "../home/first/First";
import Map from "./map/Map";
import Crumbs from "../../components/crumbs/Crumbs";


const Contact = () => {

    const [shop,setShop] = useState('3Affcffe495d5d0c9c3b9c2e225f33728d7eebf3f95a45cb12a6284c3769635d4a')

    const redirectToMap = () => {
        window.location.href = "https://maps.google.com/?q=г.+Бишкек,+улица+ Турусбекова,+124";
    };

    return (
        <section className='contact'>
            <div className="container">
                <Crumbs title='Контакты'/>
                <h2 className='contact__title'>Связаться с нами</h2>
                <div className='contact__lists'>
                    <ul className='contact__list'>
                        <li className='contact__item1'>В социальных сетях</li>
                        <div className='contact__icon'>
                            <li className='contact__item2'><a className='contact__item2' href="https://t.me/alinur001" target="_blank"><BsTelegram/></a></li>
                            <li className='contact__item2'><a className='contact__item2' target='_blank' href="https://www.instagram.com/aloha_shopkg/"><BsInstagram/></a></li>
                            <li className='contact__item2'><a className='contact__item2' href="https://wa.me/+996702965650" target="_blank" ><BsWhatsapp/></a></li>
                        </div>
                    </ul>
                    <ul className='contact__list'>
                        <li className='contact__item1'>По телефону</li>
                        <li className='contact__item'><a className='contact__item' href="tel: +996(702)96 56 50">+996 702 96 56 50</a></li>
                        <li className='contact__item'><a className='contact__item' href="tel: +996(702)96 56 50">+996 702 96 56 50</a></li>
                    </ul>
                    <ul className='contact__list contact__list2'>
                        <li className='contact__item1'>По почте</li>
                        <li className='contact__item'><a className='contact__item' href="mailto:alinursatylganov8@gmail.com">alinursatylganov8@gmail.com</a></li>


                    </ul>
                    <ul className='contact__list'>
                        <li className='contact__item1'>Наш офис</li>
                        <li className='contact__item' onClick={redirectToMap}>г. Бишкек, улица Турусбекова, 124</li>
                    </ul>
                </div>
                <Map shop={shop} setShop={setShop}/>
                <First/>
            </div>
        </section>
    );
};

export default Contact;
