import React from 'react';
import styled from 'styled-components';
import ChatList from 'Components/Chat/ChatList';
import { LayoutStyle } from 'Styles/Layout';
import ChatContent from 'Components/Chat/ChatContent';

const PCChat = () => {
  return (
    <PCChatLayout>
      <ChatList />
      <ChatDetailLayout>
        <ChatContent />
      </ChatDetailLayout>
    </PCChatLayout>
  );
};

const PCChatLayout = styled.main`
  ${LayoutStyle}
  max-width: 100%;
  display: flex;
  gap: 4px;
  padding: 0 0 0 10px;
  margin: 0 0 0 335px;
`;

const ChatDetailLayout = styled.div`
  flex-grow: 1;
`;

export default PCChat;
