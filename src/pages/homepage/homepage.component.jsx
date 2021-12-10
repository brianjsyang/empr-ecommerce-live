import React from 'react';

import Directory from '../../components/directory/directory.component';

import { HomepageContainer } from './homepage.styles';

// Functional componenet because there is no need for life cycle method.
const HomePage = () => (
  <HomepageContainer>
    <Directory />
  </HomepageContainer>
);

export default HomePage;
