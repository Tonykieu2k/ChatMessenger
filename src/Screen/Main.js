import { StyleSheet, Text, View, Keyboard, KeyboardAvoidingView, TouchableWithoutFeedback } from 'react-native'
import React, { useState, useCallback, useEffect } from 'react'
import { Bubble, GiftedChat, Send } from 'react-native-gifted-chat'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'


export default function Main({ navigation }) {

  const [messages, setMessages] = useState([]);

  useEffect(() => {
    
      setMessages([
        {
          _id: 1,
          text: 'Chào mừng Quý khách đã ghé thăm SOJO Hotels Chúc quý khách hàng một ngày mới tốt lành, chúng tôi hi vọng bạn giữ sức khỏe tốt, tinh thần thoải mái và nếu cần một nơi thư giãn thì đừng bỏ lỡ các ưu đãi hấp dẫn của SOJO Hotels nhé!',
          image: 'https://media.sojohotels.com/o-la-ket-he-la-game/01976337b10de118bae41654253194453.png',
          createdAt: new Date(),
          quickReplies: {
            type: 'radio', // or 'checkbox',
            keepIt: true,
            values: [
              {
                title: '😋 Yes',
                value: 'yes',
              },
              {
                title: '📷 Yes, let me show you with a picture!',
                value: 'yes_picture',
              },
              {
                title: '😞 Nope. What?',
                value: 'no',
              },
            ],
          },
          user: {
            _id: 2,
            avatar: 'https://chat.tng-holdings.vn/favicon_hotel.png',
          },
        },

      ])
    
  }, [])

  const onSend = useCallback((messages = []) => {
    setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
  }, [])

  const renderSend = (props) => {
    return (
      <Send {...props}>
        <View>
          <MaterialCommunityIcons 
            name="send-circle" 
            size={32} 
            style={{marginBottom: 5, marginRight: 5}}  
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

  const scrollToBottomComponent = () => {
    return (
      <FontAwesome name='angle-double-down' size={22} color='#333' />
    )
  }

  return (
    <KeyboardAvoidingView style={styles.container}>
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>

       <View style={{height: '100%', width: '100%'}}>
         <View style={{height: '7%', width: '100%'}}>
            <View style={{ height: '100%', backgroundColor: '#6622aa', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
              <MaterialCommunityIcons name="chevron-left" size={35} color='#fff' />
              <Text style={{color: '#fff', fontSize: 20, fontWeight: 'bold'}}>SOJO Hotel </Text>
              <Text style={{color: '#6622aa'}}>CSKH</Text>
            </View>
        </View>
        <View style={{height: '93%', width: '100%'}} >
          <GiftedChat
            messages={messages}
            onSend={messages => onSend(messages)}
            user={{
              _id: 1,
            }}
            placeholder='Nhập tin nhắn'
            renderBubble={renderBubble}
            alwaysShowSend={true}
            renderSend={renderSend}
            scrollToBottom={true}
            scrollToBottomComponent={scrollToBottomComponent}
            isTyping={true}
          />
        </View>

       </View>
        
    </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
})