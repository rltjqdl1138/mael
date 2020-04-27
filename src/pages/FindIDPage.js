import React, {Component} from 'react'
import { View, Text, TouchableOpacity, TextInput, StyleSheet, Keyboard } from 'react-native'

import SimpleHeader from '../components/SimpleHeader'
import {account} from '../networkHandler'

export default class FindIDContainer extends Component {
    constructor(props){
        super(props)
        this.state = {
            lastName: '',
            firstName: '',
            email: '',
            ifCorrect: false,
            foundID:'',
            notice:''
        }
    }
    handleChange = (field, text) => {
        this.setState({
            [field]: text
        });
    }
    getNotice = ()=>{
        if(this.state.ifCorrect)
            return ''
        else
            return '해당 정보와 일치하는 가입정보가 없습니다.'
    }
    getID = async ()=>{
        Keyboard.dismiss()
        const {lastName, firstName, email} = this.state
        if(lastName==='' || firstName ==='' || email === '')
            return this.setState(state=>({
                ...state,
                notice:'아래 정보를 모두 기입해주세요.',
                ifCorrect: false
            }))

        const data = await account.getForgotID(lastName+firstName, email)
        if(data && data.success && data.id)
            this.setState(state=>({
                ...state,
                foundID: data.id,
                notice:'',
                ifCorrect: true  }))
        else
            this.setState(state=>({
                ...state,
                notice:'해당 정보와 일치하는 가입정보가 없습니다.',
                ifCorrect: false
            }))
    }
    render(){
        const {navigator} = this.props
        const {handleChange, getID} = this
        return(
            <View style={styles.container}>

                <SimpleHeader 
                    title="Forgot ID"
                    handler={()=>{navigator.pop('FindIDPage')}}
                    notice={this.state.notice}/>

                <View style={styles.mainContainer}>
                    <View style={styles.informationContainer}>
                        <View style={styles.inputBoxContainer}>
                            <TextInput style={styles.inputBox}
                                placeholder="성"
                                placeholderTextColor='#888'
                                onChangeText={text=>handleChange('lastName',text)}
                            />
                        </View>

                        <View style={styles.inputBoxContainer}>
                            <TextInput style={styles.inputBox}
                                placeholder="이름"
                                placeholderTextColor='#888'
                                onChangeText={text=>handleChange('firstName',text)}
                            />
                        </View>


                        <View style={styles.inputBoxContainer}>
                            <TextInput style={styles.inputBox}
                                placeholder="가입시 이메일 주소"
                                placeholderTextColor='#888'
                                onChangeText={text=>handleChange('email',text)}
                            />
                        </View>
                    </View>
                    <View style={styles.enterContainer}>
                        <TouchableOpacity style={styles.enterBox}
                            onPress={getID} >
                            <Text style={styles.enterText}>
                                확인
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.foundIDContainer}>
                        <Text style={styles.foundIDNotice}> {this.state.ifCorrect?'회원님의 ID는':''} </Text>
                        <Text style={styles.foundIDText}  > {this.state.ifCorrect?this.state.foundID:''}</Text>
                        <Text style={styles.foundIDNotice}> {this.state.ifCorrect?'입니다':''} </Text>
                    </View>
                    <View style={styles.linkContainer}>
                        <TouchableOpacity style={styles.loginContainer}
                            onPress={()=>{
                                navigator.pop('FindIDPage') }}>
                            <Text style={styles.loginText}>
                                로그인하기 >
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.findPasswordContainer}
                            onPress={()=>{navigator.push('FindPasswordPage')}}>
                            <Text style={styles.findPasswordText}>
                                비밀번호 찾기 >
                            </Text>
                        </TouchableOpacity>
                    </View>
                    
                </View>

                
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        width:'100%',
        height:'100%',
        backgroundColor:'#fff'
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

    informationContainer:{
        alignItems:'center',
        marginLeft:25,
        marginRight:25
    },
    inputBoxContainer:{
        width:'100%',
        height:60,
        borderBottomWidth:1,
        borderBottomColor:'#ddd',
        justifyContent:'flex-end'
    },
    inputBox:{
        width:'100%',
        height:'60%',
        marginLeft:20
    },
    

    enterContainer:{
        width:'100%',
        justifyContent:'center',
        alignItems:'center',
        paddingTop:55
    },
    enterBox:{
        backgroundColor:'#000',
        width: 130,
        height: 45,
        borderRadius: 50,
        justifyContent:'center'
    },
    enterText:{
        textAlign:'center',
        fontSize:17,
        color:'#fff'
    },

    foundIDContainer:{
        width:'100%',
        alignItems:'center',
        paddingTop:40
    },
    foundIDText:{
        fontSize:15,
        color:'#FF6E43'
    },
    foundIDNotice:{
        fontSize:15,
        color:'#080808'
    },


    linkContainer:{
        paddingTop:76,
        paddingLeft:45
    },
    loginContainer:{

    },
    loginText:{
        fontSize: 14,
        color:'#848484'
    },
    findPasswordContainer:{
        paddingTop:25
    },
    findPasswordText:{
        fontSize: 14,
        color:'#FF6E43'
    }
})