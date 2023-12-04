import styled from "styled-components";
import ProducBox from "./ProductBox";


const StyledProductsGrid =styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px; 
  @media screen and (min-width: 768px){
    grid-template-columns: 1fr 1fr 1fr 1fr;

  }
`;

export default function ProductsGrid({products}){

  return(
    <StyledProductsGrid>
      {products?.length > 0 && products.map(product =>(
        <ProducBox key={product._id} {...product} />
      ))}
    </StyledProductsGrid>
  )
}