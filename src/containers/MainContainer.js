import React, {Component} from 'react'
import { StyleSheet, ScrollView, View } from 'react-native';

import MostlyContainer from './MostlyContainer'

export default class MainContainer extends Component{
    render(){
        return(
            <View style={styles.container}>
                <ScrollView>
                    <MostlyContainer />
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        alignItems: 'center',
        justifyContent: 'center',
        width:'100%',
        height:'100%'
    }
})