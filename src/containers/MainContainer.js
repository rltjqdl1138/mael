import React, {Component} from 'react'
import { StyleSheet, Text, View } from 'react-native';

import MostlyContainer from './MostlyContainer'

export default class MainContainer extends Component{
    render(){
        return(
            <View style={styles.container}>
                <MostlyContainer />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{

        alignItems: 'center',
        justifyContent: 'center',
        height:320,
        width:'100%'
    }
})