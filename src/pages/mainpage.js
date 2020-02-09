import React, {Component} from 'react';
import { StyleSheet, Text, View, Animated, Dimensions, Button } from 'react-native';
import { connect } from 'react-redux'
import { AthenticationActions, NavigatorActions } from '../store/actionCreator'

import HeaderContainer from '../containers/HeaderContainer'
import MainContainer from '../containers/MainContainer'
import Sidebar from '../components/Sidebar'
import {Navigator, Route} from '../navigator/navigator'

class MainPage extends Component {
    handleLogin = ()=>{
        const input = {
            token: 'asdfasdfasdf',
            username: '김기섭'
        }
        const {token, username} = input
        AthenticationActions.login({token, username})
    }
    handleLogout = ()=>{
        AthenticationActions.logout()
    }
    handleSidebar = ()=>{
        const {navList} = this.props
        if(!navList['mainscreen'])
            console.warn('handleSidebar: navList null')
        else
            navList['mainscreen'].push('Sidebar')
    }
    render(){
        const {isLogin, token, username, isSidebarOpen, navList} = this.props
        return(
            <View style={styles.container}>
                <View style={styles.headerContainer}>
                    
                    <View style={styles.iphonPadding} />

                    <View style={styles.header}>
                        <HeaderContainer
                            handleSidebar={this.handleSidebar}
                        />
                    </View>
                    <View style={styles.playingbar}>
                        <Text width='100%' height='0%'>
                            재생바 들어갈 
                        </Text>
                    </View>
                </View>

                
                <View style={styles.mainscreenContainer}>

                    <Navigator id='mainscreen'>
                        <Route name="MainContainer" component={MainContainer} />
                        <Route name="Sidebar" component={Sidebar} />
                    </Navigator>
                </View>
                

                <View style={styles.footerContainer}>
                    <Text>
                        Footer
                    </Text>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        width:'100%',
        height:'100%',
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    
    // HEADER
    headerContainer:{
        flex:3,
        width:'100%'
    },iphonPadding:{
        height:30,
        width:'100%',
        backgroundColor:'#fff'
    },header:{
        flex:1,
        width:'100%',
        backgroundColor:'#f00'
    },playingbar:{
        height:30,
        width:'100%',
        backgroundColor:'#fff'
    },
    
    // MAIN SCREEN
    mainscreenContainer:{
        flex:15,
        width:'100%',
        borderColor:'#000',
        borderWidth:1
    },

    // FOOTER
    footerContainer:{
        flex:1,
        width:'100%'
    },

    // SIDE BAR
    sidebarContainer:{
        position:'absolute',
        height:'90%',
        top: '10%',
        left: 0,
        borderTopWidth: 3,
        borderTopColor: '#777',
        backgroundColor: '#ccc'
    }

});


export default connect(
    (state)  =>({
        isLogin: state.athentication.isLogin,
        token: state.athentication.token,
        username: state.athentication.username,
        isSidebarOpen: state.navigator.isSidebarOpen,
        navList: state.navigator.navList
    })
)(MainPage)
//export default MainPage