import React from 'react';
import TestView from './views/TestView';
import Dashboard from './views/Dashboard.js';
import TestComponent from './components/TestComponent';

import { DrawerNavigator } from 'react-navigation';


const RootNavigator = DrawerNavigator(
    {
        Home:
            {
                screen: TestComponent,
                navigationOptions: {
                    drawerLabel: 'Home'
                }
            },
        Dashboard:
            {
                screen: Dashboard,
                navigationOptions: {
                    drawerLabel: 'Dashboard'
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