import React, {useEffect, useState} from 'react';
import {useForm} from 'react-hook-form';
import {toast} from 'react-toastify';
import {useNavigate, useParams} from 'react-router-dom';
import {useDropzone} from 'react-dropzone';
import axios from '../../axios';
import CreateColors from './CreateColors';
import CreateSizes from './CreateSizes';
import './adminPanel.scss';

const ClothesUpdate = () => {
    const { register, handleSubmit, setValue } = useForm();
    const navigate = useNavigate();
    const params = useParams();
    const [clothes, setClothes] = useState({});
    const [colors, setColors] = useState([]);
    const [sizes, setSizes] = useState([]);
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(false);
    const { getRootProps, getInputProps } = useDropzone({
        onDrop: (acceptedFiles) => setImages([...images, ...acceptedFiles]),
    });

    useEffect(() => {
        axios.get(`/clothes/${params.id}`).then(({ data }) => {
            setClothes(data);
            setColors(data.colors);
            setSizes(data.sizes);
            setImages(data.images);
            setValue('title', data.title);
            setValue('price', data.price);
            setValue('inStock', data.inStock);
            setValue('category', data.category);
            setValue('gender', data.gender);
        });
    }, [params.id, setValue]);

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
                if (typeof image === 'string') {
                    formData.append('images', image);
                } else {
                    formData.append('images', image);
                }
            });

            await axios.patch(`/clothes/${params.id}`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });

            toast.success('Продукт успешно изменён');
            navigate('/admin/clothes');
        } catch (err) {
            toast.error('Ошибка при изменении продукта');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form className='create__form' onSubmit={handleSubmit(onSubmit)}>
            <div className='create__form-content'>

                <div className='create__form-block'>
                    <label className='create__form-label' htmlFor='title'>Название</label>
                    <input {...register('title')} className='create__form-input' type='text' id='title' />
                </div>

                <div className='create__form-block'>
                    <label className='create__form-label' htmlFor='price'>Цена</label>
                    <input {...register('price')} className='create__form-input' type='number' id='price' />
                </div>

                <div className='create__form-block'>
                    <label className='create__form-label' htmlFor='inStock'>Количество</label>
                    <input {...register('inStock')} className='create__form-input' type='number' id='inStock' />
                </div>

                <div {...getRootProps()} className='dropzone create__form-block'>
                    <input {...getInputProps()} />
                    <p>Перетащите файлы сюда или нажмите, чтобы выбрать файлы</p>
                </div>

                <div className='create__form-images'>
                    {images.map((file, index) => (
                        <div className='create__form-block-for-div' key={index}>
                            <img
                                src={typeof file === 'string'
                                    ? `${process.env.REACT_APP_IMAGE_URL}${file}`
                                    : URL.createObjectURL(file)}
                                alt='preview'
                            />
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
                    <p className='create__form-title'>Товар для :</p>
                    <div className='create__form-inpt'>
                        <input {...register('gender')} value='man' type='radio' id='man' />
                        <label htmlFor='man'>Для мужчин</label>
                    </div>
                    <div className='create__form-inpt'>
                        <input {...register('gender')} value='woman' type='radio' id='woman' />
                        <label htmlFor='woman'>Для женщин</label>
                    </div>
                    <div className='create__form-inpt'>
                        <input {...register('gender')} value='uni' type='radio' id='uni' />
                        <label htmlFor='uni'>Унисекс</label>
                    </div>
                </div>

                <div className='create__form-block'>
                    <label className='create__form-label' htmlFor='category'>Категория</label>
                    <select {...register('category')} className='create__form-select' id='category'>
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

                <button className='create__form-btn' type='submit' disabled={loading}>
                    {loading ? 'Изменяется...' : 'Изменить'}
                </button>
            </div>
        </form>
    );
};

export default ClothesUpdate;
