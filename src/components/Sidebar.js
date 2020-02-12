import React, {Component} from 'react'
import {View, StyleSheet, Text, Button, TouchableOpacity} from 'react-native'

const Sidebar = ({navigator})=>
    (
        <View style={styles.container}>
            <View style={styles.sidebarMain}>

                <Text style={styles.temp}>
                    Menu!
                </Text>
                <Button title="Mostly Animal" 
                    onPress={()=>{navigator.push('PlayingContainer',{title:'Mostly Animal'})}}
                />
                <Button title="Sign Up!"
                    onPress={()=>{navigator.push('SignupContainer')}}
                />

            </View>
            <TouchableOpacity
                style={styles.sidebarBlank}
                onPressIn={()=>{navigator.pop('Sidebar')}}
            />
        </View>
    )
    

const styles=StyleSheet.create({
    container:{
        width:'100%',
        height:'100%',
        flexDirection:'row'
    },
    sidebarMain:{
        flex:6,
        backgroundColor:'#eee',
        borderWidth:3,
        borderColor:'#aaa'
    },
    sidebarBlank:{
        flex:4
    },
    temp:{
        fontSize:30,
        fontWeight:'bold',
        textAlign:'center'
    }
})

export default Sidebar