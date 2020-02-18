import React, {Component} from 'react';
import { StyleSheet, Text, View, Animated, Dimensions, Button } from 'react-native';
import { connect } from 'react-redux'
import { AthenticationActions, SidebarActions } from '../store/actionCreator'

import HeaderContainer from '../containers/HeaderContainer'
import MainContainer from '../containers/MainContainer'
import PlayingContainer from '../containers/PlayingContainer';
import SignupContainer from '../containers/SignupContainer'
import PlayingPage from './PlayingPage'
import SidebarPage from './SidebarPage'

import Sidebar from '../components/Sidebar'
import {Navigator, Route} from '../navigator/navigator'

class MainPage extends Component {

    screenHeight = Dimensions.get('window').height
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
    handleNavPop = (name)=>{
        const {navList} = this.props

        if(!navList['mainscreen'])
            console.warn('handleSidebar: navList null')
        else
            navList['mainscreen'].pop(name)
    }
    render(){
        const {isLogin, token, username, isSidebarOpen, navList} = this.props
        return(
            <View style={styles.container}>
                
                <View style={styles.header}>
                    <HeaderContainer handleSidebar={this.props.handler.open} />
                </View>
                <View style={styles.mainscreenContainer}>
                    <MainContainer></MainContainer>
                </View>

                <PlayingPage headerPos={this.screenHeight*0.1212}/>
                <SidebarPage
                    isLogin={isLogin}
                    handleLogin={this.handleLogin}
                    handleLogout={this.handleLogout}
                    username={username}
                    token={token}
                />
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
    },
    
    // HEADER
    header:{
        flex:1,
        width:'100%',
        backgroundColor:'#f00',
        borderWidth:1,
        borderColor:'#f00'
    },

    // MAIN SCREEN
    mainscreenContainer:{
        flex:10,
        width:'100%',
        borderColor:'#f00',
        backgroundColor:'#fff',
        borderWidth:1
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

        isOpen: state.sidebar.isOpen,
        handler: state.sidebar.handler
    })
)(MainPage)
//export default MainPage