import styled from "styled-components";

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1rem;
`;

const StyledInput = styled.input`
  padding: 15px;
  height: 45px;
  outline: none;
  border-radius: 5px;
  border: 1px solid black;
  margin-bottom: 1rem;
`;

const StyledParagraph = styled.p`
  font-size: 0.8rem;
  margin-bottom: 0.2rem;
  margin-top: 0;
`;

export { StyledForm, StyledInput, StyledParagraph };
