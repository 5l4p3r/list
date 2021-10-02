import axios from 'axios'
import { StatusBar } from 'expo-status-bar'
import React, { useContext, useEffect, useState } from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import { Button, Header, Input, ListItem, SearchBar, Text } from 'react-native-elements'
import { Avatar } from 'react-native-elements/dist/avatar/Avatar'
import { Icon } from 'react-native-elements/dist/icons/Icon'
import PTRView from 'react-native-pull-to-refresh'
import { Link } from 'react-router-native'
import { UserContext } from '../hooks/UserContext'

const Home = () => {
    const [load, setLoad] = useState(true)
    const {userid,url} = useContext(UserContext)
    const [frm, setFrm] = useState(false)
    const [title,setTitle] = useState('')
    const [content, setContent] = useState('')
    const [search,setSearch] = useState('')
    const [article,setArticle] = useState([])
    const getArticle = async() => {
        try {
            let res = await axios.get(`${url}/api/articles`)
            setArticle(res.data)
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(()=>{
        if(load){
            getArticle()
            setLoad(false)
        }
    })

    const filtering = (all) => {
        return all.title.toUpperCase().indexOf(search.toUpperCase()) > -1
    }
    return (
        <View style={styles.container}>
            <StatusBar style="auto"/>
            <Header
                backgroundColor="white"
                leftComponent={<Icon name='home'/>}
                centerComponent={<Text h4>List Content</Text>}
                rightComponent={<Icon name='pluscircleo' type="antdesign"/>}
            />
            <SearchBar
                placeholder="Search..." 
                value={search} 
                onChangeText={(e)=>setSearch(e)}/>
            {frm &&
                <View style={styles.form}>
                    <Text h4>Create List</Text>
                    <Input placeholder="Title" onChangeText={e=>setTitle(e)}/>
                    <Input placeholder="Content" numberOfLines={4} multiline={true} onChangeText={e=>setContent(e)}/>
                    <Button title="CREATE" type="outline" onPress={()=>{
                        if(title === '' || content === ''){
                            alert('Form is empty !')
                        }else{
                            const fdata = {
                                userid: userid,
                                title: title,
                                content: content
                            }
                            axios.post(`${url}/api/article`,fdata).then(()=>{
                                setFrm(false)
                                setLoad(true)
                            })
                        }
                    }}/>
                </View>
            }
            <PTRView onRefresh={()=>{
                setLoad(true)
            }}>
                <ScrollView>
                    {article.filter(filtering).map((l,i)=>(
                        <Link to={`/article/${l.id}`} key={i}>
                            <ListItem bottomDivider>
                                <Avatar source={{uri: `${url}/img/user.png`}}/>
                                <ListItem.Content>
                                    <ListItem.Title>{l.title}{l.photo}</ListItem.Title>
                                    <ListItem.Subtitle>{l.content.substring(0,30)}...</ListItem.Subtitle>
                                </ListItem.Content>
                            </ListItem>
                        </Link>
                    ))}
                </ScrollView>
            </PTRView>
            <View style={styles.fab}>
                <Icon name="pluscircleo" size={40} type="antdesign" onPress={()=>{
                    if(frm){
                        setFrm(false)
                    }else{
                        setFrm(true)
                    }
                }}/>
            </View>
        </View>
    )
}

export default Home

const styles = StyleSheet.create({
    container: {
        flex:1,
        paddingBottom:20
    },
    search: {
        marginHorizontal:10,
        borderRadius:10
    },
    fab: {
        position: 'absolute',
        margin: 16,
        right: 10,
        bottom: 10,
    },
    form: {
        paddingHorizontal:10,
        marginVertical: 10
    }
})
