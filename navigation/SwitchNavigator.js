import React from 'react'
import {createAppContainer, createSwitchNavigator} from 'react-navigation'
import {createStackNavigator} from 'react-navigation-stack'
import Login from '../screens/Login'
import Loading from '../screens/Loading'
import Register from '../screens/Register'
import Home from '../screens/Home'
import AddFood from '../screens/AddFood'



const AppStack = createStackNavigator({
    Home,
    AddFood,
})

const AuthStack = createStackNavigator({
    Login: Login,
    Register: Register
})

const SwitchNavigator = createAppContainer(
    createSwitchNavigator(
        {
            Loading: Loading,
            App: AppStack,
            Auth: AuthStack
        },
        {
            initialRouteName: 'Loading'
        }
    )
)

export default createAppContainer(SwitchNavigator)