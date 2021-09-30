import AsyncStorage from '@react-native-async-storage/async-storage'
import { StatusBar } from 'expo-status-bar'
import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { Button, FAB, Text } from 'react-native-elements'
import { useHistory } from 'react-router'
import { UserContext } from '../hooks/UserContext'

const Setting = () => {
    const [vis,setVis] = useState(false)
    const [clear, setClear] = useState(false)
    const keluar = async() => {
        try {
            AsyncStorage.removeItem('key')
            AsyncStorage.removeItem('name')
            AsyncStorage.removeItem('photo')
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
                        <FAB title="Logout" 
                            onPress={()=>{setVis(true)
                        }}/>
                    </View>
                    {vis &&
                        <View style={styles.content}>
                            <Text h4>Logout ?</Text>
                            <View style={styles.group}>
                                <Button title="Yes" size={50} type="clear" style={styles.groupItem} onPress={async()=>{
                                    keluar()
                                    setMessage(null)
                                    history.push('/')
                                }}/> 
                                <Button title="No" size={50}  type="clear" style={styles.groupItem} onPress={()=>setVis(false)}/>
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
        justifyContent:'center',
        alignItems: 'center',
    },
    group: {
        justifyContent:'space-around',
        flexDirection:'row',
        height: 100
    },
    groupItem: {
        marginHorizontal: 30
    }
})
