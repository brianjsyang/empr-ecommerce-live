import React from 'react';

import { SpinnerContainer, SpinnerOverlay } from './with-spinner.styles';

/**
 * Higher Order Component returns another function
 * if loading, render spinner overlay + component
 * if not, only render input componenet
 */
const WithSpinner =
  WrappedComponent =>
  ({ isLoading, ...otherProps }) => {
    return isLoading ? (
      <SpinnerOverlay>
        <SpinnerContainer />
      </SpinnerOverlay>
    ) : (
      <WrappedComponent {...otherProps} />
    );
  };

export default WithSpinner;
