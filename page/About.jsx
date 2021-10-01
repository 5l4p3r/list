import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Text } from 'react-native-elements'

const About = () => {
    return (
        <View style={styles.container}>
            <StatusBar style="auto"/>
            <Text h4>aPPs rECEh</Text>
            <Text h3>React Native Base</Text>
            <Text h5>This App Made By 5l4p3r</Text>
        </View>
    )
}

export default About

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent:'center',
        alignItems: 'center'
    },
})
