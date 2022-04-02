import { useEffect, useState } from 'react'
import axios from 'axios';
import logo from './logo.svg'
import './App.css'
import ShowInfo from './components/showinfo'
import type { ProductType } from './types/product';
import { add, list, remove, update } from './api/product';
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



function App() {
  const [products, setProducts] = useState<ProductType[]>([]); // 1 destructuring [ ] = uesState (data,() =)
  // const [count, setCount] = useState<number>(0);
  
  useEffect(() => { // 3 call tới api
     const getProducts = async () => {
        const { data } = await list();
        setProducts(data);
     }
     getProducts();
  },[])

  const onHandleRemove = async (id: number) => {
    // xoa tren API
     await remove(id);
    // reRender
    setProducts(products.filter(item => item.id !== id));
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
   setProducts(products.map(item => item.id == data.id ? data : item));
}

  return ( 
    <Routes>
      <Route path="/" element={<WebsiteLayout />}>
          <Route index element={<Home />} />
          <Route path="product" element={<Product />} />
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
 
