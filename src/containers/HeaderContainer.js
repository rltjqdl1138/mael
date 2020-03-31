import React, {Component} from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';

export default class HeaderContainer extends Component {
    render(){
        const {handleSidebar, handlePop} = this.props
        return(
            <View style={styles.container}>
                <TouchableOpacity style={styles.menuContainer} onPress={handleSidebar}>
                    <Image
                        style={styles.menuImage}
                        source={require('../icon/menu.png')}
                    />
                </TouchableOpacity>
                <TouchableOpacity style={styles.titleContainer} onPress={()=>{handlePop()}}>
                    <Text style={styles.titleText}>
                        MAEL
                    </Text>
                </TouchableOpacity>
                <View style={styles.searchContainer}>
                    <Image
                        style={styles.searchImage}
                        source={require('../icon/search.png')}
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
        justifyContent: 'flex-end'
    },menuImage:{
        width:'100%',
        height:'80%',
        resizeMode:'contain'
    },


    // TITLE
    titleContainer:{
        alignItems: 'center',
        justifyContent: 'center',
        height:'100%',
        flex:1
    },titleText:{
        width:'100%',
        fontSize: 26,
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
        justifyContent: 'flex-end'
    },searchImage:{
        width:'100%',
        height:'80%',
        resizeMode:'contain'
    },

})