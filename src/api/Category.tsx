import instance from './instance';
import { CategoryType } from '../types/Category';
export const listCate = () => {
    const url = '/Category';
    return instance.get(url);
}
export const addCate = (Category:CategoryType) =>{
    const url = `/Category`;
    return instance.post(url,Category);
}
export const removeCate = (id: number) => {
    const url = `/Category/${id}`;
    return instance.delete(url);
}
export const updateCate = (Category:CategoryType) =>{
    const url = `/Category/${Category._id}`;
    return instance.put(url,Category);
}
export const readCate = (id:number) =>{
    const url = `/Category/${id}`;
    return instance.get(url);
}