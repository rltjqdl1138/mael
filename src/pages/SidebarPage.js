import React, {Component} from 'react'
import {View, StyleSheet, Animated, TouchableOpacity, Dimensions, Button} from 'react-native'
import { connect } from 'react-redux'

import { SidebarActions } from '../store/actionCreator'
import LogoutSidebar from '../containers/LogoutSidebar'
import LoginSidebar from '../containers/LoginSidebar'

class MainComponent extends Component{
    render(){
        const {isLogin, username, handleLogin, handleLogout} = this.props
        if(isLogin)
            return (
                <LoginSidebar
                    username={username}
                    handleLogout={handleLogout}
                />
            )
        else
            return(
                <LogoutSidebar
                    handleLogin={handleLogin}
                />
            )
    }
}

class SidebarPage extends Component{
    screenHeight = Dimensions.get('window').height
    screenWidth = Dimensions.get('window').width
    translatedX = new Animated.Value(0)
    constructor(props){
        super(props)
        SidebarActions.register({
            open: this.handleOpen,
            close: this.handleClose
        })
    }
    getStyle(){
        return [
            styles.container,
            {transform: [{translateX: this.translatedX}]}
        ]
    }
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
        }).start()
        SidebarActions.close()
    } 
    render(){
        const {isLogin, username, token, handleLogin, handleLogout} = this.props
        return(
            <Animated.View style={this.getStyle()} >
                <View style={styles.main}>
                    <MainComponent 
                        isLogin={isLogin}
                        username={username}
                        token={token}
                        handleLogin={handleLogin}
                        handleLogout={handleLogout}
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
        position:'absolute'
    },
    main:{
        borderWidth: 1,
        borderTopRightRadius:10,
        borderBottomRightRadius:10,
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