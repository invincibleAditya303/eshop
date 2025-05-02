import React, { useState, useEffect, useContext } from "react";

import { RingLoader } from "react-spinners";

import Header from "../Header";

import { CartContext, actionTypes } from "../../context/cartContext";

const apiStatusConstants = {
    initial: "INITIAL",
    inProgress: "IN_PROGRESS",
    success: "SUCCESS",
    failure: "FAILURE"
}

const ProductDetails = props => {
    const {state, dispatch} = useContext(CartContext)
    console.log(state, dispatch)
   

    const addCartItem = (product) => {
        dispatch({ type: actionTypes.ADD_ITEM, payload: product });
      }

    const [apiResponse, setApiResponse] = useState({
            status: apiStatusConstants.initial,
            data: null,
            errorMsg: null
    })

    useEffect(() => {
        const getProductDetails = async () => {
            setApiResponse({
                status: apiStatusConstants.inProgress,
                data: null,
                errorMsg: null,
            })

            const {match} = props
            const {params} = match
            const {id} = params
            const apiUrl = `https://fakestoreapi.com/products/${id}`
            const response = await fetch(apiUrl)
            console.log(response)

            if (response.ok) {
                const productData = await response.json()

                setApiResponse((prevApiResponse) => ({
                    ...prevApiResponse,
                    status: apiStatusConstants.success,
                    data: productData
                  }))
            } else {
                setApiResponse((prevApiResponse) => ({
                    ...prevApiResponse,
                    status: apiStatusConstants.failure,
                    errorMsg: prevApiResponse.errorMsg
                  }))
            }
        }
        getProductDetails()
    }, [props])

    const renderSuccessView = () => {
        console.log(apiResponse.data)
        const {data} = apiResponse
        const {title, image, description, price, rating} = data
        
        return (
            <div className="w-[55vw] h-[70vh] flex justify-center items-center bg-[#d8b7ed] mt-8">
                <img src={image} alt={title} className="w-[25vw] h-9/10" />
                <div className=" w-[25vw] h-full flex flex-col justify-between mt-4 mb-4">
                    <h1 className="text-4xl text-[#ffffff] font-[Roboto] pb-4 pl-4">{title}</h1>
                    <p className="text-sm text-[#ffffff] font-[Roboto] pb-4 pl-4">{description}</p>
                    <p className="text-2xl text-[#ffffff] font-[Roboto] pb-4 pl-4">{price}</p>
                    <p className="text-2xl text-[#ffffff] font-[Roboto] pb-4 pl-4">{rating.rate}</p>
                    <button type="button" className="w-[10vw] h-[24px] bg-[#306acf] text-[#ffffff] text-sm font-[Roboto] p-auto ml-4 mb-4 rounded-md" onClick={() => addCartItem({...data, quantity: 1})}>Add to Cart</button>
                </div>
            </div>
        )
    }

    const renderLoadingView = () => (
        <RingLoader color="#36d7b7"  size={30} />
    )

    const renderFailureView = () => (
        <div className="w-screen h-[90vh] flex flex-col items-center">
            <img src='' alt="failure img" className="w-[50vw] h-[40vh]" />
            <h1 className="">Page not found</h1>
            <p className="">Something went wron, please try again</p>
        </div>
    )

    const renderStatusView = () => {
        const { status } = apiResponse
        switch (status) {
        case apiStatusConstants.inProgress:
            return renderLoadingView()
        case apiStatusConstants.success:
            return renderSuccessView()
        case apiStatusConstants.failure:
            return renderFailureView()
        default:
            return null;
        }
    }

    return (
        <>
            <Header />
            <div className="w-screen h-[90vh] flex justify-center items-center">
                {renderStatusView()}
            </div>
        </>
    )
}

export default ProductDetails