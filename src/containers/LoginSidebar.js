import React, {Component} from 'react'
import { View, StyleSheet, Text, Button, ScrollView, Image, TouchableOpacity } from 'react-native'
import MusicTitle from '../components/MusicTitle'
import SidebarBanner from '../components/SidebarBanner'
import deviceCheck from '../deviceCheck'
export default class LoginSidebar extends Component{
    render(){
        const { username, handleLogout, handleMainPush, handleWholePush, handleClose, handleOpenSetting, musicList } = this.props
        return(
            <View style={styles.container}> 

                <TouchableOpacity style={styles.settingContainer}
                    onPress={()=>{handleOpenSetting()}}>
                    <Image
                        style={styles.settingImage}
                        source={require('../icon/setting2.png')}
                    />
                </TouchableOpacity>

                <View style={styles.usernameContainer}>
                    <TouchableOpacity onPress={()=>{handleWholePush('AccountInfoPage')}}>
                        <Text style = {styles.usernameText}>
                            {username ? username + " 님," : "blank"}
                        </Text>
                    </TouchableOpacity>
                </View>

                <TouchableOpacity style={styles.gotoPlaylistContainer}
                            onPress={()=>{
                                handleMainPush('MyPlaylistPage')
                                handleClose();}} >
                            <Text style={styles.gotoPlaylistText}>내 플레이리스트 > </Text>
                </TouchableOpacity>

                <SidebarBanner />
                
                <View style={styles.otherContainer}>
                    <ScrollView>
                        <MusicTitle musicList={musicList}
                            handleMainPush={handleMainPush}
                            handleClose={handleClose}/>
                    </ScrollView>
                </View>
                <View style={styles.bottomLine}>

                </View>
                <View style={styles.shopContainer}>
                    <Button
                        style={styles.shopButton}
                        title="SHOP >"
                    />
                </View>

                <View style={ {height:deviceCheck.ifTopbarless?30:0, width:'100%', backgroundColor:'#000'} }/>
            </View>
        )
    }
}



const styles= StyleSheet.create({
    container:{
        width:'100%',
        height:'100%',
    },
    usernameContainer:{
        height: 25,
        paddingLeft:20,
    },
    usernameText:{
        fontSize:17,
        fontWeight:'bold',
        color:'#121111'
    },

    otherContainer:{
        flex:1,
    },


    gotoPlaylistContainer:{
        height: 35,
        width:'100%',
        paddingLeft:20,
    },
    gotoPlaylistText:{
        width:'100%',
        fontSize:15,
        textAlign:'left',
        color:'#646363'
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



    bottomLine:{
        height:10,
        borderBottomColor:'#ccc',
        borderBottomWidth:1,
        marginLeft:10,
        marginRight:10
    },


    shopContainer:{
        height:110,
        alignItems:'baseline',
        justifyContent:'center',
        paddingLeft:30
    },

    shopButton:{
        textAlign:'left',
        color:'#000'
    }
})