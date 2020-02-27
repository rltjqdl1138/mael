import React, {Component} from 'react'
import { View, StyleSheet, Text, Button, ScrollView, Image, TouchableOpacity } from 'react-native'

export default class LoginSetting extends Component{
    render(){
        const { username, handleLogout, handleMainPush, handleWholePush, handleClose, handleCloseSetting } = this.props
        return(
            <View style={styles.container}>
                <View style={styles.topPadding}>
                    <TouchableOpacity style={styles.backButton}
                        onPress={handleCloseSetting}
                    >
                    </TouchableOpacity>
                </View>   
                <View style={styles.usernameContainer}>
                    <TouchableOpacity onPress={()=>{handleWholePush('AccountInformationContainer')}}>
                        <Text style = {styles.usernameText}>
                            {username ? username + "님," : "blank"}
                        </Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.settingContainer}>
                    <TouchableOpacity style={styles.settingItem}
                        onPress={()=>{
                            handleClose()
                            handleWholePush('AccountInformationContainer') }}>
                        <Text style={styles.settingItemText}>
                            개인정보
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.settingItem}
                        onPress={()=>{`
                            handleClose()
                            handleWholePush('')` }}>
                        <Text style={styles.settingItemText}>
                            비밀번호 변경
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.settingItem}
                        onPress={()=>{`
                            handleClose()
                            handleWholePush('')` }}>
                        <Text style={styles.settingItemText}>
                            계정 정보
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.settingItem}
                        onPress={()=>{`
                            handleClose()
                            handleWholePush('')` }}>
                        <Text style={styles.settingItemText}>
                            공지사항
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.settingItem}
                        onPress={()=>{`
                            handleClose()
                            handleWholePush('')` }}>
                        <Text style={styles.settingItemText}>
                            이용안내
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.settingItem}
                        onPress={()=>{
                            handleLogout() }}>
                        <Text style={styles.settingItemText}>
                            Logout
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}



const styles= StyleSheet.create({
    container:{
        width:'100%',
        height:'100%',
        paddingTop:40,
        paddingBottom:40
    },

    topPadding:{
        width:'100%',
        flex:1
    },
    backButton:{
        marginLeft: 30,
        backgroundColor:'#000',
        width:40,
        height:40
    },

    usernameContainer:{
        flex: 1,
        flexDirection:'row',
        paddingLeft:30,
        alignContent:'center',
    },
    usernameText:{
        fontSize:20,
    },

    settingContainer:{
        flex:12,
        backgroundColor:'#fff',
        paddingTop:40
    },
    settingItem:{
        padding: 20,
        paddingLeft: 40
    },
    settingItemText:{
        fontSize:18
    }

})
