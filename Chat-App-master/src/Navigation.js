import React from 'react';
import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import HomePage from './pages/HomePage';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Chat from './pages/chat';

const AuthStackNavigator = createStackNavigator({
    HomePage: {
    screen: HomePage,
    },
    Login: {
      screen: Login,
    },
    Register: {
        screen: Register,
    }
},  { headerMode: 'none'});

const AppStackNavigator= createStackNavigator({
   Home: {
       screen: Home,
       navigationOptions:{
        title:'F.R.I.E.N.D.S',
       },
    },
    Chat :{
      screen: Chat,
      // navigationOptions:{
      //   title: 'Chat Room',
      // }
    },
});

const SwitchNavigator = createSwitchNavigator({
    AuthLoading: AuthStackNavigator,
    App : AppStackNavigator
},
{
    initialRouteName: 'AuthLoading',
});

const Navigation = createAppContainer(SwitchNavigator);
export default Navigation;