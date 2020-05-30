import React, {Component} from 'react'
import {View, StyleSheet, Text, TextInput, TouchableOpacity, Button, TouchableWithoutFeedback, Image, Keyboard, Alert} from 'react-native'
import * as Facebook from 'expo-facebook';
import * as GoogleSignIn from 'expo-google-sign-in'

import networkHandler from '../networkHandler'
import SimpleHeader from '../components/SimpleHeader'
import {AuthenticationActions} from '../store/actionCreator'

export default class LoginContainer extends Component {
    constructor(props){
        super(props)
        this.state = {
            id:'',
            password:'',
            notice:'',
            isLoaded:false }
    }
    componentDidMount(){
        this.initializeFacebook()
        this.initializeGoogle()
    }
    handleChange = (field, text) => 
        this.setState({ [field]: text });

    handleConfirm = async () =>{
        const {navigator} = this.props
        const {id, password} = this.state
        const {handleChange} = this
        const handleLogin = this.props.config? this.props.config.handleLogin : null

        switch(true){
            case !handleLogin:
            case typeof handleLogin !== 'function':
                return navigator.pop('LoginPage')
            case !id:
            case id.length < 8 :
                return handleChange('notice','아이디는 8자리 이상입니다.')

            case !password:
            case password.length === 0:
                return handleChange('notice','비밀번호를 입력해주세요')
        }

        handleChange('isLoaded',false)
        Keyboard.dismiss()

        const result = await handleLogin(id, password)
        result? navigator.pop('LoginPage') :
            this.setState(state=>({...state, notice:'아이디 혹은 비밀번호가 올바르지 않습니다.', isLoaded:true}))
    }
    initializeFacebook = async ()=>{
        try{
            const appId = "2811457995640492"
            const appName = "Mael streaming Test"
            await Facebook.initializeAsync(appId, appName)
            this.handleChange('isLoaded', true)
        }catch(e){
            this.handleChange('isLoaded', true)
        }
    }
    initializeGoogle = async ()=>{
        try{
            await GoogleSignIn.initAsync({
                clientId:"140509882075-jkh19n4anp1ip5l736u6sh0q5022ckq0.apps.googleusercontent.com"
            })
            const user = await GoogleSignIn.signInSilentlyAsync()
            alert(user)
        }catch(e){
            console.warn(e)
        }
    }
    handleGoogleLogin = async ()=>{
        try{
            await GoogleSignIn.askForPlayServicesAsync()
            const {type, user} = await GoogleSignIn.signInAsync()
            if( type === 'success'){
                const us = await signInSilentlyAsync()
                alert(us)
            }
        }catch(e){

        }
    }
    handleFacebookLogin = async ()=>{
        const {navigator} = this.props

        const response = await Facebook.logInWithReadPermissionsAsync({permissions: ['public_profile', 'email']})

        if (response.type === 'success') {
            const fbResponse = await (await fetch(`https://graph.facebook.com/me?access_token=${response.token}`)).json()
            const check = await networkHandler.account.getCheckID(fbResponse.id, 'facebook')
            if(!check.success || check.overlaped === undefined)
                return alert('network error')
            const loginResponse = check.overlaped ? await networkHandler.account.facebookLogin(fbResponse.id, response.token) :
                await networkHandler.account.registerFacebookAccount({id:fbResponse.id, token:response.token, name:fbResponse.name})
            if(!loginResponse.success)
                return alert('login fault')

            AuthenticationActions.login({token: loginResponse.token, username: loginResponse.name})
            navigator.pop('LoginPage')
        } else {
            // CANCEL
        }
    }
    render(){
        const {handleChange, handleConfirm, handleFacebookLogin, handleGoogleLogin} = this
        const {navigator} = this.props

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
                        <TouchableOpacity style={styles.enterButton}
                            onPress={handleConfirm}>
                            <Image style={{resizeMode:'contain', width:'100%',height:'100%'}}
                                source={require('../icon/login.png')} />
                        </TouchableOpacity>
                    </View>
                    

                    <View style={styles.findContainer}>
                        <TouchableWithoutFeedback style={styles.findIDContainer}
                            onPress={()=>{ navigator.push('FindIDPage',{}) }} >
                            <Text style={styles.plainText}>
                                아이디 찾기 | 비밀번호 찾기
                            </Text>
                        </TouchableWithoutFeedback>
                    </View>

                    <View style={{height:150, width:'100%' }} >
                        <View style={styles.signupTextContainer}>
                            <Text style={styles.plainText}>
                                회원가입 | 소셜계정로그인
                            </Text>
                        </View>
                        <View style={{flex:1, flexDirection:'row', paddingLeft:20, paddingRight:20}}>
                            <View style={styles.signupButtonContainer}>
                                <TouchableOpacity style={styles.enterButton}
                                    onPress={()=>{navigator.push('SignupPage')}}>
                                    <Image style={{resizeMode:'contain', width:'100%',height:'100%'}}
                                        source={require('../icon/signup.png')} />
                                </TouchableOpacity>
                            </View>
                            <View style={styles.signupButtonContainer}>
                                <TouchableOpacity style={styles.enterButton}
                                    onPress={()=>{alert('apple')}}>
                                    <Image style={{resizeMode:'contain', width:'100%',height:'100%'}}
                                        source={require('../icon/apple.png')} />
                                </TouchableOpacity>
                            </View>
                            <View style={styles.signupButtonContainer}>
                                <TouchableOpacity style={styles.enterButton}
                                    onPress={handleGoogleLogin}>
                                    <Image style={{resizeMode:'contain', width:'100%',height:'100%'}}
                                        source={require('../icon/google.png')} />
                                </TouchableOpacity>
                            </View>
                            <View style={styles.signupButtonContainer}>
                                <TouchableOpacity style={styles.enterButton}
                                    onPress={handleFacebookLogin}>
                                    <Image style={{resizeMode:'contain', width:'100%',height:'100%'}}
                                        source={require('../icon/facebook.png')} />
                                </TouchableOpacity>
                            </View>
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
        height:'100%'
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
        height:120,
        paddingLeft:25,
        paddingRight:25,
        borderColor:'#000',
    },

    inputBoxContainer:{
        height:50,
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

    enterButtonContainer:{
        height: 65,
        paddingLeft:20,
        paddingRight:20,
        width:'100%'
    },
    enterButton:{
        width:'100%',
        height:'100%',
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
        height:150,
        paddingTop:20,
        paddingLeft:25,
        paddingRight:25
    },
    findIDContainer:{
        width:60,
        height:'100%',
    },
    blankContainer:{
        width:20,
        height:'100%',
    },
    findText:{
        fontSize:16,
        color:'#707070'
    },
    plainText:{
        fontSize:16,
        color:'#767171',
        textAlign:'center'
    },
    signupContainer:{
        width:'100%',
        height:50,
    },
    signupTextContainer:{
        height:30,
        paddingRight:25,
        paddingLeft:25
    },
    signupText:{
        fontSize:16,
        color:'#96e255',
        fontWeight:'bold'
    },
    signupButtonContainer:{
        flex:1,
    }
})