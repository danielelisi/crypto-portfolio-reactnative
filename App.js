import React from 'react';
import TestView from './views/TestView';
import Dashboard from './views/Dashboard.js';
import TestComponent from './components/TestComponent';
import TwitterNews from './views/TwitterNews';
import Entypo from 'react-native-vector-icons/Entypo';

import { DrawerNavigator } from 'react-navigation';


const RootNavigator = DrawerNavigator(
    {
        Home:
            {
                screen: Dashboard,
                navigationOptions: {
                    drawerLabel: 'Home',
                    drawerIcon: <Entypo name="home" size={30} color="#fff"></Entypo>

                }
            },
        TwitterNews:
            {
                screen: TwitterNews,
                navigationOptions: {
                    drawerLabel: 'News',
                    drawerIcon: <Entypo name="twitter" size={30} color="#fff"></Entypo>
                }
            }
    },
    // Drawer Navigator options
    {
        contentOptions: {
            activeTintColor: '#4b79c1',
            inactiveTintColor: '#fff',
            activeBackgroundColor: '#000000',
            itemsContainerStyle: {
                marginVertical: 24
            },
            iconContainerStyle:{
                width:30
            },
            labelStyle:{
                fontSize: 25,
                fontWeight: '100'
            }
        }
    }
);

export default class App extends React.Component {

    render() {
        return <RootNavigator style={{backgroundColor:'#191919'}}/>
    }
}