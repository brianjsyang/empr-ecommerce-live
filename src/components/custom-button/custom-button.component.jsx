import React from 'react';

import { CustomButtonContainer } from './custom-button.styles';

/**
 * Using Styled Components to make use of props
 * Conditionally change css
 */
const CustomButton = ({ children, ...props }) => (
  <CustomButtonContainer {...props}>{children}</CustomButtonContainer>
);

export default CustomButton;
