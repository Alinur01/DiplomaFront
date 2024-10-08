import React from 'react';


const First = () => {
    return (
        <section className='first'>
            <div className="container">
                <h2 className='first__title'>Узнайте  первым о новинках</h2>
                <form
                    className='first__form'
                    action="https://formspree.io/f/xwpkeanp"
                    method="POST"
                >
                    <input placeholder="Имя, Фамилия*" className='first__input' type="text" name="name" required/>
                    <br/>
                    <input placeholder='Ваш e-mail*' className='first__input' type="email" name="email" required/>
                    <br/>
                    <input placeholder='Ваш телефон' className='first__input' type="number" name="number" required/>
                    <br/>
                    <textarea placeholder="Напишите нам, что вас интересует!" name="message" className='first__input'></textarea>
                    <button className='first__btn' type='submit'>ПОДПИСАТЬСЯ</button>
                    <p className='first__agree'>Нажимая на кнопку «<span className='first__agree_text'>Подписаться</span>», я соглашаюсь на обработку моих <br/>
                        персональных данных и ознакомлен(а) с условиями конфиденциальности.</p>
                </form>
            </div>
        </section>
    );
};

export default First;
