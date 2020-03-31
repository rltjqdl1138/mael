import React, {Component} from 'react';
import { StyleSheet, Text, View, Animated, Dimensions, Button } from 'react-native';
import { connect } from 'react-redux'
import { AthenticationActions, AudioActions  } from '../store/actionCreator'

import HeaderContainer from '../containers/HeaderContainer'
import MainContainer from '../containers/MainContainer'
import AlbumContainer from '../containers/AlbumContainer';
import deviceCheck from '../deviceCheck'
import PlayingPage from './PlayingPage'
import MyPlaylistPage from './MyPlaylistPage'
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
        else{
            const list = navList['mainPage'].pop(name)

            if(list && list[0] && (list[0].key === "AlbumContainer" || list[0].key === "MyPlaylistPage")){
                AudioActions.update()
            }
        }
    }

    
    render(){
        const {isLogin, token, username, showPlaybar} = this.props
        const {handleMainPush, handleMainPop, handleWholePush, handleWholePop, getMusicList} = this
        const musicList = getMusicList()
        return(
            <View style={styles.container}>
                
                <View style={styles.mainscreenContainer}>
                    <Navigator id="mainPage">
                        <Route name="MainContainer" component={MainContainer} />
                        <Route name="MyPlaylistPage" component={MyPlaylistPage} />
                        <Route name="AlbumContainer" component={AlbumContainer} />
                    </Navigator>
                </View>
                <View style={styles.header}>
                    <HeaderContainer
                        handleSidebar={this.props.handler.open}
                        handlePop={handleMainPop}
                    />
                </View>
                <View style={showPlaybar? styles.bottomPadding:styles.hideBottomPadding} />
                <PlayingPage headerPos={this.screenHeight*0.1212} />
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
        position:'absolute',
        top:0,
        height:67,
        width:'100%',
        backgroundColor:'#f00'
    },

    // MAIN SCREEN
    mainscreenContainer:{
        top:67,
        flex:1,
        width:'100%',
        borderColor:'#f00'
    },

    bottomPadding:{
        height:deviceCheck.ifTopbarless?220:180,
        width:'100%'
    },
    hideBottomPadding:{
        height:deviceCheck.ifTopbarless?100:20,
        width:'100%'
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
        navList: state.navigator.navList,
        showPlaybar: state.audio.showPlaybar
    })
)(MainPage)
//export default MainPage