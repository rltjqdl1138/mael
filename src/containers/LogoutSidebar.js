import React, {Component} from 'react'
import {View, StyleSheet, Text, Button, ScrollView, Image, TouchableOpacity, TouchableHighlight} from 'react-native'
import MusicTitle from '../components/MusicTitle'
import SidebarBanner from '../components/SidebarBanner'
import deviceCheck from '../deviceCheck'

export default class LoginSidebar extends Component{
    render(){
        const {handleMainPush, handleOpenSetting, handleWholePush, handleLogin, handleClose, musicList} = this.props
        return(
            <View style={styles.container}>


                <TouchableOpacity style={styles.settingContainer}
                    onPress={()=>{handleOpenSetting()}}>
                    <Image
                        style={styles.settingImage}
                        source={require('../icon/setting2.png')}
                    />
                </TouchableOpacity>

                <View style={styles.signContainer}>
                    <TouchableHighlight
                        style={styles.loginContainer}
                        onPress={()=>{
                            handleClose()
                            //handleLogin()
                            handleWholePush('LoginPage',{handleLogin})
                        }}>
                        <Text style={{fontSize:15}}>로그인</Text>
                    </TouchableHighlight>
                    <View style={styles.signPadding}>
                        <Text style={{fontSize:15}}>
                            /
                        </Text>
                    </View>
                    <TouchableHighlight
                        style={styles.loginContainer}
                        onPress={()=>{
                            handleClose()
                            handleWholePush('SignupPage')
                        }}>
                        <Text style={{fontSize:15}}>회원가입</Text>
                    </TouchableHighlight>

                </View>


                <SidebarBanner />



                <View style={styles.otherContainer}>
                    <ScrollView>
                        <MusicTitle musicList={musicList}
                            handleClose={handleClose}
                            handleMainPush={handleMainPush}
                        />
                    </ScrollView>
                </View>
            

                <View style={styles.bottomLine}>

                </View>


                
                <View style={styles.shopContainer}>
                    <Button
                        style={styles.shopButton}
                        title="SHOP >"
                    />
                </View>
                <View style={ {height:deviceCheck.ifTopbarless?30:0, width:'100%', backgroundColor:'#000'} }/>
            </View>
        )
    }
}

const styles= StyleSheet.create({
    container:{
        width:'100%',
        height:'100%',
    },
    signContainer:{
        height: 40,
        paddingTop:10,
        paddingLeft:20,
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        alignSelf:'baseline'
    },
    loginContainer:{
        height:'100%',
        borderWidth:0.5
    },
    signupContainer:{
        height:'100%'

    },signPadding:{
        width: 10,
        height: '100%',
        marginLeft: 10,
        marginRight: 10
    },

    otherContainer:{
        flex:1,
        width:'100%'
    },


    settingContainer:{
        height:40,
        margin:0,
        padding:0,
        marginTop:4,
        justifyContent:'flex-end',
        alignItems:'flex-end'
    },
    settingImage:{
        position:'absolute',
        right:0,
        bottom:0,
        height:'100%',
        width:'18%',
        resizeMode:'contain',
    },


    bottomLine:{
        height:10,
        borderBottomColor:'#ccc',
        borderBottomWidth:1,
        marginLeft:10,
        marginRight:10
    },


    shopContainer:{
        height:110,
        alignItems:'baseline',
        justifyContent:'center',
        paddingLeft:10
    },

    shopButton:{
        textAlign:'left',
        color:'#000'
    }
})