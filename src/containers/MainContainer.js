import React, {Component} from 'react'
import { StyleSheet, ScrollView, View } from 'react-native';

import MostlyContainer from './MostlyContainer'
import ThemeContainer from './ThemeContainer'

export default class MainContainer extends Component{
    render(){
        return(
            <View style={styles.container}>
                <ScrollView style={styles.scroll}>
                    <MostlyContainer />
                    <ThemeContainer />
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        alignItems: 'center',
        justifyContent: 'center',
        height:'100%',
        width:'100%'
    },
    scroll:{
        width:'100%'
    }
})