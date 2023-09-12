import styled from "styled-components"


export const VectorArea = styled.div<{ fill: string; }>`
  
  svg {
    margin-bottom: -4px;
    
    path {
      fill: ${({ fill }) => fill};
    }
  }
`