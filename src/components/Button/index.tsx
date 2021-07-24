import React, { ButtonHTMLAttributes } from 'react';

import { Container } from './styles';

type ButtonPropos = ButtonHTMLAttributes<HTMLButtonElement>;

const Button: React.FC<ButtonPropos> = ({ children, ...rest }) => (
  <Container type="button" {...rest}>
    {children}
  </Container>
);

export default Button;
