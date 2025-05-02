import Header from '../Header'

import Footer from '../Footer'

const featuredProductList = [
  {
    id: 1,
    category: "women's clothing",
    descriptiion: "100% POLYURETHANE(shell) 100% POLYESTER(lining) 75% POLYESTER 25% COTTON (SWEATER), Faux leather material for style and comfort / 2 pockets of front, 2-For-One Hooded denim style faux leather jacket, Button detail on waist / Detail stitching at sides, HAND WASH ONLY / DO NOT BLEACH / LINE DRY / DO NOT IRON",
    image:  "https://fakestoreapi.com/img/81XH0e8fefL._AC_UY879_.jpg",
    price: 15.99
  },

  {
    id: 2,
    category: "men's clothing",
    descriptiion: "The color could be slightly different between on the screen and in practice. / Please note that body builds vary by person, therefore, detailed size information should be reviewed below on the product description.",
    image:  "https://fakestoreapi.com/img/71YXzeOuslL._AC_UY879_.jpg",
    price: 15.99
  },

  {
    id: 3,
    category: "electronics",
    descriptiion: "3D NAND flash are applied to deliver high transfer speeds Remarkable transfer speeds that enable faster bootup and improved overall system performance. The advanced SLC Cache Technology allows performance boost and longer lifespan 7mm slim design suitable for Ultrabooks and Ultra-slim notebooks. Supports TRIM command, Garbage Collection technology, RAID, and ECC (Error Checking & Correction) to provide the optimized performance and enhanced reliability.",
    image:  "https://fakestoreapi.com/img/71kWymZ+c+L._AC_SX679_.jpg",
    price: 15.99
  }
]

const Home = () => (
    <>
        <Header />
        <div className='w-screen min-h-[90vh] flex flex-col items-center mt-4'>
            <div className='w-[70vw] h-[50vh]'>
                <img src='https://res.cloudinary.com/dtrjr55q7/image/upload/v1746093885/Card_prdt8s.jpg' className='h-[30vh] w-full' alt='hero section'  />
            </div>
            <h1 className='text-xl font-[Roboto] self-start pb-4'>Featured Products</h1>
            <ul className=' w-[70vw] h-[30vh] flex flex-wrap justify-between pl-[0px]'>
                {featuredProductList.map(eachProduct => 
                    <li className='h-full w-[20vw] mr-4' key={eachProduct.id}>
                        <img src={eachProduct.image} alt={eachProduct.category} className='w-full h-[25vh]' />
                        <p className='text-lg font-[Roboto]'>{eachProduct.category}</p>
                    </li>
                )}
            </ul>
        </div>
        <Footer />
    </>
)

export default Home