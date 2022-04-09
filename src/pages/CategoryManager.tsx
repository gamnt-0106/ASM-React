import React from 'react'
import {CategoryType} from '../types/Category'
import {Link} from 'react-router-dom'


type CategoryManagerProps = {
  data:CategoryType[],
  onRemove: (id:number) => void
}

const CategoryManager = (props: CategoryManagerProps) => {
  return (
    <div>
      <table className="table">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Price</th> 
               <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {props.data && props.data.map((item,index) =>{
              return <tr key ={index}>
                <td>{index+1}</td>
                <td>{item.name}</td>
                <Link to={`/admin/category/${item._id}/edit`}>Edit</Link>
                <button onClick={() => props.onRemove(item._id)}>Remove</button>
              </tr>
            })}
          </tbody>
      </table>
    </div>
  )
}

export default CategoryManager