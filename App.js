import React from 'react';
import { Provider } from 'react-redux'
import { StyleSheet, Dimensions, View } from 'react-native';

import MainPage from './src/pages/mainpage'
import SignupPage from './src/pages/SignupPage';
import LoginPage from './src/pages/LoginPage'
import FindIDPage from './src/pages/FindIDPage'
import FindPasswordPage from './src/pages/FindPasswordPage'
import AccountInfoPage from './src/pages/AccountInfoPage'
import PlanPage from './src/pages/PlanPage'

import store from './src/store'
import deviceCheck from './src/deviceCheck'
import { Navigator, Route } from './src/navigator/navigator'


const iphonePaddingCheck = ()=>{
    if(deviceCheck.ifIOS && deviceCheck.ifTopbarless)
        return styles.iphonePadding
    else
        return styles.noPadding
}


export default function App() {
    return (
        <Provider store={store}>
            <View style={{width:'100%', height:'100%', backgroundColor:'#fff'}}>
                <View style={iphonePaddingCheck()} />
                <View style={styles.container}>
                    <Navigator id="App">
                        <Route name="MainPage" component={MainPage} />
                        <Route name="SignupPage" component={SignupPage} />
                        <Route name="LoginPage" component={LoginPage}/>
                        <Route name="FindIDPage" component={FindIDPage}/>
                        <Route name="FindPasswordPage" component={FindPasswordPage} />
                        <Route name="AccountInfoPage" component={AccountInfoPage} />
                        <Route name="PlanPage" component={PlanPage} />
                    </Navigator>
                </View>
            </View>
        </Provider>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: Dimensions.get('window').height,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    iphonePadding:{
        height:35,
        width:'100%'
    },
    noPadding:{
        height:15
    }
});
