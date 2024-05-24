import React, { useEffect, useState } from 'react';
import { FaEdit } from 'react-icons/fa';

const UserDetails = () => {
  const [userData, setUserData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState({});
  const userType = sessionStorage.getItem('userType'); 
  const token = sessionStorage.getItem('token'); // Assume token is stored in sessionStorage
  const Id = sessionStorage.getItem("id");
  const companyId = sessionStorage.getItem("companyId")

  useEffect(() => {
    const user = sessionStorage.getItem(userType); 
    if (user) {
      try {
        const userObject = JSON.parse(user);
        setUserData(userObject);
        setEditedData(userObject); // Initialize editedData with userData
      } catch (error) {
        console.error(`Failed to parse ${userType} data:`, error);
      }
    }
  }, [userType]);

  const calculateAge = (dateOfBirth) => {
    const dob = new Date(dateOfBirth);
    const ageDiffMs = Date.now() - dob.getTime();
    const ageDate = new Date(ageDiffMs); 
    return Math.abs(ageDate.getUTCFullYear() - 1970); 
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEditedData({ ...editedData, [name]: value });
  };

  const handleSaveClick = (isCompany = false) => {
    const userId = isCompany ? companyId : Id;
    if (!userId) {
      console.error('User ID is missing in sessionStorage');
      return;
    }


    const url = isCompany ? `http://localhost:3001/company/${companyId}` : `http://localhost:3001/utenti/${Id}`;
    const successMessage = isCompany ? 'Company data updated successfully!' : 'User data updated successfully!';

    console.log(`Sending ${isCompany ? 'company' : 'user'} data to server:`, editedData);

    fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(editedData),
    })
    .then(response => {
      if(response.ok){
        sessionStorage.getItem("id");
        console.log('Response status:', response.status);
      }
      else {
        return response.json().then(err => { throw new Error(JSON.stringify(err)); });
      }
      return response.json();
    })
    .then(data => {
      console.log(`Updated ${isCompany ? 'company' : 'user'} data from server:`, data);
      setUserData(data);
      sessionStorage.setItem(userType, JSON.stringify(data));
      setIsEditing(false);
      alert(successMessage);
    })
    .catch(error => {
      console.error(`Error updating ${isCompany ? 'company' : 'user'} data:`, error);
      setIsEditing(false);
    });
  };




  return (
    <div className='AllDetails'>
      <h2>Your Details</h2>
      {userData ? (
        <>
          {isEditing ? (
            <form className='EditForm'>
              {userType === 'user' ? (
                <>
                  <div>
                    <label>Name:</label>
                    <input
                      type="text"
                      name="name"
                      value={editedData.name || ''}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <label>Surname:</label>
                    <input
                      type="text"
                      name="surname"
                      value={editedData.surname || ''}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <label>Address:</label>
                    <input
                      type="text"
                      name="address"
                      value={editedData.address || ''}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <label>Email:</label>
                    <input
                      type="email"
                      name="email"
                      value={editedData.email || ''}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <label>Age</label>
                    <input
                      type="text"
                      name="age"
                      value={editedData.dateOfBirth || ''}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <label>Work Experience:</label>
                    <input
                      type="text"
                      name="workExperience"
                      value={editedData.workExperience || ''}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <label>Languages:</label>
                    <input
                      type="text"
                      name="spokenLanguage"
                      value={editedData.spokenLanguage || ''}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <label>Work Visa:</label>
                    <select
                      name="hasWorkVisa"
                      value={editedData.hasWorkVisa || false}
                      onChange={handleInputChange}
                    >
                      <option value={true}>Yes</option>
                      <option value={false}>No</option>
                    </select>
                  </div>
                </>
              ) : userType === 'company' ? (
                <>
                  <div>
                    <label>Company Name:</label>
                    <input
                      type="text"
                      name="companyName"
                      value={editedData.companyName || ''}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <label>Address:</label>
                    <input
                      type="text"
                      name="address"
                      value={editedData.address || ''}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <label>Email:</label>
                    <input
                      type="email"
                      name="email"
                      value={editedData.email || ''}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <label>Phone Number:</label>
                    <input
                      type="text"
                      name="phoneNumber"
                      value={editedData.phoneNumber || ''}
                      onChange={handleInputChange}
                    />
                  </div>
                </>
              ) : null}
              <button type="button" onClick={() => handleSaveClick(userType === 'company')}>Save</button>
              <button type="button" onClick={() => setIsEditing(false)}>Go Back</button>
            
            </form>
          ) : (
            <ul className='UserList'>
            {userType === 'user' ? (
              <>
                <li><span>Name:</span> {userData.name}</li>
                <li><span>Surname:</span> {userData.surname}</li>
                <li><span>Address:</span> {userData.address}</li>
                <li><span>Email:</span> {userData.email}</li>
                <li><span>Age:</span> {calculateAge(userData.dateOfBirth)}</li>
                <li><span>Work Experience:</span> {userData.workExperience}</li>
                <li><span>Languages:</span> {userData.spokenLanguage}</li>
                <li><span>Work Visa:</span> {userData.hasWorkVisa ? 'Yes' : 'No'}</li>
                {!isEditing && (
                  <button className='EditButton' onClick={handleEditClick}>Edit</button>
                )}
              </>
            ) : userType === 'company' ? (
              <>
                <li><span>Company Name:</span> {userData.companyName}</li>
                <li><span>Address:</span> {userData.address}</li>
                <li><span>Email:</span> {userData.email}</li>
                <li><span>Sector:</span> {userData.businessSector}</li>
                <li><span>Phone Number:</span> {userData.phoneNumber}</li>
                <li><span>Vat Number:</span> {userData.vatNumber}</li>
                {!isEditing && (
                  <button className='EditButton' onClick={handleEditClick}>Edit</button>
                )}
              </>
            ) : null}
          </ul>
          )}
        </>
      ) : (
        <p>No user data available</p>
      )}
    </div>
  );
  
};

export default UserDetails;
