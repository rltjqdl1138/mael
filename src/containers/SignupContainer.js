import React, {Component} from 'react'
import {View, StyleSheet, Text, TextInput, ScrollView, Button} from 'react-native'

export default class SignupContainer extends Component {
    constructor(props){
        super(props)
        this.state={
            firstName:'',
            lastName:'',
            id:'',
            password:'',
            passwordCheck:'',
            email:'',
            phoneFirst:'',
            phone:''
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
            <ScrollView style={styles.container}>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>
                        Sign up
                    </Text>
                </View>
                <View style={styles.accountInform}>
                    <Text style={styles.subtitle}>회원 정보</Text>
                    <View style={styles.inputBoxContainer} >
                        <TextInput style={styles.inputBox}
                            placeholder="First name (성)"
                            placeholderTextColor='#888'
                            onChangeText={text=>handleChange('firstName',text)}
                        />
                    </View>
                    <View style={styles.inputBoxContainer} >
                        <TextInput style={styles.inputBox}
                            placeholder="Last name (이름)"
                            placeholderTextColor='#888'
                            onChangeText={text=>handleChange('lastName',text)}
                        />
                    </View>
                </View>


                <View style={styles.IDPW}>
                    <Text style={styles.subtitle}>ID / PASSWORD</Text>
                    <View style={styles.IDinputBoxContainer} >
                        <TextInput style={styles.IDinputBox}
                            placeholder="ID"
                            placeholderTextColor='#888'
                            onChangeText={text=>handleChange('id',text)}
                        />
                    </View>
                    <View style={styles.inputBoxContainer}>
                        <TextInput style={styles.inputBox}
                            placeholder="Password"
                            placeholderTextColor='#888'
                            secureTextEntry={true}
                            onChangeText={text=>handleChange('password',text)}
                        />
                    </View>
                    <View style={styles.inputBoxContainer} >
                        <TextInput style={styles.inputBox}
                            placeholder="Password check"
                            placeholderTextColor='#888'
                            secureTextEntry={true}
                            onChangeText={text=>handleChange('passwordCheck',text)}
                        />
                    </View>
                </View>


                <View style={styles.PhoneEmail}>
                    <Text style={styles.subtitle}>Phone / Email</Text>
                    <View style={styles.inputBoxContainer} >
                        <TextInput style={styles.inputBox}
                            placeholder="Email"
                            placeholderTextColor='#888'
                            onChangeText={text=>handleChange('email',text)}
                        />
                    </View>
                    <View style={styles.inputBoxContainer} >
                        <TextInput style={styles.phoneFirstBox}
                            placeholder="082"
                            placeholderTextColor='#888'
                            onChangeText={text=>handleChange('phoneFirst',text)}
                        />
                        <TextInput style={styles.phoneinputBox}
                            placeholder="Phone"
                            placeholderTextColor='#888'
                            onChangeText={text=>handleChange('phone',text)}
                        />
                    </View>
                </View>

                <View style={styles.enterButtonContainer}>
                    <View style={styles.enterButton}>

                    <Button
                        title="Enter"
                        onPress={()=>{navigator.pop()}}
                    /> 
                    </View>
                </View>
                
                <View style={styles.bottomPadding}/>
            </ScrollView>
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