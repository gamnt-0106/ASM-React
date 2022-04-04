import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { SubmitHandler, useForm } from 'react-hook-form';
import { ProductType } from '../types/productDetail'
import { read } from '../api/product';
import img from 'src/images/single-product-01.jpg'
import imga from 'src/images/single-product-02.jpg'
// import 'src/css/bootstrap.min.css'
// import '../src/assets/css/flex-slider.css'
// import '../src/assets/css/font-awesome.css'
// import '../src/assets/css/lightbox.css'
// import '../src/assets/css/owl-carousel.css'
// import '../src/assets/css/templatemo-hexashop.css'
// import '../src/assets/css/csscaptun.css's
type ProductDetailProps = {
  products: ProductType[]
}

type Show = {
  name: string,
  price: number,
  desc: string
}

const ProductDetail = (props: ProductDetailProps) => {
  const {id} = useParams();
  const { register, formState: { errors }, reset } = useForm<Show>();
  useEffect(() => {
    const getProduct = async () => {
      const { data } = await read(id);
      reset(data);
    };
    getProduct();
  }, []);
  return (
    <>
      
      <section className="section" id="product">
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <div className="left-images">
              <img src={img} />
              <img src={imga} />
              </div>
            
            </div>
            <div className="col-lg-4">
              <div className="right-content">
                <h4><input type="text" placeholder="Enter Name." className="input" {...register('name')} />
                </h4>
                <span className="price"><input type="text" placeholder="Enter Name." className="input" {...register('price')} />
                </span>
                <ul className="stars">
                  
                  <li><i className="fa fa-star" /></li>
                  <li><i className="fa fa-star" /></li>
                  <li><i className="fa fa-star" /></li>
                  <li><i className="fa fa-star" /></li>
                  <li><i className="fa fa-star" /></li>
                </ul>
                <span className="desc"><input type="text" placeholder="Enter Name." className="input" {...register('desc')} />
                </span>
                <div className="quote">
                  <i className="fa fa-quote-left" />
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiuski smod.</p>
                </div>
                <div className="quantity-content">
                  <div className="left-content">
                    <h6>No. of Orders</h6>
                  </div>
                  <div className="right-content">
                    <div className="quantity buttons_added">
                      <input type="button" defaultValue="-" className="minus" />
                      <input type="number" step={1} min={1} name="quantity" defaultValue={1} title="Qty" className="input-text qty text" size={4} />
                      <input type="button" defaultValue="+" className="plus" />
                    </div>
                  </div>
                </div>
                <div className="total">
                  <h4>Total: $210.00</h4>
                  <div className="main-border-button"><a href="#">Add To Cart</a></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


    </>
  )

}

export default ProductDetail