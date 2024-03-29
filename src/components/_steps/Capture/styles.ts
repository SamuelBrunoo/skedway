import styled from "styled-components"


export const CaptureArea = styled.div<{ showing: boolean | undefined; }>`
  height: ${({ showing }) => showing ? 100 : 0}dvh;
  display: grid;
  place-items: center;
  opacity: ${({ showing }) => showing ? 1 : 0};

  .onfido-sdk-ui-Theme-footer {
    display: none;
  }

  @media (orientation: landscape) AND (max-height: 950px) {

    padding: 5vh 0;

    & div.onfido-sdk-ui-Theme-root.onfido-sdk-ui-Modal-inner {
      height: 100%;
    }
  }
`