import styled from 'styled-components';

export const Container = styled.div`
  padding: 10vh 5vw;
  display: flex;
  
  flex-direction: column;
  align-items: center;


  .search {
    display: flex;
    flex-direction: row;
    width: 100%;
    justify-content: center;
    margin-bottom: 20px;

    input {
      margin-left: 40px;
      flex: 1;
    }
  }

  h2 {
    padding-bottom: 20px;
    font-size: 42px;
    color: white
  }

 
`;
