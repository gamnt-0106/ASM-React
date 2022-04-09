import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form';
import { signin, signup } from '../api/auth';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

type FormInputs = {
    email: string,
    password: string | number
}

const Signin = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<FormInputs>();
    const navigate = useNavigate();

    const onSumbit: SubmitHandler<FormInputs> = async (user) => {
        const { data } = await signin(user);
        if (data) {
            toast.success("Vui lòng chờ giây lát !");
            setTimeout(() => {
                navigate('/admin')
                localStorage.setItem("user", JSON.stringify(data))
            }, 3000)
        }
    }
  return (
      <div>
           <form onSubmit={handleSubmit(onSumbit)}>
               
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Email</label>
                    <input type="email" {...register('email', { required: true})} className="form-control" id="exampleInputPassword1"/>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Pass</label>
                    <input type="password" {...register('password')} className="form-control" id="exampleInputPassword1"/>
                </div>
                <button type="submit" href="/admin" className="btn btn-primary">Submit</button>
            </form>
            <ToastContainer />
      </div>
    // <div>
    //     <form onSubmit={handleSubmit(onSubmit)}>
    //         <input type="email" {...register('email', { required: true})}/>
    //         <input type="password" {...register('password')}/>
    //         <button>Dang nhap</button>
    //     </form>
    // </div>
  )
}

export default Signin