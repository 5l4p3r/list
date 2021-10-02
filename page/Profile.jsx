import { StatusBar } from 'expo-status-bar'
import React, { useContext } from 'react'
import { StyleSheet, View } from 'react-native'
import { Image, Text } from 'react-native-elements'
import { UserContext } from '../hooks/UserContext'

const Profile = () => {
    const {url, user} = useContext(UserContext)
    return (
        <View style={styles.container}>
            {user.map((item,i)=>(
                <View key={i} style={styles.container}>
                    <StatusBar style="auto"/>
                    <Image source={{ uri: `${url}/img/${item.photo}` }} style={styles.img}/>
                    <Text h4>{item.name}</Text>
                </View>
            ))}
        </View>
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
