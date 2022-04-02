import React from 'react'
import type {ProductType} from '../types/product'

type ShowInfoPropsProps = {
    name:string,
    children:JSX.Element
}

const ShowInfoProps = (props: ShowInfoPropsProps) => {
  return (
    <div>
        Hello Thay ...{props.children}
    </div>
  )
}

export default ShowInfoProps