import React, { useEffect, useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { read } from '../api/Category';
import { CategoryType } from '../types/Category';

type CategoryEditProps = {
    onUpdate: (Category: CategoryType) => void
}
type FormInputs = {

    name: string,
    price: number
}

const CategoryEdit = (props: CategoryEditProps) => {
    const { id } = useParams();
    const {register, handleSubmit, formState: {errors}, reset} = useForm<FormInputs>();
    const navigate = useNavigate();

    useEffect(() => {
        const getCategory = async () => {
            const { data } = await read(id);
            reset(data);
        }
        getCategory();
    }, []);

    const onSubmit: SubmitHandler<FormInputs> = data => {
        
        props.onUpdate(data);
        navigate('/admin/Category');
    } 
    
  return (
    <form action="" onSubmit={handleSubmit(onSubmit)}>
        <input type="text" placeholder='Tên sản phẩm' {...register('name')}/>
        <input type="number" placeholder='Giá sản phẩm' {...register('price')}/>
        <button>Update</button>
    </form>
  )
}

export default CategoryEdit