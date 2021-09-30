import axios from 'axios'
import { StatusBar } from 'expo-status-bar'
import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { Button, Input, Text } from 'react-native-elements'
import { useHistory } from 'react-router'
import { ArticleContext } from '../hooks/ArticleContext'

const Create = () => {
    const [title,setTitle] = useState('')
    const [content, setContent] = useState('')
    const [userid, setUserid] = useState(0)
    const history = useHistory()
    return (
        <ArticleContext.Consumer>
            {({setLoad})=>(
                <View style={styles.container}>
                    <StatusBar style="auto"/>
                    <Text h4 style={{marginBottom: '20px'}}>Create List Item</Text>
                    <Input placeholder="Title..." onChangeText={(e)=>setTitle(e)}/>
                    <Input
                        placeholder="Content..."
                        multiline={true}
                        numberOfLines={5}
                        onChangeText={(e)=>setContent(e)}/>
                    <Button title="Create" raised onPress={async()=>{
                        try {
                            const fdata = {
                                userid: userid,
                                title: title,
                                content: content
                            }
                            if(title == '' || content == ''){
                                alert('Form is empty')
                            }else{
                                await axios.post(`${url}/api/article`,fdata).then(()=>{
                                    setLoad(true)
                                    history.push('/')
                                })
                            }
                        } catch (error) {
                            console.log(error);
                        }
                    }}/>
                </View>
            )}
        </ArticleContext.Consumer>
    )
}

export default Create

const styles = StyleSheet.create({
    container:{
        flex:1,
        marginTop: 20,
        paddingTop:100
    },
})
