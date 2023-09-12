import styled from "styled-components"


export const Content = styled.div`
  padding: 10.2vw;
  min-height: 100svh;
  display: flex;
  flex-direction: column;
  gap: 32px;

  @media (max-width: 420px) {
   padding: 7vw; 
  }
`

export const Main = styled.div`
  flex: 1;
  display:flex;
  flex-direction: column;
  gap: 32px;
  padding-top: 54px;

  @media (max-width: 420px) {

    padding-top: 86px;
    
    svg {
      width: 32px;
    }
  }
`

export const Title = styled.h1`
  font-size: 48px;
  font-family: 'Manrope';
  line-height: 100%;

  span {
    display: block;
  }
  
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

export const ButtonsArea = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
`