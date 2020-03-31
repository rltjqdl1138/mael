import React, {Component} from 'react'
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native'
import { connect } from 'react-redux'
import { AudioActions } from '../store/actionCreator'
import PlayingBar from './PlayingBar'

class AlbumControler extends Component{
    isFirst = true
    getButton = (props)=>{
        const { title, list } = props
        if(this.isFirst)
            return (
                <TouchableOpacity style={styles.buttonItem}
                    onPress={()=>{this.isFirst=false; AudioActions.initialize({title,list})}}>
                        <Text> Start </Text>
                </TouchableOpacity>
            )
        else if(props.isPlaying === 2)
            return (
                <TouchableOpacity style={styles.buttonItem}
                    onPress={()=>{AudioActions.pause({infoNumber:2})}}>
                    <Text> Pause </Text>
                </TouchableOpacity>
            )
        return (
            <TouchableOpacity style={styles.buttonItem}
                onPress={()=>{AudioActions.resume({infoNumber:2})}}>
                <Text> Resume </Text>
            </TouchableOpacity>
        )
    }
    getPlayingBar = (playinfo, isPlaying)=>{
        if(this.isFirst)
            return(
                <View style={styles.timeContainer}>
                    <Text style={styles.leftTimeText}>0:00</Text>
                    <Text style={styles.rightTimeText}>0:00</Text>
                </View>
            )
        return(<PlayingBar playinfo={playinfo} infoNumber={2} isPlaying={isPlaying}/>)
    }
    render(){
        const {newPlayinfo, isPlaying, getTime, index, playOption} = this.props
        const PLAYBACK_LIMIT = 5000
        return (
            <View style={styles.container}>
                <View style={styles.controlerContainer} >
                    {this.getPlayingBar(newPlayinfo, isPlaying)}
                </View>
                <View style={[styles.buttonContainer,{opacity: this.isFirst?0.5:1}]}>
                    <TouchableOpacity style={styles.buttonItem}
                        onPress={()=>{if(!this.isFirst)AudioActions.changeOption() }}  >

                    </TouchableOpacity>

                    <TouchableOpacity style={styles.buttonItem}
                        onPress={()=>{
                            if(this.isFirst) return;
                            if(getTime() < PLAYBACK_LIMIT)
                                AudioActions.replay()
                            else
                                AudioActions.next({infoNumber:2, index})
                        }}>
                        
                    </TouchableOpacity>

                    {this.getButton(this.props)}

                    <TouchableOpacity style={styles.buttonItem}
                        onPress={()=>{if(!this.isFirst)AudioActions.next({infoNumber:2}) }}>
                        
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.buttonItem}
                        onPress={()=>{if(!this.isFirst)alert(index)}}>
                        
                    </TouchableOpacity>
                </View>
                <View style={styles.optionContainer}>
                    <Text style={styles.optionText}>{this.isFirst?'':playOption.option}</Text>
                </View>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container:{
        width:'100%',
        height:'100%',
        alignItems:'center',
        justifyContent:'center'
    },
    controlerContainer:{
        height:20,
        width:'100%'
    },
    buttonContainer:{
        flex:1,
        flexDirection:'row',
        paddingLeft:25,
        paddingRight:25
    },
    buttonItem:{
        flex:1,
        height:'100%',
        borderWidth:1,
        borderColor:'#000'
    },

    timeContainer:{
        height:20,
        width:'100%',
        backgroundColor:'#fff',
        alignItems:'flex-end',
        flexDirection:'row'
    },
    leftTimeText:{
        flex:1,
        fontSize:10,
        textAlign:'left',
        paddingLeft:10
    },
  
    rightTimeText:{
        flex:1,
        fontSize:10,
        textAlign:'right',
        paddingRight:10
    },


    optionContainer:{
        height:30,
        width:'100%'
    },
    optionText:{
        textAlign:'center',
        color:'#777'
    },
    test1:{
        width:200,
        height:'100%',
        backgroundColor:'gray'
    },

    test2:{
        width:200,
        height:'100%',
        backgroundColor:'red'
    },

    test3:{
        width:200,
        height:'100%',
        backgroundColor:'blue'
    }
})
export default connect(
    ({audio})  =>({
        isPlaying: audio.isPlaying,
        newPlayinfo: audio.newPlayinfo,
        playOption: audio.playOption
    })
)(AlbumControler)