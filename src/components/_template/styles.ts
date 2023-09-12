import styled from "styled-components"


export const Page = styled.div`
  max-width: 100vw;

  #topVector,
  #bottomVector {
    position: absolute;
    right: 0;
    z-index: -1;
  }
  
  #topVector {
    top: 0;

    svg {
      max-height: 24.3vh;
      width: auto;
    }
  }

  #bottomVector {
    bottom: 0;

    svg {
      max-height: 13.7vh;
      width: auto;
    }
  }
`

export const Container = styled.div`
  z-index:2;
`