import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import { Button, Divider, Text } from 'react-native-elements'
import { useHistory, useParams } from 'react-router'
import { UserContext } from '../hooks/UserContext'

const Detail = () => {
    const url = "https://sanctumtyo.herokuapp.com"
    const {id} = useParams()
    const [article,setArticle] = useState([])
    const getArticle = async() => {
        try {
            let res = await axios.get(`${url}/api/article/${id}`)
            setArticle(res.data)
        } catch (error) {
            console.log(error);
        }
    }
    const history = useHistory()
    useEffect(()=>{
        getArticle()
    },[])
    return (
        <UserContext.Consumer>
            {({userid})=>(
                <ScrollView>
                {article.map((l,i)=>(
                    <View key={i} style={styles.container}>
                        <Text h3 style={styles.title}>{l.title}</Text>
                        <Divider/>
                        <Text style={styles.paragraf}>{l.content}</Text>
                        <Divider/>
                        {l.userid === userid && 
                            <View style={styles.group}>
                                <Button title="Edit" type="clear" onPress={()=>{
                                    history.push(`/articleupdate/${l.id}`)
                                }}/>
                                <Button style={{borderColor:'red'}} title="Delete" type="clear" onPress={()=>{
                                    axios.delete(`${url}/api/article/${l.id}`).then(()=>{
                                        history.push('/')
                                    })
                                }}/>
                            </View>
                        }
                    </View>
                ))}
            </ScrollView>
            )}
        </UserContext.Consumer>
    )
}

export default Detail

const styles = StyleSheet.create({
    container: {
        flex:1,
        paddingTop:30,
        paddingBottom:20,
        paddingHorizontal:10,
        justifyContent:'flex-start',
        alignItems:'flex-start'
    },
    group: {
        marginTop: 20,
        flexDirection:'row',
        justifyContent:'space-around',
        height: 40
    },
    groupItem: {
        width: '100%',

    },
    title: {
        marginBottom: 20
    },
    paragraf: {
        textAlign: 'justify',
    },
})
