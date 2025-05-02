import {Link, withRouter} from 'react-router-dom'

import { useState, useContext, useEffect } from 'react'

import { GiShoppingCart } from "react-icons/gi"

import { MdDarkMode } from "react-icons/md"

import { MdLightMode } from "react-icons/md"

import { CartContext, actionTypes } from '../../context/cartContext'



const Header = () => {
    const {state, dispatch} = useContext(CartContext)
    
    const [isCartVisible, setIsCartVisible] = useState(false)

    const onToggleDarkMode = () => {
        dispatch({ type: actionTypes.TOGGLE_DARK_MODE });
      }

    useEffect(() => {
        localStorage.setItem('isDarkModeOn', JSON.stringify(state.isDarkModeOn));
    }, [state.isDarkModeOn])

    const toggleCartVisibility = () => {
        setIsCartVisible(prevState => !prevState);
    }

    const totalQuantity = state.cartList.reduce((acc, item) => acc + (item.quantity * item.price), 0)
    console.log(totalQuantity)

    const bgColor = state.isDarkModeOn ? 'bg-[#1f1f1f]' : 'bg-[#332155]'

    return (

        <div className={`flex justify-between items-center w-screen h-[10vh] ${bgColor}`}>
            <img src='https://res.cloudinary.com/dtrjr55q7/image/upload/v1746090077/7894617_1_xehqos.jpg' className='w-[5vh] h-[5vh]' alt='website logo' />
            <ul className='w-[30vw] h-full flex justify-between items-center mr-4'>
                <li className='list-none'>
                    <button type='button' onClick={() => onToggleDarkMode()}>
                        {state.isDarkModeOn ? <MdLightMode size={30} color='#ffffff'  /> : <MdDarkMode size={30} color='#0f0f0f' />}
                    </button>
                </li>
                <Link to='/'>
                    <li className='text-[#ffffff] text-lg font-[Roboto] list-none'>Home</li>
                </Link>
                <Link to='/products'>
                    <li  className='text-[#ffffff] text-lg font-[Roboto] list-none'>Products</li>
                </Link>
                <li className='text-[#ffffff]'>
                    <button type='button' onClick={toggleCartVisibility}>
                        <GiShoppingCart size={30} />
                    </button>
                    {isCartVisible && (
                    <div className="absolute right-0 mt-2 w-[40vw] bg-white shadow-lg rounded-md z-10">
                        <div className="w-full h-[5vh] flex justify-between items-center p-4">
                            <Link to="/cart">
                                <button className="h-[3vh] w-[6vw] bg-[#306acf] p-auto text-[#ffffff] text-sm">View Cart</button>
                            </Link>
                            <button className="h-[3vh] w-[6vw] bg-[#306acf] p-auto text-[#ffffff] text-sm">Checkout</button>
                        </div>
                        <div className="p-4">
                            <p className="text-lg font-semibold">Your Cart</p>
                            {state.cartList.length > 0 ? (
                                <ul className="w-full p-[0px] mt-2">
                                    {state.cartList.map(item => {
                                        const totalPrice = item.price * item.quantity
                                        return (
                                        <li key={item.id} className="w-full h-[3vh] flex justify-between items-center list-none mb-3">
                                            <img src={item.image} alt={item.title} className="w-[3vw] h-full object-cover" />
                                            <div className="w-[20vw] h-full flex justify-between items-center">
                                                <p className="text-sm font-[Roboto] text-black">{item.category}</p>
                                                <p className="text-sm font-[Roboto] text-black">{item.quantity} x ₹{item.price}={totalPrice}</p>
                                            </div>
                                        </li>
                                    )})}
                                </ul>
                                ) : (
                                <p className="text-sm text-gray-500">Your cart is empty.</p>
                            )}
                        </div>
                        <p className='text-sm font-[Roboto] text-black text-right'>Subtotal: ₹{totalQuantity}</p>
                    </div>
                    )}
                </li>      
            </ul>
        </div>
    )
}

export default withRouter(Header)