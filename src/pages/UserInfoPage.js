import React, {Component} from 'react'
import { StyleSheet, View, Text, TouchableOpacity }from 'react-native'


import SimpleHeader from '../components/SimpleHeader'
import networkHandler from '../networkHandler'

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
        this.getUserinfo()
    }
    getUserinfo = async ()=>{
        const response = await networkHandler.account.getUserinfo(this.props.token)
        
        return !response.success ? this.props.navigator.pop('UserInfoPage') :
            this.setState({
                name: response.name,
                email: response.email,
                phone: response.mobile,
                isLoaded:true
            })
    }

    render(){
        const {navigator} = this.props
        const {name, email, phone, isLoaded} = this.state
        const _infoList = [
            {key:'성명', value:name, nextPage:null},
            {key:'생년월일', value:email, nextPage:'ChangeEmailPage'},
            {key:'전화번호', value:phone, nextPage:'ChangePhonePage'}
        ]

        const infoList = _infoList.map((item,index) =>
            ( <InfoItem key={String(index)} payload={item} navigator={navigator} isLoaded={isLoaded} /> ))

        return(   
            <View style={styles.container}>
                <SimpleHeader 
                    title="개인 정보"
                    handler={()=>{navigator.pop('UserInfoPage')}}
                    notice={''}/>

                <View style={[styles.mainContainer,{opacity:isLoaded?1:0.5}]}>
                    {infoList}
                </View>
            </View>
        )
    }
}

class InfoItem extends Component{
    render(){
        const {payload, navigator, isLoaded} = this.props
        const {key, value, nextPage} = payload
        return (
            <View style={styles.informContainer}>

                <View style={styles.informTypeContainer}>
                    <Text style={styles.informTypeText}>
                        {key}
                    </Text>
                </View>

                <TouchableOpacity style={styles.informValueContainer}
                    disabled={!nextPage || !isLoaded}
                    onPress={()=>{navigator.push(
                        nextPage, {value, handler:()=>this.getUserinfo()})}}>
                    <Text style={styles.informValueText}>{value}</Text>
                </TouchableOpacity>
                         
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