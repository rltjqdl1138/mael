import React, {Component} from 'react'
import {View, StyleSheet, Text, TextInput, TouchableOpacity, Button, TouchableWithoutFeedback, Image, Keyboard, Alert} from 'react-native'
import * as Facebook from 'expo-facebook';

import SimpleHeader from '../components/SimpleHeader'

export default class LoginContainer extends Component {
    constructor(props){
        super(props)
        this.state = {
            id:'',
            password:'',
            checked:true,
            notice:'',
            isLoaded:true }
    }
    componentDidMount(){
        ( async()=>{

            const appId = "2811457995640492"
            const appName = "Mael streaming Test"
            const a = await Facebook.initializeAsync(appId, appName)
            const b = await Facebook.logInWithReadPermissionsAsync()
            if (b.type === 'success') {
                // Get the user's name using Facebook's Graph API
                const response = await fetch(`https://graph.facebook.com/me?access_token=${b.token}`);
                console.warn( (await response.json()))
              } else {
                // type === 'cancel'
              }

        })
    }
    handleChange = (field, text) => 
        this.setState({ [field]: text });
    render(){
        const {handleChange} = this
        const {navigator} = this.props
        const {handleLogin} = this.props.config

        return(
            <View style={styles.container}>
                <SimpleHeader 
                    title="로그인"
                    handler={()=>{navigator.pop('LoginPage')}}
                    notice={this.state.notice}
                    handleComplete={null}
                />

                <View style={[styles.mainContainer,{opacity:this.state.isLoaded?1:0.5}]}>
                    <View style={styles.accountInform}>
                        <View style={styles.inputBoxContainer} >
                            <TextInput style={styles.inputBox}
                                placeholder="ID"
                                placeholderTextColor='#888'
                                onChangeText={text=>handleChange('id',text)}
                            />
                        </View>
                        <View style={styles.inputBoxContainer} >
                            <TextInput style={styles.inputBox}
                                placeholder="비밀번호"
                                placeholderTextColor='#888'
                                secureTextEntry={true}
                                onChangeText={text=>handleChange('password',text)}
                            />
                        </View>
                    </View>


                    <View style={styles.enterButtonContainer}>
                            {/*  TODO:추후 이미지(icon)로 교체  */}
                            <TouchableOpacity style={styles.enterButton}
                                onPress={async ()=>{
                                    
                                    if(this.state.id.length < 8)
                                        return handleChange('notice','아이디는 8자리 이상입니다.')
                                    else if(this.state.password === '')
                                        return handleChange('notice','비밀번호를 입력해주세요')

                                    Keyboard.dismiss()
                                    handleChange('isLoaded',false)
                                    const result = await handleLogin(this.state.id, this.state.password)
                                    if(result){
                                        this.setState(state=>({...state, notice:'', isLoaded:true}))
                                        navigator.pop()
                                    }
                                    else{

                                        this.setState(state=>({...state, notice:'아이디 혹은 비밀번호가 올바르지 않습니다.', isLoaded:true}))
                                    }
                                }}>
                                <Image
                                    style={{resizeMode:'contain', flex:1}}
                                    source={require('../icon/shufflebutton.png')}
                                />
                            </TouchableOpacity>
                    </View>
                    <View style={styles.navigatorContainer}>
                        <View style={styles.findContainer}>
                            <TouchableWithoutFeedback style={styles.findIDContainer}
                                onPress={()=>{ navigator.push('FindIDPage',{}) }} >
                                <Text style={styles.findText}>
                                    아이디 찾기
                                </Text>
                            </TouchableWithoutFeedback>
                            <View style={styles.blankContainer}>
                                <Text style={[styles.findText,{textAlign:'center',}]}>/</Text>
                            </View>
                            <TouchableWithoutFeedback style={styles.findPasswordContainer}
                                onPress={()=>{ navigator.push('FindPasswordPage',{}) }} >
                                <Text style={styles.findText}>
                                    비밀번호 찾기
                                </Text>
                            </TouchableWithoutFeedback>
                        </View>
                        <View style={styles.signupContainer}>
                            <View 
                                style={styles.signupTextContainer}>
                                <Text style={styles.plainText}>
                                    아직 회원이 아니신가요?
                                </Text>
                            </View>
                            <TouchableWithoutFeedback style={{flex:1}}
                                onPress={()=>{ navigator.push('SignupPage',{}) }} >
                                <Text style={styles.signupText}>
                                    가입하기 >
                                </Text>
                            </TouchableWithoutFeedback>
                        </View>
                    </View>


                </View>
            </View>
        )
    }
}

const styles=StyleSheet.create({
    container:{
        width:'100%',
        height:'100%',
        backgroundColor: '#fff'
    },

    mainContainer:{
        width:'100%',
        flex:1
    },

    noticeContainer:{
        width:'100%',
        height:43,
        backgroundColor:'#f99',
        justifyContent:'center'
    },
    noticeText:{
        fontSize:14,
        textAlign:'center',
        color:'#fff'
    },


    accountInform:{
        height:110,
        paddingLeft:25,
        paddingRight:25,
        borderColor:'#000',
    },

    inputBoxContainer:{
        height:55,
        width:'100%',
        flexDirection:'row',
        borderBottomWidth:1,
        borderBottomColor:'#ddd',
        marginTop:5
    },
    inputBox:{
        fontSize:17,
        paddingLeft:20,
        width:'100%'
    },


    checkBoxContainer:{
        flexDirection:'row',
        alignItems:'center',
        marginTop:20,
        height:20
    },
    checkBox:{
        width:15,
        height:15,
        borderWidth:1,
        justifyContent:'center',
        alignItems:'center',
        marginRight:10
    },
    checked:{
        width:8,
        height:8,
        backgroundColor:'#0e0'
    },
    checkBoxText:{
        fontSize:15
    },

    enterButtonContainer:{
        marginTop:60,
        height: 40,
        width:'100%',
        alignItems:'center'
    },
    enterButton:{
        width:80,
        height:40,
        justifyContent:'center',
        alignItems:'center'
    },

    navigatorContainer:{
        marginTop:'20%',
        width:'100%',
        flex:1,
        paddingLeft:35,
        paddingRight:45,
        justifyContent:'flex-end',
        paddingBottom:100
    },
    findContainer:{
        width:'100%',
        height:50,
        flexDirection:'row'
    },
    findIDContainer:{
        width:60,
        height:'100%',
    },
    blankContainer:{
        width:20,
        height:'100%',
    },
    findPasswordContainer:{
        width:80,
        height:'100%',
    },
    findText:{
        fontSize:16,
        color:'#707070'
    },
    plainText:{
        fontSize:16,
        color:'#707070',
        fontWeight:'bold'
    },
    signupContainer:{
        width:'100%',
        height:50,
    },
    signupTextContainer:{
        height:30
    },
    signupText:{
        fontSize:16,
        color:'#96e255',
        fontWeight:'bold'
    }
})