import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
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