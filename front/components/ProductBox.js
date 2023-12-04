import styled from "styled-components";
import Link from "next/link";
import Button from "./Button";
import CartIcon from "./icons/CartIcon";
import { useContext } from "react";
import { CartContext } from "./CartContext";


const ProductWrapper = styled.div``;

const WhiteBox = styled(Link)`
  background-color: #fff;
  padding: 20px;
  height: 120px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius:10px;
  img{
    max-width: 100%;
    max-height: 80px;
  }
`;

const Title = styled(Link)`
  font-wieght: normal;
  font-size: .9rem;
  margin: 0;
  color: inherit;
  text-decoration: none;
  
`;

const ProductInfoBox = styled.div`
  margin-top: 5px;

  @media screen and ( max-width: 768px){
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  
`;
const Price = styled.div`
  font-size: 1.5rem;
  font-weight: 600;
  margin-top: 4px;
  @media screen and ( max-width: 768px){
    font-size: 1.2rem;
  }
`;

const PriceRow = styled.div`
  display:flex;
  @media screen and ( max-width: 768px){
    flex-direction: column;
    justify-content: center;
  }
  justify-content: space-between;
  align-items: center;
  margin-top: 2px;
`;

export default function ProducBox({_id, title, description, price, images}){
  const {addProduct} = useContext(CartContext);
  const url = `/product/${_id}`; 
  return(
    <ProductWrapper>
      <WhiteBox href={url}>
        <div>
          <img src={images?.[0]} alt="" />
        </div>
      </WhiteBox>
      <ProductInfoBox>
        <Title href={url}>{title}</Title>
        <PriceRow>
          <Price>
            ${price}
          </Price>
          <Button 
            primary 
            outline
            onClick={()=> addProduct(_id)}>Add to cart </Button>
        </PriceRow>
        
        
      </ProductInfoBox>
      
    </ProductWrapper>
  )
}