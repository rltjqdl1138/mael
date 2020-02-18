import React from 'react';
import { Provider } from 'react-redux'
import { StyleSheet, Text, View } from 'react-native';
import store from './src/store'
import Mainpage from './src/pages/mainpage'

export default function App() {
    return (
        <Provider store={store}>
            <View style={styles.iphonePadding} />
            <View style={styles.container}>
                <Mainpage />
            </View>
        </Provider>
    );
}

const styles = StyleSheet.create({
        container: {
        flex: 29,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    iphonePadding:{
        flex:1
    }
});
