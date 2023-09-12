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

export const LoadingContainer = styled.div`
  display: grid;
  place-items: center;
  flex: 1;
`