import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Image, Text } from 'react-native-elements'
import { UserContext } from '../hooks/UserContext'

const Profile = () => {
    return (
        <UserContext.Consumer>
            {({userid,name,photo,url})=>(
                <View style={styles.container}>
                    <StatusBar style="auto"/>
                    <Image source={{ uri: `${url}/img/${photo}` }} style={styles.img}/>
                    <Text h4>{name}</Text>
                </View>
            )}
        </UserContext.Consumer>
    )
}

export default Profile

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        paddingTop: 20,
    },
    img: {
        width:300,
        height: 300,
        borderRadius: 10,
    }
})
