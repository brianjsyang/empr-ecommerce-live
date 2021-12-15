/**
 * Compoenent that wraps all of HOC needed to properly run loading spinner
 *
 * Benefit
 * 1. Further simplifies shop.component.jsx
 *
 * Compose : evaluate multiple functions
 * 1. Evaluates WithSpinner(CollectionsOverivew)
 * 2. Passes the result to connect(mapStateToProps)
 */
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import { selectIsCollectionFetching } from '../../redux/shop/shop.selector';
import WithSpinner from '../with-spinner/with-spinner.component';
import CollectionsOverview from './collection-overview.component';

const mapStateToProps = createStructuredSelector({
  isLoading: selectIsCollectionFetching,
});

const CollectionsOverviewContainer = compose(
  connect(mapStateToProps),
  WithSpinner
)(CollectionsOverview);

export default CollectionsOverviewContainer;
