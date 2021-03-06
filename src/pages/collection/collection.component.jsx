import React, { useEffect } from 'react';
import { useParams } from 'react-router';
import { connect } from 'react-redux';

import { selectCollection } from '../../redux/shop/shop.selector';
import { changeShopParams } from '../../redux/shop/shop.action';
import CollectionItem from '../../components/collection-item/collection-item.component';

import './collection.styles.scss';

const CollectionPage = ({ collection, changeParams }) => {
  let params = useParams();
  const { title, items } = collection;

  useEffect(() => {
    changeParams(params.collectionId);
  });

  //console.log(collection);

  return (
    <div className="collection-page">
      <h2 className="title">{title}</h2>
      <div className="items">
        {items.map(item => (
          <CollectionItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  collection: selectCollection(state.shop.params)(state),
});

const mapDispatchToProps = dispatch => ({
  changeParams: item => dispatch(changeShopParams(item)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CollectionPage);
