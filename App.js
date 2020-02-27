import React from 'react';
import { Provider } from 'react-redux'
import { StyleSheet, Text, View } from 'react-native';
import store from './src/store'
import MainPage from './src/pages/mainpage'
import { NavigatorActions } from './src/store/actionCreator'
import { Navigator, Route } from './src/navigator/navigator'
import SignupContainer from './src/containers/SignupContainer';
import LoginContainer from './src/containers/LoginContainer'
import FindIDContainer from './src/containers/FindIDContainer'
import FindPasswordContainer from './src/containers/FindPasswordContainer'
import AccountInformationContainer from './src/containers/AccountInformation'

export default function App() {
    return (
        <Provider store={store}>
            <View style={{width:'100%', height:'100%', backgroundColor:'#fff'}}>
                <View style={styles.iphonePadding} />
                <View style={styles.container}>
                    <Navigator id="App">
                        <Route name="MainPage" component={MainPage} />
                        <Route name="SignupContainer" component={SignupContainer} />
                        <Route name="LoginContainer" component={LoginContainer}/>
                        <Route name="FindIDContainer" component={FindIDContainer}/>
                        <Route name="FindPasswordContainer" component={FindPasswordContainer} />
                        <Route name="AccountInformationContainer" component={AccountInformationContainer} />
                    </Navigator>
                </View>
            </View>
        </Provider>
    );
}

const styles = StyleSheet.create({
        container: {
        flex: 29,
        width: '100%',
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    iphonePadding:{
        flex:1,
        width:'100%'
    }
});
