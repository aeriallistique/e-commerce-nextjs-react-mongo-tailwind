import { useState } from "react";
import { styled } from "styled-components";

  const Image = styled.img`
    max-width: 100%;
    max-height: 100%;
  `;
  const BigImage = styled.img`
    max-width: 100%;
    height: 200px;
  `;

  const ImageButtons = styled.div`
    display:flex;
    gap: 10px;
    flex-grow: 0;
    margin-top: 10px;
    @media screen and (max-width: 768px){
      justify-content: center;
    }
  `;

  const ImageButton = styled.div`
    ${props => props.active ? `
      border-color: #ccc;
      ` : `
      border-color: transparent;
      opacity: .5;
    `}
    background-color: #ccc;
    height: 40px;
    padding: 2px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor:pointer;
    border-radius:5px;
    
  `;
  const BigImageWrapper = styled.div`
    text-align: center;
  `;

export default function ProductImages({images}) {
  const [activeImage, setActiveImage] = useState(images?.[0]);

  return (
    <>
      <BigImageWrapper>
        <BigImage src={activeImage} />
      </BigImageWrapper>
      <ImageButtons>
        {images.map(image => (
          <ImageButton 
            key={image}
            active={image === activeImage} 
            onClick={()=> setActiveImage(image)}>
            <Image src={image} alt='' />
          </ImageButton>
        ))}
      </ImageButtons>
    </>
  )
}