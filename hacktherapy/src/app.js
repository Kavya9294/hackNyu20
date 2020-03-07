import React from 'react';
import { Chat, Channel, ChannelHeader, Thread, Window } from 'stream-chat-react';
import { MessageList, MessageInput } from 'stream-chat-react';
import { StreamChat } from 'stream-chat';

import 'stream-chat-react/dist/css/index.css';

const chatClient = new StreamChat('p5rk553jdknd');
const userToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoiZmFsbGluZy1zbm93LTMifQ.IQp3ELMKgqN6prCCWtrYJVCMynVBxnfgax4VBdFIfTY';
//const chatbot = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoiZmFsbGluZy1zbm93LTMifQ.IQp3ELMKgqN6prCCWtrYJVCMynVBxnfgax4VBdFIfTY';

chatClient.setUser(
  {
       id: 'falling-snow-3',
       name: 'Falling snow',
       image: 'https://getstream.io/random_svg/?id=falling-snow-3&name=Falling+snow'
  },
  userToken,
);

const channel = chatClient.channel('messaging', 'godevs', {
  // add as many custom fields as you'd like
  image: 'https://cdn.chrisshort.net/testing-certificate-chains-in-go/GOPHER_MIC_DROP.png',
  name: 'Talk about Go',
});

channel.on("message.new", event => {

  fetch('https://us-central1-neural-sunup-253704.cloudfunctions.net/user_text', {
  method: 'POST',
  mode: 'no-cors',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    firstParam: event.message.text
    })
  }).then(res=>{
    console.log(res)
    return res;
  }).catch(err=>{
    console.log(err)
  })


});


const App = () => (
  <Chat client={chatClient} theme={'messaging light'}>
    <Channel channel={channel}>
      <Window>
        <ChannelHeader />
        <MessageList />
        <MessageInput />
      </Window>
      <Thread />
    </Channel>
  </Chat>
);

export default App;
