import React, {Component} from 'react'
import {View, StyleSheet, Text, TextInput, ScrollView, Button, Picker, TouchableOpacity, Keyboard, Dimensions, Image} from 'react-native'
import SimpleHeader from '../components/SimpleHeader'
import deviceCheck from '../deviceCheck'
import networkHandler from '../networkHandler'

const screenHeight = Dimensions.get('window').height - 150
const size12 = deviceCheck.getFontSize(12)
const size14 = deviceCheck.getFontSize(14)
const size17 = deviceCheck.getFontSize(17)
export default class SignupPage extends Component {
    constructor(props){
        super(props)
        this.state={
            firstName:'',
            lastName:'',
            id:'',
            password:'',
            passwordCheck:'',
            email:'',
            countryCode:'82',
            phone:'',
            phoneCheck:'',
            isPickerOpen:false,
            isKeyboardOpen:false,
            idNotice:'',
            passwordNotice:'',
            mobileNotice:'',
            isLoaded:false,
            countryCodeList:[],
            signupToken:'',
            height:0
        }
    }
    checkID = false
    scrollheight = 0
    async getCountryCode(){
        const result = await networkHandler.info.getCountryCode()
        if(!result.success || !result.list)
            return;
        this.setState((state)=>({
            ...state,
            isLoaded:true,
            countryCodeList:result.list
        }))
            
    }
    componentDidMount() {
        this.getCountryCode()
		this._keyboardWillShowSubscription = Keyboard.addListener('keyboardDidShow', (e) => this._keyboardWillShow(e));
		this._keyboardWillHideSubscription = Keyboard.addListener('keyboardDidHide', (e) => this._keyboardWillHide(e));
	}
	componentWillUnmount() {
		this._keyboardWillShowSubscription.remove();
		this._keyboardWillHideSubscription.remove();
	}
	_keyboardWillShow(e) {
        this.setState(state=>({...state,
            height: e.endCoordinates.height,
            isKeyboardOpen:true
        }));
        this.handleChange('isKeyboardOpen',true)
	}
	_keyboardWillHide(e) {
        this.setState(state=>({...state, height: 0,
        isKeyboardOpen:false}));
    }
    
