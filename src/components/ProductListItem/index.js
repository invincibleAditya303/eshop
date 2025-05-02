import { Link } from "react-router-dom"

const ProductListItem = props => {
    const {productDetails} = props
    const {id, title, image} = productDetails

    return (
        <Link to={`/products/${id}`}>
            <li className="w-[30vw] h-[27vh] bg-white mr-4 mb-4 list-none">
                <img src={image} alt={title} className="w-full h-[20vh]" />
                <p className="text-lg sm:text-sm font-roboto pt-2">{title}</p>
            </li>
        </Link>
    )
}

export default ProductListItem