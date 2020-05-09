import React, {Component} from 'react'
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, Image, TouchableHighlight, Dimensions, Keyboard, KeyboardEvent }from 'react-native'
import networkHandler from '../networkHandler'

import {PaymentInput, PaymentItem} from '../components/PaymentInfo'
import SimpleHeader from '../components/SimpleHeader'

export default class PaymentPage extends Component{
    constructor(props){
        super(props)
        this.state = {
            list:[],
            isLoaded:false,
            notice:''
        }
    }
    handleChange = (field, text) => {
        this.setState({
            [field]: text
        });
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
    render(){
        const {navigator, config} = this.props
        const {list, isLoaded} = this.state
        const handleSelect = config && config.handleSelect ? config.handleSelect : null
        const paymentItems = list.map((item, index)=>{
            const {ID, cardNumber, expireDate, isVerified, isSignitured} = item
            
            return (
                <PaymentItem
                    key={String(ID)}
                    ID={ID}
                    cardNumber={cardNumber}
                    expire={expireDate}
                    verified={isVerified}
                    signiture={isSignitured}
                    handleSelect={handleSelect}/>
                )
        })
        return(   
            <View style={styles.container}>
                <SimpleHeader 
                    title="결제 정보"
                    disableNotice={true}
                    handler={()=>{navigator.pop('PaymentPage')}}
                    notice=''/>
                <View style={[styles.mainContainer,{opacity:isLoaded?1:0.5}]}>
                    {paymentItems}
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
    },
    mainContainer:{
        flex:1
    }
    
})


