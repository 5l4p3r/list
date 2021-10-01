import axios from 'axios'
import React, { useState } from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import { Button, Input, Text } from 'react-native-elements'
import { useHistory } from 'react-router'
import { UserContext } from '../hooks/UserContext'

const Add = () => {
    const [title,setTitle] = useState('')
    const [content, setContent] = useState('')
    const history = useHistory()
    return (
        <UserContext.Consumer>
            {({url,userid})=>(
                <ScrollView>
                    <View style={styles.container}>
                        <Text h4 style={styles.title}>Create List</Text>
                        <Input
                            placeholder="Title..."
                            onChangeText={e=>setTitle(e)}
                        />
                        <Input 
                            placeholder="Content..."
                            multiline={true}
                            numberOfLines={4}
                            onChangeText={e=>setContent(e)}
                        />
                        <Button title="CREATE" type="outline" onPress={async()=>{
                            try {
                                const fdata = {
                                    userid: userid,
                                    title: title,
                                    content: content
                                }
                                await axios.post(`${url}/api/article`,fdata).then((res)=>{
                                    alert("List Created")
                                    history.push('/')
                                })
                            } catch (error) {
                                alert("Failed");
                            }
                        }}/>
                    </View>
                </ScrollView>
            )}
        </UserContext.Consumer>
    )
}

export default Add

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        paddingHorizontal:10
    },
    title: {
        marginVertical:20
    }
})
