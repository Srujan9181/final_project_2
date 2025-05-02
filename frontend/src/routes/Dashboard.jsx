import React, { useState, useEffect } from "react";
import styles from "./dashboard.module.css"; // Import the CSS module
import chatBubbleIcon from "../assets/sms.svg";
import userProfileIcon from "../assets/People.svg";
import { fetchusers, membermessagefetch } from "../services/index.js";

function Dashboard(props) {
  const loggedInAdmin = JSON.parse(localStorage.getItem('currentadmin')) || {};
  const [activeFilter, setActiveFilter] = useState(1);
  const [ticketList, setTicketList] = useState([]);
  const [searchText, setSearchText] = useState('');

  const loadTickets = async () => {
    const fetchedUsers = await fetchusers();
    setTicketList(fetchedUsers.data);
  };

  const loadMemberTickets = async () => {
    const memberTickets = await membermessagefetch(loggedInAdmin._id);
    setTicketList(memberTickets.data);
  };

  useEffect(() => {
    if (loggedInAdmin.role === 'admin') {
      loadTickets();
      return;
    }
    loadMemberTickets();
  }, [loggedInAdmin._id, loggedInAdmin.role]);

  const resolvedTickets = ticketList.filter((ticket) => ticket.status === "resolved");
  const openTickets = ticketList.filter((ticket) => ticket.status !== "resolved");
  const ticketsWithMessages = ticketList.filter((ticket) => ticket.messages && ticket.messages.length > 0);
  const searchedTickets = ticketList?.filter(ticket => ticket.ticket_id?.includes(searchText));

  return (
    <div className={styles.main}> {/* Use styles.main */}
      <h1 className={styles.head}>Ticket Dashboard</h1> {/* Use styles.head */}
      <br />
      <br />
      <input
        className={styles.searchInput} // Use styles.searchInput
        type="text"
        placeholder="Search tickets"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />
      <br />
      <br />
      <div className={styles.filters}> {/* Use styles.filters */}
        <button
          onClick={() => setActiveFilter(1)}
          className={`${styles.filterButton} ${activeFilter === 1 ? styles.clicked : ''}`} // Use styles.filterButton and styles.clicked
        >
          <img src={chatBubbleIcon} alt="" />
          All Tickets
        </button>
        <br />
        <br />
        <button
          onClick={() => setActiveFilter(2)}
          className={`${styles.filterButton} ${activeFilter === 2 ? styles.clicked : ''}`} // Use styles.filterButton and styles.clicked
        >
          Resolved
        </button>
        <br />
        <br />
        <button
          onClick={() => setActiveFilter(3)}
          className={`${styles.filterButton} ${activeFilter === 3 ? styles.clicked : ''}`}  // Use styles.filterButton and styles.clicked
        >
          Unresolved
        </button>
        <br />
        <br />
      </div>

      <div className={styles.line}></div> {/* Use styles.line */}

      {searchText && searchText.length > 0 && (
        <div className={styles.ticketList}>
          {searchedTickets.map((ticket, index) => (
            <div
              key={index}
              className={styles.chat}  // Use styles.chat
              onClick={() => {
                localStorage.setItem("activeTicket", JSON.stringify(ticket));
              }}
            >
              <div className={styles.ticketdetails}>  {/* Use styles.ticketdetails */}
                <div className={styles.names}>  {/* Use styles.names */}
                  <h3 className={styles.ticketid}>{ticket.ticket_id}</h3> <br /> {/* Use styles.ticketid */}
                  <p className={styles.latestMessage}>{ticket?.messages?.[0]?.message}</p>
                </div>
                <div className={styles.time}> {/* Use styles.time */}
                  <p className={styles.date}>  {/* Use styles.date */}
                    Posted at{" "}
                    {new Date(Date.parse(ticket.createdAt)).toLocaleTimeString(
                      [],
                      { hour: "2-digit", minute: "2-digit" }
                    )}
                  </p>
                  <br />
                  <p className={styles.timeSinceCreation}>
                    {Math.floor((new Date() - new Date(ticket.createdAt)) / (1000 * 60 * 60))}:00
                  </p>
                </div>
              </div>
              <div className={styles.linediv}></div>  {/* Use styles.linediv */}
              <div className={styles.userDetails}>  {/* Use styles.userDetails */}
                <div className={styles.details}>  {/* Use styles.details */}
                  <div className={styles.logo}>
                    <img src={userProfileIcon} alt="Customer Avatar" />
                  </div>
                  <div className={styles.personData}>
                    <h2>{ticket.name}</h2>
                    <p>{ticket.email}</p>
                    <p>{ticket.phone}</p>
                  </div>
                </div>
                <p
                  className={styles.openlink}  // Use styles.openlink
                  onClick={() => {
                    localStorage.setItem("selectedTicket", JSON.stringify(ticket));
                    localStorage.setItem("activeTab", 2);
                    props.setactiveelement(2);
                  }}
                >
                  Open Ticket
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeFilter === 1 && ticketsWithMessages.length > 0 && searchText.length === 0 && (
        <div className={styles.allchats}>
          {ticketsWithMessages.map((ticket, index) => (
            <div
              key={index}
              className={styles.chat}  // Use styles.chat
              onClick={() => {
                localStorage.setItem("activeTicket", JSON.stringify(ticket));
              }}
            >
              <div className={styles.ticketdetails}>  {/* Use styles.ticketdetails */}
                <div className={styles.names}>   {/* Use styles.names */}
                  <h3 className={styles.ticketid}>{ticket.ticket_id}</h3> <br />  {/* Use styles.ticketid */}
                  <p className={styles.latestMessage}>{ticket.messages[0].message}</p>
                </div>
                <div className={styles.time}>  {/* Use styles.time */}
                  <p className={styles.date}>   {/* Use styles.date */}
                    Posted at{" "}
                    {new Date(Date.parse(ticket.createdAt)).toLocaleTimeString(
                      [],
                      { hour: "2-digit", minute: "2-digit" }
                    )}
                  </p>
                  <br />
                  <p className={styles.timeSinceCreation}>
                    {Math.floor((new Date() - new Date(ticket.createdAt)) / (1000 * 60 * 60))}:00
                  </p>
                </div>
              </div>
              <div className={styles.linediv}></div>  {/* Use styles.linediv */}
              <div className={styles.userDetails}>   {/* Use styles.userDetails */}
                <div className={styles.details}>   {/* Use styles.details */}
                  <div className={styles.logo}>
                    <img src={userProfileIcon} alt="logo" />
                  </div>
                  <div className={styles.personData}>
                    <h2>{ticket.name}</h2>
                    <p>{ticket.email}</p>
                    <p>{ticket.phone}</p>
                  </div>
                </div>
                <p
                  className={styles.openlink}   
                  onClick={() => {
                    localStorage.setItem("selectedTicket", JSON.stringify(ticket));
                    localStorage.setItem("activeTab", 2);
                    props.setactiveelement(2);
                  }}
                >
                  Open Ticket
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
      {activeFilter === 2 && (
        <div className={styles.resolved}>
          {resolvedTickets.map((ticket, index) => (
            <div
              key={index}
              className={styles.chat}   // Use styles.chat
              onClick={() => {
                localStorage.setItem("activeTicket", JSON.stringify(ticket));
              }}
            >
              <div className={styles.ticketdetails}>   {/* Use styles.ticketdetails */}
                <div className={styles.names}>    {/* Use styles.names */}
                  <h3 className={styles.ticketid}>{ticket.ticket_id}</h3> <br />   {/* Use styles.ticketid */}
                  <p className={styles.latestMessage}>{ticket.messages[0].message}</p>
                </div>
                <div className={styles.time}>   {/* Use styles.time */}
                  <p className={styles.date}>    {/* Use styles.date */}
                    Posted at{" "}
                    {new Date(Date.parse(ticket.createdAt)).toLocaleTimeString(
                      [],
                      { hour: "2-digit", minute: "2-digit" }
                    )}
                  </p>
                  <br />
                  <p className={styles.timeSinceCreation}>
                    {Math.floor((new Date() - new Date(ticket.createdAt)) / (1000 * 60 * 60))}:00
                  </p>
                </div>
              </div>
              <div className={styles.linediv}></div>   
              <div className={styles.userDetails}>    
                <div className={styles.details}>    
                  <div className={styles.logo}>
                    <img src={userProfileIcon} alt="logo" />
                  </div>
                  <div className={styles.personData}>
                    <h2>{ticket.name}</h2>
                    <p>{ticket.email}</p>
                    <p>{ticket.phone}</p>
                  </div>
                </div>
                <p
                  className={styles.openlink}   
                  onClick={() => {
                    localStorage.setItem("selectedTicket", JSON.stringify(ticket));
                    localStorage.setItem("activeTab", 2);
                    props.setactiveelement(2);
                  }}
                >
                  Open Ticket
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
      {activeFilter === 3 && (
        <div className={styles.unresolved}>
          {openTickets.map((ticket, index) => (
            <div
              key={index}
              className={styles.chat}    // Use styles.chat
              onClick={() => {
                localStorage.setItem("activeTicket", JSON.stringify(ticket));
              }}
            >
              <div className={styles.ticketdetails}>    {/* Use styles.ticketdetails */}
                <div className={styles.names}>     {/* Use styles.names */}
                  <h3 className={styles.ticketid}>{ticket.ticket_id}</h3> <br />    {/* Use styles.ticketid */}
                  <p className={styles.latestMessage}>{ticket.messages[0].message}</p>
                </div>
                <div className={styles.time}>    {/* Use styles.time */}
                  <p className={styles.date}>     {/* Use styles.date */}
                    Posted at{" "}
                    {new Date(Date.parse(ticket.createdAt)).toLocaleTimeString(
                      [],
                      { hour: "2-digit", minute: "2-digit" }
                    )}
                  </p>
                  <br />
                  <p className={styles.timeSinceCreation}>
                    {Math.floor((new Date() - new Date(ticket.createdAt)) / (1000 * 60 * 60))}:00
                  </p>
                </div>
              </div>
              <div className={styles.linediv}></div>    {/* Use styles.linediv */}
              <div className={styles.userDetails}>     {/* Use styles.userDetails */}
                <div className={styles.details}>     {/* Use styles.details */}
                  <div className={styles.logo}>
                    <img src={userProfileIcon} alt="logo" />
                  </div>
                  <div className={styles.personData}>
                    <h2>{ticket.name}</h2>
                    <p>{ticket.email}</p>
                    <p>{ticket.phone}</p>
                  </div>
                </div>
                <p
                  className={styles.openlink}    
                  onClick={() => {
                    localStorage.setItem("selectedTicket", JSON.stringify(ticket));
                    localStorage.setItem("activeTab", 2);
                    props.setactiveelement(2);
                  }}
                >
                  Open Ticket
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Dashboard;
