import React, {Component} from 'react'
import { View, Text, TouchableOpacity, TextInput, StyleSheet, Image, ScrollView } from 'react-native'

import SimpleHeader from '../components/SimpleHeader'

const sub = {
    id:0,
    type:0,
    info:'정기구독(subscription) | 10,000원 / mo'
}
const promo = {
    id:1,
    type:1,
    info:'프로모션 (Promo Code) | Free trial 2 month'
}

export default class PlanPage extends Component {
    constructor(props){
        super(props)
        this.state = {
            notice:'정보를 받아오고 있습니다.',
            plans:[],
            isOpen:false,
            index:0,
            code:'',
            card:{num:'', date:'', cvc:''},
            isLoaded:false
        }
        this.codeLength = 0
    }
    componentDidMount(){
        const notice = '모든 플랜 옵션은 변경 시, 익월 부터 적용됩니다. 정기 구독의 경우 언제든 취소가 가능합니다.'
        const plans = [sub, promo]
        setTimeout(()=>{
            this.setState(state=>({
                ...state,
                notice,
                plans
            }))
        },2000)
    }
    handleChange = (field, text) => {
        this.setState({
            [field]: text
        });
    }
    getNotice = ()=>{
        return ''
    }
    render(){
        const {navigator} = this.props
        const {handleChange, getNotice, getID} = this
        const {notice, isOpen, plans, index, isLoaded} = this.state
        const items = plans.map((item,ind)=>(
                <TouchableOpacity style={{width:'100%',height:50, justifyContent:'center'}}
                    onPress={()=>{this.setState(state=>({...state, isOpen:false, index:ind}))}}
                    Key={item.key}>
                    <Text style={{fontSize:13,color:index===ind?'#FF6E43':'#121111'  }}>{item.info}</Text>
                </TouchableOpacity>
            ))
        return(
            <View style={styles.container}>
                <SimpleHeader 
                    title="플랜 변경"
                    handler={()=>{navigator.pop('PlanPage')}}
                    notice=''/>
                <ScrollView contentContainerStyle={styles.mainContainer}
                    keyboardShouldPersistTaps='handled'
                    onScrollBeginDrag={()=>handleChange('isOpen',false)}
                    scrollEnabled={false}>
                    <View style={styles.upperContainer}>
                        <View style={styles.titleContainer}>
                            <Text style={styles.titleText}>
                                플랜 옵션    
                            </Text>
                        </View>
                        <View style={styles.noticeContainer}>
                            <Text style={styles.noticeText}>
                                {notice}
                            </Text>
                        </View>
                        <TouchableOpacity style={styles.selectContainer}
                            onPress={()=>{handleChange('isOpen',!isOpen)}}>
                                <Text style={styles.selectText}>
                                    { (plans[index] && plans[index].info)?plans[index].info:''}
                                </Text>
                            <View style={styles.selectButton}>
                                <Image style={styles.selectButtonImage}
                                    source={require('../icon/lyric.png')} />
                            </View>
                        </TouchableOpacity>

                        <CreditInfo type={plans[index]?plans[index].type : undefined}
                            handleChange={handleChange}
                            code={this.state.code}
                            card={this.state.card} />
                    </View>
                    <View style={[styles.underContainer,{borderWidth:2,borderColor:'blue'}]}>

                        <View style={{height:100, backgroundColor:'red'}}/>

                    </View>
                    <View style={{flex:1, alignItems:'center', display:'none'}}>
                        <TouchableOpacity style={{width:100, height:50, borderWidth:1}}
                            onPress={()=>{this.setState((state)=>({...state, index: 1-state.index}))}}>
                            <Text style={{textAlign:'center'}}>Test</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
                
                <View style={[styles.selectBoxContainer,{display:isOpen?'flex':'none', height:plans.length*50}]}>
                    <View style={styles.selectBox}>
                        {items}
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#fff'
    },

    mainContainer:{
        width:'100%',
        flex:1,
        paddingLeft:25,
        paddingRight:25
    },
    upperContainer:{
        width:'100%',
        height:'60%'
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
    selectBoxContainer:{
        alignSelf:'center',
        width:'100%',
        position:'absolute',
        top:215,
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
    }
})


class CreditInfo extends Component {
    getTitle(type){
        switch(type){
            case 0:
                return (
                    <View style={infoStyle.titleContainer}>
                        <Text style={infoStyle.titleText}>결제 정보</Text>
                    </View>
                )
            case 1:
                return (
                    <View style={infoStyle.titleContainer}>
                        <Text style={infoStyle.titleText}>Promo Code</Text>
                        <View style={infoStyle.titleInfoContainer}>
                            <Image style={infoStyle.titleInfoImage}
                                source={require('../icon/info.png')}/>
                            <Text style={infoStyle.titleInfoText}>
                                제품 구입시 블랙카드에 담긴 고유번호 입니다.
                            </Text>
                        </View>
                    </View>
                )
            default:
                return( <View /> )
        }
    }
    getInput(type){
        switch(type){
            case 0:
                return this.getCreditInput()
            case 1:
                return this.getCodeInput()
            default:
                return( <View /> )
        }
    }
    getCodeInput(){
        return(
            <View style={infoStyle.inputContainer}>
                <TextInput style={[infoStyle.inputBox,{color:'#121111'}]}
                    placeholder="Promotion code"
                    placeholderTextColor='#888'
                    onChangeText={text=>this.props.handleChange('code',text)} />
            </View>
        )
    }
    toStar(str){
        var result=''
        for(var i=0; i<str.length; i++) result+='*'
        return result
    }
    getCreditInput(){
        const card = this.props.card
        return(
            <View style={infoStyle.container}>
                <View style={infoStyle.upperContainer}>
                    <View style={infoStyle.subTitleContainer}>
                        <Text style={infoStyle.subTitleText}>Card Number</Text>
                    </View>
                    <View style={infoStyle.inputContainer}>
                        <View style={infoStyle.cardNumberMask} >
                            <Text style={infoStyle.cardNumberMaskText}>{this.props.card.num.slice(0,4)}</Text>
                            <Text style={infoStyle.cardNumberMaskPadding}>-</Text>
                            <Text style={infoStyle.cardNumberMaskText}>{this.props.card.num.slice(4,8)}</Text>
                            <Text style={infoStyle.cardNumberMaskPadding}>-</Text>
                            <Text style={infoStyle.cardNumberMaskText}>{this.toStar(this.props.card.num.slice(8,12))}</Text>
                            <Text style={infoStyle.cardNumberMaskPadding}>-</Text>
                            <Text style={infoStyle.cardNumberMaskText}>{this.toStar(this.props.card.num.slice(12,16))}</Text>

                        </View>
                        <TextInput style={[infoStyle.inputBox,{ fontSize:1, }]}
                            onChangeText={text=>this.props.handleChange('card',{...card, num:text})}
                            keyboardType='phone-pad'
                            maxLength={16}
                            caretHidden={true}
                            clearTextOnFocus={true}
                            onFocus={()=>{this.props.handleChange('card',{...card, num:''})}}/>
                        
                    </View>
                </View>
                <View style={infoStyle.underContainer}>
                    <View style={infoStyle.container}>
                        <View style={infoStyle.subTitleContainer}>
                            <Text style={infoStyle.subTitleText}>유효기간</Text>
                        </View>
                        <View style={infoStyle.inputContainer}>

                            <View style={infoStyle.cardNumberMask} >
                                <Text style={infoStyle.cardNumberMaskText}>
                                    {card.date.length > 0 ? card.date.slice(0,2) : 'MM'}
                                </Text>
                                <Text style={infoStyle.cardNumberMaskPadding}>/</Text>
                                <Text style={infoStyle.cardNumberMaskText}>
                                    {card.date.length > 2 ? card.date.slice(2,4) : 'YY'}
                                </Text>
                            </View>
                            <TextInput style={[infoStyle.inputBox,{ fontSize:1, }]}
                                onChangeText={text=>this.props.handleChange('card',{...card, date:text})}
                                keyboardType='phone-pad'
                                maxLength={4}
                                caretHidden={true}
                                clearTextOnFocus={true}
                                onFocus={()=>{this.props.handleChange('card',{...card, date:''})}}/>
                            

                        </View>
                    </View>
                    <View style={infoStyle.insidePadding}/>
                    <View style={infoStyle.container}>
                        <View style={infoStyle.subTitleContainer}>
                            <Text style={infoStyle.subTitleText}>CVC</Text>
                        </View>
                        <View style={infoStyle.inputContainer}>
                            <TextInput style={[infoStyle.inputBox,{textAlign:'center',color:'#121111'}]}
                                value={card.cvc}
                                onChangeText={text=>this.props.handleChange('card',{...card, cvc:text})}
                                keyboardType='phone-pad'
                                maxLength={3}
                                caretHidden={true}
                                clearTextOnFocus={true}
                                autoCompleteType='password'
                                onFocus={()=>{this.props.handleChange('card',{...card, cvc:''})}}/>
                        </View>
                    </View>
                </View>
            </View>
        )
    }
    render(){
        const {type} = this.props
        return(
            <View style={styles.container}>
                {this.getTitle(type)}
                {this.getInput(type)}
            </View>
        )
    }

}

const infoStyle = StyleSheet.create({
    container:{
        flex:1
    },
    titleContainer:{
        height:60,
        width:'100%',
        flexDirection:'row',
        alignItems:'center',
    },
    titleText:{
        fontSize:17,
        color:'#121111'
    },
    titleInfoContainer:{
        flex:1,
        height:'100%',
        flexDirection:'row',
        alignItems:'center'
    },
    titleInfoImage:{
        height:35,
        width:35,
        resizeMode:'contain'
    },
    titleInfoText:{
        fontSize:10,
        color:'#767171'
    },

    inputContainer:{
        alignSelf:'center',
        height:42,
        width:'100%',
        borderWidth:1,
        borderColor:'#DEDDDD',
        borderRadius:12,
        alignItems:'center'
    },
    inputBox:{
        width:'100%',
        height:'100%',
        paddingLeft:12,
        paddingRight:12,
        color:'#fff'
    },
    cardNumberMask:{
        alignSelf:'center',
        position:'absolute',
        width:'100%',
        height:'100%',
        flexDirection:'row',
        alignItems:'center',
        paddingLeft:30,
        paddingRight:30
    },
    cardNumberMaskText:{
        flex:1,
        fontSize:13,
        color:'#121111',
        textAlign:'center'
    },
    cardNumberMaskPadding:{
        flex:1,
        fontSize:13,
        color:'#121111',
        textAlign:'center'
    },

    subTitleContainer:{
        height:20,
        width:'100%'
    },
    subTitleText:{
        fontSize:13,
        color:'#121111'
    },
    upperContainer:{
        width:'100%',
        height:80
    },
    underContainer:{
        width:'100%',
        height:80,
        flexDirection:'row'
    },
    insidePadding:{
        width:30
    }
})