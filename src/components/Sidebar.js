import React, {Component} from 'react'
import {View, StyleSheet, Text, Button} from 'react-native'

const Sidebar = ({navigator, hand})=>
    (
        <View style={styles.container}>
            <Text>
                Menu!
            </Text>
            <Button 
                title="click???"
                onPress={navigator.pop}
            />
        </View>
    )
    

const styles=StyleSheet.create({
    container:{
        width:'60%',
        height:'100%',
        backgroundColor:'#ccc'
    }
})

export default Sidebar