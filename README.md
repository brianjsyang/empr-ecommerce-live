# ECOMMERCE WEBSITE

### Login

Using Firebase, allows users to login either using Google, <br>
or create new account using email and password.

Firebase securely stores user login data.

<br>

### Redux

Current user (App.js state) is being used by many componenets. <br>
Using **Redux** prevents "prop drilling".

- Warp **Provider** to give all components access to the **store state**
- **Root Reducer** will combine all other slices of states ... better readability

<br>

- **Reducer**: receives two paramteters (current state when action is executing, action)

  1. Depending on action.type, execute action on state with action.payload.

- connect, mapStateToProps, mapDispatchToProps
  1. **Connect()**: HOC that modifies component to have access to functions related to redux
  2. **mapStateToProps**: function that allows acces to the state, the root reducer.
  3. **mapDispatchToProps**: function that dispatches new action to the state ... need action object to be passed to every reducer.

<br>

- Adding new action process
  1.  Add new type
  2.  Add new action with the same name as type
  3.  Add new case that will listen to the new action in the Reducer.
  4.  Bind to the component (connect)

<br>

- Using localStorage to maintain shopping cart data through session.
  1. implemented using **redux-persist**

<br>

### STRIPE - Online Transactions

- implemented online transcaction service with Stripe

<br>

### Heroku

- buildpack: create-reacr-app build, building static react website.
- mars/create-react-app is used as buildpack.
  - the build requires the repo to be at root
