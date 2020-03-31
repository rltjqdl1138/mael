import React, {Component} from 'react'
import {connect} from 'react-redux'
import { StyleSheet, View, Text } from 'react-native'
import { MyPlaylistActions } from '../store/actionCreator'

import { Album_Container } from '../containers/AlbumContainer'


export default class MyPlaylist extends Component{
    render(){
        return ( <MyPlaylistPage /> )
    }
}
class myPlaylistPage extends Component{
    componentDidMount(){
        MyPlaylistActions.load({token:'aaa'})
    }
    render(){
        const {list, isLoaded} = this.props
        if(!isLoaded.success)
            return(
                <View style={styles.container}>
                    <Text style={styles.loadingText}> Loading...</Text>
                </View> )
        return(
            <View style={styles.container}>
                <Album_Container 
                    title='MyPlaylist'
                    list={list}
                />
            </View>
        )
    }     
}
const styles = StyleSheet.create({
    container:{
        width:'100%',
        height:'100%',
        backgroundColor:'#fff'
    },
    loadingText:{
        textAlign:'center',
        fontSize:25
    }
})

const MyPlaylistPage = connect(
    (state)  =>({
        list: state.myPlaylist.list,
        isLoaded: state.myPlaylist.isLoaded
    })
)(myPlaylistPage)