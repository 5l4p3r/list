import axios from 'axios'
import { StatusBar } from 'expo-status-bar'
import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { Button, Input, Text } from 'react-native-elements'
import { useHistory } from 'react-router'
import { UserContext } from '../hooks/UserContext'

const Add = () => {
    const [title,setTitle] = useState('')
    const [content, setContent] = useState('')
    const history = useHistory()
    return (
        <UserContext.Consumer>
            {({userid,url})=>(
                <View style={styles.container}>
                    <StatusBar style="auto"/>
                    <Text h4>Create List Item</Text>
                    <Input placeholder="Title..." onChangeText={(e)=>setTitle(e)}/>
                    <Input placeholder="Content..." onChangeText={(e)=>setContent(e)}/>
                    <Button title="Create" raised onPress={()=>{
                        try {
                            const fdata = {
                                userid: userid,
                                title: title,
                                content: content
                            }
                            if(title == '' || content == ''){
                                alert('Form is empty')
                            }else{
                                axios.post(`${url}/api/article`,fdata).then(()=>{
                                    history.push('/')
                                })
                            }
                        } catch (error) {
                            console.log(error);
                        }
                    }}/>
                </View>
            )}
        </UserContext.Consumer>
    )
}

export default Add

const styles = StyleSheet.create({
    container:{
        flex:1,
        marginTop: 20,
        paddingTop:100
    },
})
