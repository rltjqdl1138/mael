import React, {Component} from 'react';
import { StyleSheet, Text, View, Animated, Dimensions, Button } from 'react-native';
import { connect } from 'react-redux'
import { AthenticationActions  } from '../store/actionCreator'

import HeaderContainer from '../containers/HeaderContainer'
import MainContainer from '../containers/MainContainer'
import PlayingContainer from '../containers/PlayingContainer';
import SignupContainer from '../containers/SignupContainer'
import PlayingPage from './PlayingPage'
import SidebarPage from './SidebarPage'
import {Route, Navigator} from '../navigator/navigator'

class MainPage extends Component {

    screenHeight = Dimensions.get('window').height

    getMusicList = () =>{
        const {themeList, mostlyList} = this.props
        const mostlyTitle = mostlyList.map(dat => dat.title)
        const themeTitle = themeList.map(dat=>dat.title)
        const list = [...mostlyTitle, ...themeTitle]
        return list
    }

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


    handleWholePush = (name, config) => {
        const {navList} = this.props
        navList['App'].push(name, config)
    }
    handleWholePop = (name)=>{
        const {navList} = this.props
        navList['App'].pop(name)
    }


    handleMainPush = (name, config) =>{
        const {navList} = this.props
        if(!navList['mainPage'])
            console.warn('handleSidebar: navList null')
        else
            navList['mainPage'].push(name, config)
    }

    handleMainPop = (name)=>{
        const {navList} = this.props
        if(!navList['mainPage'])
            console.warn('handleSidebar: navList null')
        else
            navList['mainPage'].pop(name)
    }
    render(){
        const {isLogin, token, username} = this.props
        const {handleMainPush, handleMainPop, handleWholePush, handleWholePop, getMusicList} = this
        const musicList = getMusicList()
        return(
            <View style={styles.container}>
                
                <View style={styles.header}>
                    <HeaderContainer
                        handleSidebar={this.props.handler.open}
                        handlePop={handleMainPop}
                    />
                </View>
                <View style={styles.mainscreenContainer}>
                    <Navigator id="mainPage">
                        <Route name="MainContainer" component={MainContainer} />
                        <Route name="SignupContainer" component={SignupContainer} />
                    </Navigator>
                </View>
                <PlayingPage headerPos={this.screenHeight*0.1212}/>
                <SidebarPage
                    isLogin={isLogin}
                    handleLogin={this.handleLogin}
                    handleLogout={this.handleLogout}
                    username={username}
                    token={token}
                    handleMainPush={handleMainPush}
                    handleWholePush={handleWholePush}
                    musicList={musicList}
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
        mostlyList: state.mostly.list,
        themeList: state.theme.list,
        isLogin: state.athentication.isLogin,
        token: state.athentication.token,
        username: state.athentication.username,
        handler: state.sidebar.handler,
        navList: state.navigator.navList
    })
)(MainPage)
//export default MainPage