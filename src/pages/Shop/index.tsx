import Filters from "../../components/Filters"
import { ProductList } from "../../components/ProductList"


export const Shop:React.FC = ()=>{

    return(
        <div className="container">
            <Filters/>
            <ProductList/>
        </div>
    )
}