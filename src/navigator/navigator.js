import React, {Component} from 'react'
import {StyleSheet, View, Animated, Dimensions } from 'react-native'
import { connect } from 'react-redux'
import {NavigatorActions} from '../store/actionCreator'

const {width} = Dimensions.get('window')

export const Route = () => null

const buildSceneConfig = (children = [])=>{
    const config = {}
    children.forEach(child => {
        config[child.props.name] =
            {key: child.props.name,
            component: child.props.component
        }
    })
    return config
}


export class Navigator extends Component {
    constructor(props){
        super(props)

        const sceneConfig = buildSceneConfig(props.children)
        const initialSceneName = props.children[0].props.name

        this.state = {
            sceneConfig,
            stack: [sceneConfig[initialSceneName]]
        }
        NavigatorActions.register({
            id:props.id,
            push:this.handlePush,
            pop:this.handlePop
        })
    }

    _animatedValue = new Animated.Value(0)

    handlePush = (sceneName) =>{
        const isThere = (element) => element['key'] === sceneName
        const {stack} = this.state
        const ind = stack.findIndex(isThere)

        if(ind === -1)
            this.setState(state => ({
                ...state,
                stack: [...state.stack, state.sceneConfig[sceneName]], 
            }),()=>{
                this._animatedValue.setValue(-width)
                Animated.timing(this._animatedValue,{
                    toValue: 0,
                    duration: 250,
                    useNativeDriver: true
                }).start()
            })
    }

    handlePop = (sceneName) =>{
        const isThere = (element) => element['key'] === sceneName

        Animated.timing(this._animatedValue,{
            toValue: -width,
            duration: 250,
            useNativeDriver: true
        }).start(()=>{
            this._animatedValue.setValue(0)
            this.setState(state =>{
                const {stack} = state
                const ind = stack.findIndex(isThere)
                if(!sceneName || sceneName===""||ind===-1){
                    return {
                        ...state,
                        stack: stack.slice(0, 1)
                    }
                }
                else if(stack.length > ind){
                    return {
                        ...state,
                        stack: stack.slice(0, stack.length - ind)
                    }
                }
                return state
            })
        })
    }
    render(){
        return (
            <View style={styles.container}>
                {this.state.stack.map((scene, index)=>{
                    const CurrentScene = scene.component
                    const sceneStyles = [styles.scene]

                    if(index === this.state.stack.length -1 && index > 0){
                        sceneStyles.push({
                            transform:[
                                { translateX: this._animatedValue}
                            ]
                        })
                    }

                    return (
                        <Animated.View key={scene.key} style={sceneStyles}>
                            <CurrentScene
                                navigator={{push:this.handlePush, pop:this.handlePop}}
                            />
                        </Animated.View>
                    )
                })}
            </View>

        )
    }
}
StyleSheet.create({
    container:{

    }
})

const styles = StyleSheet.create({
    container:{
        flex: 1
    },
    scene: {
        ...StyleSheet.absoluteFillObject,
        flex: 1,
    }
})



export default connect(
    (state)  =>({
        isSidebarOpen: state.navigator.isSidebarOpen,
        navList: state.navigator.navList
    })
)(Navigator)