    async getIDNotice(id){

        this.checkID = false
        if(!id || id==='')
            return this.handleChange('idNotice','')
        else if(id.length < 8)
            return this.handleChange('idNotice', 'ID는 8자리 이상이어야 합니다.')
        else if(id.length >16)
            return this.handleChange('idNotice', 'ID는 16자리 이하여야 합니다.')

        const result = await networkHandler.account.getCheckID(id)

        if(result && result.success && !result.overlaped){
            this.checkID = true
            return this.handleChange('idNotice', id+'는 사용 가능한 ID입니다.')
        }
        return this.handleChange('idNotice', id+'는 이미 사용중인 아이디 입니다.')
    }
    getPasswordNotice(){
        const {password, passwordCheck} = this.state

        if(password.length === 0)
            return this.handleChange('passwordNotice', '')
        else if(password.length < 8)
            return this.handleChange('passwordNotice', '비밀번호는 8자리 이상이어야 합니다.')
        else if(passwordCheck !== password)
            return this.handleChange('passwordNotice', '입력하신 비밀번호와 확인란의 비밀번호가 다릅니다.')

        return this.handleChange('passwordNotice', '')
    }
    getPickerItem = (_code, name, isIOS) =>{
        if(!_code || !name) return null
        else if(isIOS)
            return ( <Picker.Item key={_code} label={'+ '+_code} value={_code} /> )
        
        return ( <Picker.Item key={_code} label={name} value={_code} /> )
    }
    getPicker = ()=>{
        const pickerItems = !this.state.countryCodeList ? null :
            this.state.countryCodeList.map(item =>
                this.getPickerItem(item.code, item.name, deviceCheck.ifIOS)
            )

        if(deviceCheck.ifIOS){
            return(
                <View style={[styles.pickerContainer, {display:this.state.isPickerOpen?'flex':'none'}]}>
                    <Picker style={{width:'100%', height:'100%'}}
                        itemStyle={{fontSize: 13, color:'#121111'}}
                        selectedValue={this.state.countryCode}
                        onValueChange={text=>this.handleChange('countryCode',text)} >
                            {pickerItems}
                    </Picker>
                </View>
            )
        }
        return(
                <Picker style={styles.androidPickerContainer}
                    selectedValue={this.state.countryCode}
                    onValueChange={text=>this.handleChange('countryCode',text)} >
                        {pickerItems}
                </Picker>        
        )
    }
    handleChange = (field, text) => {
        if(field === this.state.phoneCheck)
            return this.setState({ [field]:text.replace(/[^(0-9)]/gi, "").slice(0,6)})
        this.setState({ [field]: text });
    }
    sendMessage = async ()=>{
        const {phone,countryCode}=this.state
        const response = await networkHandler.info.mobileAuth(phone, countryCode, 0)
        if(response.success)
            return alert('success')
        alert('fail')
    }
    keyCheck = async() =>{
        const {phone, countryCode, phoneCheck} = this.state
        const response = await networkHandler.info.checkMobileAuth(phone, countryCode, phoneCheck)
        console.warn(response)
        if(!response.success || !response.token)
            return this.handleChange('mobileNotice', '인증번호가 올바르지 않습니다.')
        return this.setState(state=>({
            ...state,
            mobileNotice:'인증에 성공하였습니다.',
            signupToken: response.token
        }))
    }
    async completeSignup(){

        return this.props.navigator.push('GreetingPage')
        const {id, password, phone, countryCode, passwordCheck, firstName, lastName, email, signupToken} = this.state
        if(id === '' || password === '' || phone === '' || countryCode === '' || passwordCheck ==='' || firstName === '' || lastName === '' || email === '')
            return;
        else if(password !== passwordCheck)
            return;
        
        const result = await networkHandler.account.getCheckID(id)
        if(!result || !result.success || result.overlaped)
            return;
        else if(!signupToken || signupToken ==='')
            return;
        const payload = {id, password, mobile:phone, countryCode, email, name:firstName+lastName, token:signupToken }
        const response = await networkHandler.account.registerAccount(payload)
        if(response.success)
            return this.props.navigator.push('GreetingPage')


    }
    render(){
        const {handleChange} = this
        const {navigator} = this.props
        const {idNotice, passwordNotice, mobileNotice} = this.state
        return(
            <View style={styles.container}>

                <SimpleHeader 
                    title="회원가입"
                    handler={()=>{navigator.pop('SignupPage')}}
                    disableNotice={true}
                    notice=''/>

                <ScrollView style={styles.mainContainer}
                    ref='scrollView'
                    onContentSizeChange={(w,h)=>{
                        if(!this.needUp)
                            return;
                        const _height = this.scrollheight + screenHeight
                        const height = this.scrollheight + this.state.height
                        this.needUp = false
                        const scrollResponder = this.refs.scrollView.getScrollResponder();
                        scrollResponder.scrollResponderScrollTo({x: 0, y: height, animated:true})
                    }}
                    onScrollBeginDrag={()=>{handleChange('isPickerOpen',false)}}
                    onScroll={({nativeEvent})=> {
                        this.scrollheight = nativeEvent.contentOffset.y}
                    }>
                    <View style={styles.accountInform}>
                        <Text style={styles.subtitle} >이름</Text>
                        <View style={styles.inputBoxContainer} >
                            <TextInput style={styles.inputBox}
                                placeholder="성"
                                placeholderTextColor='#888'
                                onChangeText={text=>handleChange('firstName',text)}
                            />
                        </View>
                        <View style={styles.simplePadding}/>
                        <View style={styles.inputBoxContainer} >
                            <TextInput style={styles.inputBox}
                                placeholder="이름"
                                placeholderTextColor='#888'
                                onChangeText={text=>handleChange('lastName',text)}
                            />
                        </View>

                        <View style={styles.simplePadding}/>
                    </View>


                    <View style={styles.IDPW}>
                        <Text style={styles.subtitle} allowFontScaling={false}>ID / PASSWORD</Text>
                        <View style={styles.inputBoxContainer} >
                            <TextInput style={styles.inputBox}
                                placeholder="ID"
                                placeholderTextColor='#888'

                                onFocus={()=>{this.needUp=true}}
                                onChangeText={text=>{
                                    handleChange('id',text)
                                    this.getIDNotice(text)
                                }}/>
                        </View>
                        <View style={styles.textPadding}>
                            <Text style={styles.okText} >
                                {idNotice}
                            </Text>
                        </View>
                        <View style={styles.inputBoxContainer}>
                            <TextInput style={styles.inputBox}
                                placeholder="비밀번호"
                                placeholderTextColor='#888'
                                secureTextEntry={true}
                                onChangeText={text=>handleChange('password',text)}

                                onFocus={()=>{this.needUp=true}}
                            />
                        </View>
                        <View style={styles.simplePadding}/>
                        <View style={styles.inputBoxContainer} >
                            <TextInput style={styles.inputBox}
                                placeholder="비밀번호 확인"
                                placeholderTextColor='#888'
                                secureTextEntry={true}
                                onChangeText={text=>handleChange('passwordCheck',text)}

                                onFocus={()=>{this.needUp=true}}
                            />
                        </View>
                        <View style={styles.textPadding}>
                            <Text style={styles.errText} >
                                {passwordNotice}
                            </Text>
                        </View>
                    </View>


                    <View style={styles.PhoneEmail}>
                        <Text style={styles.subtitle} >EMAIL / PHONE</Text>
                        <View style={styles.inputBoxContainer} >
                            <TextInput style={styles.inputBox}
                                placeholder="이메일"
                                placeholderTextColor='#888'
                                onChangeText={text=>handleChange('email',text)}
                                onFocus={()=>{this.needUp=true}}
                            />
                        </View>
                        <View style={styles.simplePadding}/>
                        <View style={{flexDirection:'row',width:'100%'}} >
                            <TouchableOpacity style={styles.countryCodeBox}
                                onPress={()=>handleChange('isPickerOpen',!this.state.isPickerOpen)}>
                                <View style={styles.countryCodeTextContainer}>
                                    <Text style={styles.countryCodeText} >
                                        {'+ '+this.state.countryCode}
                                    </Text>
                                </View>
                                <View style={styles.countryCodeButton}>
                                    <Image
                                        style={styles.countryCodeButtonImage}
                                        source={require('../icon/countryCode.png')}
                                    />

                                </View>
                            </TouchableOpacity>
                            <View style={styles.phoneinputBox}>
                                <TextInput style={{flex:1}}
                                    keyboardType="number-pad"
                                    placeholder="휴대전화"
                                    placeholderTextColor='#888'
                                    onChangeText={text=>handleChange('phone',text)}
                                    onFocus={()=>{this.needUp=true}}
                                />
                                <TouchableOpacity style={{width:60, justifyContent:'center'}}
                                    onPress={this.sendMessage}>
                                    <Text style={{fontSize:13, color:'#121111'}}>인증받기</Text>
                                </TouchableOpacity>

                            </View>
                        </View>

                        <View style={styles.simplePadding}/>
                        <View style={styles.inputBoxContainer} >
                            <View style={styles.inputBox}>

                                <TextInput style={{flex:1}}
                                    placeholder="인증번호"
                                    keyboardType="number-pad"
                                    placeholderTextColor='#888'
                                    onChangeText={text=>handleChange('phoneCheck',text)}
                                    onFocus={()=>{this.needUp=true}}
                                />

                                <TouchableOpacity style={{width:60, justifyContent:'center'}}
                                    onPress={this.keyCheck}>
                                    <Text style={{fontSize:13, color:'#121111'}}>인증확인</Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                        <View style={styles.textPadding}>
                            <Text style={styles.okText}>
                                {mobileNotice}
                            </Text>
                        </View>
                        {this.getPicker()}
                        <View style={styles.simplePadding}/>
                    </View>

                    <View style={styles.enterButtonContainer}>
                        <View style={styles.enterButton}>

                        <Button
                            title="Enter"
                            onPress={async()=>{this.completeSignup()}}
                        /> 
                        </View>
                    </View>
                <View style={{width:'100%',height:this.state.height}} />
                </ScrollView>


            </View>
        )
    }
}

