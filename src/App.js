import React, { useState, useEffect } from 'react';
import { FormControl, Input, } from '@material-ui/core';
import Message from './Message';
import './App.css';
import firebase from 'firebase';
import { db } from './firebase';
import FlipMove from 'react-flip-move';
import SendIcon from '@material-ui/icons/Send';
import { IconButton } from '@material-ui/core';

function App() {

  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [username, setUsername] = useState('');

  //useState = variable in REACT; useEffect = run code on a condition in REACT

  useEffect(() => {
    // run once when the app component loads
    db.collection('messages')
      .orderBy('timestamp', 'asc')  //asc - ascending order; desc - descending order
      .onSnapshot(snapshot => {
        // Looping through the document array in my firebase database
        setMessages(snapshot.docs.map(doc => ({ id: doc.id, message: doc.data() })))
      })
  }, [])

  useEffect(() => {
    setUsername(prompt('Please enter your name'))

  }, []) //condition

  // console.log(input);
  // console.log(messages);

  const sendMessage = (evt) => {
    // All the logic to send a message goes here
    evt.preventDefault();
    // window.scrollTo(0, 9999999);
    db.collection('messages').add({
      message: input,
      username: username,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    })

    // setMessages([
    //   ...messages, { username: username, text: input }
    // ])

    // setTimeout(() => {
    //   const chat = document.getElementById('chat');
    //   chat.scroll({ behavior: "smooth"})
    //   chat.scrollTop = chat.scrollHeight;
    // }, 500);
    setInput('');
  }


  return (
    <div className="App">
      <div className="container">
        <header className="header">
          <img className="header__logo" src="https://facebookbrand.com/wp-content/uploads/2018/09/Header-e1538151782912.png?w=100&h=100" alt="Facebook Messenger Logo" />

          
          <h1 className="header__title">NGO-TECH Facebook Messenger Clone 🔥 </h1>
          <h2 className="greetings">Welcome {username}</h2>

          {/* Toggle Functionality */}

        </header>

        <div id="chat" className="messageList">
          <FlipMove>
            {/* Messages themselves */}
            {
              messages.map(({ id, message }) => (
                <Message key={id} username={username} message={message} />
              ))
            }
          </FlipMove>
        </div>

        <footer className="footer">
          <form className="app__form">
            <FormControl className="app__formControl">
              <Input className="app__input" placeholder="Enter a message..." value={input} onChange={event => setInput(event.target.value)} />
              <IconButton className="app__iconButton" disabled={!input} variant="contained" color="primary" type="submit" onClick={sendMessage}>
                <SendIcon />
              </IconButton>

              {/* <Button >Send Message</Button> */}
            </FormControl>
          </form>
        </footer>

      </div>
    </div>
  );
}

export default App;
