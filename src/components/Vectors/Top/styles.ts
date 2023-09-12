import styled from "styled-components"


export const VectorArea = styled.div<{ fill: string; stroke: string; }>`
  
  svg {
    
    path {
      fill: ${({ fill }) => fill};
      stroke: ${({ stroke }) => stroke};
    }
  }
`