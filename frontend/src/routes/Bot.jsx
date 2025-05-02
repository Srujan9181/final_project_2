import React, { useContext } from "react";
import styles from "../styles/chatbotpanelnew.module.css";
import chatIcon from "../assets/chatIconNew.svg";
import sendIcon from "../assets/sendIconNew.svg";
import { BotContext } from "../context/BotContext.jsx";
import TimePicker from "./TimePicker.jsx";

function ChatBotPanelNew() {
  const {
    setSelectedHeaderColor,
    setDefaultDesc,
    setWelcomeMessage1,
    setWelcomeMessage2,
    setSelectedBodyColor,
    selectedBodyColor,
    selectedHeaderColor,
    welcomeMessage1,
    welcomeMessage2,
    defaultDesc,
  } = useContext(BotContext);

  const handleHeaderColorChange = (color) => {
    setSelectedHeaderColor(color);
    localStorage.setItem('selectedHeaderColor', color);
  };

  const handleBodyColorChange = (color) => {
    setSelectedBodyColor(color);
    localStorage.setItem('selectedBodyColor', color);
  };

  const handleWelcomeMessageChange = (value, isFirstMessage) => {
    if (isFirstMessage) {
      setWelcomeMessage1(value);
      localStorage.setItem('welcomeMessage1', value);
    } else {
      setWelcomeMessage2(value);
      localStorage.setItem('welcomeMessage2', value);
    }
  };

  const handleDefaultMessageChange = (value) => {
    setDefaultDesc(value);
    localStorage.setItem('defaultDesc', value);
  };

  return (
    <div className={styles.container}>
      <div className={styles.leftPanel}>
        <div className={styles.previewSection}>
          <div className={styles.header}>
            <img src={chatIcon} alt="chat icon" />
            <h2 className={styles.chatTitle}>Hubly</h2>
          </div>

          <div className={styles.body}></div>

          <div className={styles.messageSection}>
            <textarea
              className={styles.messageInput}
              placeholder="Write a message"
            ></textarea>
            <button className={styles.sendButton}>
              <img src={sendIcon} alt="send" />
            </button>
          </div>
        </div>

        <div className={styles.welcomeMessage}>
          <img src={chatIcon} alt="chat icon" />
          <p className={styles.welcomeText}>
            {defaultDesc}
          </p>
        </div>
      </div>

      <div className={styles.rightPanel}>
        <div className={styles.headerBackground}>
          <p>Header Color</p>
          <div className={styles.colorOptions}>
            <div
              onClick={() => handleHeaderColorChange("#FFFFFF")}
              className={styles.colorOption1}
            >
              A
            </div>
            <div
              onClick={() => handleHeaderColorChange("#000000")}
              className={styles.colorOption2}
            >
              B
            </div>
            <div
              onClick={() => handleHeaderColorChange("#33475B")}
              className={styles.colorOption3}
            >
              C
            </div>
          </div>
          <div className={styles.colorDisplay}>
            <div
              style={{
                backgroundColor: selectedHeaderColor,
                color: selectedHeaderColor,
              }}
              className={styles.colorBox}
            >
              D
            </div>
            <input type="text" value={selectedHeaderColor} readOnly />
          </div>
        </div>

        <div className={styles.bodyBackground}>
          <p>Custom Background Color</p>
          <div className={styles.colorOptions}>
            <div
              onClick={() => handleBodyColorChange("#FFFFFF")}
              className={styles.colorOption1}
            >
              A
            </div>
            <div
              onClick={() => handleBodyColorChange("#E8E8E8")}
              className={styles.colorOption2}
            >
              B
            </div>
            <div
              onClick={() => handleBodyColorChange("#000000")}
              className={styles.colorOption3}
            >
              C
            </div>
          </div>
          <div className={styles.colorDisplay}>
            <div
              style={{
                backgroundColor: selectedBodyColor,
                color: selectedBodyColor,
              }}
              className={styles.colorBox}
            >
              D
            </div>
            <input type="text" value={selectedBodyColor} readOnly />
          </div>
        </div>

        <div className={styles.defaultMessageSection}>
          <p>Default Message</p>
          <input
            className={styles.customMessageInput}
            type="text"
            value={welcomeMessage1}
            onChange={(e) => handleWelcomeMessageChange(e.target.value, true)}
          />
          <input
            className={styles.customMessageInput}
            type="text"
            value={welcomeMessage2}
            onChange={(e) => handleWelcomeMessageChange(e.target.value, false)}
          />
        </div>

        <div className={styles.editMessageSection}>
          <p>Welcome Message</p>
          <div className={styles.textAreaContainer}>
            <p
              style={{
                fontSize: "small",
                marginLeft: "80%",
                overflow: "auto",
              }}
            >
              {175 - defaultDesc.length}/175
            </p>
            <textarea
              className={styles.textArea}
              maxLength={175}
              value={defaultDesc}
              onChange={(e) => handleDefaultMessageChange(e.target.value)}
            ></textarea>
          </div>
        </div>

        <div className={styles.missedChatSection}>
          <p>Missed Chat Timer</p>
          <TimePicker />
        </div>
      </div>
    </div>
  );
}

export default ChatBotPanelNew;
