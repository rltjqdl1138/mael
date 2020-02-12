import React, {Component} from 'react'
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native'

const PlayingBar = ()=>{
    return(
        <View style={styles.container}> 
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.buttons}>
                    <Text>버튼</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttons}>
                    <Text>버튼</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttons}>
                    <Text>버튼</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttons}>
                    <Text>버튼</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttons}>
                    <Text>버튼</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles= StyleSheet.create({
    container:{
        width:'100%',
        height:'100%',
        borderWidth:2,
        borderColor:'#000'
    },
    timeContainer:{
        width:'100%',
        flex: 1
    },
    buttonContainer:{
        width:'100%',
        flex:2,
        flexDirection:'row',
        paddingLeft:20,
        paddingRight:20
    },
    buttons:{
        width: 70,
        height:'100%',
        padding: 10,
        backgroundColor:'#ccc',
        borderWidth:1,
        borderColor:'#f0f'
        
    }
})


export default PlayingBar