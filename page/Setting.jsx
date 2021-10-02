import AsyncStorage from '@react-native-async-storage/async-storage'
import { StatusBar } from 'expo-status-bar'
import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { Button,Text } from 'react-native-elements'
import { useHistory } from 'react-router'
import { UserContext } from '../hooks/UserContext'

const Setting = () => {
    const [vis,setVis] = useState(false)
    const keluar = async() => {
        try {
            AsyncStorage.removeItem('key')
            AsyncStorage.removeItem('@id')
            AsyncStorage.removeItem('@user')
            return true
        } catch (error) {
            console.log(error);
        }
    }
    const history = useHistory()
    return (
        <UserContext.Consumer>
            {({setMessage})=>(
                <View style={styles.container}>
                    <StatusBar style="auto"/>
                    <View style={styles.logout}>
                        <Button title="Logout" type="clear" onPress={()=>setVis(true)}/>
                    </View>
                    {vis &&
                        <View style={{flex:1}}>
                            <View style={styles.content}>
                                <View style={{alignItems:'center'}}>
                                    <Text h4>Logout ?</Text>
                                </View>
                                <View style={styles.group}>
                                    <Button title="Yes" size={50} type="clear" style={styles.groupItem} onPress={async()=>{
                                        keluar()
                                        setMessage(null)
                                        history.push('/')
                                    }}/> 
                                    <Button title="No" size={50}  type="clear" style={styles.groupItem} onPress={()=>setVis(false)}/>
                                </View>
                            </View>
                        </View>
                    }
                </View>
            )}
        </UserContext.Consumer>
    )
}

export default Setting

const styles = StyleSheet.create({
    logout: {
        flex: 1,
        alignItems:'flex-end',
        marginTop:50,
        marginRight:20
    },
    container: {
        flex: 1,
    },
    content: {
        flex:12,
    },
    group: {
        justifyContent:'space-evenly',
        flexDirection:'row',
    },
    groupItem: {
        marginHorizontal: 30
    },
})
