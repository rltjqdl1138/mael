import React, {Component} from 'react'
import { StyleSheet, View, Text, TouchableOpacity }from 'react-native'


import SimpleHeader from '../components/SimpleHeader'

export default class AccountInformationContainer extends Component{
    constructor(props){
        super(props)
        this.state = {
            ID:'',
            date:'',
            planType:'',
            isLoaded:false
        }
    }
    componentDidMount(){
        fetch('http://192.168.0.23:3000/api/account/account',{
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
                    ID: data.id,
                    date: data.date,
                    planType:data.stateID,
                    isLoaded:true
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
        const {ID, date, planType, isLoaded} = this.state
        return(   
            <View style={styles.container}>
                <SimpleHeader 
                    title="계정 정보"
                    handler={()=>{navigator.pop('AccountInfoPage')}}
                    notice={this.getNotice()}
                />

                <View style={[styles.mainContainer,{opacity:isLoaded?1:0.5}]}>
                    <View style={styles.informContainer}>
                        <View style={styles.informTypeContainer}>
                            <Text style={styles.informTypeText}>
                                아이디
                            </Text>
                        </View>
                        <View style={styles.informValueContainer}>
                            <Text style={styles.informValueText}>
                                {ID}
                            </Text>
                        </View>
                    </View>

                    <View style={styles.informContainer}>
                        <View style={styles.informTypeContainer}>
                            <Text style={styles.informTypeText}>
                                가입일
                            </Text>
                        </View>
                        <View style={styles.informValueContainer}>
                            <Text style={styles.informValueText}>
                                {date}
                            </Text>
                        </View>
                    </View>

                    <View style={styles.informContainer}>
                        <View style={styles.informTypeContainer}>
                            <Text style={styles.informTypeText}>
                                플랜타입
                            </Text>
                        </View>
                        <View style={styles.informValueContainer}>
                            <Text style={styles.informValueText}>
                                {planType}
                            </Text>
                        </View>
                    </View>

                    <View style={styles.noticeContainer}>
                        <Text style={styles.noticeText}>
                            계정 정보는 ID정보 이외에 외부에 공개 되지 않습니다.
                        </Text>
                        <Text style={styles.noticeText}>
                            플랜 옵션을 변경하고 싶으신가요?
                        </Text>
                        <View style={{flexDirection:'row'}}>
                            <TouchableOpacity onPress={()=>{this.props.navigator.push('PlanPage')}}>
                                <Text style={[styles.noticeText,{color:'#FF6E43', marginRight:-5}]}>플랜 옵션 변경하기</Text>
                            </TouchableOpacity>
                            <Text style={styles.noticeText}>를 눌러 진행해주세요.</Text>

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