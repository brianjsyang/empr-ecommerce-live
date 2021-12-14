import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import CollectionPage from '../collection/collection.component';
import CollectionOverview from '../../components/collection-overview/collection-overview.component';
import WithSpinner from '../../components/with-spinner/with-spinner.component';

import {
  firestore,
  convertCollectionsSnapshotToMap,
} from '../../firebase/firebase.utils';
import { updateCollections } from '../../redux/shop/shop.action';

// Wrapping Componenet in HOC
const CollectionsOverviewWithSpinner = WithSpinner(CollectionOverview);
const CollectionsPageWithSpinner = WithSpinner(CollectionPage);

class ShopPage extends React.Component {
  state = {
    loading: true,
  };

  unsubscribeFromSnapshop = null; // from Firestore

  // Fetch data from Firestore
  // This is where isLoading is determined.
  componentDidMount() {
    const { updateCollections } = this.props;
    const collectionRef = firestore.collection('collections'); // titile from the Firestore database

    // Whenver colelctionRef gets updated ...
    collectionRef.onSnapshot(async snapshot => {
      const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
      updateCollections(collectionsMap);
      this.setState({ loading: false });
    });
  }

  render() {
    const { loading } = this.state;
    return (
      <div className="shop-page">
        <Routes>
          <Route
            path="/"
            element={
              <CollectionsOverviewWithSpinner
                isLoading={loading}
                {...this.props}
              />
            }
          />
          <Route
            path=":collectionId"
            element={
              <CollectionsPageWithSpinner isLoading={loading} {...this.props} />
            }
          />
        </Routes>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  updateCollections: collectionsMap =>
    dispatch(updateCollections(collectionsMap)),
});

export default connect(null, mapDispatchToProps)(ShopPage);
