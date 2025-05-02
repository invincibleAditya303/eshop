import React, { useContext, useEffect } from "react";
import { CartContext, actionTypes } from "../../context/cartContext";
import Header from "../Header";

const FullCart = () => {
    const {state, dispatch} = useContext(CartContext)
    console.log(state)

    const onIncrementItemQuantity = (id) => {
        dispatch({ type: actionTypes.INCREMENT, payload: { id } });
      };
    
      const onDecrementItemQuantity = (id) => {
        dispatch({ type: actionTypes.DECREMENT, payload: { id } });
      };

      useEffect(() => {
        localStorage.setItem('cartList', JSON.stringify(state.cartList));
      }, [state.cartList])

      const totalQuantityPrice = state.cartList.reduce((acc, item) => acc + (item.quantity * item.price), 0)
      const orderAmount = Math.round((totalQuantityPrice + 100), 2)

      const bgColor = state.isDarkModeOn ? 'bg-[#0f0f0f]' : 'bg-[#86848F]'

    return (
        <>
            <Header />
            <div className={`w-screen min-h-[90vh] ${bgColor} flex flex-col items-center`}>
                {state.cartList.length === 0 && <p>Cart list is empty</p>}
                {state.cartList.length > 0 && <><ul className="w-[70vw] pl-[0px] mb-4">
                    {state.cartList.map(eachCartItem => {
                        const totalPrice = eachCartItem.price * eachCartItem.quantity
                        return (
                        <li className="w-full h-[12vh] bg-[#ffffff] flex justify-between items-center mt-4" key={eachCartItem.id}>
                            <div className="h-full w-[10vw]">
                                <img src={eachCartItem.image} alt={eachCartItem.title} className="h-[5vh] w-[5vw]" />
                                <p className="text-lg font-[Roboto]">{eachCartItem.price}x{eachCartItem.quantity}={totalPrice}</p>
                            </div>
                            <div className="w-[120px] h-full flex justify-between items-center mr-4">
                                <button className="h-[3vh] w-[2.5vw] bg-[#e6230e] p-auto" onClick={() => onDecrementItemQuantity(eachCartItem.id)}>-</button>
                                <p className="text-lg font-[Roboto]">{eachCartItem.quantity}</p>
                                <button className="h-[3vh] w-[2.5vw] bg-[#1bcc1b] p-auto" onClick={() => onIncrementItemQuantity(eachCartItem.id)}>+</button>
                            </div>
                        </li>
                    )})}
                    </ul>
                    <div className="bg-[#ffffff] self-end mr-[15vw]">
                        <p className="font-[Roboto] text-lg text-black self-end">Subtotal: ₹{totalQuantityPrice}</p>
                        <p className="font-[Roboto] text-lg text-black self-end">Shipping charges: ₹100</p>
                        <p className="font-[Roboto] text-lg text-black font-bold self-end">{orderAmount}</p>
                    </div>
                    </>
                }
            </div>
        </>
    )
}

export default FullCart