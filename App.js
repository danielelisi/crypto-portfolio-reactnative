import React from 'react';
import TestView from './views/TestView';
import Dashboard from './views/Dashboard.js';
import TestComponent from './components/TestComponent';
import TwitterNews from './views/TwitterNews';

import { DrawerNavigator } from 'react-navigation';


const RootNavigator = DrawerNavigator(
    {
        Home:
            {
                screen: Dashboard,
                navigationOptions: {
                    drawerLabel: 'Home'
                }
            },
        TwitterNews:
            {
                screen: TwitterNews,
                navigationOptions: {
                    drawerLabel: 'News'
                }
            },
        TestView:
            {
                screen: TestView,
                navigationOptions: {
                    drawerLabel: 'Test View'
                }
            }
    },
    // Drawer Navigator options
    {
        contentOptions: {
            activeTintColor: '#4b79c1',
            itemsContainerStyle: {
                marginVertical: 24
            },
        }
    }
);

export default class App extends React.Component {

    render() {
        return <RootNavigator />
    }
}