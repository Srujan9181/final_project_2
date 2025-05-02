import React, { useEffect, useState } from "react";
import teamManagementStyles from "../styles/teamManagement.module.css";
import { AddteamMember, fetchTeamMembers, deleteMember } from '../services/index.js';
import JohnDoe from '../assets/johndoe.svg';
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";

function Team() {
  const currentAdmin = JSON.parse(localStorage.getItem('currentadmin')) || {};
  const [showModal, setShowModal] = useState(false);
  const [teamMembers, setTeamMembers] = useState([]);
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    phone: "",
    password: "Team@123",
    role: "Member",
    assigned: [],
    createdBy: currentAdmin._id,
  });

  const fetchMembers = async () => {
    const response = await fetchTeamMembers(currentAdmin._id);
    setTeamMembers(response.teamMembers);
  };

  const handleDeleteTeamMember = async (id) => {
    await deleteMember(id);
    fetchMembers();
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (
      formData.fullname.trim().length === 0 ||
      formData.email.trim().length === 0 ||
      formData.phone.trim().length === 0
    ) {
      alert('Please fill all the fields');
      return;
    }
    try {
      const response = await AddteamMember(formData);
      alert(response.message);
      setShowModal(false);
      fetchMembers();
      setFormData({
        fullname: "",
        email: "",
        phone: "",
        password: "Team@123",
        role: "Member",
        assigned: [],
        createdBy: currentAdmin._id
      });

    }
    catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={teamManagementStyles.mainContainer}>
      <div className={teamManagementStyles.header}>
        <h3>Team</h3>
      </div><br /><br />
      <div className={teamManagementStyles.tableWrapper}>
        <table className={teamManagementStyles.teamTable}>
          <thead>
            <tr>
              <th></th>
              <th>Fullname</th>
              <th>Phone</th>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr key={0} className={teamManagementStyles.tableRow}>
              <td><img src={JohnDoe} alt="" /></td>
              <td>{currentAdmin.role === 'admin' ? `${currentAdmin.firstname} ${currentAdmin.lastname}` : `${currentAdmin.fullname}`}(Me)</td>
              <td>+91 1234567890</td>
              <td>{currentAdmin.email}</td>
              <td>{currentAdmin.role}</td>
            </tr>
            {
              teamMembers.map((member, index) => {
                return (
                  <tr className={teamManagementStyles.tableRow} key={index + 1}>
                    <td><img src={JohnDoe} alt="" /></td>
                    <td>{member.fullname}</td>
                    <td>{member.phone}</td>
                    <td>{member.email}</td>
                    <td>{member.role}</td>
                    <td>
                      <div className={teamManagementStyles.actionButtons}>
                        <button className={teamManagementStyles.editButton}><AiOutlineEdit /></button>
                        <button className={teamManagementStyles.deleteButton} onClick={() => {
                          handleDeleteTeamMember(member._id)
                        }}><AiOutlineDelete /></button>
                      </div>
                    </td>
                  </tr>
                )
              })
            }
          </tbody>
        </table>
      </div>
      {currentAdmin.role === 'admin' && (
        <button className={teamManagementStyles.addMemberButton} onClick={() => {
          setShowModal(true)
        }}>Add Team Member</button>
      )}

      {
        showModal && (
          <div className={teamManagementStyles.modalOverlay}>
            <div className={teamManagementStyles.formContainer}>
              <h2>Add Team members</h2><br />
              <p>Talk with colleagues in a group chat. Messages in this group are only visible to it's participants. New teammates may only be invited by the administrators.</p> <br />
              <label >User name</label>
              <input placeholder='Enter name' type="text" name="fullname" value={formData.fullname} onChange={(e) => {
                handleChange(e)
              }} />
              <label >Email</label>
              <input placeholder='Enter email' type="text" name="email" value={formData.email} onChange={(e) => {
                handleChange(e)
              }} />
              <label >Phone</label>
              <input placeholder='Enter phone' type="text" name="phone" value={formData.phone} onChange={(e) => {
                handleChange(e)
              }} />
              <label >Designation</label>
              <select name="role" value={formData.role} onChange={(e) => {
                handleChange(e)
              }}>

                <option value="Member">Member</option>
                <option value="Admin">Admin</option>
              </select>

              <div className={teamManagementStyles.formButtons}>

                <button className={teamManagementStyles.saveButton} onClick={() => {
                  handleSubmit()
                }}>Save</button>
                <button onClick={() => {
                  setFormData({
                    fullname: "",
                    email: "",
                    phone: "",
                    password: "user@123",
                    role: "",
                    assigned: [],
                    createdBy: currentAdmin._id,
                  })
                  setShowModal(false)

                }} className={teamManagementStyles.cancelButton}>Cancel</button>
              </div>
            </div>
          </div>
        )
      }

    </div>
  )
}

export default Team;
