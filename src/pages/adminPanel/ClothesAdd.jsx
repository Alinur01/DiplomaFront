import React, { useState } from 'react';
import axios from '../../axios';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useDropzone } from 'react-dropzone';
import CreateColors from "./CreateColors";
import CreateSizes from "./CreateSizes";
import './adminPanel.scss';

const ClothesAdd = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const [colors, setColors] = useState([]);
    const [sizes, setSizes] = useState([]);
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(false);

    const onDrop = (acceptedFiles) => {
        setImages([...images, ...acceptedFiles]);
    };

    const { getRootProps, getInputProps } = useDropzone({ onDrop });

    const onSubmit = async (data) => {
        try {
            setLoading(true);
            const formData = new FormData();
            formData.append('title', data.title);
            formData.append('price', data.price);
            formData.append('colors', JSON.stringify(colors));
            formData.append('sizes', JSON.stringify(sizes));
            formData.append('category', data.category);
            formData.append('inStock', data.inStock);
            formData.append('gender', data.gender);

            images.forEach((image) => {
                formData.append('images', image);
            });

            const response = await axios.post('/clothes', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });

            toast.success('Продукт успешно создан');
            navigate('/admin/clothes');
        } catch (err) {
            toast.error('Ошибка при создании продукта');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className='create__form'>
            <div className='create__form-content'>

                <div className='create__form-block'>
                    <label className='create__form-label'>Название</label>
                    <input
                        {...register('title', { required: 'Это поле обязательное' })}
                        className='create__form-input'
                    />
                    {errors.title && <p>{errors.title.message}</p>}
                </div>

                <div className='create__form-block'>
                    <label className='create__form-label'>Цена</label>
                    <input
                        type="number"
                        {...register('price', { required: 'Это поле обязательное' })}
                        className='create__form-input'
                    />
                    {errors.price && <p>{errors.price.message}</p>}
                </div>

                <div className='create__form-block'>
                    <label className='create__form-label'>Количество</label>
                    <input
                        type="number"
                        {...register('inStock', { required: 'Это поле обязательное' })}
                        className='create__form-input'
                    />
                    {errors.inStock && <p>{errors.inStock.message}</p>}
                </div>

                <div {...getRootProps()} className="dropzone create__form-block">
                    <input {...getInputProps()} />
                    <button className='create__form-btn'>Выбрать файлы</button>
                </div>

                <div className='create__form-block-for'>
                    {images.map((file, index) => (
                        <div className='create__form-block-for-div' key={index}>
                            <img src={URL.createObjectURL(file)} alt="preview" />
                        </div>
                    ))}
                </div>

                <div >
                    <ul className='create__form-colors'>
                        <li>Выберите цвет:</li>
                        <CreateColors colors={colors} setColors={setColors} color='blue' />
                        <CreateColors colors={colors} setColors={setColors} color='black' />
                        <CreateColors colors={colors} setColors={setColors} color='white' />
                        <CreateColors colors={colors} setColors={setColors} color='red' />
                        <CreateColors colors={colors} setColors={setColors} color='green' />
                        <CreateColors colors={colors} setColors={setColors} color='orange' />
                        <CreateColors colors={colors} setColors={setColors} color='pink' />
                        <CreateColors colors={colors} setColors={setColors} color='grey' />
                    </ul>
                </div>

                <div >
                    <ul className='create__form-sizes'>
                        <li>Выбрать размер:</li>
                        <CreateSizes sizes={sizes} setSizes={setSizes} size='XS' />
                        <CreateSizes sizes={sizes} setSizes={setSizes} size='S' />
                        <CreateSizes sizes={sizes} setSizes={setSizes} size='M' />
                        <CreateSizes sizes={sizes} setSizes={setSizes} size='L' />
                        <CreateSizes sizes={sizes} setSizes={setSizes} size='XL' />
                        <CreateSizes sizes={sizes} setSizes={setSizes} size='XXL' />
                    </ul>
                </div>

                <div className='create__form-gender'>
                    <p className='create__form-title'>Товар для:</p>
                    <div className='create__form-inpt'>
                        <input {...register('gender')} value='man' type="radio" id='man' />
                        <label htmlFor="man">Для мужчин</label>
                    </div>
                    <div className='create__form-inpt'>
                        <input {...register('gender')} value='woman' type="radio" id='woman' />
                        <label htmlFor="woman">Для женщин</label>
                    </div>
                    <div className='create__form-inpt'>
                        <input {...register('gender')} value='uni' type="radio" id='uni' />
                        <label htmlFor="uni">Унисекс</label>
                    </div>
                    <div className='create__form-inpt'>
                        <input {...register('gender')} value='furniture' type="radio" id='furniture' />
                        <label htmlFor="furniture">Мебель</label>
                    </div>
                    <div className='create__form-inpt'>
                        <input {...register('gender')} value='garden' type="radio" id='garden' />
                        <label htmlFor="garden">Огород</label>
                    </div>
                    <div className='create__form-inpt'>
                        <input {...register('gender')} value='phones' type="radio" id='phones' />
                        <label htmlFor="phones">Телефоны</label>
                    </div>
                </div>

                <div className='create__form-block'>
                    <label htmlFor="category">Категория</label>
                    <select
                        {...register('category', { required: 'Это поле обязательное *' })}
                        className='create__form-select'
                        id='category'
                    >
                        <option value='hoody'>Худи</option>
                        <option value='sportsuit'>Спортивный костюм</option>
                        <option value='sweatshirt'>Свитшот</option>
                        <option value='tshort'>Футболка</option>
                        <option value='pants'>Штаны</option>
                        <option value='shorts'>Шорты</option>
                        <option value='jacket'>Куртка</option>
                        <option value='waistcoat'>Жилет</option>
                        <option value='sneakers'>Кроссовки</option>
                        <option value='phones'>Телефоны</option>
                        <option value='tablets'>Планшеты</option>
                        <option value='smartBands'>Умные браслеты</option>
                        <option value='accessories'>Аксессуары</option>
                        <option value='chemicals'>Химикаты</option>
                        <option value='garden'>Сад</option>
                        <option value='furniture'>Мебель</option>
                    </select>
                </div>

                <button type="submit" className='create__form-btn' disabled={loading}>
                    {loading ? 'Создается...' : 'Создать'}
                </button>
            </div>
        </form>
    );
};

export default ClothesAdd;
