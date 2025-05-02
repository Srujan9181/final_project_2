import React, { createContext, useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const getInitialState = () => ({
  headerColor: localStorage.getItem('headerColor') || '#33475B',
  defaultDescription: localStorage.getItem('defaultDescription') || "Want to chat with hubly? I'm an chatbot here to help you find your way",
  welcomeMessage1: localStorage.getItem('welcomeMessage1') || "Hello, How can I help you?",
  welcomeMessage2: localStorage.getItem('welcomeMessage2') || "Ask me anything",
  bodyColor: localStorage.getItem('bodyColor') || "#E8E8E8",
  missedChatTimer: localStorage.getItem('missedChatTimer') ? parseInt(localStorage.getItem('missedChatTimer'), 10) : null,
});

const socket = io("localhost:8001");

export const BotContext = createContext();

export const BotContextProvider = ({ children }) => {
  const [botState, setBotState] = useState(getInitialState());

  const updateBotState = (updates) => {
    setBotState(prev => ({ ...prev, ...updates }));
  };

  useEffect(() => {
    const botConfig = {
      headerColor: botState.headerColor,
      welcomeMessages: [botState.welcomeMessage1, botState.welcomeMessage2],
      bodyColor: botState.bodyColor,
      defaultMessages: botState.defaultDescription,
      missedChatTimer: botState.missedChatTimer
    };
    socket.emit("updateConfig", botConfig);
  }, [botState]);

  useEffect(() => {
    const handleConfigUpdated = (newConfig) => {
      if (newConfig) {
        const updates = {
          headerColor: newConfig.headerColor,
          bodyColor: newConfig.bodyColor,
          welcomeMessage1: newConfig.welcomeMessages[0],
          welcomeMessage2: newConfig.welcomeMessages[1],
          defaultDescription: newConfig.defaultMessages,
          missedChatTimer: newConfig.missedChatTimer
        };

        Object.entries(updates).forEach(([key, value]) => {
          if (value !== undefined && value !== null) { // added null check
            localStorage.setItem(key, typeof value === 'object' ? JSON.stringify(value) : value);
          }
        });
        setBotState(prev => ({...prev, ...updates})); // use setBotState
      }
    };

    socket.on("configUpdated", handleConfigUpdated);

    return () => {
      socket.off("configUpdated", handleConfigUpdated);
    };
  }, []);

  const contextValue = {
    ...botState,
    setSelectedheadercolor: (color) => updateBotState({ headerColor: color }),
    setdefaultDesc: (desc) => updateBotState({ defaultDescription: desc }),
    setWelcomeMessaage1: (msg1) => updateBotState({ welcomeMessage1: msg1 }),
    setWelcomeMessaage2: (msg2) => updateBotState({ welcomeMessage2: msg2 }),
    setselectedbodycolor: (color) => updateBotState({ bodyColor: color }),
    setMissedChatTimer: (timer) => updateBotState({ missedChatTimer: timer }),
    missedChatTimer: botState.missedChatTimer,
    selectedbodycolor: botState.bodyColor,
    selectedheadercolor: botState.headerColor,
    welcomemessage1: botState.welcomeMessage1,
    welcomemessage2: botState.welcomeMessage2,
    defaultDesc: botState.defaultDescription,
    botconfig: {
      headerColor: botState.headerColor,
      welcomeMessages: [botState.welcomeMessage1, botState.welcomeMessage2],
      bodyColor: botState.bodyColor,
      defaultMessages: botState.defaultDescription,
      missedChat: botState.missedChatTimer
    }
  };

  return (
    <BotContext.Provider value={contextValue}>
      {children}
    </BotContext.Provider>
  );
};
