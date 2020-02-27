import React, {Component} from 'react'
import {View, StyleSheet, Animated, TouchableOpacity, Dimensions, Button} from 'react-native'
import { connect } from 'react-redux'

import { SidebarActions } from '../store/actionCreator'
import LogoutSidebar from '../containers/LogoutSidebar'
import LoginSidebar from '../containers/LoginSidebar'
import LoginSetting from '../containers/LoginSetting'
import {Navigator, Route} from '../navigator/navigator'

class MainComponent extends Component{
    render(){
        const {isLogin, username, handleLogin, handleLogout, handleMainPush, handleClose, handleWholePush, isOpenSetting, handleOpenSetting, handleCloseSetting, musicList} = this.props
        if(isLogin && !isOpenSetting){
            return(
                <LoginSidebar
                    username={username}
                    handleLogout={handleLogout}
                    handleMainPush={handleMainPush}
                    handleWholePush={handleWholePush}
                    handleClose={handleClose}
                    handleOpenSetting={handleOpenSetting}
                    musicList={musicList}
                />
            )
        }
        
        else if(isLogin){
            return(
                <LoginSetting
                    username={username}
                    handleLogout={handleLogout}
                    handleClose={handleClose}
                    handleCloseSetting={handleCloseSetting}
                    handleWholePush={handleWholePush}
                />
            )
        }

        else
            return(
                <LogoutSidebar
                    handleLogin={handleLogin}
                    handleMainPush={handleMainPush}
                    handleClose={handleClose}
                    handleWholePush={handleWholePush}
                />
            )
    }
}

class SidebarPage extends Component{
    screenHeight = Dimensions.get('window').height
    screenWidth = Dimensions.get('window').width
    translatedX = new Animated.Value(-(this.screenWidth))
    constructor(props){
        super(props)
        this.state = {isOpenSetting:false}
        SidebarActions.register({
            open: this.handleOpen,
            close: this.handleClose
        })
    }
    getStyle = () => [ styles.container, {transform: [{translateX: this.translatedX}]} ]
    handleOpen = () =>{
        Animated.timing(this.translatedX,{
            toValue:0,
            duration:200
        }).start()
        SidebarActions.open()
    }
    handleClose = () => {
        Animated.timing(this.translatedX,{
            toValue:-(this.screenWidth),
            duration:200
        }).start(()=>{
            this.CloseSetting()
        })
        SidebarActions.close()
    }

    OpenSetting = ()=>{
        this.setState({
            isOpenSetting:true
        })
    }
    CloseSetting = ()=>{
        this.setState({
            isOpenSetting:false
        })
    }
    render(){
        const {isOpenSetting} = this.state
        const {isLogin, username, token, handleLogin, handleLogout, handleMainPush, handleWholePush, musicList} = this.props
        return(
            <Animated.View style={this.getStyle()} >
                <View style={styles.main}>
                    <MainComponent 
                        isLogin={isLogin}
                        username={username}
                        token={token}
                        handleLogin={handleLogin}
                        handleLogout={handleLogout}
                        handleMainPush={handleMainPush}
                        handleWholePush={handleWholePush}
                        handleClose={this.handleClose}
                        handleOpenSetting={this.OpenSetting}
                        handleCloseSetting={this.CloseSetting}
                        isOpenSetting={isOpenSetting}
                        musicList={musicList}
                    />
                </View>
                <TouchableOpacity
                    style={styles.blank}
                    onPress={this.handleClose}
                />
            </Animated.View>
        )
    }
}

const styles=StyleSheet.create({
    container:{
        width:'100%',
        height:'100%',
        flexDirection:'row',
        position:'absolute',
    },
    main:{
        borderWidth: 1,
        borderTopRightRadius:20,
        borderBottomRightRadius:20,
        borderColor:'#aaa',
        flex: 3,
        backgroundColor: '#fff'
    },
    blank:{
        flex: 1
    }
    
})



export default connect(
    (state)  =>({
        isOpen: state.sidebar.isOpen,
        handler: state.sidebar.handler
    })
)(SidebarPage)