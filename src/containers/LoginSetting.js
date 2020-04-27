import React, {Component} from 'react'
import { View, StyleSheet, Text, Button, ScrollView, Image, TouchableOpacity } from 'react-native'
import deviceCheck from '../deviceCheck'
import LogoutModal from '../components/logoutModal'

export default class LoginSetting extends Component{
    constructor(props){
        super(props)
        this.state = {isModalVisible: false}
    }
    logout = ()=>{
        const {handleLogout, handleClose, handleCloseSetting} = this.props
        this.setState({isModalVisible:false},
            ()=>{
                handleLogout()
                handleClose()
                handleCloseSetting()
            })
    }
    render(){
        const { username, handleLogout, handleMainPush, handleWholePush, handleClose, handleCloseSetting } = this.props
        return(
            <View style={styles.container}>
                <View style={styles.topPadding}>
                    <TouchableOpacity style={styles.backButton}
                        onPress={handleCloseSetting} >
                            <Image style={styles.backButtonImage}
                                source={require('../icon/back.png')}
                            />
                    </TouchableOpacity>
                </View> 
                <View style={styles.settingContainer}>
                    <TouchableOpacity style={styles.settingItem}
                        onPress={()=>{
                            handleClose()
                            handleWholePush('PlanPage') }}>
                        <Text style={styles.settingItemText}>
                            플랜선택
                        </Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity style={styles.settingItem}
                        onPress={()=>{
                            handleClose()
                            handleWholePush('UserInfoPage')}}>
                        <Text style={styles.settingItemText}>
                            개인정보
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.settingItem}
                        onPress={()=>{
                            handleClose()
                            handleWholePush('AccountInfoPage')  }}>
                        <Text style={styles.settingItemText}>
                            계정 정보
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.settingItem}
                        onPress={()=>{
                            handleClose()
                            handleWholePush('NoticePage')}}>
                        <Text style={styles.settingItemText}>
                            공지사항
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.settingItem}
                        onPress={()=>{
                            handleClose()
                            handleWholePush('PaymentPage') }}>
                        <Text style={styles.settingItemText}>
                            비밀번호 변경 / Pay
                        </Text>
                    </TouchableOpacity>




                    <TouchableOpacity style={styles.settingItem}
                        onPress={()=>{`
                            handleClose()
                            handleWholePush('')` }}>
                        <Text style={styles.settingItemText}>
                            이용안내 | 약관
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.settingItem}
                        onPress={()=>{
                            this.setState(({isModalVisible:true}))
                            //handleLogout()
                        }}>
                        <Text style={styles.settingItemText}>
                            로그아웃
                        </Text>
                    </TouchableOpacity>
                </View>
                <LogoutModal
                    isModalVisible={this.state.isModalVisible}
                    closeModal={()=>this.setState(({isModalVisible:false}))}
                    logout={this.logout}
                />
            </View>
        )
    }
}



const styles= StyleSheet.create({
    container:{
        width:'100%',
        height:'100%',
        justifyContent:'center'
    },

    topPadding:{
        marginTop:40,
        width:'100%',
        height:40,
        justifyContent:'center',
    },

    backButton:{
        marginLeft: 30,
        width:30,
        height:30
    },
    backButtonImage:{
        height:'100%',
        width:'100%',
        resizeMode:'contain'
    },
    settingContainer:{
        flex:1,
        backgroundColor:'#fff',
        paddingTop:80
    },
    settingItem:{
        padding: 20,
        paddingLeft: 40
    },
    settingItemText:{
        fontSize:15
    }

})
