import styled from "styled-components";

const CustomInput = (props) => (
    <CustomInputContainer required autoComplete="off" {...props} />
)

const CustomInputContainer = styled.input`
      max-width: 100%;
      border: 2px solid lightgray;
      padding: 1rem 1rem 1rem 0.3rem;
      font-size: 1.5rem;
`

export default CustomInput;