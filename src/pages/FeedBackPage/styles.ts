import styled from "styled-components"


export const Content = styled.div`
  padding: 10.2vw;
  min-height: 100svh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 32px;

  @media (max-width: 420px) {
   padding: 7vw; 
  }
`

export const Main = styled.div`
  display:flex;
  flex-direction: column;
  align-items: center;
  max-width: 63vw;
  min-width: 285px;
  gap: 32px;
  transform: translateY(-50%);
`

export const Info = styled.div`
  display:flex;
  flex-direction: column;
  align-items: center;
`

export const IconArea = styled.div`
  width: 48px;
  aspect-ratio: 1;
  border-radius: 16px;
  background-color: #274743;
  box-shadow: 0 0 8px rgba(0, 0, 0, .25);
  display: grid;
  place-items: center;
  margin:10px auto;

  svg {
    width: 32px;
    aspect-ratio: 1;
  }
`

export const Title = styled.h1`
  font-size: 48px;
  font-family: 'Manrope';
  line-height: 100%;
  white-space: nowrap;
  
  span:nth-child(1) {
    font-weight: 300;
    color: #0C181F;
  }

  span:nth-child(2) {
    font-weight: 600;
    color: #FA9233;
  }

  @media (max-width: 420px) {
    font-size: 42px;
  }
`

export const Text = styled.p`
  font-family: 'Manrope';

  span {
    font-size: 18px;
    font-weight: 500;

    a {
      font-weight: 700;
      color: #66AE8C;
    }
  }

  @media (max-width: 420px) {
    
    span {
      font-size: 16px;
    }
  }
`

export const Description = styled.h3`
  font-family: 'Manrope';
  font-size: 22px;
  font-weight: 600;
  color: #000;
  line-height: 170%;
  text-align: center;

  @media (max-width: 420px) {
  font-size: 20px;
  }
`

export const Instructions = styled.span`
  font-family: 'Manrope';
  font-size: 18px;
  font-weight: 500;
  color: #999;
  line-height: 130%;
  text-align: center;

  @media (max-width: 420px) {
    font-size: 16px;
  }
`