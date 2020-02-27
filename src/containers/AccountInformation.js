import React, {Component} from 'react'
import { StyleSheet, View, Text, TouchableOpacity }from 'react-native'
import navigator from '../store/modules/navigator'

export default class AccountInformationContainer extends Component{
    constructor(props){
        super(props)
        this.state = {
            ID:'',
            date:'',
            planType:''
        }
    }
    getInformation = ()=>{
        const {state} = this
        this.setState({
            ...state,
            ID:'kkk1138',
            date:'2020.04.30',
            planType:'Promo Code'
        })
    }
    render(){
        const {navigator} = this.props
        const {ID, date, planType} = this.state
        return(   
            <View style={styles.container}>
                <TouchableOpacity onPress={this.getInformation} style={{margin:10,padding:10,backgroundColor:'#bbb'}}>
                    <Text>새로고침(for Test)</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>{navigator.pop('AccountInformationContainer')}} style={{margin:10,padding:10,backgroundColor:'#bbb'}}>
                    <Text>back(for Test)</Text>
                </TouchableOpacity>
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
                    <Text style={styles.noticeText}>
                        플랜 옵션 변경하기를 눌러 진행해주세요.
                    </Text>
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