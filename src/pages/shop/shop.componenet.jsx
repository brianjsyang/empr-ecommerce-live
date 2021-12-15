import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import CollectionPageContainer from '../collection/collection.container';
import CollectionsOverviewContainer from '../../components/collection-overview/collections-overview.container';

import { fetchCollectionsStartAsync } from '../../redux/shop/shop.action';

class ShopPage extends React.Component {
  componentDidMount() {
    const { fetchCollectionsStartAsync } = this.props;

    fetchCollectionsStartAsync();
  }

  render() {
    return (
      <div className="shop-page">
        <Routes>
          <Route path="/" element={<CollectionsOverviewContainer />} />
          <Route path=":collectionId" element={<CollectionPageContainer />} />
        </Routes>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  fetchCollectionsStartAsync: () => dispatch(fetchCollectionsStartAsync()),
});

export default connect(null, mapDispatchToProps)(ShopPage);
