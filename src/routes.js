import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Login from './components/user/Login';
import HomeMain from './components/main/HomeMain';
import Cart from './components/cart/Cart';
import Account from './components/user/Account';
import Electronics from './components/electronics/Electronics';
import Clothing from './components/clothing/Clothing';
import HomeShop from './components/home-shop/HomeShop';
import Outdoor from './components/outdoor/Outdoor';

export default (
    <Switch>
        <Route exact path='/' component={Login} />
        <Route path='/homemain' component={HomeMain} />
        <Route path='/cart' component={Cart} />
        <Route path='/account' component={Account} />
        <Route path='/electronics' component={Electronics} />
        <Route path='/clothing' component={Clothing} />
        <Route path='/homeshop' component={HomeShop} />
        <Route path='/outdoor' component={Outdoor} />
    </Switch>
)