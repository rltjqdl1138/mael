import React, {Component} from 'react'
import {StyleSheet, View, Animated, Dimensions } from 'react-native'
import { connect } from 'react-redux'
import {NavigatorActions} from '../store/actionCreator'


export const Route = () => null
const _width = Dimensions.get('window').width

const buildSceneConfig = (children = [])=>{
    const config = {}
    children.forEach(child => {
        config[child.props.name] =
            {key: child.props.name,
            component: child.props.component,
            conf: {}
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
    _defaultAnime = {
        width: _width,
        from: _width,
        to: 0
    }
    _sidebarAnime = {
        width:200,
        from:-200,
        to:0
    }
    handleSidebarPush = ()=>{
        const {stack} = this.state
        const isThere = (element) => element['key'] === 'Sidebar'
        const ind = stack.findIndex(isThere)
        
        if(ind === -1){
            this._animatedValue.setValue(-(_width/2))
            this.setState(state => ({
                ...state,
                stack: [...state.stack, state.sceneConfig['Sidebar']], 
            }),()=>{
                Animated.timing(this._animatedValue,{
                    toValue: 0,
                    duration: 250,
                    useNativeDriver: true
                }).start()
            })
        }
    }
    handleSidebarPop= () => {
        const isThere = (element) => element['key'] === 'Sidebar'
        const {stack} = this.state
        const ind = stack.findIndex(isThere)
        if(ind === stack.length - 1){
            Animated.timing(this._animatedValue,{
                toValue: -(_width/2),
                duration: 250,
                useNativeDriver: true
            }).start(()=>{
                this._animatedValue.setValue(0)
                this.setState(state =>{
                    const {stack} = state
                    if(stack.length > 1){
                        return {
                            ...state,
                            stack: stack.slice(0, stack.length - 1)
                        }
                    }
                    return state
                })
            })
        }
    }

    handlePush = (sceneName, conf) =>{
        if(sceneName === 'Sidebar')
            return this.handleSidebarPush()

        else if(this.state.stack[this.state.stack.length - 1]['key']==='Sidebar'){
            this.handleSidebarPop()
            this._animatedValue.setValue(0)
        }

        const config = this._defaultAnime
        //if(sceneName === 'Sidebar')
        //    config = this._sidebarAnime
        const {width, from, to} = config

        const isThere = (element) => element['key'] === sceneName
        const {stack} = this.state
        const ind = stack.findIndex(isThere)
        this.state.sceneConfig[sceneName].conf = conf
        if(ind === -1)
            this.setState(state => ({
                ...state,
                stack: [...state.stack, state.sceneConfig[sceneName]], 
            }),()=>{
                this._animatedValue.setValue(width)
                Animated.timing(this._animatedValue,{
                    toValue: to,
                    duration: 250,
                    useNativeDriver: true
                }).start()
            })
    }

    handlePop = (sceneName) =>{
        if(sceneName === 'Sidebar')
            return this.handleSidebarPop()

        else if(this.state.stack[this.state.stack.length - 1]['key']==='Sidebar'){
            this.handleSidebarPop()
            this._animatedValue.setValue(_width)
        }

        const width = Dimensions.get('window').width
        const isThere = (element) => element['key'] === sceneName

        Animated.timing(this._animatedValue,{
            toValue: width,
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
                        stack: stack.slice(0, stack.length - 1)
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
                                conf={scene.conf}
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
        width:'100%',
        height:'100%'
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