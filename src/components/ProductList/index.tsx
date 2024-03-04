import { useEffect, useState } from "react";
import { api } from "../../api/api";
import { ProductListItem } from "../ProductListItem";
import { IProduct } from "../../types/types";
import { useNavigate, useLocation } from "react-router-dom";

export const ProductList: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
  const [products, setProducts] = useState<IProduct[]>([]);
  const [page, setPage] = useState("1");
  const [visible, setVisible] = useState(false) ;

  const searchParams = new URLSearchParams(location.search);

  
  

  useEffect(() => {

   
    const fetchProducts = async () => {
        
      try {
        if(location.search.length === 0){
            setVisible(true)
            const productsData = await api.product.getProducts(page);
            if(productsData.length === 6){
                setProducts(productsData);

                
            }else{
                setVisible(false)
            }
        }else{
            const searchData = {
                price_from: searchParams.get("price_from") || "",
                price_to: searchParams.get("price_to") || "",
                from: searchParams.get("from") || "",
                to: searchParams.get("to") || "",
                title: searchParams.get("title") || "",
                
              };
            const productsData = await api.product.filterProducts(searchData);
            setProducts(productsData);
            setVisible(false)
            
        }
       
    
      } catch (error:any) {
       if(error.response.status === 401){
        localStorage.removeItem('token')
        navigate('/');  
       }
        
        
      }
    };
    fetchProducts();
  }, [page , location.search]);
  const incrementPage = () => {
    const nextPage = String(parseInt(page, 10) + 1);
    setPage(nextPage);
  };

  return (
    <div className="container">

      <div className="list-wrapper">
        {products.length > 0 ? products.map((product) => (
          <ProductListItem
            key={product.id}
            thumbnail={product.thumbnail}
            title={product.title}
            price={product.price}
          />
        )) : <p>Product not found</p>}
      </div>
      {visible &&  <button className="load-more" onClick={incrementPage}>Load New Product</button>}
     
    </div>
  );
};
