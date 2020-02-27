import React, {Component} from 'react'
import {View, StyleSheet, Text, TextInput, TouchableOpacity, Button} from 'react-native'

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
    
    render(){
        const {handleChange} = this
        const {navigator} = this.props
        const {handleLogin} = this.props.config

        return(
            <View style={styles.container}>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>
                        Sign up
                    </Text>
                </View>
                <View style={styles.accountInform}>
                    <Text style={styles.subtitle}>회원 정보</Text>
                    <View style={styles.inputBoxContainer} >
                        <TextInput style={styles.inputBox}
                            placeholder="ID"
                            placeholderTextColor='#888'
                            onChangeText={text=>handleChange('firstName',text)}
                        />
                    </View>
                    <View style={styles.inputBoxContainer} >
                        <TextInput style={styles.inputBox}
                            placeholder="비밀번호"
                            placeholderTextColor='#888'
                            secureTextEntry={true}
                            onChangeText={text=>handleChange('lastName',text)}
                        />
                    </View>
                    <View style={{flexDirection:'row', alignItems:'center'}}>
                        <TouchableOpacity
                            style={{width:20,height:20,borderWidth:1,justifyContent:'center',alignItems:'center',margin:10}}
                            value={this.state.checked}
                            onPress={() => this.setState({ checked: !this.state.checked })}>
                                {this.state.checked?(<View style={{width:12, height:12, backgroundColor:'#0f0'}}/>):<View />}
                        </TouchableOpacity>
                        <Text>로그인 유지</Text>
                    </View>
                </View>


                <View style={styles.enterButtonContainer}>
                    <View style={styles.enterButton}>

                    <Button
                        title="Enter"
                        onPress={()=>{
                            handleLogin()
                            navigator.pop()
                        }}/> 
                    </View>
                </View>

                <View>
                    <Button
                        title="ID찾기"
                        onPress={()=>{
                            navigator.push('FindIDContainer',{})
                        }}
                    />
                </View>
                <View style={styles.bottomPadding}/>
            </View>
        )
    }
}

const styles=StyleSheet.create({
    container:{
        width:'100%',
        height:'100%',
        backgroundColor: '#fff',
        padding:40
    },
    titleContainer:{
        height: 30
    },
    title:{
        fontSize: 20,
        fontWeight: 'bold'
    },
    subtitle:{
        fontSize: 14,
        padding: 10
    },


    accountInform:{
        padding:20,
        borderColor:'#000'
    },

    IDPW:{
        padding:20,
    },
    PhoneEmail:{
        padding:20,

    },
    
    inputBoxContainer:{
        width:250,
        flexDirection:'row',
        borderRadius:15,
        borderWidth:1,
        borderColor:'#ddd',
        margin:5
    },
    inputBox:{
        width: 250,
        height: 40,
        padding:10
    },

    IDinputBoxContainer:{
        width:200,
        flexDirection:'row',
        borderRadius:15,
        borderWidth:1,
        borderColor:'#ddd',
        margin:5
    },
    IDinputBox:{
        width: 200,
        height: 40,
        padding:10
    },
    phoneFirstBox:{
        width:70,
        height: 40,
        paddingTop:10,
        paddingBottom:10,
        paddingLeft:10
    },
    phoneinputBox:{
        width: 180,
        height: 40,
        paddingTop:10,
        paddingBottom:10
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