import styled from "styled-components";

export const AlertContainer = styled.div`
  position: absolute;
  top: 25px;
  right: 25px;
  background:red;
  transition: all 0.3s ease;
  max-width: 200px;
  display: block;
  border-radius: 4px;
  padding: 18px;


  opacity: ${({ isOpen }) => isOpen ?  1 : 0};

  h4 {
    color: white;
    font-size: 13px;
  }
`;