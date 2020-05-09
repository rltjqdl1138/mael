import React, {Component} from 'react'
import { View, Text, TouchableOpacity, TouchableHighlight, StyleSheet, Image, ScrollView, Dimensions } from 'react-native'
import networkHandler from '../networkHandler'

import { PaymentInput, PaymentItem } from '../components/PaymentInfo'
import SimpleHeader from '../components/SimpleHeader'
const {height} = Dimensions.get('window')


export default class PlanPage2 extends Component {
    constructor(props){
        super(props)
        const plan = props.config && props.config.plan ? props.config.plan : null
        this.state = {
            notice:'',
            plan,
            underNotice:'',
            isKeyboardOpen:false,
            code:'',
            card:{ID:0, num:'', expire:'', cvc:'', password:'', birth:'', isRegistered:false},
            isLoaded:false
        }
    }
    /*
    getCreditInfo = async()=>{
        const result = await networkHandler.account.getCreditInfo(this.props.token)
        this.setState(state=>({
            ...state,
            isLoaded:true,
            list: result.payment
        }))
    }
    */
    handleChange = (field, text) => 
        this.setState({
            [field]: text
        });
    handleComplete = async ()=>{
        alert('complete')
    }
    handleClear = ()=>
        this.setState(state=>({
            ...state,
            card:{ID:0, num:'', expire:'', cvc:'', password:'', birth:'', isRegistered:false},
        }))
    
    handleSelect = async (payload)=>{
        if(!payload)
            return;
        const {cardNumber, expire, ID} = payload
        this.setState(state=>({
            ...state,
            card:{ID, num:cardNumber, expire, cvc:'', password:'', birth:'', isRegistered:true}
        }))
        this.props.navigator.pop('PaymentPage')
    }
    handleConfirm = async ()=>{
        const {card} = this.state

        switch(true){
            case card.isRegistered:
                break;
            case !card.num:
            case card.num.length === 0:
                return this.handleChange('notice', '카드 번호를 입력해주세요.')
            case card.num.length !== 16:
                return this.handleChange('notice', '카드 번호가 올바르지 않습니다.')

            case !card.expire:
            case card.expire.length === 0:
                return this.handleChange('notice', '카드 유효기간을 입력해주세요')
            case card.expire.length !== 4:
                return this.handleChange('notice', '카드 유효기간이 올바르지 않습니다.')
            
            case !card.cvc:
            case card.cvc.length === 0:
                return this.handleChange('notice', 'cvc번호를 입력해주세요')
            case card.cvc.length !== 3:
                return this.handleChange('notice', 'cvc번호가 올바르지 않습니다.')
    
            case !card.birth:
            case card.birth.length === 0:
                return this.handleChange('notice', '생년월일을 입력해주세요')
            case card.birth.length !== 6:
                return this.handleChange('notice', '생년월일이 올바르지 않습니다.')
    
            case !card.password:
            case card.password.length === 0:
                return this.handleChange('notice', '비밀번호 앞 두자리를 입력해주세요')
            case card.password.length !== 2:
                return this.handleChange('notice', '비밀번호 앞 두자리가 올바르지 않습니다')
        }
        this.handleChange('isLoaded', false)

        const cardNumber =
            card.num.slice(0,4) + '-' +
            card.num.slice(4,8) + '-' +
            card.num.slice(8,12) + '-' +
            card.num.slice(12,16)

        const payload = {
            cardNumber,
            cvc: card.cvc,
            expireDate: card.expire,
            birth: card.birth,
            password: card.password
        }
        console.warn(this.state.plan)
        return;
        const response = await networkHandler.account.registerCredit(this.props.token, payload)
        return response.success ? this.handleChange('notice', '올바르지 않은 카드 정보입니다.') :
            this.setState(state=>({
                ...state,
                notice:'',
                isLoaded:true
            }))
    }
    render(){
        const {navigator} = this.props
        const { handleChange, handleConfirm, handleComplete, handleSelect, handleClear } = this
        const { notice, underNotice, plan, card } = this.state
        return(
            <View style={styles.container}>
                <SimpleHeader
                    title="결제 정보 등록"
                    handler={()=>{navigator.pop('PlanPage2')}}
                    notice={notice}
                    handleComplete={handleConfirm}/>

                <ScrollView contentContainerStyle={styles.mainContainer}
                    keyboardShouldPersistTaps='handled'
                    onScrollBeginDrag={()=>handleChange('isModalOpen',false)}
                    scrollEnabled={false}>

                    <PaymentInput
                        handleChange={handleChange}
                        handleConfirm={handleConfirm}
                        handleSelect={handleSelect}
                        handleClear={handleClear}
                        navigator={navigator}
                        notice={underNotice}
                        type={plan.type}
                        card={card} />
                
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#fff',
    },

    mainContainer:{
        width:'100%',
        flex:1,
    },
    upperContainer:{
        width:'100%',
        height: 150,
        paddingLeft:25,
        paddingRight:25
    },
    underContainer:{
        width:'100%',
        flex:1,
        justifyContent:'center'
    },
    titleContainer:{
        height:30,
        width:'100%'
    },
    titleText:{
        fontSize:17,
        color:'#121111'
    },
    noticeContainer:{
        height:60,
        width:'100%'
    },
    noticeText:{
        flex:1,
        fontSize:13,
        color:'#767171'
    },
    selectContainer:{
        alignSelf:'center',
        height:42,
        width:'100%',
        borderWidth:1,
        borderColor:'#DEDDDD',
        borderRadius:12,
        flexDirection:'row',
        alignItems:'center'
    },
    selectText:{
        textAlignVertical:'center',
        flex:1,
        paddingLeft:12,
        fontSize:15,
        color:'#121111'
    },
    selectButton:{
        width:29,
        height:'100%',
        alignSelf:'flex-end',
        backgroundColor:'#E2DFDF',
        borderBottomRightRadius:11,
        borderTopRightRadius:11
    },
    selectButtonImage:{
        width:'100%',
        height:'100%',
        resizeMode:'contain'    
    },
    //103 + 30 + 60 + 42
    selectBoxContainer:{
        alignSelf:'center',
        width:'100%',
        position:'absolute',
        top:235,
        paddingLeft:25,
        paddingRight:25
    },
    selectBox:{
        width:'100%',
        height:'100%',
        backgroundColor:'#fff',
        borderWidth:1,
        borderColor:'#DEDDDD',
        borderRadius:12,
        paddingLeft:12,
        paddingRight:12
    },

    
    addButtonContainer:{
        height:40,
        width:'100%',
        alignItems:'flex-end',
        backgroundColor:'#fff'
    },
    addButton:{
        width:60,
        marginRight:20,
        height:'100%',
        justifyContent:'center',
    },
    addButtonText:{
        color:'blue',
        textAlign:'center'
    }

})

