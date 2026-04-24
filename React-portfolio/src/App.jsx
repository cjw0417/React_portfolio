import { useState } from 'react'
import Cursor from './components/Cursor'
import ServerBar from './components/ServerBar'
import ChannelSidebar from './components/ChannelSidebar'
import ChatArea from './components/ChatArea'
import './App.scss'

function App() {
  const [activeChannel, setActiveChannel] = useState('welcome')
  const [visibleChannels, setVisibleChannels] = useState(['welcome'])

  return (
    <>
      <Cursor />
      <div className="discord-layout">
        <ServerBar activeChannel={activeChannel} />
        <ChannelSidebar
          activeChannel={activeChannel}
          visibleChannels={visibleChannels}
        />
        <ChatArea
          setActiveChannel={setActiveChannel}
          setVisibleChannels={setVisibleChannels}
        />
      </div>
    </>
  )
}

export default App
