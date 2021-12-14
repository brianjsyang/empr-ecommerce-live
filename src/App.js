import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.componenet';
import Header from './components/header/header.component';
import Authentication from './pages/authentication/authentication.component';
import CheckoutPage from './pages/checkout/checkout.component';

import {
  auth,
  createUserProfileDocument,
  // addCollectionAndDocs,
} from './firebase/firebase.utils';
import { setCurrentUser } from './redux/user/user.action';
import { selectCurrentUser } from './redux/user/user.selectors';
// import { selectCollectionsForPreview } from './redux/shop/shop.selector';

import './App.css';

// Commented code is for adding new documents to firebase collection

class App extends React.Component {
  unsubscribeFromAuth = null;

  /**
   * Storing Authenticated user
   * 1. auth library (firebase). Pass userAuth object whenever authentication state changes
   * 2. userAuth is stored in the authentication table at firebase db, assigs UID.
   * 3. pass userAuth object to createUserProfileDocument function
   * 4. In the function, query database for document reference object: firestore.doc()
   * 5. Get Snapshot object using the document reference.
   * 6. If document does not exist, create new document using given object inside db. (create new user)
   */
  componentDidMount() {
    const { setCurrentUser } = this.props;
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot(snapShot => {
          setCurrentUser({
            currentUser: {
              id: snapShot.id,
              ...snapShot.data(),
            },
          });
        });
      } else {
        setCurrentUser(userAuth);
      }

      // Created collection ref to store object in the future
      // addCollectionAndDocs(
      //   'collections',
      //   collectionsArray.map(({ title, items }) => ({ title, items }))
      // );
    });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <div>
        <Header />
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route path="/shop/*" element={<ShopPage />} />
          <Route exact path="/checkout" element={<CheckoutPage />} />
          <Route
            exact
            path="/signin"
            element={
              this.props.currentUser ? <Navigate to="/" /> : <Authentication />
            }
          />
        </Routes>
      </div>
    );
  }
}

// Get access to this.props.currentUser
const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  // collectionsArray: selectCollectionsForPreview,
});

/**
 * 1. goes to function that gets user object,
 * 2. calls dispatch, way for redux to know that object inside is action object, passing to every reducer
 * 3. Invoke setCurrentUser with user as payload.
 */
const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
