import React, {Component} from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';

export default class HeaderContainer extends Component {
    render(){
        const {handleSidebar, handleNavPop} = this.props
        return(
            <View style={styles.container}>
                <TouchableOpacity style={styles.menuContainer} onPress={handleSidebar}>
                    <Image
                        style={styles.menuImage}
                        source={require('../image/menu.jpg')}
                    />
                </TouchableOpacity>
                <TouchableOpacity style={styles.titleContainer} onPress={()=>{handleNavPop()}}>
                    <Text style={styles.titleText}>
                        MAEL
                    </Text>
                </TouchableOpacity>
                <View style={styles.searchContainer}>
                    <Image
                        style={styles.searchImage}
                        source={require('../image/search.jpg')}
                    />
                </View>
            </View>

        )
        
    }
}
const styles = StyleSheet.create({
    container:{
        width:'100%',
        height:'100%',
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 7
    },

    // MENU BUTTON
    menuContainer:{
        position:'absolute',
        height:'100%',
        width:'20%',
        top:0,
        left:0,
        backgroundColor:'#fff',
        alignItems: 'center',
        justifyContent: 'center'
    },menuImage:{
        width:'100%',
        height:'100%',
        resizeMode:'cover'
    },


    // TITLE
    titleContainer:{
        alignItems: 'center',
        justifyContent: 'center',
        height:'100%',
        flex:1
    },titleText:{
        width:'100%',
        fontSize: 25,
        color:'#555',
        fontWeight:'300'
    },

    // SEARCH BUTTON
    searchContainer:{
        position:'absolute',
        height:'100%',
        width:'20%',
        top:0,
        right:0,
        backgroundColor:'#fff',
        alignItems: 'center',
        justifyContent: 'center'
    },searchImage:{
        width:'60%',
        height:'60%',
        resizeMode:'cover'
    },

})