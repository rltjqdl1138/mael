import React, {Component} from 'react'
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native'

export default class FindPasswordContainer extends Component {
    constructor(props){
        super(props)
        this.state = {
            ID:'',
            email:'',
            ifCorrect:false
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
    getText = ()=>{
        if(this.state.ifCorrect)
            return '인증메일이 발송되었습니다.'
        else
            return ''
    }
    getRequest = ()=>{
        const {state} = this
        const {ifCorrect} = this.state
        this.setState({
            ...state,
            ifCorrect: !ifCorrect
        })
    }
    render(){
        const {navigator} = this.props
        const {handleChange, getNotice, getRequest} = this
        return(
            <View style={styles.container}>
                <View style={styles.noticeContainer}>
                    <Text style={styles.noticeText}>
                        { getNotice() }
                    </Text>
                </View>
                <View style={styles.titleContainer}>
                    <Text style={styles.titleText}>
                        비밀번호 찾기
                    </Text>
                </View>
                <View style={styles.informationContainer}>
                    <View style={styles.inputBoxContainer}>
                        <TextInput style={styles.inputBox}
                            placeholder="ID"
                            placeholderTextColor='#888'
                            onChangeText={text=>handleChange('ID',text)}
                        />
                    </View>

                    <View style={[styles.inputBoxContainer,{flexDirection:'row'}]}>
                        <TextInput style={styles.inputBox}
                            placeholder="email"
                            placeholderTextColor='#888'
                            onChangeText={text=>handleChange('email',text)}
                        />
                        <TouchableOpacity style={styles.requestContainer}
                            onPress={getRequest}>
                            <Text style={styles.requestText}>
                                인증요청
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.confirmContainer}>
                        <Text style={styles.confirmText}>
                            {this.getText()}
                        </Text>
                    </View>
                    <TouchableOpacity style={escape.a}
                        onPress={()=>{navigator.pop('FindPasswordContainer')}} />
                </View>
            </View>
        )
    }
}
const escape = StyleSheet.create({
    a:{
        width:70,
        height:30,
        backgroundColor:'#666'
    }
})

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
        width: '70%',
        height: 40,
        padding:10
    },
    requestContainer:{
        backgroundColor:'#880',
        justifyContent:'center',
        marginLeft:20,
        padding:10
    },
    requestText:{
        color:'#fff'
    },

    confirmContainer:{
        padding:20,
        paddingLeft:60,
        width:'100%'
    },
    confirmText:{
        width:'100%',
        textAlign:'left',
        color:'#00f'
    }

})