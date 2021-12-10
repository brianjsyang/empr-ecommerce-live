import React from 'react';

import './homepage.styles.scss';
import Directory from '../../components/directory/directory.component';

// Functional componenet because there is no need for life cycle method.
const HomePage = () => (
  <div className="homepage">
    <Directory />
  </div>
);

export default HomePage;
