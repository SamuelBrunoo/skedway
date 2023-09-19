import styled from "styled-components"


export const CaptureArea = styled.div<{ showing: boolean; }>`
  height: ${({ showing }) => showing ? 100 : 0}dvh;
  display: grid;
  place-items: center;
  opacity: ${({ showing }) => showing ? 1 : 0};

  .onfido-sdk-ui-Theme-footer {
    display: none;
  }
`