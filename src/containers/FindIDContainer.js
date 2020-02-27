import React, {Component} from 'react'
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native'

export default class FindIDContainer extends Component {
    constructor(props){
        super(props)
        this.state = {
            lastName: '',
            firstName: '',
            email: '',
            ifCorrect: false,
            foundID:''
        }
    }
    handleChange = (field, text) => {
        this.setState({
            [field]: text
        });
    }
    getNotice = ()=>{
        if(this.state.ifCorrect)
            return 'ok'
        else
            return '해당 정보와 일치하는 가입정보가 없습니다.'
    }
    getID = ()=>{
        const {state} = this
        const {ifCorrect} = this.state
        this.setState({
            ...state,
            foundID: ifCorrect? '':'kkk1138',
            ifCorrect: !ifCorrect
        })
    }
    render(){
        const {navigator} = this.props
        const {handleChange, getNotice, getID} = this
        return(
            <View style={styles.container}>
                <View style={styles.noticeContainer}>
                    <Text style={styles.noticeText}>
                        { getNotice() }
                    </Text>
                </View>
                <View style={styles.titleContainer}>
                    <Text style={styles.titleText}>
                        ID찾기
                    </Text>
                </View>
                <View style={styles.informationContainer}>
                    <View style={styles.inputBoxContainer}>
                        <TextInput style={styles.inputBox}
                            placeholder="Last name (성)"
                            placeholderTextColor='#888'
                            onChangeText={text=>handleChange('lastName',text)}
                        />
                    </View>

                    <View style={styles.inputBoxContainer}>
                        <TextInput style={styles.inputBox}
                            placeholder="Last name (성)"
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
                            navigator.pop('FindIDContainer') }}>
                        <Text style={styles.loginText}>
                            로그인하기 >
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.findPasswordContainer}
                        onPress={()=>{navigator.push('FindPasswordContainer')}}>
                        <Text style={styles.findPasswordText}>
                            비밀번호 찾기 >
                        </Text>
                    </TouchableOpacity>
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
    noticeContainer:{
        marginTop:40,
        marginBottom:20,
        width:'100%',
        backgroundColor:'#880'
    },
    noticeText:{
        textAlign:'center',
        padding:20,
        color:'white'
    },


    titleContainer:{
        paddingLeft: 40,
        padding:20
    },
    title:{

    },


    informationContainer:{
        alignItems:'center'
    },
    inputBoxContainer:{
        width:'70%',
        flexDirection:'row',
        borderBottomWidth:1,
        borderBottomColor:'#ddd',
        margin:10
    },
    inputBox:{
        width: 250,
        height: 40,
        padding:10
    },
    

    enterContainer:{
        width:'100%',
        justifyContent:'center',
        alignItems:'center',
        padding: 20
    },
    enterBox:{
        backgroundColor:'#000',
        width: 130,
        height: 40,
        borderRadius: 50,
        justifyContent:'center'
    },
    enterText:{
        textAlign:'center',
        fontSize:14,
        color:'#fff'
    },

    foundIDContainer:{
        width:'100%',
        alignItems:'center',
        padding:30
    },
    foundIDText:{
        fontSize:20,
        color:'#f00'
    },
    foundIDNotice:{
        fontSize:16,
        color:'#000'
    },


    linkContainer:{
        padding: 30
    },
    loginContainer:{
        padding: 10
    },
    loginText:{
        fontSize: 16,
        color:'#555'
    },
    findPasswordContainer:{
        padding: 10
    },
    findPasswordText:{
        fontSize: 16,
        color:'#f00'
    }
})