import Center from "./Center";
import styled from 'styled-components';
import Button from "./Button";
import ButtonLink from "./ButtonLink";
import CartIcon from "./icons/CartIcon";
import { useContext } from "react";
import { CartContext } from "./CartContext";


const Bg = styled.div`
background-color: #222;
color: #fff;
padding: 50px 0;
`;

const Title = styled.h1`
  margin:0;
  font-weight: normal;
  font-size: 2rem;
  text-align: center;
  @media screen and (min-width: 768px){
    font-size: 3rem;
  }
`;

const Desc = styled.p`
  color: #aaa;
  font-size: .8rem;
  @media screen and (max-width: 768px){
    text-align: center;
  }
`;

const ColumnsWrapper = styled.div`
  display: grid;
  grid-template-columns:1fr ;
  gap:40px;
  img{
    max-width: 100%;
    max-height: 200px;
};
  div:nth-child(1){
    order:2;
  }
  @media screen and (min-width: 768px){
    grid-template-columns:1.1fr .9fr ;
    div:nth-child(1){
      order:0;
    }
    img{
      max-width: 100%;
    }
  }
`;

const Column = styled.div`
 display:flex;
 align-items: center;
 @media screen and (max-width: 768px){
  justify-content: center;
}
 `;

const ButtonsWrapper = styled.div`
  display: flex;
  gap: 10px;
  margin-top 25px;
  @media screen and (max-width: 768px){
    justify-content: center;
  }
  `; 



export default function Featured({product}){
  const {addProduct} = useContext(CartContext);

  function addFeaturedToCart(){
    addProduct(product._id);
  }
  
  return(
    <div>
      <Bg>
        <Center>
          <ColumnsWrapper>
            <Column>
              <div>
                <Title> {product.title} </Title>
                <Desc>
                  {product.description}
                </Desc>
                <ButtonsWrapper>
                  <ButtonLink href={'/product/'+ product._id} white={1} outline={1} >Read more</ButtonLink>
                  <Button white  onClick={addFeaturedToCart}>
                    <CartIcon />
                    Add to Cart
                  </Button>
                </ButtonsWrapper>
              </div>
            </Column>

            <Column>
              <img src="data:image/jpeg;base64,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" 
              alt="" />
            </Column>
          </ColumnsWrapper>
        </Center>
      </Bg>
      
    </div>
  );
}