const styles=StyleSheet.create({
    container:{
        width:'100%',
        height:'100%',
        backgroundColor: '#fff'
    },

    mainContainer:{
        width:'100%',
        flex:1
    },

    subtitle:{
        fontSize: size17,
        color: '#121111',
        paddingBottom:20
    },

    accountInform:{
        paddingLeft:25,
        paddingRight:25,
        paddingTop:40
    },

    IDPW:{
        paddingLeft:25,
        paddingRight:25,
        paddingTop:40
    },
    PhoneEmail:{
        paddingLeft:25,
        paddingRight:25,
        paddingTop:40

    },
    
    inputBoxContainer:{
        width:'100%',
        flexDirection:'row',
        borderRadius:15,
        borderWidth:1,
        borderColor:'#ddd'
    },
    inputBox:{
        width: '100%',
        height: 42,
        paddingLeft:20,
        flexDirection:'row'
    },
    simplePadding:{
        width:'100%',
        height:15
    },
    textPadding:{
        width:'100%',
        height:26,
        marginLeft:12,
        justifyContent:'center'
    },
    okText:{
        fontSize:size12,
        color:'#96e255'
    },
    errText:{
        fontSize:size12,
        color:'#767171'
    },

    countryCodeBox:{
        width:80,
        height: 42,
        paddingLeft:10,

        borderRadius:15,
        borderWidth:1,
        borderColor:'#ddd',
        flexDirection:'row'
    },
    countryCodeTextContainer:{
        flex:1,
        justifyContent:'center'
    },
    countryCodeText:{
        textAlign:'center'
    },
    countryCodeButton:{
        width:20,
        height:'100%',
        justifyContent:'center',
        alignItems:'center'
    },
    countryCodeButtonImage:{
        width:'50%',
        resizeMode:'contain'
    },
    phoneinputBox:{
        flex:1,
        height: 42,
        marginLeft:10,
        paddingLeft:20,
        borderRadius:15,
        borderWidth:1,
        borderColor:'#ddd',
        flexDirection:'row'
    },
    pickerContainer:{
        position:'absolute',
        left:25,
        top:180,
        width:60,
        height:180,
        backgroundColor:'#fff',
        borderWidth:1,
        borderRadius:10,
        borderColor:'#ddd'
    },
    androidPickerContainer:{
        position:'absolute',
        left:34,
        top:143,
        width:52,
        height:40,
        backgroundColor:'#fff',
        borderWidth:1,
        borderRadius:15,
        borderColor:'#ddd'
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


class CountryCodePicker extends Component {
    render(){
        const {countryCode, handleChange, isOpen, handleClose} = this.props
        return (
            <View style={[pickerStyle.container,{display: isOpen?'flex':'none'}]}>
                <View style={pickerStyle.headerContainer}>
                    <TouchableOpacity style={pickerStyle.doneButton}
                        onPress={handleClose} >
                        <Text style={pickerStyle.doneText}>
                            Done
                        </Text>
                    </TouchableOpacity>
                </View>
                <Picker style={{width:50, height:250}}
                    selectedValue={countryCode}
                    onValueChange={text=>handleChange('countryCode',text)} >
                        <Picker.Item label="082" value="082" />
                        <Picker.Item label="002" value="002" />
                        <Picker.Item label="003" value="003" />
                        <Picker.Item label="004" value="004" />
                        <Picker.Item label="005" value="005" />
                        <Picker.Item label="006" value="006" />
                </Picker>

            </View>
        )
    }
}
const pickerStyle = StyleSheet.create({
    container:{
        width:50,
        height:250,
        borderColor:'#000',
        borderWidth:1,
        borderRadius:10,
        alignSelf:'center'
    },
    headerContainer:{
        width:'100%',
        flex:1,
        backgroundColor:'#ddd',
        justifyContent:'center',
        alignItems:'flex-end'
    },
    doneButton:{
        width:60,
        height:'80%',
        backgroundColor:'#aaa',
        marginRight:20,
        justifyContent:'center',
        borderColor:'#121212',
        borderWidth:1,
        borderRadius:10
    },
    doneText:{
        textAlign:'center',
        fontSize:size14
    }
})