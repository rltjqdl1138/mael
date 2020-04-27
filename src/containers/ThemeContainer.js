import React, {Component} from 'react'
import { StyleSheet, View, Text, ScrollView, Button } from 'react-native'

import { connect } from 'react-redux'
import { ThemeActions } from '../store/actionCreator'

import Theme from '../components/Theme'

class ThemeContainer extends Component{
    constructor(){
        super()
    }
    render(){
        const {list, navigator} = this.props

        return(
            <View style={styles.container}>
                <ThemeItem list={list} navigator={navigator}/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    
    // CONTAINER

    container:{
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
    },
})



class ThemeItem extends Component{
    render(){
        const {list, navigator} = this.props
        const themeItems = !list ?
            (<Text> Blank </Text>):
            list.map( theme => {
                const {ID, title, subTitle, list } = theme
                if(!list || list.length === 0)
                    return null
                return (
                    <Theme
                        key={ID}
                        themeList={list}
                        title={title}
                        subTitle={subTitle}
                        navigator={navigator}
                    />)
            })
            return(
                <View style={containerStyle.container}>
                    { themeItems }
                </View>
            )
    }
}


const containerStyle = StyleSheet.create({
    container:{
        width:'100%'
    },
    scroll:{
        height:'100%'
    }
})


export default connect(
    (state)  =>({
        list: state.theme.list
    })
)(ThemeContainer)