import React, {Component} from 'react'
import { View, Text, TouchableOpacity, TextInput, StyleSheet, Keyboard, Image } from 'react-native'

import SimpleHeader from '../components/SimpleHeader'
import networkHandler from '../networkHandler'
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
            notice:'',
            countryCode:'82',
            countryCodeList:[],
            isLoaded:false
        }
    }
    componentDidMount(){
        this.getCountryCode()
    }
    async getCountryCode(){
        const result = await networkHandler.info.getCountryCode()
        if(!result.success || !result.list)
            return;
        this.setState((state)=>({
            ...state,
            isLoaded:true,
            countryCodeList:result.list
        }))    
    }
    handleChange = (field, text) => {
        this.setState({
            [field]: text
        });
    }
    getPickerItem = (_code, name, isIOS) =>{
        if(!_code || !name) return null
        else if(isIOS)
            return ( <Picker.Item key={_code} label={'+ '+_code} value={_code} /> )
        return ( <Picker.Item key={_code} label={name} value={_code} /> )
    }
    getPicker = ()=>{
        const pickerItems = !this.state.countryCodeList ? null :
            this.state.countryCodeList.map(item =>
                this.getPickerItem(item.code, item.name, deviceCheck.ifIOS)
            )

        if(deviceCheck.ifIOS){
            return(
                <View style={[styles.pickerContainer, {display:this.state.isPickerOpen?'flex':'none'}]}>
                    <Picker style={{width:'100%', height:'100%'}}
                        itemStyle={{fontSize: 13, color:'#121111'}}
                        selectedValue={this.state.countryCode}
                        onValueChange={text=>this.handleChange('countryCode',text)} >
                            {pickerItems}
                    </Picker>
                </View>
            )
        }
        return(
            <Picker style={styles.androidPickerContainer}
                selectedValue={this.state.countryCode}
                onValueChange={text=>this.handleChange('countryCode',text)} >
                    {pickerItems}
            </Picker>        
        )
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
        const {mobileNotice} = this.state
        return(
            <View style={styles.container}>

                <SimpleHeader 
                    title="아이디 찾기"
                    handler={()=>{navigator.pop('FindIDPage')}}
                    notice={this.state.notice} />

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
                        <View style={{flexDirection:'row',width:'100%'}} >
                            <TouchableOpacity style={styles.countryCodeBox}
                                onPress={()=>handleChange('isPickerOpen',!this.state.isPickerOpen)}>
                                <View style={styles.countryCodeTextContainer}>
                                    <Text style={styles.countryCodeText} >
                                        {'+ '+this.state.countryCode}
                                    </Text>
                                </View>
                                <View style={styles.countryCodeButton}>
                                    <Image
                                        style={styles.countryCodeButtonImage}
                                        source={require('../icon/countryCode.png')}
                                    />

                                </View>
                            </TouchableOpacity>
                            <View style={styles.phoneinputBox}>
                                <TextInput style={{flex:1}}
                                    keyboardType="number-pad"
                                    placeholder="휴대전화"
                                    placeholderTextColor='#888'
                                    onChangeText={text=>handleChange('phone',text)}
                                    onFocus={()=>{this.needUp=true}}
                                />
                                <TouchableOpacity style={{width:60, justifyContent:'center'}}
                                    onPress={this.sendMessage}>
                                    <Text style={{fontSize:13, color:'#121111'}}>인증받기</Text>
                                </TouchableOpacity>

                            </View>
                        </View>

                        <View style={styles.simplePadding}/>
                        <View style={styles.inputBoxContainer} >
                            <View style={styles.inputBox}>

                                <TextInput style={{flex:1}}
                                    placeholder="인증번호"
                                    keyboardType="number-pad"
                                    placeholderTextColor='#888'
                                    onChangeText={text=>handleChange('phoneCheck',text)}
                                    onFocus={()=>{this.needUp=true}}
                                />

                                <TouchableOpacity style={{width:60, justifyContent:'center'}}
                                    onPress={this.keyCheck}>
                                    <Text style={{fontSize:13, color:'#121111'}}>인증확인</Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                        <View style={styles.textPadding}>
                            <Text style={styles.okText}>
                                {mobileNotice}
                            </Text>
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


    inputBoxContainer:{
        width:'100%',
        flexDirection:'row',
        borderRadius:15,
        borderWidth:1,
        borderColor:'#ddd'
    },
    inputBox:{
        width: '100%',
        height: 42,
        paddingLeft:20,
        flexDirection:'row'
    },
    simplePadding:{
        width:'100%',
        height:15
    },
    textPadding:{
        width:'100%',
        height:26,
        marginLeft:12,
        justifyContent:'center'
    },
    okText:{
        fontSize:12,
        color:'#96e255'
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
        color:'#70e255'
    }
})


const pickerStyle = StyleSheet.create({
    container:{
        width:50,
        height:250,
        borderColor:'#000',
        borderWidth:1,
        borderRadius:10,
        alignSelf:'center'
    },
    headerContainer:{
        width:'100%',
        flex:1,
        backgroundColor:'#ddd',
        justifyContent:'center',
        alignItems:'flex-end'
    },
    doneButton:{
        width:60,
        height:'80%',
        backgroundColor:'#aaa',
        marginRight:20,
        justifyContent:'center',
        borderColor:'#121212',
        borderWidth:1,
        borderRadius:10
    },
    doneText:{
        textAlign:'center',
        fontSize:14
    }
})