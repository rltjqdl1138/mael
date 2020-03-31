import React, {Component} from 'react'
import {View, StyleSheet, Text, TextInput, ScrollView, Button, Picker, TouchableOpacity, TouchableWithoutFeedback } from 'react-native'
import SimpleHeader from '../components/SimpleHeader'
import deviceCheck from '../deviceCheck'

const size12 = deviceCheck.getFontSize(12)
const size14 = deviceCheck.getFontSize(14)
const size17 = deviceCheck.getFontSize(17)
export default class SignupPage extends Component {
    constructor(props){
        super(props)
        this.state={
            firstName:'',
            lastName:'',
            id:'',
            password:'',
            passwordCheck:'',
            email:'',
            phoneFirst:'082',
            phone:'',
            phoneCheck:'',
            isPickerOpen:false,
            isFocused:false
        }
    }
    handleChange = (field, text) => {
        this.setState({
            [field]: text
        });
    }
    render(){
        const {handleChange} = this
        const {navigator} = this.props
        return(
            <View style={styles.container}>

                <SimpleHeader 
                    title="Sign up"
                    handler={()=>{navigator.pop('SignupPage')}}
                    notice=''/>

                <ScrollView style={styles.mainContainer}>
                    <View style={styles.accountInform}>
                        <Text style={styles.subtitle} >회원 정보</Text>
                        <View style={styles.inputBoxContainer} >
                            <TextInput style={styles.inputBox}
                                placeholder="성"
                                placeholderTextColor='#888'
                                onChangeText={text=>handleChange('firstName',text)}
                                onFocus={()=>handleChange('isFocused',true)}
                                onEndEditing={()=>handleChange('isFocused',false)}
                            />
                        </View>
                        <View style={styles.simplePadding}/>
                        <View style={styles.inputBoxContainer} >
                            <TextInput style={styles.inputBox}
                                placeholder="이름"
                                placeholderTextColor='#888'
                                onChangeText={text=>handleChange('lastName',text)}
                                onFocus={()=>handleChange('isFocused',true)}
                                onEndEditing={()=>handleChange('isFocused',false)}
                            />
                        </View>
                    </View>


                    <View style={styles.IDPW}>
                        <Text style={styles.subtitle} allowFontScaling={false}>ID / PASSWORD</Text>
                        <View style={styles.inputBoxContainer} >
                            <TextInput style={styles.inputBox}
                                placeholder="ID"
                                placeholderTextColor='#888'
                                onChangeText={text=>handleChange('id',text)}
                                onFocus={()=>handleChange('isFocused',true)}
                                onEndEditing={()=>handleChange('isFocused',false)}
                            />
                        </View>
                        <View style={styles.textPadding}>
                            <Text style={styles.okText} >
                                사용할 수 있는 ID입니다
                            </Text>
                        </View>
                        <View style={styles.inputBoxContainer}>
                            <TextInput style={styles.inputBox}
                                placeholder="비밀번호"
                                placeholderTextColor='#888'
                                secureTextEntry={true}
                                onChangeText={text=>handleChange('password',text)}
                                onFocus={()=>handleChange('isFocused',true)}
                                onEndEditing={()=>handleChange('isFocused',false)}
                            />
                        </View>
                        <View style={styles.simplePadding}/>
                        <View style={styles.inputBoxContainer} >
                            <TextInput style={styles.inputBox}
                                placeholder="비밀번호 확인"
                                placeholderTextColor='#888'
                                secureTextEntry={true}
                                onChangeText={text=>handleChange('passwordCheck',text)}
                                onFocus={()=>handleChange('isFocused',true)}
                                onEndEditing={()=>handleChange('isFocused',false)}
                            />
                        </View>
                        <View style={styles.textPadding}>
                            <Text style={styles.okText} >
                                비밀번호가 일치합니다
                            </Text>
                        </View>
                    </View>


                    <View style={styles.PhoneEmail}>
                        <Text style={styles.subtitle} >Phone / Email</Text>
                        <View style={styles.inputBoxContainer} >
                            <TextInput style={styles.inputBox}
                                placeholder="이메일"
                                placeholderTextColor='#888'
                                onChangeText={text=>handleChange('email',text)}
                                onFocus={()=>handleChange('isFocused',true)}
                                onEndEditing={()=>handleChange('isFocused',false)}
                            />
                        </View>
                        <View style={styles.simplePadding}/>
                        <View style={{flexDirection:'row',width:'100%'}} >
                            <TouchableOpacity style={styles.phoneFirstBox}
                                onPress={()=>handleChange('isPickerOpen',!this.state.isPickerOpen)}>
                                <View style={styles.phoneFirstTextContainer}>
                                    <Text style={styles.phoneFirstText} >
                                        {this.state.phoneFirst}
                                    </Text>
                                </View>
                                <View style={styles.phoneFirstButton}>

                                </View>
                            </TouchableOpacity>
                            <TextInput style={styles.phoneinputBox}
                                keyboardType="number-pad"
                                placeholder="휴대전화"
                                placeholderTextColor='#888'
                                onChangeText={text=>handleChange('phone',text)}
                                onFocus={()=>handleChange('isFocused',true)}
                                onEndEditing={()=>handleChange('isFocused',false)}
                            />
                        </View>

                        <View style={styles.simplePadding}/>
                        <View style={styles.inputBoxContainer} >
                            <TextInput style={styles.inputBox}
                                placeholder="인증번호"
                                keyboardType="number-pad"
                                placeholderTextColor='#888'
                                onChangeText={text=>handleChange('phoneCheck',text)}
                                onFocus={()=>handleChange('isFocused',true)}
                                onEndEditing={()=>handleChange('isFocused',false)}
                            />
                        </View>

                        <View style={styles.textPadding}>
                            <Text style={styles.okText}>
                                인증확인되었습니다
                            </Text>
                        </View>
                        <View style={[styles.pickerContainer, {display:this.state.isPickerOpen?'flex':'none'}]}>
                            <Picker style={{width:'100%', height:'100%'}}
                                selectedValue={this.state.phoneFirst}
                                onValueChange={text=>handleChange('phoneFirst',text)} >
                                    <Picker.Item label="00001" value="001" />
                                    <Picker.Item label="00002" value="002" />
                                    <Picker.Item label="00003" value="003" />
                                    <Picker.Item label="00004" value="004" />
                                    <Picker.Item label="00005" value="005" />
                                    <Picker.Item label="00006" value="006" />
                            </Picker>
                        </View>
                        <View style={styles.simplePadding}/>
                    </View>

                    <View style={styles.enterButtonContainer}>
                        <View style={styles.enterButton}>

                        <Button
                            title="Enter"
                            onPress={()=>{navigator.pop()}}
                        /> 
                        </View>
                    </View>
                    <View style={{width:'100%',height:this.state.isFocused?300:40}} />
                </ScrollView>

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

    subtitle:{
        fontSize: size17,
        color: '#121111',
        paddingBottom:20
    },

    accountInform:{
        paddingLeft:25,
        paddingRight:25,
        paddingTop:40
    },

    IDPW:{
        paddingLeft:25,
        paddingRight:25,
        paddingTop:40
    },
    PhoneEmail:{
        paddingLeft:25,
        paddingRight:25,
        paddingTop:40

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
        paddingLeft:20
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
        fontSize:size12,
        color:'#FF6E43'
    },
    errText:{
        fontSize:size12,
        color:'#767171'
    },

    phoneFirstBox:{
        width:80,
        height: 42,
        paddingLeft:10,

        borderRadius:15,
        borderWidth:1,
        borderColor:'#ddd',
        flexDirection:'row'
    },
    phoneFirstTextContainer:{
        flex:1,
        justifyContent:'center'
    },
    phoneFirstText:{
        textAlign:'center'
    },
    phoneFirstButton:{
        width:20,
        height:'100%',
        backgroundColor:'#ccc',
        borderTopRightRadius:15,
        borderBottomRightRadius:15,
        borderWidth:1,
        borderColor:'#ddd'
    },
    phoneFirstButtonImage:{

    },
    phoneinputBox:{
        flex:1,
        height: 42,
        marginLeft:10,
        paddingLeft:20,
        borderRadius:15,
        borderWidth:1,
        borderColor:'#ddd'
    },
    pickerContainer:{
        position:'absolute',
        left:20,
        top:60,
        width:70,
        height:200,
        backgroundColor:'#fff',
        borderWidth:1,
        borderRadius:10,
        borderColor:'#000'
    },


    enterButtonContainer:{
        height: 80,
        width:'100%',
        alignItems:'center'
    },
    enterButton:{
        width:80,
        height:80,
        backgroundColor:'#0f0'
    },

    bottomPadding:{
        height:300,
        width:'100%'
    }

})


class PhoneFirstPicker extends Component {
    render(){
        const {phoneFirst, handleChange, isOpen, handleClose} = this.props
        return (
            <View style={[pickerStyle.container,{display: isOpen?'flex':'none'}]}>
                <View style={pickerStyle.headerContainer}>
                    <TouchableOpacity style={pickerStyle.doneButton}
                        onPress={handleClose} >
                        <Text style={pickerStyle.doneText}>
                            Done
                        </Text>
                    </TouchableOpacity>
                </View>
                <Picker style={{width:50, height:250}}
                    selectedValue={phoneFirst}
                    onValueChange={text=>handleChange('phoneFirst',text)} >
                        <Picker.Item label="082" value="082" />
                        <Picker.Item label="002" value="002" />
                        <Picker.Item label="003" value="003" />
                        <Picker.Item label="004" value="004" />
                        <Picker.Item label="005" value="005" />
                        <Picker.Item label="006" value="006" />
                </Picker>

            </View>
        )
    }
}
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
        fontSize:size14
    }
})