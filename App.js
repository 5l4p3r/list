import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { StyleSheet,View } from 'react-native'
import { Button, Icon, Input, Text } from 'react-native-elements'
import { Link, NativeRouter,Route } from 'react-router-native'
import Detail from './article/Detail'
import Edit from './article/Edit'
import { UserContext } from './hooks/UserContext'
import About from './page/About'
import Home from './page/Home'
import Profile from './page/Profile'
import Setting from './page/Setting'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Create from './article/Create'

const App = () => {
  const url = "https://sanctumtyo.herokuapp.com"
  const [show, setShow] = useState(true)
  const [message, setMessage] = useState(null)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState([])

  const login = async() => {
    try {
      const fdata = {
        email: email,
        password: password
      }
      await axios.post(`${url}/api/login`,fdata).then(async(res)=>{
        setMessage(res.data.message)
        await AsyncStorage.setItem("key", res.data.message)
        let resp = await axios.get(`${url}/api/profile/${res.data.id}`)
        setUser(resp.data)
        await AsyncStorage.setItem('@user',JSON.stringify(resp.data))
      })
      
    } catch (error) {
      alert(error)
    }
  }
  
   
  const storage = async() => {
    try {
      let key = await AsyncStorage.getItem("key")
      if(key !== null){
        setMessage(key)
      }

      let user = await AsyncStorage.getItem('@user')
      if(user !== null){
        setUser(JSON.parse(user))
      }

    } catch (error) {
      console.log(error);
    }
  }

  useEffect(()=>{
    storage()
  },[])


  if(message === 'success'){
    return (
      <UserContext.Provider value={{
        url: url,
        setMessage: setMessage,
        user: user,
      }}>
        <NativeRouter>
          <Route exact path="/" component={Home}/>
          <Route path="/profile" component={Profile}/>
          <Route path="/about" component={About}/>
          <Route path="/setting" component={Setting}/>
          <Route path="/article/add" component={Create}/>
          <Route path="/article/:id" component={Detail}/>
          <Route path="/articleupdate/:id" component={Edit}/>
          <View style={styles.nav}>
            <Link to="/">
              <Icon name="home" type="antdesign" size={30}/>
            </Link>
            <Link to="/profile">
              <Icon name="user" type="antdesign" size={30}/>
            </Link>
            <Link to="/about">
              <Icon name="info" type="antdesign" size={30}/>
            </Link>
            <Link to="/setting">
              <Icon name="setting" type="antdesign" size={30}/>
            </Link>
          </View>
        </NativeRouter>
      </UserContext.Provider>
    )
  }else{
    return (
      <View style={styles.container}>
        <Icon name="wordfile1" size={76} type="antdesign"/>
        <Text h4>Login System</Text>
        <Input 
          placeholder="Email"
          leftIcon={<Icon name='mail' type="antdesign" size={24}/>}
          value={email}
          onChangeText={(e)=>setEmail(e)}/>
        <Input placeholder="Password" secureTextEntry={show}
          leftIcon={<Icon name='key' type="antdesign" size={24}/>}
          rightIcon={<Icon name="eye" type="antdesign" size={24} onPress={()=>{
            if(show){
              setShow(false)
            }else{
              setShow(true)
            }
          }} />}
          value={password}
          onChangeText={(e)=>setPassword(e)}/>
        <Button title="Logn" type="clear" onPress={()=>login()}/>
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
    marginBottom:10
  },
  navItem: {
    backgroundColor:'red'
  }
})
