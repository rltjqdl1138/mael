import React, {Component} from 'react'
import { View, Text, TouchableOpacity, TextInput, StyleSheet, Image, Keyboard} from 'react-native'

export default class CreditInfo extends Component {
    constructor(props){
        super(props)
        this.state = {height:350}
    }

    componentDidMount() {
		this._keyboardWillShowSubscription = Keyboard.addListener('keyboardDidShow', (e) => this._keyboardWillShow(e));
		this._keyboardWillHideSubscription = Keyboard.addListener('keyboardDidHide', (e) => this._keyboardWillHide(e));
	}
	componentWillUnmount() {
		this._keyboardWillShowSubscription.remove();
		this._keyboardWillHideSubscription.remove();
	}
	_keyboardWillShow(e) {
        this.setState({height: 350 + e.endCoordinates.height});
        this.props.handleChange('isKeyboardOpen',true)
	}
	_keyboardWillHide(e) {
		this.setState({height: 350});
        this.props.handleChange('isKeyboardOpen',false)
	}

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

                <Text style={{fontSize:12, color:'#FF6E43', textAlign:'left', width:'100%', paddingTop:15}}>코드가 확인되었습니다.</Text>
            </View>
        )
    }
    toStar(str){
        var result=''
        for(var i=0; i<str.length; i++) result+='*'
        return result
    }
    getCreditInput(){
        const {card, handleChange, handleConfirm, notice} = this.props
        return(
            <View style={[infoStyle.wholeContainer,{height:this.state.height}]}>
                <View style={infoStyle.upperContainer}>
                    <View style={infoStyle.subTitleContainer}>
                        <Text style={infoStyle.subTitleText}>Card Number</Text>
                    </View>
                    <View style={infoStyle.inputContainer}>
                        <View style={infoStyle.cardNumberMask} >
                            <Text style={infoStyle.cardNumberMaskText}>{card.num.slice(0,4)}</Text>
                            <Text style={infoStyle.cardNumberMaskPadding}>-</Text>
                            <Text style={infoStyle.cardNumberMaskText}>{card.num.slice(4,8)}</Text>
                            <Text style={infoStyle.cardNumberMaskPadding}>-</Text>
                            <Text style={infoStyle.cardNumberMaskText}>{this.toStar(card.num.slice(8,12))}</Text>
                            <Text style={infoStyle.cardNumberMaskPadding}>-</Text>
                            <Text style={infoStyle.cardNumberMaskText}>{this.toStar(card.num.slice(12,16))}</Text>

                        </View>
                        <TextInput style={[infoStyle.inputBox,{ fontSize:1, }]}
                            onChangeText={text=>handleChange('card',{...card, num:text})}
                            keyboardType='phone-pad'
                            maxLength={16}
                            caretHidden={true}
                            clearTextOnFocus={true}
                            onFocus={()=>{
                                handleChange('card',{...card, num:''})
                            }}/>
                        
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
                                    {card.expire.length > 0 ? card.expire.slice(0,2) : 'MM'}
                                </Text>
                                <Text style={infoStyle.cardNumberMaskPadding}>/</Text>
                                <Text style={infoStyle.cardNumberMaskText}>
                                    {card.expire.length > 2 ? card.expire.slice(2,4) : 'YY'}
                                </Text>
                            </View>
                            <TextInput style={[infoStyle.inputBox,{ fontSize:1, }]}
                                onChangeText={text=>handleChange('card',{...card, expire:text})}
                                keyboardType='phone-pad'
                                maxLength={4}
                                caretHidden={true}
                                clearTextOnFocus={true}
                                onFocus={()=>{
                                    handleChange('card',{...card, expire:''})
                                    handleChange('')
                                }}/>
                            

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
                                onChangeText={text=>handleChange('card',{...card, cvc:text})}
                                keyboardType='phone-pad'
                                maxLength={3}
                                clearTextOnFocus={true}
                                secureTextEntry={true}
                                onFocus={()=>{handleChange('card',{...card, cvc:''})}}/>
                        </View>
                    </View>
                </View>
                <View style={infoStyle.underContainer}>
                    <View style={infoStyle.container}>
                        <View style={infoStyle.subTitleContainer}>
                            <Text style={infoStyle.subTitleText}>생년월일</Text>
                        </View>
                        <View style={infoStyle.inputContainer}>

                            <View style={infoStyle.cardNumberMask} >
                                <Text style={infoStyle.cardNumberMaskText}>
                                    {card.birth.length > 0 ? card.birth.slice(0,2) : 'YY'}
                                </Text>
                                <Text style={infoStyle.cardNumberMaskPadding}>/</Text>
                                <Text style={infoStyle.cardNumberMaskText}>
                                    {card.birth.length > 2 ? card.birth.slice(2,4) : 'MM'}
                                </Text>
                                <Text style={infoStyle.cardNumberMaskPadding}>/</Text>
                                <Text style={infoStyle.cardNumberMaskText}>
                                    {card.birth.length > 4 ? card.birth.slice(4,6) : 'DD'}
                                </Text>
                            </View>
                            <TextInput style={[infoStyle.inputBox,{ fontSize:1, }]}
                                onChangeText={text=>handleChange('card',{...card, birth:text})}
                                keyboardType='phone-pad'
                                maxLength={6}
                                caretHidden={true}
                                clearTextOnFocus={true}
                                onFocus={()=>{
                                    handleChange('card',{...card, birth:''})
                                }}/>
                            

                        </View>
                    </View>
                    <View style={infoStyle.insidePadding}/>
                    <View style={infoStyle.container}>
                        <View style={infoStyle.subTitleContainer}>
                            <Text style={infoStyle.subTitleText}>비밀번호 앞 두자리</Text>
                        </View>
                        <View style={infoStyle.inputContainer}>
                            <TextInput style={[infoStyle.inputBox,{textAlign:'center',color:'#121111'}]}
                                value={card.password}
                                onChangeText={text=>handleChange('card',{...card, password:text})}
                                keyboardType='phone-pad'
                                maxLength={2}
                                clearTextOnFocus={true}
                                secureTextEntry={true}
                                onFocus={()=>{handleChange('card',{...card, password:''})}}/>
                        </View>
                    </View>
                </View>
                <Text style={{fontSize:12, color:'#FF6E43'}}>{notice}</Text>
                <View style={infoStyle.confirmContainer}>
                    <TouchableOpacity style={infoStyle.confirmButtonContainer}
                        onPress={()=>{
                            if( handleConfirm)handleConfirm()  }}>
                        <Image style={infoStyle.confirmButton}/>

                    </TouchableOpacity>
                </View>
            </View>
        )
    }
    render(){
        const {type} = this.props
        return(
            <View style={infoStyle.container}>
                {this.getTitle(type)}
                {this.getInput(type)}
            </View>
        )
    }

}

const infoStyle = StyleSheet.create({
    wholeContainer:{
        width:'100%',
        paddingLeft:20,
        paddingRight:20
    },
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
        fontSize:12,
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
    },
    confirmContainer:{
        height:80,
        width:'100%',
        alignItems:'center',
        justifyContent:'center',
        padding:10
    },
    confirmButtonContainer:{
        height:'100%',
        width:200,
        backgroundColor:'black'
    },
    confirmButton:{
        height:'100%',
        width:'100%',
        resizeMode:'contain'
    }

})