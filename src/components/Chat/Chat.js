import React, { createRef } from 'react';
import ChatForm from './ChatForm/ChatForm';
import ChatMessage from './ChatMessage/ChatMessage';
import links from './utility/links';
import './chat.css'
import { nanoid } from 'nanoid';
import Icon, { Stack } from '@mdi/react';
import { mdiCloudDownload, mdiDotsCircle } from '@mdi/js';

export default class Chat extends React.Component {
  constructor(props) {
    super(props)
    this.userId = null;
    this.interval = null;
    this.state = {
      messages: [],
      waiting: false,
    };

    this.messagesElement = createRef();
    this.requestAddMessage = this.requestAddMessage.bind(this);
  }

  setMyId() {
    let hasId = localStorage.getItem('userId');
    if (!hasId) {
      hasId = nanoid();
      localStorage.setItem('userId', hasId);
    }
    this.userId = hasId;
  }

  scrollChat = () => {
    this.messagesElement.current.scrollTop =
      this.messagesElement.current.scrollHeight - this.messagesElement.current.getBoundingClientRect().height;
  }

  requestMessages = async () => {
    let id = 0;
    const countMessages = this.state.messages.length;
    if (countMessages) {
      id = this.state.messages[countMessages - 1].id;
    }

    const response = await fetch(`${links.messages}?from=${id}`);
    const result = await response.json();
    this.setState((prevState) => ({
      messages: [...prevState.messages, ...result],
      waiting: false,
    }));

    if (result.length > 0) {
      this.scrollChat();
    }
  }

  requestAddMessage = async (content) => {
    const response = await fetch(`${links.messages}`, {
      method: 'POST',
      body: JSON.stringify({ userId: this.userId, content }),
    })

    const data = await response.json();

    if (!data.success) return;

    this.setState({ waiting: true })
    this.scrollChat();
  }

  componentDidMount() {
    this.setMyId();

    this.interval = setInterval(() => {
      this.requestMessages();
    }, 5000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    return (
      <div className="chat">
        <ul className="chat__messages" ref={this.messagesElement}>

          {this.state.messages.map((message) =>
            <li className='chat__message-item' key={message.id}>
              <ChatMessage content={message.content} myMessage={message.userId === this.userId} />
            </li>
          )}
          {this.state.waiting && <div className="chat__messages-waiting">
            <Stack>
              <Icon className={'material-icons'} path={mdiDotsCircle} size={1} color={'#73f806'} spin />
              <Icon className={'material-icons'} path={mdiCloudDownload} size={0.5} color={'#4bacfc'} />
            </Stack>
          </div>}
        </ul>
        <ChatForm requestAddMessage={this.requestAddMessage} />
      </div>
    );
  }
}
