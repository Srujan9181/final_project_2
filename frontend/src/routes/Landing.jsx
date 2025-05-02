import React, { useState } from 'react';
import homeStyles from './home.module.css';
import MainLogo from '../assets/logo.svg';
import { Link } from 'react-router-dom';
import PlayIcon from '../assets/play.svg';
import MeetingImage from '../assets/meeting.png';
import CardImage from '../assets/Card 1.svg';
import GraphImage from '../assets/Graph.svg';
import CalendarImage from '../assets/Calendar.svg';
import AdobeLogo from '../assets/Adobe.svg';
import AirtableLogo from '../assets/Airtable.svg';
import ElasticLogo from '../assets/Elastic.svg';
import FramerLogo from '../assets/Framer.svg';
import OpendoorLogo from '../assets/Opendoor.svg';
import Chatbot from './Chatbot.jsx';
import ChatIcon from '../assets/ChatIcon.svg';

function HomePage() {
  const [showBot, setShowBot] = useState(() => {
    const saved = localStorage.getItem('showbot');
    return saved === '1';
  });

  return (
    <div className={homeStyles.homeContainer}>
      <div className={homeStyles.sectionOne}>
        <div className={homeStyles.headerArea}>
          <img className={homeStyles.mainLogo} src={MainLogo} alt="mainlogo" />
        </div>
        <div className={homeStyles.mainContentArea}>
          <div className={homeStyles.mainContentLeft}>
            <h1>
              Grow Your Business Faster <br />
              with Hubly CRM
            </h1>
            <p>
              Manage leads, automate workflows, and close deals effortlessly—all
              in one powerful platform.
            </p>
            <div className={homeStyles.actionButtons}>
              <button className={homeStyles.primaryButton}>Get started</button>

              <Link className={homeStyles.videoLink}>
                <div className={homeStyles.videoPlayArea}>
                  <img className={homeStyles.playIcon} src={PlayIcon} alt="play" />
                  <p className={homeStyles.videoText}>watchvideo</p>
                </div>
              </Link>
            </div>
          </div>
          <div className={homeStyles.mainContentRight}>
            <img className={homeStyles.meetingImage} src={MeetingImage} alt="meeting" />
            <img className={homeStyles.cardImage} src={CardImage} alt="card" />
            <img className={homeStyles.graphImage} src={GraphImage} alt="graph" />
            <img className={homeStyles.calendarImage} src={CalendarImage} alt="calender" />
          </div>
        </div>
        <div className={homeStyles.logoArea}>
          <img src={AdobeLogo} alt="adobelogo" className={homeStyles.adobeLogo} />
          <img src={ElasticLogo} alt="elasticlogo" className={homeStyles.elasticLogo1} />
          <img src={OpendoorLogo} alt="opendoorlogo" className={homeStyles.opendoorLogo} />
          <img src={AirtableLogo} alt="airtablelogo" className={homeStyles.airtableLogo} />
          <img src={ElasticLogo} alt="elasticlogo" className={homeStyles.elasticLogo2} />
          <img src={FramerLogo} alt="framelogo" className={homeStyles.framerLogo} />
        </div>
      </div>

      <div className={homeStyles.chatbotSection}>
        {showBot && (<Chatbot />)}
        <div
          onClick={() => {
            setShowBot(prev => {
              const newValue = !prev;
              localStorage.setItem('showbot', newValue ? '1' : '0');
              return newValue;
            });
          }}
          className={homeStyles.chatIconButton}
        >
          {showBot ? (
            <h3>X</h3>
          ) : (
            <img className={homeStyles.chatIconImage} src={ChatIcon} alt="x" />
          )}
        </div>
      </div>
    </div>
  );
}

export default HomePage;
