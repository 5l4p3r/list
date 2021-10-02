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
import { StatusBar } from 'expo-status-bar'

const App = () => {
  const url = "https://sanctumtyo.herokuapp.com"
  const [show, setShow] = useState(true)
  const [message, setMessage] = useState(null)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState([])
  const [userid, setUserid] = useState(null)

  const login = async() => {
    try {
      const fdata = {
        email: email,
        password: password
      }
      await AsyncStorage.setItem("email", email)
      await AsyncStorage.setItem("password", password)
      await axios.post(`${url}/api/login`,fdata).then(async(res)=>{
        setMessage(res.data.message)
        await AsyncStorage.setItem("key", res.data.message)
        setUserid(res.data.id)
        let resp = await axios.get(`${url}/api/profile/${res.data.id}`)
        setUser(resp.data)
        resp.data.map(async(item)=>{
          await AsyncStorage.setItem('@id',JSON.stringify(item.id))
        })
        await AsyncStorage.setItem('@user',JSON.stringify(resp.data))
      })
      
    } catch (error) {
      console.log(error);
    }
  }
  
   
  const storage = async() => {
    try {
      let email = await AsyncStorage.getItem("email")
      if(email !== null){
        setEmail(email)
      }

      let password = await AsyncStorage.getItem("password")
      if(password !== null){
        setPassword(password)
      }

      let key = await AsyncStorage.getItem("key")
      if(key !== null){
        setMessage(key)
      }

      let user = await AsyncStorage.getItem('@user')
      if(user !== null){
        setUser(JSON.parse(user))
      }

      let userid = await AsyncStorage.getItem('@id')
      if(userid !== null){
        setUserid(JSON.parse(userid))
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
        userid: userid,
      }}>
        <NativeRouter>
          <Route exact path="/" component={Home}/>
          <Route path="/profile" component={Profile}/>
          <Route path="/about" component={About}/>
          <Route path="/setting" component={Setting}/>
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
        <StatusBar style="auto" />
        <Icon name="message1" size={76} type="antdesign"/>
        <Text h4>Login System</Text>
        <Input
          containerStyle = {{borderRadius:10, height:50, borderWidth:1, margin:10}}
          placeholder="Email"
          leftIcon={<Icon name='mail' type="antdesign" size={30}/>}
          value={email}
          onChangeText={(e)=>setEmail(e)}/>
        <Input
          containerStyle = {{borderRadius:10, height:50, borderWidth:1, margin:10, underlineColorAndroid:'#28FFBF'}}
          placeholder="Password" 
          secureTextEntry={show}
          leftIcon={<Icon name='key' type="antdesign" size={30}/>}
          rightIcon={<Icon name="eye" type="antdesign" size={30} onPress={()=>{
            if(show){
              setShow(false)
            }else{
              setShow(true)
            }
          }} />}
          value={password}
          onChangeText={(e)=>setPassword(e)}/>
        <Button
          containerStyle={{ width:'100%',backgroundColor:'#28FFBF' }}
          title="LOGIN"
          type="outline" onPress={()=>login()}
        />
      </View>
    )
  }
}

export default App

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent:'center',
    alignItems: 'center',
    marginHorizontal:10
  },
  nav: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    position:'relative',
    padding: 10,
  },
})
