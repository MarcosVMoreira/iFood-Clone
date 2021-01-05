import { Hidden } from '@material-ui/core';
import React, { Fragment, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  BrowserRouter,
  Redirect,
  Route,
  Switch,
  withRouter,
} from 'react-router-dom';
import { BottomNav } from '../components/Customer/BottomNav/BottomNav';
import { Navbar as CustomerNavbar } from '../components/Customer/Navbar/Navbar';
import { Navbar as MerchantNavbar } from '../components/Merchant/Navbar/Navbar';
import { SideNav } from '../components/Merchant/SideNav/SideNav';
import { Home as CustomerHome } from '../pages/Customer/Home/Home';
import { Login as CustomerLogin } from '../pages/Customer/Login/Login';
import { Profile } from '../pages/Customer/Profile/Profile';
import { SignUp as CustomerSignUp } from '../pages/Customer/SignUp/SignUp';
import { Home as MerchantHome } from '../pages/Merchant/Home/Home';
import { Login as MerchantLogin } from '../pages/Merchant/Login/Login';
import { SignUp as MerchantSignUp } from '../pages/Merchant/SignUp/SignUp';
import * as actions from '../store/actions/index';

export const Routes = () => {
  /* Redux Selectors */
  const authenticated = useSelector(state => state.auth.authenticated);

  /* Redux Dispatchers */
  const dispatch = useDispatch();
  const onCheckState = useCallback(() => dispatch(actions.authCheckState()), [
    dispatch,
  ]);

  useEffect(() => {
    onCheckState();
  }, [onCheckState]);

  let routes;
  authenticated
    ? (routes = (
        <Fragment>
          {authenticated === 'customer' ? (
            <CustomerNavbar />
          ) : (
            <Fragment>
              <MerchantNavbar />
              <SideNav />
            </Fragment>
          )}
          <Switch>
            <Route path="/customer/home" component={CustomerHome} />
            <Route path="/customer/profile" component={Profile} />
            <Route path="/merchant/home" component={MerchantHome} />
            <Redirect to={`/${authenticated}/home`} />
          </Switch>
          <Hidden mdUp>
            <BottomNav />
          </Hidden>
        </Fragment>
      ))
    : (routes = (
        <Switch>
          <Route path="/customer/login" component={withRouter(CustomerLogin)} />
          <Route
            path="/customer/signup"
            component={withRouter(CustomerSignUp)}
          />
          <Route path="/merchant/login" component={withRouter(MerchantLogin)} />
          <Route
            path="/merchant/signup"
            component={withRouter(MerchantSignUp)}
          />
          <Redirect to="/customer/login" />
        </Switch>
      ));

  return <BrowserRouter> {routes} </BrowserRouter>;
};
