import { useEffect, useState } from 'react'
import axios from 'axios';
import logo from './logo.svg'
import './App.css'
import ShowInfo from './components/showinfo'
import type { ProductType } from './types/product';
import { add, list, remove, update } from './api/product';
import {listCate,addCate,removeCate, updateCate} from './api/Category'
import { Navigate, NavLink, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Product from './pages/Product';
import Dashboard from './pages/Dasboard';
import ManagerProduct from './pages/ManagerProduct';
import WebsiteLayout from './pages/layouts/websiteLayout';
import AdminLayout from './pages/layouts/AdminLayout';
import "bootstrap/dist/css/bootstrap.min.css"
import ProductAdd from './pages/ProductAdd';
import ProductEdit from './pages/ProductEdit';
import Signin from './pages/Signin';
import Signup from './pages/Signup';
import ProductDetail from './pages/ProductDetail'
import CategoryManager from './pages/CategoryManager';
import CategoryAdd from './pages/CategoryAdd';
import CategoryEdit from './pages/CategoryEdit';
import { CategoryType } from './types/Category';
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.min.css"


function App() {
  const [products, setProducts] = useState<ProductType[]>([]); // 1 destructuring [ ] = uesState (data,() =)
  // const [count, setCount] = useState<number>(0);
const [Categorys,setCategorys] = useState <CategoryType[]>([]);
  
  useEffect(() => { // 3 call tới api
     const getProducts = async () => {
        const { data } = await list();
        setProducts(data);
     }
     getProducts();

     const getCategory = async () =>{
      const {data} = await  listCate();
      console.log(data);
      
      setCategorys(data);
    }
    getCategory();
  },[])

  const onHandleRemove = async (id: number) => {
    // xoa tren API
     await remove(id);
    // reRender
    setProducts(products.filter(item => item._id !== id));
  }
  const onHandleAdd = async (product:ProductType) =>{
    //call api 
    const {data} = await add(product);
    setProducts([...products,data])
  }
  //update
  const onHandleUpdate = async (product:ProductType) => {
    console.log(product);
   const { data } = await update(product)
   setProducts(products.map(item => item._id == data.id ? data : item));
}

//// category


// xoa
const onCategoryRemove = async (id:number) =>{
  await removeCate(id);
  //reRender
  setCategorys (Categorys.filter(item => item._id !== id));
}

const onCategoryAdd =async (Category:CategoryType) => {
  //call api
  const {data} = await addCate(Category);
  setCategorys([...Categorys,data])
}

//update
const onCategoryUpdate = async (Category:CategoryType) =>{
  console.log(Category);
  const {data} = await updateCate (Category);
  setCategorys(Categorys.map(item => item._id == data.id ? data:item));
  
}

/////

  return ( 
    <Routes>
      <Route path="/" element={<WebsiteLayout />}>
      <Route path="detail">
            <Route path=":id/products" element={<ProductDetail products={products}/>} />
      </Route>
      <Route index element={<Home products={products}/>} />
          <Route path="product" element={<Product products={products} />} />
          <Route path="signup" element={<Signup />}/>
          <Route path="signin" element={<Signin />}/>
      </Route>
      <Route path="admin" element={<AdminLayout />}> 
        <Route index element={<Navigate to="dashboard"/>} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="product">
          <Route index element={<ManagerProduct data={products} onRemove={onHandleRemove}/>} />
          <Route path="add" element={<ProductAdd onAdd={onHandleAdd}/>} />
          <Route path=":id/edit" element={<ProductEdit onUpdate={onHandleUpdate}/>} />
      </Route>
      <Route path='category'>
      <Route index element={<CategoryManager data={Categorys} onRemove={onCategoryRemove}/>} />
          <Route path="add" element={<CategoryAdd onAdd={onCategoryAdd}/>} />
          <Route path=":id/edit" element={<CategoryEdit onUpdate={onCategoryUpdate}/>} />

      </Route>
      </Route>
    </Routes>
  )
}

export default App
//B1: npm i react-router-dom
//B2: sử dụng component <BrowserRouter> để wrapper <App /> trong file main.tsx
//B3: Khai báo và sử dụng <Routes> trong app
//B4: Khai báo sử dụng <Route> để định nghĩa các đường đẫn

  
//   const [info, setInfo] = useState<ProductType>({
//     name: "Gam",
//     age: 22
//   });
//   const [product,setProduct]=useState<ProductType[]>([]);
//   const [count,setCount] = useState<number>(0);

//   useEffect(() =>{
//     const getProducts = async () => {
//       const {data} = await axios.get(' http://localhost:3000/product');
//       setProduct(data);
//     }
//     getProducts();
//   },[])
//   const revomoveItem = (id:number) =>{
//     //xoa api
//     console.log(id);
//     axios.delete(' http://localhost:3000/product/'+id);
  
    
//   }
  
//   return (//2
//     <div className="App">
//       <table>
//         <thead>
//           <th>#</th>
//           <th>Name</th>
//           <th></th>
//         </thead>
//       </table>
//       {count} <button onClick={() => setCount(count + 1)}>Click</button>
//       <ShowInfo info={info} />
//       <hr />
//       {product.map(item => <div>{item.name}</div>)}

//   </div>
//  )
 
