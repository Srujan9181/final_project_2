import React, { useState } from "react";
import adminSettingsStyles from "../styles/adminSettings.module.css"; 
import { editProfile } from "../services/index.js";
import { useNavigate } from "react-router-dom";

function Settings() { 
  const currentadmin = JSON.parse(localStorage.getItem("currentadmin"));
  const navigate = useNavigate();

  const [formdata, setFormdata] = useState({
    _id: currentadmin._id,
    firstname: currentadmin.firstname,
    lastname: currentadmin.lastname,
    email: currentadmin.email,
    role: currentadmin.role,
    password: "",
    confirmpassword: "",
  });

  const handleFormChange = (event) => {
    setFormdata({ ...formdata, [event.target.name]: event.target.value });
  };

  const handleEdit = async () => {
    try {
      const response = await editProfile(formdata);
      console.log(response);
      // navigate("/admin");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={adminSettingsStyles.mainContainer}>  
      <p>Settings</p>
      <br />
      <br />
      <div className={adminSettingsStyles.editProfileSection}>  
        <p className={adminSettingsStyles.sectionTitle}>Edit profile</p>  
        <div className={adminSettingsStyles.dividerLine}></div><br />     
        <div>
          <label className={adminSettingsStyles.formLabel}>First name:</label>  
          <br />
          <input
            className={adminSettingsStyles.formInput}  
            type="text"
            name="firstname"
            value={formdata.firstname}
            onChange={(e) => {
              handleFormChange(e);
            }}
          />
          <br /><br />
          <label className={adminSettingsStyles.formLabel}>Last name:</label>  
          <br />
          <input
            className={adminSettingsStyles.formInput} 
            type="text"
            name="lastname"
            value={formdata.lastname}
            onChange={(e) => {
              handleFormChange(e);
            }}
          />
          <br /><br />
          <label className={adminSettingsStyles.formLabel}>Email:</label>   
          <br />
          <input
            className={adminSettingsStyles.formInput}  
            type="email"
            name="email"
            value={formdata.email}
            onChange={(e) => {
              handleFormChange(e);
            }}
          />
          <br /><br />
          <label className={adminSettingsStyles.formLabel}>Password:</label>  
          <br />
          <input
            className={adminSettingsStyles.formInput}  
            type="password"
            name="password"
            value={formdata.password}
            onChange={(e) => {
              handleFormChange(e);
            }}
          />
          <br /><br />
          <label className={adminSettingsStyles.formLabel}>Confirm password:</label>  
          <br />
          <input
            className={adminSettingsStyles.formInput}  
            type="password"
            name="confirmpassword"
            value={formdata.confirmpassword}
            onChange={(e) => {
              handleFormChange(e);
            }}
          />
          <br /><br />
          <button
            className={adminSettingsStyles.saveButton}  
            onClick={() => {
              console.log(currentadmin._id, formdata);
              handleEdit();
            }}
            type="submit"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default Settings;  // Updated export
