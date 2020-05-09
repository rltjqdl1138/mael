import React from 'react';
import { Provider } from 'react-redux'
import { StyleSheet, Dimensions, View, BackHandler } from 'react-native';


import MainPage from './src/pages/mainpage'
import SignupPage from './src/pages/SignupPage';
import LoginPage from './src/pages/LoginPage'
import FindIDPage from './src/pages/FindIDPage'
import FindPasswordPage from './src/pages/FindPasswordPage'
import AccountInfoPage from './src/pages/AccountInfoPage'
import PlanPage from './src/pages/PlanPage'
import PlanPage2 from './src/pages/PlanPage2'
import UserInfoPage from './src/pages/UserInfoPage'
import NoticePage from './src/pages/NoticePage'
import ChangeEmailPage from './src/pages/ChangeEmailPage'
import ChangePhonePage from './src/pages/ChangePhonePage'
import PaymentPage from './src/pages/PaymentPage'
import GreetingPage from './src/pages/GreetingPage'
import store from './src/store'
import deviceCheck from './src/deviceCheck'
import { Navigator, Route } from './src/navigator/navigator'


export default function App() {
    return (
        <Provider store={store}>
            <View style={{width:'100%', height:'100%', backgroundColor:'#fff'}}>
                
                <View style={styles.container}>
                    <Navigator id="App">
                        <Route name="MainPage" component={MainPage} />
                        <Route name="SignupPage" component={SignupPage} />
                        <Route name="LoginPage" component={LoginPage}/>
                        <Route name="FindIDPage" component={FindIDPage}/>
                        <Route name="FindPasswordPage" component={FindPasswordPage} />
                        <Route name="AccountInfoPage" component={AccountInfoPage} />
                        <Route name="PlanPage" component={PlanPage} />
                        <Route name="PlanPage2" component={PlanPage2} />
                        <Route name="PaymentPage" component={PaymentPage} />
                        <Route name="UserInfoPage" component={UserInfoPage} />
                        <Route name="NoticePage" component={NoticePage} />
                        <Route name="ChangeEmailPage" component={ChangeEmailPage} />
                        <Route name="ChangePhonePage" component={ChangePhonePage} />
                        <Route name="GreetingPage" component={GreetingPage} />
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
});
