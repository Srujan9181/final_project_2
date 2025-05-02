import React from "react";
import landingStyles from "../styles/landingPage.module.css";
import MainLogo from "../assets/logo.svg";
import { Link } from "react-router-dom";
import PlayIcon from "../assets/play.svg";
import MeetingImage from "../assets/meeting.png";
import CardImage from "../assets/Card 1.svg";
import GraphImage from "../assets/Graph.svg";
import CalendarImage from "../assets/Calendar.svg";
import AdobeLogo from "../assets/Adobe.svg";
import AirtableLogo from "../assets/Airtable.svg";
import ElasticLogo from "../assets/Elastic.svg";
import FramerLogo from "../assets/Framer.svg";
import OpendoorLogo from "../assets/Opendoor.svg";
import SocialMediaLogos from "../assets/Socialmedialogos.svg";
import Plan from "./Plan.jsx";
import { PiYoutubeLogo, PiInstagramLogo, PiXLogo, PiDiscordLogo } from "react-icons/pi";
import { FiFigma, FiMail } from "react-icons/fi";
import { SlSocialLinkedin } from "react-icons/sl";

function MaainPage() {
  const plans = [
    {
      title: "STARTER",
      price: "$9.99",
      description:
        "Best for local businesses needing to improve their online reputation.",
      features: [
        "Unlimited Users",
        "GMB Messaging",
        "Reputation Management",
        "GMB Call Tracking",
        "24/7 Award Winning Support",
      ],
    },
    {
      title: "GROWTH",
      price: "$399",
      description:
        "Best for all businesses that want to take full control of their marketing automation and track their leads, click to close.",
      features: [
        "Pipeline Management",
        "Marketing Automationn Campaigns",
        "Live Call Transfer",
        "GMB Messaging",
        "Embed-able Form Builder",
        "Reputation Management",
        "24/7 Award Winning Support",
      ],
    },
  ];
  const products = [
    "Universal checkouts",
    "Payment workflows",
    "Observability",
    "UpliftAI",
    "Apps & integration",
  ];

  const resources = [
    "Blog",
    "Success stories",
    "News room",
    "Terms",
    "Privacy",
  ];

  const primers = [
    "Expand to new market",
    "Boost payment success",
    "Improve conversion rates",
    "Reduce payment frauds",
    "Recover revenue",
  ];

  const developers = [
    "Primer Docs",
    "API References",
    "Payment methods guide",
    "Servie status",
    "Community",
  ];

  return (
    <div className={landingStyles.landingPage}>
      <div className={landingStyles.mainContent}>
        <div className={landingStyles.headerArea}>
          <img className={landingStyles.mainLogo} src={MainLogo} alt="mainlogo" />
          <div className={landingStyles.authLinks}>
            <Link className={landingStyles.loginLink} to={"/login"}>
              Login
            </Link>

            <Link className={landingStyles.signUpButton} to={"/signup"}>
              Sign up
            </Link>
          </div>
        </div>
        <div className={landingStyles.upperMainBody}>
          <div className={landingStyles.upperMainLeft}>
            <h1>
              Grow Your Business Faster <br />
              with Hubly CRM
            </h1>
            <p>
              Manage leads, automate workflows, and close deals effortlessly—all
              in one powerful platform.
            </p>
            <div className={landingStyles.actionButtons}>
              <button className={landingStyles.startButton}>Get started</button>

              <Link className={landingStyles.videoLink}>
                <div className={landingStyles.videoPlayArea}>
                  <img className={landingStyles.playIcon} src={PlayIcon} alt="play" />
                  <p className={landingStyles.videoText}>watchvideo</p>
                </div>
              </Link>
            </div>
          </div>
          <div className={landingStyles.upperMainRight}>
            <img className={landingStyles.meetingImage} src={MeetingImage} alt="meeting" />
            <img className={landingStyles.cardImage} src={CardImage} alt="card" />
            <img className={landingStyles.graphImage} src={GraphImage} alt="graph" />
            <img className={landingStyles.calendarImage} src={CalendarImage} alt="calender" />
          </div>
        </div>
        <div className={landingStyles.logoArea}>
          <img src={AdobeLogo} alt="adobelogo" className={landingStyles.adobeLogo} />
          <img src={ElasticLogo} alt="elasticlogo" className={landingStyles.elasticLogo} />
          <img src={OpendoorLogo} alt="opendoorlogo" className={landingStyles.opendoorLogo} />
          <img src={AirtableLogo} alt="airtablelogo" className={landingStyles.airtableLogo} />
          <img src={ElasticLogo} alt="elasticlogo" className={landingStyles.elasticLogo2} />
          <img src={FramerLogo} alt="framelogo" className={landingStyles.framerLogo} />
        </div>

        <div className={landingStyles.secondHeader}>
          <h1 className={landingStyles.secondHeadH1}>
            At its core, Hubly is a robust CRM solution.
          </h1>
          <br />
          <p className={landingStyles.secondHeadP}>
            Hubly helps businesses streamline customer interactions, track
            leads, and automate tasks—saving you time and maximizing revenue.
            Whether you’re a startup or an enterprise, Hubly adapts to your
            needs, giving you the tools to scale efficiently.
          </p>
        </div>
        <div className={landingStyles.designSection}>
          <h2 className={landingStyles.captureHeading}>CAPTURE</h2>
          <h2 className={landingStyles.nurtureHeading}>NURTURE</h2>
          <h2 className={landingStyles.closeHeading}>CLOSE</h2>
          <div className={landingStyles.designLeft}>
            <div>
              <h2>MULTIPLE PLATFORMS TOGETHER!</h2>
              <br />
              <p>
                Email communication is a breeze with our fully integrated, drag
                & drop <br />
                email builder.
              </p>
            </div>
            <br />
            <br />
            <br />
            <div>
              <h2>CLOSE</h2>
              <br />
              <p>
                Capture leads using our landing pages, surveys, forms,
                calendars, inbound <br />
                phone system & more!
              </p>
            </div>
            <br /> <br />
            <br />
            <div>
              <h2>NURTURE</h2>
              <br />
              <p>
                Capture leads using our landing pages, surveys, forms,
                calendars, inbound <br />
                phone system & more!
              </p>
            </div>
          </div>
          <div className={landingStyles.designRight}>
            <img className={landingStyles.mediaLogos} src={SocialMediaLogos} alt="" />
            <div className={landingStyles.rectangle1}>B</div>
            <div className={landingStyles.rectangle2}>B</div>
            <div className={landingStyles.rectangle3}>B</div>
            <div className={landingStyles.arrow1}>
              <div className={landingStyles.circle11}>.</div>
              <div className={landingStyles.line}></div>
              <div className={landingStyles.circle12}>.</div>
            </div>
            <div className={landingStyles.arrow2}>
              <div className={landingStyles.circle11}>.</div>
              <div className={landingStyles.line}></div>
              <div className={landingStyles.circle12}>.</div>
            </div>
            <div className={landingStyles.arrow3}>
              <div className={landingStyles.circle11}>.</div>
              <div className={landingStyles.line}></div>
              <div className={landingStyles.circle12}>.</div>
            </div>
          </div>
        </div>
        <div className={landingStyles.thirdHeader}>
          <h1>We have plans for everyone!</h1>
          <br />
          <br />
          <p>
            We started with a strong foundation, then simply built all of the
            sales and <br />
            marketing tools ALL businesses need under one platform.
          </p>
        </div>
        <div className={landingStyles.planCards}>
          <Plan plan={plans[0]} />
          <Plan plan={plans[1]} />
        </div>
      </div>
      <div className={landingStyles.mainFooter}>
        <div>
          <img className={landingStyles.mainLogo} src={MainLogo} alt="mainlogo" />
        </div>
        <div className={landingStyles.productSection}>
          <p>Product</p>
          <br />
          <br />
          {products.map((product, index) => {
            return (
              <div key={index}>
                <p className={landingStyles.paragraph}>{product}</p>
                <br />
              </div>
            );
          })}
          <br />
          <br />
          <div>
            <p>Resources</p>
            <br />
            {resources.map((resource, index) => {
              return (
                <div key={index}>
                  <p className={landingStyles.paragraph}>{resource}</p>
                  <br />
                </div>
              );
            })}
          </div>
        </div>
        <div className={landingStyles.primerSection}>
          <p>Why primer</p>
          <br />
          <br />
          {primers.map((item, index) => {
            return (
              <div key={index}>
                <p className={landingStyles.paragraph}>{item}</p>
                <br />
              </div>
            );
          })}
          <br />
          <br />
          <div>
            <p>Company</p>
            <br />
            <p className={landingStyles.paragraph}>Careers</p>
          </div>
        </div>
        <div className={landingStyles.developerSection}>
          <p>Developer</p>
          <br />
          {developers.map((item, index) => {
            return (
              <div key={index}>
                <p className={landingStyles.paragraph}>{item}</p>
                <br />
              </div>
            );
          })}

          <div className={landingStyles.socialLinks}>
            <FiMail />
            <SlSocialLinkedin />
            <PiXLogo />
            <PiYoutubeLogo />
            <PiDiscordLogo />
            <FiFigma />
            <PiInstagramLogo />
          </div>
        </div>
      </div>
    </div>
  );
}

export default MaainPage;
