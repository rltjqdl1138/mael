import React, {Component} from 'react'
import {View, StyleSheet, Text, TextInput, TouchableOpacity, Button, TouchableWithoutFeedback, Image} from 'react-native'


import SimpleHeader from '../components/SimpleHeader'

export default class LoginContainer extends Component {
    constructor(props){
        super(props)
        this.state = {
            id:'',
            password:'',
            checked:true }
    }
    handleChange = (field, text) => 
        this.setState({ [field]: text });
    getCheckBoxStyle = () =>{
        const {checked} = this.state
        return checked ? styles.checked : {}
    }
    render(){
        const {handleChange} = this
        const {navigator} = this.props
        const {handleLogin} = this.props.config

        return(
            <View style={styles.container}>
                <SimpleHeader 
                    title="Sign in"
                    handler={()=>{navigator.pop('LoginPage')}}
                    notice=''/>

                <View style={styles.mainContainer}>
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
                        <View style={styles.checkBoxContainer}>
                            <TouchableOpacity
                                style={styles.checkBox}
                                value={this.state.checked}
                                onPress={() => this.setState({ checked: !this.state.checked })}>
                                    <View style={this.getCheckBoxStyle()}/>
                            </TouchableOpacity>
                            <Text style={styles.checkBoxText}>로그인 유지</Text>
                        </View>
                    </View>


                    <View style={styles.enterButtonContainer}>
                        <View style={styles.enterButton}>
                            {/*  TODO:추후 이미지(icon)로 교체  */}
                            <Button
                                title="Enter"
                                onPress={()=>{
                                    handleLogin()
                                    navigator.pop()
                                }}/> 
                        </View>
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
                                <Text style={styles.findText}>/</Text>
                            </View>
                            <TouchableWithoutFeedback style={styles.findPasswordContainer}
                                onPress={()=>{ navigator.push('FindPasswordPage',{}) }} >
                                <Text style={styles.findText}>
                                    비밀번호 찾기
                                </Text>
                            </TouchableWithoutFeedback>
                        </View>
                        <View style={styles.signupContainer}>
                            <View >
                                <Text style={styles.findText}>
                                    아직 회원이 아니신가요?
                                </Text>
                            </View>
                            <TouchableWithoutFeedback 
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
        height:'25%',
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
        marginTop:55,
        height: 40,
        width:'100%',
        alignItems:'center'
    },
    enterButton:{
        width:80,
        height:40,
        backgroundColor:'#000'
    },

    navigatorContainer:{
        marginTop:'20%',
        width:'100%',
        height:80,
        paddingLeft:45,
        paddingRight:45
    },
    findContainer:{
        width:'100%',
        height:20,
        flexDirection:'row'
    },
    findIDContainer:{
        width:60,
        height:'100%',
    },
    blankContainer:{
        width:10,
        height:'100%',
    },
    findPasswordContainer:{
        width:80,
        height:'100%',
    },
    findText:{
        fontSize:12,
        color:'#707070'
    },

    signupContainer:{
        width:'100%',
        height:40,
        marginTop:26
    },
    signupText:{
        fontSize:12,
        color:'#FF6E43',
        fontWeight:'bold'
    }
})