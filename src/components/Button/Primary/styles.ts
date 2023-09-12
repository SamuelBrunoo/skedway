import styled from "styled-components"


export const El = styled.button`
  font-size: 20px;
  padding: .3em 1.2em;
  border-radius: 50px;
  border: none;
  background-color: #FA9233;
  color: #FFF;
  display: flex;
  align-items: center;
  gap: 8px;
  max-height: 50px;

  span {
    font-family: 'Manrope';
    font-weight: 600;
  }

  svg {
    width: 40px;
  }

  @media (max-width: 420px) {
    font-size: 16px;

    svg {
      width: 32px;
    }
  }
`