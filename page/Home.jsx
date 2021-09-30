import axios from 'axios'
import { StatusBar } from 'expo-status-bar'
import React, { useEffect, useState } from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import { ListItem, SearchBar, Text } from 'react-native-elements'
import { Avatar } from 'react-native-elements/dist/avatar/Avatar'
import { Icon } from 'react-native-elements/dist/icons/Icon'
import PTRView from 'react-native-pull-to-refresh'
import { useHistory } from 'react-router'
import { Link } from 'react-router-native'
import { ArticleContext } from '../hooks/ArticleContext'

const Home = () => {
    const url = "https://sanctumtyo.herokuapp.com"
    const [load, setLoad] = useState(true)
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
    const history = useHistory()
    return (
        <ArticleContext.Provider value={{
            setLoad: setLoad
        }}><View style={styles.container}>
                <StatusBar style="auto"/>
                <SearchBar placeholder="Search..." value={search} onChangeText={(e)=>setSearch(e)}/>
                <PTRView onRefresh={()=>setLoad(true)}>
                    <ScrollView>
                        {article.filter(filtering).map((l,i)=>(
                            <Link to={`/article/${l.id}`} key={i}>
                                <ListItem bottomDivider>
                                    <Avatar source={{uri: `${url}/img/user.png`}}/>
                                    <ListItem.Content>
                                        <ListItem.Title>{l.title}{l.photo}</ListItem.Title>
                                        <ListItem.Subtitle>{l.content}</ListItem.Subtitle>
                                    </ListItem.Content>
                                </ListItem>
                            </Link>
                        ))}
                    </ScrollView>
                </PTRView>
                <Link to="/article/add" style={styles.fab}>
                    <Icon name="pluscircle" size={40}  type="antdesign"/>
                </Link>
            </View>
        </ArticleContext.Provider>
    )
}

export default Home

const styles = StyleSheet.create({
    container: {
        flex:1,
        paddingHorizontal: 10,
        paddingTop:30,
        paddingBottom:20
    },
    search: {
        marginHorizontal:10,
        borderRadius:10
    },
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
    },
})
