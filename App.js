import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { Button, Icon, Input, Text } from 'react-native-elements'
import { Link, NativeRouter,Route } from 'react-router-native'
import Add from './article/Add'
import Detail from './article/Detail'
import Edit from './article/Edit'
import { UserContext } from './hooks/UserContext'
import About from './page/About'
import Home from './page/Home'
import Profile from './page/Profile'
import Setting from './page/Setting'

const App = () => {
  const url = "https://sanctumtyo.herokuapp.com"
  const [load, setLoad] = useState(true)
  const [posting, setPosting] = useState(false)
  const [article,setArticle] = useState([])
  const [message, setMessage] = useState('error')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [userid, setUserid] = useState(0)
  const [name, setName] = useState('')
  const [photo, setPhoto] = useState('')

  const login = async() => {
    try {
      const fdata = {
        email: email,
        password: password
      }
      await axios.post(`${url}/api/login`,fdata).then(async(res)=>{
        setMessage(res.data.message)
        let resp = await axios.get(`${url}/api/profile/${res.data.id}`)
        resp.data.map((item)=>{
          setName(item.name)
          setUserid(item.id)
          setPhoto(item.photo)
        })
      })
    } catch (error) {
      alert(error)
    }
  }

  const getArticle = async() => {
    let res = await axios.get(`${url}/api/articles`)
    setArticle(res.data)
  }


  useEffect(()=>{
    if(posting){
      login()
      setPosting(false)
    }
    if(load){
      getArticle()
      setLoad(false)
    }
  })


  if(message === 'success'){
    return (
      <UserContext.Provider value={{
        article: article,
        url: url,
        setLoad: setLoad,
        name: name,
        userid: userid,
        photo: photo
      }}>
        <NativeRouter>
          <Route exact path="/" component={Home}/>
          <Route path="/profile" component={Profile}/>
          <Route path="/about" component={About}/>
          <Route path="/setting" component={Setting}/>
          <Route path="/article/add" component={Add}/>
          <Route path="/article/:id" component={Detail}/>
          <Route path="/articleupdate/:id" component={Edit}/>
          <View style={styles.nav}>
            <Link to="/">
              <Icon name="home" size={32}/>
            </Link>
            <Link to="/profile">
              <Icon name="person" size={32}/>
            </Link>
            <Link to="/about">
              <Icon name="info" size={32}/>
            </Link>
            <Link to="/setting">
              <Icon name="menu" size={32}/>
            </Link>
          </View>
        </NativeRouter>
      </UserContext.Provider>
    )
  }else{
    return (
      <View style={styles.container}>
        <Text h4>Login System</Text>
        <Input 
          placeholder="Email"
          leftIcon={<Icon name='email' size={24}/>}
          value={email}
          onChangeText={(e)=>setEmail(e)}/>
        <Input placeholder="Password" secureTextEntry={true}
          leftIcon={<Icon name='star' size={24}/>} 
          value={password}
          onChangeText={(e)=>setPassword(e)}/>
        <Button title="Login Application" size={24} onPress={()=>setPosting(true)}/>
      </View>
    )
  }
}

export default App

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent:'center',
    alignItems: 'center'
  },
  nav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems:'center',
    height: 40,
    position:'relative',
  },
  navItem: {
    backgroundColor:'red'
  }
})
