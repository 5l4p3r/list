import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Button, Input } from 'react-native-elements'
import { useHistory, useParams } from 'react-router'
import { UserContext } from '../hooks/UserContext'

const Edit = () => {
    const url = "https://sanctumtyo.herokuapp.com"
    const {id} = useParams()
    const [title, setTitle] = useState('')
    const [article,setArticle] = useState([])
    const [content, setContent] = useState('')
    const getArticle = async() => {
        try {
            let res = await axios.get(`${url}/api/article/${id}`)
            setArticle(res.data)
            res.data.map((item)=>{
                setTitle(item.title)
                setContent(item.content)
            })
        } catch (error) {
            alert(error)
        }
    }
    const history = useHistory()
    useEffect(()=>{
        getArticle()
    },[])
    return (
        <UserContext.Consumer>
            {({setLoad})=>(
                <View style={styles.container}>
                    {article.map((l,i)=>(
                        <View key={i}>
                            <Text h4>Edit List Item</Text>
                            <Input placeholder="Title" defaultValue={`${l.title}`} onChangeText={(e)=>setTitle(e)}/>
                            <Input placeholder="Content" defaultValue={`${l.content}`} onChangeText={(e)=>setContent(e)}/>
                            <Button title="Save" raised onPress={async()=>{
                                try {
                                    const fdata = {
                                        id: id,
                                        title: title,
                                        content: content
                                    }
                                    if(title == '' || content == ''){
                                        alert('Form is empty')
                                    }else{
                                        await axios.post(`${url}/api/article/edit`,fdata).then(()=>{
                                            setLoad(true)
                                            history.push(`/article/${id}`)
                                        })
                                    }
                                } catch (error) {
                                    alert(error)
                                }
                            }}/>
                        </View>
                    ))}
                </View>
            )}
        </UserContext.Consumer>
    )
}

export default Edit

const styles = StyleSheet.create({
    container:{
        flex:1,
        marginTop: 20
    },
})
