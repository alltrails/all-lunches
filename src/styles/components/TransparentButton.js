import styled from 'styled-components';

const TransparentButton = styled.button`
  background: transparent;
  border: 0;
  outline: none;
  cursor: ${({ disabled }) => (disabled ? 'default' : 'pointer')};
  ${({ underline }) => underline && 'text-decoration: underline;'}
`;

export default TransparentButton;
