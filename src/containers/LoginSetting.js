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

                <TouchableOpacity style={styles.settingContainer}
                    onPress={()=>{handleCloseSetting()}}>
                    <Image
                        style={styles.settingImage}
                        source={require('../icon/setting.png')}
                    />
                </TouchableOpacity>
                <View style={styles.mainContainer}>
                    <TouchableOpacity style={styles.mainItem}
                        onPress={()=>{
                            handleClose()
                            handleWholePush('PlanPage') }}>
                        <Text style={[styles.mainItemText,{color:'#121111'}]}>
                            플랜선택
                        </Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity style={styles.mainItem}
                        onPress={()=>{
                            handleClose()
                            handleWholePush('UserInfoPage')}}>
                        <Text style={styles.mainItemText}>
                            개인정보
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.mainItem}
                        onPress={()=>{
                            handleClose()
                            handleWholePush('AccountInfoPage')  }}>
                        <Text style={styles.mainItemText}>
                            계정 정보
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.mainItem}
                        onPress={()=>{
                            handleClose()
                            handleWholePush('NoticePage')}}>
                        <Text style={styles.mainItemText}>
                            공지사항
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.mainItem}
                        onPress={()=>{
                            handleClose()
                            handleWholePush('PaymentPage') }}>
                        <Text style={styles.mainItemText}>
                            비밀번호 변경
                        </Text>
                    </TouchableOpacity>




                    <TouchableOpacity style={styles.mainItem}
                        onPress={()=>{`
                            handleClose()
                            handleWholePush('')` }}>
                        <Text style={styles.mainItemText}>
                            이용안내 및 약관
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.mainItem}
                        onPress={()=>{
                            this.setState(({isModalVisible:true}))
                            //handleLogout()
                        }}>
                        <Text style={styles.mainItemText}>
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


    settingContainer:{
        height:40,
        margin:0,
        padding:0,
        marginTop:4,
        justifyContent:'flex-end',
        alignItems:'flex-end'
    },
    settingImage:{
        position:'absolute',
        right:-5,
        bottom:0,
        height:'100%',
        width:'18%',
        resizeMode:'contain',
    },

    mainContainer:{
        flex:1,
        backgroundColor:'#fff',
        paddingTop:100
    },
    mainItem:{
        height:50,
        paddingLeft: 30
    },
    mainItemText:{
        fontSize:16,
        color:'gray'
    }


})
