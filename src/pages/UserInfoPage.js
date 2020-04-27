import React, {Component} from 'react'
import { StyleSheet, View, Text, TouchableOpacity }from 'react-native'


import SimpleHeader from '../components/SimpleHeader'

export default class UserInformationPage extends Component{
    constructor(props){
        super(props)
        this.state = {
            name:'',
            email:'',
            phone:'',
            isLoaded:false
        }
    }
    componentDidMount(){
        fetch('http://192.168.0.23:3000/api/account/user',{
                headers:{
                    'x-access-token':this.props.token,
                    'Content-Type': 'application/json' 
                }
            })
            .then((response) => response.json())
            .then((data) => {
                if(!data.success)
                    throw Error('error')
                this.setState(state=>({
                    ...state,
                    name: data.name,
                    email: data.email,
                    phone: data.mobile,
                    isLoaded: true
                }))
            })
            .catch((error) => {

            });

    }
    getNotice = ()=>{
        return ''
    }
    render(){
        const {navigator} = this.props
        const {name, email, phone, isLoaded} = this.state
        return(   
            <View style={styles.container}>
                <SimpleHeader 
                    title="개인 정보"
                    handler={()=>{navigator.pop('UserInfoPage')}}
                    notice={this.getNotice()}/>

                <View style={[styles.mainContainer,{opacity:isLoaded?1:0.5}]}>
                    <View style={styles.informContainer}>
                        <View style={styles.informTypeContainer}>
                            <Text style={styles.informTypeText}>
                                성명
                            </Text>
                        </View>
                        <View style={styles.informValueContainer}>
                            <Text style={styles.informValueText}>
                                {name}
                            </Text>
                        </View>
                    </View>

                    <View style={styles.informContainer}>
                        <View style={styles.informTypeContainer}>
                            <Text style={styles.informTypeText}>
                                이메일
                            </Text>
                        </View>
                        <View style={styles.informValueContainer}>
                            <TouchableOpacity style={{flex:1, justifyContent:'center'}}
                                onPress={()=>{this.props.navigator.push('ChangeEmailPage',
                                    {email,handler:(email)=>
                                        this.setState((state)=>({...state, email}))})}}>
                                <Text style={styles.informValueText}>{email}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={styles.informContainer}>
                        <View style={styles.informTypeContainer}>
                            <Text style={styles.informTypeText}>
                                전화번호
                            </Text>
                        </View>
                        <View style={styles.informValueContainer}>

                        <TouchableOpacity style={{flex:1, justifyContent:'center'}}
                                    onPress={()=>{this.props.navigator.push('ChangePhonePage',
                                        {phone,handler:(phone)=>
                                            this.setState((state)=>({...state, phone}))})}}>
                                    <Text style={styles.informValueText}>{phone}</Text>
                                </TouchableOpacity>
                            
                        </View>
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
        backgroundColor:'#fff',
        alignItems:'center',
    },
    mainContainer:{
        width:'100%',
        flex:1,
        alignItems:'center'
    },
    informContainer:{
        width:'80%',
        height:'7%',
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center'
    },
    informTypeContainer:{
        flex:1,
        height:'100%',
        justifyContent:'center'
    },
    informTypeText:{
        fontSize:16,
        color:'#000'
    },
    informValueContainer:{
        flex:2,
        height:'70%',
        justifyContent:'center',
        borderBottomColor:'#ccc',
        borderBottomWidth:1,
    },
    informValueText:{
        fontSize:16
    },
    noticeContainer:{
        width:'80%',
        paddingTop:30
    },
    noticeText:{
        padding:5
    }
})