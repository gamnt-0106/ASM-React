import instance from './instance';
import { CategoryType } from '../types/Category';
export const list = () => {
    const url = '/Categorys';
    return instance.get(url);
}
export const add = (Category:CategoryType) =>{
    const url = `/Categorys`;
    return instance.post(url,Category);
}
export const remove = (id: number) => {
    const url = `/Categorys/${id}`;
    return instance.delete(url);
}
export const update = (Category:CategoryType) =>{
    const url = `/Categorys/${Category._id}`;
    return instance.put(url,Category);
}
export const read = (id:number) =>{
    const url = `/Categorys/${id}`;
    return instance.get(url);
}