import {Link, withRouter} from 'react-router-dom'

import { useContext } from 'react'

import { GiShoppingCart } from "react-icons/gi"

import { CartContext } from '../../context/cartContext'



const Header = () => {
    const {state} = useContext(CartContext)
    let total


    const onClickCartIcon = () => (
        <div className='w-[30vw] bg-[#ffffff]'>
            <div className='w-full h-[2vh] flex justify-between'>
                <Link to='/cart'>
                    <button className='h-full w-[6vw] bg-[#306acf] p-auto'>View Cart</button>
                </Link>
                <button className='h-full w-[6vw] bg-[#306acf] p-auto'>Check Out</button>
            </div>
            {state && state.cartList.length > 0 && <ul className='w-full pl-[0px]'>
                        {state.cartList.map(eachCartItem => 
                        <li className='w-full h-[2vh] flex justify-between items-center list-none' key={eachCartItem.id}>
                          <img src={eachCartItem.image} alt={eachCartItem.title} className='h-[2vh] w-[2vw]' />
                          <p className='text-sm font-[Roboto]'>{eachCartItem.price}x{eachCartItem.quantity}=({eachCartItem.price} * (eachCartItem.quantity))</p>
                        </li>
                        )}
                    </ul>
                }
            <p className='text-sm font-[Roboto]'>{state.cartList.map (eachCartItem =>
                total += (eachCartItem.price * eachCartItem.quantity)
            )}</p>
        </div>
    )

    return (

        <div className='flex justify-between items-center w-screen h-[10vh] bg-[#332155]'>
            <img src='https://res.cloudinary.com/dtrjr55q7/image/upload/v1746090077/7894617_1_xehqos.jpg' className='w-[5vh] h-[5vh]' alt='website logo' />
            <ul className='w-[30vw] h-full flex justify-between items-center mr-4'>
                <Link to='/'>
                    <li className='text-[#ffffff] text-lg font-[Roboto] list-none'>Home</li>
                </Link>
                <Link to='/products'>
                    <li  className='text-[#ffffff] text-lg font-[Roboto] list-none'>Products</li>
                </Link>
                <li className='text-[#ffffff]'>
                    <button type='button' onClick={onClickCartIcon}>
                        <GiShoppingCart size={30} />
                    </button>
                </li>      
            </ul>
        </div>
    )
}

export default withRouter(Header)