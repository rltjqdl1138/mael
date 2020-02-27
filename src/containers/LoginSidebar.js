import React, {Component} from 'react'
import { View, StyleSheet, Text, Button, ScrollView, Image, TouchableOpacity } from 'react-native'
import MusicTitle from '../components/MusicTitle'
export default class LoginSidebar extends Component{
    render(){
        const { username, handleLogout, handleMainPush, handleWholePush, handleClose, handleOpenSetting, musicList } = this.props
        return(
            <View style={styles.container}> 

                <View style={styles.topPadding}>

                </View>   
                <View style={styles.usernameContainer}>
                    <TouchableOpacity onPress={()=>{handleWholePush('AccountInformationContainer')}}>
                        <Text style = {styles.usernameText}>
                            {username ? username + "님," : "blank"}
                        </Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.noticeContainer}>

                </View>
                <View style={styles.otherContainer}>
                    <ScrollView>
                        
                        <MusicTitle musicList={musicList}/>
                        <TouchableOpacity style={styles.gotoPlaylistContainer}
                            onPress={()=>{handleClose();}} >
                            <Text> My playlist 바로가기 > </Text>
                        </TouchableOpacity>
                    </ScrollView>
                </View>
                <TouchableOpacity style={styles.settingContainer}
                    onPress={()=>{handleOpenSetting()}}>
                    <Image
                        style={styles.settingImage}
                        source={require('../image/owl.jpg')}
                    />
                </TouchableOpacity>
                <View style={styles.bottomLine}>

                </View>
                <View style={styles.shopContainer}>
                    <Button
                        style={styles.shopButton}
                        title="SHOP >"
                    />
                </View>
            </View>
        )
    }
}



const styles= StyleSheet.create({
    container:{
        width:'100%',
        height:'100%',
        paddingTop:40,
        paddingBottom:40
    },
    topPadding:{
        flex:1,
        width:'100%'
    },

    usernameContainer:{
        flex: 1,
        flexDirection:'row',
        paddingLeft:30,
        alignContent:'center',
    },
    usernameText:{
        fontSize:20,
    },

    noticeContainer:{
        flex:2,
        borderWidth:2,
        backgroundColor:'#000'
    },

    otherContainer:{
        flex:8,
    },


    gotoPlaylistContainer:{
        height: 40,
        paddingLeft:10,
        justifyContent:'center'
    },
    gotoPlaylistText:{
        fontSize:12
    },
    

    settingContainer:{
        flex:1,
        margin:0,
        padding:0
    },
    settingImage:{
        position:'absolute',
        right:0,
        bottom:0,
        height:'90%',
        width:'20%',
        resizeMode:'contain',
    },


    bottomLine:{
        height:0,
        borderBottomColor:'#ccc',
        borderBottomWidth:1,
        marginLeft:10,
        marginRight:10
    },


    shopContainer:{
        flex:1,
        alignItems:'baseline',
        justifyContent:'center',
        paddingLeft:10
    },

    shopButton:{
        textAlign:'left',
        color:'#000'
    }
})