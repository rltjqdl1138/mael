import React, {Component} from 'react'
import {View, StyleSheet, Text, Button, ScrollView, Image, TouchableWithoutFeedback, TouchableHighlight} from 'react-native'

export default class LoginSidebar extends Component{
    render(){
        const {handleMainPush, handleWholePush, handleLogin, handleClose} = this.props
        return(
            <View style={styles.container}>
                <View style={styles.signContainer}>
                    <TouchableHighlight
                        style={styles.loginContainer}
                        onPress={()=>{
                            handleClose()
                            handleWholePush('LoginContainer',{handleLogin})
                        }}>
                        <Text style={{fontSize:20}}>로그인</Text>
                    </TouchableHighlight>
                    <View style={styles.signPadding}>
                        <Text style={{fontSize:20}}>
                            /
                        </Text>
                    </View>
                    <TouchableHighlight
                        style={styles.loginContainer}
                        onPress={()=>{
                            handleClose()
                            handleWholePush('SignupContainer')
                        }}>
                        <Text style={{fontSize:20}}>회원가입</Text>
                    </TouchableHighlight>

                </View>



                <View style={styles.noticeContainer}>

                </View>



                <View style={styles.otherContainer}>
                    <ScrollView>
                        <View style={temp.main1}/>
                    </ScrollView>
                </View>



                <View style={styles.settingContainer}>
                    <Image
                        style={styles.settingImage}
                        source={require('../image/owl.jpg')}
                    />
                </View>
            

                <View style={styles.bottomLine}>

                </View>


                
                <View style={styles.shopContainer}>
                    <Button
                        style={styles.shopButton}
                        title="SHOP >"
                    />
                </View>
            </View>
        )
    }
}
const temp = StyleSheet.create({
    main1:{
        width:'100%',
        height:200,
        backgroundColor:'#ff0'
    },main2:{
        width:'100%',
        height:200,
        backgroundColor:'#f0f'
    },main3:{
        width:'100%',
        height:200,
        backgroundColor:'#0ff'
    }
})

const styles= StyleSheet.create({
    container:{
        width:'100%',
        height:'100%',
        paddingTop:40,
        paddingBottom:40,
    },
    signContainer:{
        flex: 1,
        flexDirection:'row',
        paddingLeft:40,
        justifyContent:'flex-start'
    },
    loginContainer:{
        height:'100%',
        padding:5
    },
    signupContainer:{
        height:'100%',
        padding:5

    },signPadding:{
        width: 10,
        height: '100%',
        alignItems:'center',
        marginLeft: 10,
        marginRight: 10
    },




    noticeContainer:{
        flex:2,
        backgroundColor:'#000'
    },

    otherContainer:{
        flex:8,
    },


    settingContainer:{
        flex:1,
        margin:0,
        padding:0
    },
    settingImage:{
        position:'absolute',
        right:0,
        bottom:0,
        height:'90%',
        width:'20%',
        resizeMode:'contain',
    },


    bottomLine:{
        height:0,
        borderBottomColor:'#ccc',
        borderBottomWidth:1,
        marginLeft:10,
        marginRight:10
    },


    shopContainer:{
        flex:1,
        alignItems:'baseline',
        justifyContent:'center',
        paddingLeft:10
    },

    shopButton:{
        textAlign:'left',
        color:'#000'
    }
})