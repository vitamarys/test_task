 
type ItemProp = {
    
    title: string,
    price: string,
    thumbnail:string
    
}
export const ProductListItem: React.FC<ItemProp> = ({
     title , price, thumbnail
})=>{
    
return(
    <div className="list-item">
        <div className="img-wrap">
        <img src={thumbnail} alt="thumbnail" />
        </div>
        <h4>{title}</h4>
        <span>{price}</span>

    </div>
)
    
}