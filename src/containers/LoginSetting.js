import React, {Component} from 'react'
import { View, StyleSheet, Text, Button, ScrollView, Image, TouchableOpacity } from 'react-native'
import deviceCheck from '../deviceCheck'

export default class LoginSetting extends Component{
    render(){
        const { username, handleLogout, handleMainPush, handleWholePush, handleClose, handleCloseSetting } = this.props
        return(
            <View style={styles.container}>
                <View style={styles.topPadding}>
                    <TouchableOpacity style={styles.backButton}
                        onPress={handleCloseSetting} >
                            <Image style={styles.backButtonImage}
                                source={require('../icon/back.png')}
                            />
                    </TouchableOpacity>
                </View> 
                { /*
                <View style={styles.usernameContainer}>
                    <TouchableOpacity onPress={()=>{handleWholePush('AccountInformationContainer')}}>
                        <Text style = {styles.usernameText}>
                            {username ? username + "님," : "blank"}
                        </Text>
                    </TouchableOpacity>
                </View> */}
                <View style={styles.settingContainer}>
                    <TouchableOpacity style={styles.settingItem}
                        onPress={()=>{
                            handleClose()
                            handleWholePush('PlanPage') }}>
                        <Text style={styles.settingItemText}>
                            플랜선택
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.settingItem}
                        onPress={()=>{
                            handleClose()
                            handleWholePush('AccountInfoPage') }}>
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
        height:'100%'
    },

    topPadding:{
        marginTop:40,
        width:'100%',
        height:40,
        justifyContent:'center',
    },

    backButton:{
        marginLeft: 30,
        width:30,
        height:30
    },
    backButtonImage:{
        height:'100%',
        width:'100%',
        resizeMode:'contain'
    },
    settingContainer:{
        flex:1,
        backgroundColor:'#fff',
        paddingTop:80
    },
    settingItem:{
        padding: 20,
        paddingLeft: 40
    },
    settingItemText:{
        fontSize:15
    }

})
