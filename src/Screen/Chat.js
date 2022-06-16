import { StyleSheet, Text, View, Keyboard, KeyboardAvoidingView, Pressable, TouchableWithoutFeedback, TouchableOpacity } from 'react-native'
import React, { useState, useCallback, useEffect } from 'react'
import { Bubble, GiftedChat, Send } from 'react-native-gifted-chat'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import SockJsClient from 'react-stomp';
import axios from 'axios'
import jwt from 'jwt-decode'


const SOCKET_URL = `https://bchat.tng-holdings.vn/ws-message`;

export default function Chat({ onHome }) {

  const [socketSendMess, setSocketSendMess] = useState();
  const [messages, setMessages] = useState([]);
  const [infoUser, setInfoUser] = useState({})
  const [users, setUsers] = useState()
  const [isTyping, setIsTyping] = useState(true)
  console.log('isTyping', isTyping)
  const token = 'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MmFhOGVhNTg2MmZlYzAwMTFjMTg0ZjkiLCJyb2xlIjoiY3VzdG9tZXIiLCJ1c2VybmFtZSI6InZ1dHJhbmFuaDk4aG5AZ21haWwuY29tIiwiZW1haWwiOiJ2dXRyYW5hbmg5OGhuQGdtYWlsLmNvbSIsInBob25lIjoiMDM0MzQyMzM5OCIsImlhdCI6MTY1NTM0ODc5MSwiZXhwIjoxNjU3OTQwNzkxfQ.VU8QTYAad-by3_6GsGe1WWmyN71N6qY1xVbeUgf5l3aqv6RlPTpVHsAnW8NAiD_zGPu5p1fg6AsAfTNCyEUU-w'

  const onConnected = () => {
    console.log('connect')
  }

  const onMessageReceived = (msg) => {
    setSocketSendMess(msg);
  }

  useEffect(() => {

    getUser()
    parseJwt(token)

    socketSendMess ? (
      setTimeout(() => {
        setIsTyping(!isTyping),
          addMessenger()
      }, 3000)
    ) : null
  }, [socketSendMess])

  useEffect(() => {
    setTimeout(() => {

      const addArr =
      {
        _id: Math.random() + 1,
        text: 'Chào mừng anh/chị đến với SOJO Hotels! Hãy trò chuyện với tôi như một người bạn!',
        createdAt: new Date(),
        user: {
          _id: 2,
          avatar: 'https://chat.tng-holdings.vn/favicon_hotel.png',

        },
      }
      setIsTyping(!isTyping)
      setMessages(previousMessages => GiftedChat.append(previousMessages, addArr))
    }, 1000)
  }, [])

  async function getUser() {
    try {
      const response = await axios.get('https://bchat.tng-holdings.vn/web/api/livechat/getuser?botId=1');
      setInfoUser(response.data.chatUser)
    } catch (error) {
      console.error(error);
    }
  }
  const addMessenger = () => {
    const addArr =
    {
      _id: Math.random() + 1,
      text: socketSendMess.message,
      createdAt: new Date(),
      user: {
        _id: 2,
        name: socketSendMess.name,
        avatar: 'https://chat.tng-holdings.vn/favicon_hotel.png',

      },
    }
    setMessages(previousMessages => GiftedChat.append(previousMessages, addArr))
  }


  async function sendMessenger(text) {
    try {
      await axios.post(`https://bchat.tng-holdings.vn/web/chat/1/message?user_id=${infoUser.id}&name=${infoUser.name}5&payload_id=&message=${text}`);
    } catch (error) {
      console.error(error);
    }
  }


  const onSend = (messages) => {
    setIsTyping(!isTyping)
    sendMessenger(messages[0].text)
    setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
  }

  const renderSend = (props) => {
    return (
      <Send {...props}>
        <View>
          <MaterialCommunityIcons
            name="send-circle"
            size={32}
            style={{ marginBottom: 5, marginRight: 5 }}
            color="#6622aa" />
        </View>
      </Send>
    );
  }

  const renderBubble = (props) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: '#6622aa'
          }
        }}
        textStyle={{
          right: {
            color: '#fff'
          }
        }}
      />
    );
  }
  const parseJwt = (token) => {
    try {
      const user = jwt(token);
      setUsers(user)
    } catch (e) {
      return null;
    }
  };
  const scrollToBottomComponent = () => {
    return (
      <FontAwesome name='angle-double-down' size={22} color='#333' />
    )
  }

  return (
    <>
      <Pressable>
        <View style={{ height: 50, backgroundColor: '#6622aa', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <TouchableOpacity
            onPress={onHome}
          >
            <MaterialCommunityIcons name="chevron-left" size={35} color='#fff' />

          </TouchableOpacity>
          <Text style={{ color: '#fff', fontSize: 20, fontWeight: 'bold' }}>SOJO Hotel </Text>
          <Text style={{ color: '#6622aa' }}>CSKH</Text>
        </View>
      </Pressable>

      <GiftedChat
        messages={messages}
        onSend={messages => onSend(messages)}
        user={{
          _id: infoUser.id,
        }}
        placeholder='Nhập tin nhắn'
        renderBubble={renderBubble}
        alwaysShowSend={true}
        renderSend={renderSend}
        scrollToBottom={true}
        scrollToBottomComponent={scrollToBottomComponent}
        isTyping={isTyping}
        keyboardShouldPersistTaps='never'
      />

      <SockJsClient
        url={SOCKET_URL}
        topics={[`/topic/sendMessagePlugin/${infoUser.id}`]}
        onConnect={onConnected}
        onMessage={msg => onMessageReceived(msg)}
        debug={false}
      />
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
})