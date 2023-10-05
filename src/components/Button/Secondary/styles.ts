import styled from "styled-components"


export const El = styled.button`
  font-size: 20px;
  padding: 8px 24px;
  border-radius: 50px;
  border: none;
  background-color: #F2F2F2;
  color: #000;
  display: flex;
  align-items: center;
  gap: 8px;
  align-self: stretch;
  cursor: pointer;

  span {
    font-weight: 600;
  }

  @media (max-width: 420px) {
    font-size: 16px;
  }
`