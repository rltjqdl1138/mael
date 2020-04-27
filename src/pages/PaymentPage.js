import React, {Component} from 'react'
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, Image, TouchableHighlight, Dimensions, Keyboard, KeyboardEvent }from 'react-native'
import networkHandler from '../networkHandler'

import PaymentInfo from '../components/PaymentInfo'
import SimpleHeader from '../components/SimpleHeader'

export default class PaymentPage extends Component{
    constructor(props){
        super(props)
        this.state = {
            list:[],
            height: Dimensions.get('window').height,
            isLoaded:false,
            isOpen:false,
            isKeyboardOpen:false,
            card:{
                num:'',
                expire:'',
                cvc:'',
                date:'',
                birth:'',
                password:''
            },
            notice:''
        }
    }
    handleChange = (field, text) => {
        this.setState({
            [field]: text
        });
    }
    handleConfirm = async ()=>{
        const {card} = this.state
        console.warn(card)
        if(!card.num || card.num.length !== 16)
            return this.handleChange('notice', '카드 번호가 올바르지 않습니다.')
        
        else if(!card.cvc || card.cvc.length !== 3)
            return this.handleChange('notice', 'cvc번호가 올바르지 않습니다.')
        
        else if(!card.expire || card.expire.length !== 4)
            return this.handleChange('notice', '카드 유효기간이 올바르지 않습니다.')
        
        else if(!card.birth || card.birth.length !== 6)
            return this.handleChange('notice', '생년월일이 올바르지 않습니다.')
        
        else if(!card.password || card.password.length !== 2)
            return this.handleChange('notice', '비밀번호 앞자리가 올바르지 않습니다')
        this.setState(state=>({
            ...state,
            isLoaded:false
                
        }))
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
        const result = await networkHandler.account.registerCredit(this.props.token, payload)
        if(!result || !result.success)
            this.handleChange('notice', '올바르지 않은 정보입니다.')
        this.setState(state=>({
            ...state,
            isLoaded:true
            
        }))

    }
    getCreditInfo = async()=>{
        const result = await networkHandler.account.getCreditInfo(this.props.token)
        this.setState(state=>({
            ...state,
            isLoaded:true,
            list: result.payment
        }))

    }
    componentDidMount(){
        this.getCreditInfo()
    }
    getNotice = ()=>{
        return ''
    }
    render(){
        const {navigator} = this.props
        const {list, isLoaded, isOpen} = this.state
        const paymentItems = list.map((item, index)=>{
            const {ID, cardNumber, expireDate, isVerified, isSignitured} = item
            
            return (
                <PaymentItem
                    key={String(ID)}
                    cardNumber={cardNumber}
                    expire={expireDate}
                    verified={isVerified}
                    signiture={isSignitured}/>
                )
        })
        const cardHeight = this.state.isOpen ? Math.min((list.length+1) * 120, 240) :  Math.min((list.length) * 120, 600)
        return(   
            <View style={styles.container}>
                <SimpleHeader 
                    title="결제 정보"
                    disableNotice={true}
                    handler={()=>{navigator.pop('PaymentPage')}}
                    notice=''/>
                <ScrollView style={[styles.mainContainer,{opacity:isLoaded?1:0.5}]}
                    scrollEnabled={this.state.isKeyboardOpen}>
                    <View style={[styles.scroll, {height:cardHeight}]}>
                        <ScrollView>
                            {paymentItems}
                        </ScrollView>
                    </View>
                        <View style={styles.addButtonContainer}>
                            <TouchableHighlight style={styles.addButton}
                                activeOpacity={0.6}
                                underlayColor="#fff"
                                onPress={()=>{
                                    this.setState(state=>({
                                        ...state,
                                        isOpen: !state.isOpen
                                    }))
                                }}>
                                <Text style={styles.addButtonText}>{isOpen?'취소':'추가'}</Text>
                            </TouchableHighlight>
                        </View>
                        {isOpen?(
                    <PaymentInfo 
                            handleChange={this.handleChange}
                            handleConfirm={this.handleConfirm}
                            notice={this.state.notice}
                            type={0}
                            card={this.state.card}
                        />):null}
                </ScrollView>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container:{
        width:'100%',
        height:'100%',
        backgroundColor:'#fff',
    },
    mainContainer:{
        flex:1
    },
    scroll:{
        width:'100%'
    },
    inputContainer:{
        height:300,
        width:'100%',
        paddingLeft:20,
        paddingRight:20
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



class PaymentItem extends Component{
    render(){
        const {cardNumber, expire, signiture, verified} = this.props
        
        if(!cardNumber || !expire)
            return null
        
        return(
            <View style={itemStyle.container}>
                <TouchableOpacity style={itemStyle.verifyImageContainer}>
                    <Image style={itemStyle.verifyImage}
                        source={require('../icon/search.png')}
                    />
                </TouchableOpacity>
                <View style={itemStyle.cardImageContainer}>
                    <Image style={itemStyle.cardImage}
                        source={require('../icon/card.png')}
                    />
                </View>
                <View style={itemStyle.InfoContainer}>
                    <View style={itemStyle.cardNumberContainer}>
                        <Text style={itemStyle.cardNumberText}>{cardNumber}</Text>
                    </View>

                    <View style={itemStyle.cardExpireContainer}>
                        <Text style={itemStyle.cardExpireText}>{expire}</Text>
                    </View>
                </View>
                <TouchableOpacity style={itemStyle.deleteImageContainer}>
                    {signiture?null:
                    (<Image style={itemStyle.deleteImage} 
                        source={require('../icon/delete.png')}
                    />)}
                </TouchableOpacity>
            </View>
        )
    }
}
const itemStyle=StyleSheet.create({
    container:{
        width:'100%',
        height:120,
        borderBottomWidth:0.5,
        borderBottomColor:'#DEDDDD',
        borderTopWidth:0.5,
        borderTopColor:'#DEDDDD',
        flexDirection:'row',
        padding:10,
    },
    verifyImageContainer:{
        width:50,
        height:'100%',
        justifyContent:'center',
        alignItems:'center',
        padding:10
    },
    verifyImage:{
        width:'100%',
        height:'50%',
        resizeMode:'contain'
    },
    cardImageContainer:{
        width:60,
        height:'100%',
        justifyContent:'center',
        alignItems:'center'
    },
    cardImage:{
        width:'100%',
        height:'100%',
        resizeMode:'contain'
    },
    InfoContainer:{
        flex:1,
        justifyContent:'center',
        padding:20,
        paddingTop:30
    },
    cardNumberContainer:{
        flex:1
    },
    cardNumberText:{
        fontSize:16
    },
    cardExpireContainer:{
        flex:1
    },
    cardExpireText:{
        fontSize:14
    },

    deleteImageContainer:{
        width:40,
        height:'100%'
    },
    deleteImage:{
        width:'100%',
        height:'100%',
        resizeMode:'contain'
    }
})