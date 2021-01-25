import React, { Dispatch } from 'react';
import Router from './routes/Router';
import Layout from './components/Layout/Layout';
import {connect} from 'react-redux';
import * as actions from './store/authActions';
import { PrivateRouteProps } from './routes/PrivateRoute';

interface AuthProps {
  logout: Function
  setAuthenticatedIfRequired: Function
}

interface AppProps extends AuthProps, PrivateRouteProps {}

function App(props: AppProps) {

  React.useEffect(() => {
    props.setAuthenticatedIfRequired();
  }, []);

  return (
    <div className="App">
      <Layout {...props}>
         <Router {...props}/>
      </Layout>
    </div>
  );
}

interface MapStateToPropsInterface {
  auth: {
    token: string
  }
}

//This means that one or more of the redux states in the store are available as props
const mapStateToProps = (state: MapStateToPropsInterface) => {
  return {
    isAuthenticated: state.auth.token !== null && typeof state.auth.token !== 'undefined',
    token: state.auth.token
  }
}

//This means that one or more of the redux actions in the form of dispatch(action) combinations are available as props
const mapDispatchToProps = (dispatch: Dispatch<any>) => {
  return {
    setAuthenticatedIfRequired: () => dispatch(actions.authCheckState()),
    logout: () => dispatch(actions.authLogout()) 
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);