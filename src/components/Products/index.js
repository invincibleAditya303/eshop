import { useState, useEffect } from "react";

import {RingLoader} from 'react-spinners'

import Header from '../Header'

import ProductListItem from "../ProductListItem";

const apiStatusConstants = {
    initial: "INITIAL",
    inProgress: "IN_PROGRESS",
    success: "SUCCESS",
    failure: "FAILURE"
}

const Products = () => {
    const [apiResponse, setApiResponse] = useState({
        status: apiStatusConstants.initial,
        data: null,
        errorMsg: null
    })

    useEffect(() => {
        const getProductsList = async () => {
            setApiResponse({
                status: apiStatusConstants.inProgress,
                data: null,
                errorMsg: null,
            })

              const apiUrl = 'https://fakestoreapi.com/products'
              const response = await fetch(apiUrl)
              console.log(response)

              if (response.ok) {
                const productsList = await response.json()

                setApiResponse((prevApiResponse) => ({
                    ...prevApiResponse,
                    status: apiStatusConstants.success,
                    data: productsList
                  }))
              } else {
                setApiResponse((prevApiResponse) => ({
                    ...prevApiResponse,
                    status: apiStatusConstants.failure,
                    errorMsg: prevApiResponse.errorMsg
                  }))
              }
        }
        getProductsList()
    }, [])

    const renderSuccessView  = () => {
        console.log(apiResponse.data)

        return (
            <div className="w-screen bg-[#c695E5] flex justify-center items-center ">
                <ul className="pl-[0px] w-[70vw] flex justify-center items-center flex-wrap min-height-[80vh]">
                    {apiResponse.data.map(eachProduct => (
                        <ProductListItem productDetails={eachProduct} key={eachProduct.id} />
                    ))}
                </ul>
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
            <p className="=">Something went wron, please try again</p>
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
            {renderStatusView()}
        </>
    )

}

export default Products