import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import MyNavbar from './MyNavbar';
import { Button, Form } from 'react-bootstrap';
import UserDetails from './UserDetails';
import { useNavigate } from 'react-router-dom';
import Footer from './Footer';
import { FaHeart } from 'react-icons/fa';
import { FaTrash } from 'react-icons/fa';

const MainPage = () => {
  const [userType, setUserType] = useState(sessionStorage.getItem('userType'));
  const user = JSON.parse(sessionStorage.getItem('user'));
  const company = JSON.parse(sessionStorage.getItem('company'));
  const userData = useSelector(state => (state.auth) ? state.auth.user : {});
  const [jobs, setJobs] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [showJobForm, setShowJobForm] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [recommendedJobs, setRecommendedJobs] = useState([]);
  const [favoriteJobs, setFavoriteJobs] = useState([]);
  const [companyJobs, setCompanyJobs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (searchQuery.trim()) {
      if (userType === 'company') {
        fetchCompanyJobs();
      } else {
        fetchJobs();
      }
    } else {
      setJobs([]);
    }
  }, [searchQuery, userType]);

  useEffect(() => {
    loadRecommendedJobs();
    if (userType === 'company') {
      fetchCompanyJobs();
    }
  }, [userType]);

  const fetchJobs = async () => {
    try {
      const accessToken = sessionStorage.getItem("token");
      const url = 'http://localhost:3001/jobs';
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        },
      });
  
      if (response.ok) {
        let jobsData = await response.json();

        if (searchQuery) {
          jobsData = jobsData.filter(job => job.title.toLowerCase().includes(searchQuery.toLowerCase()));
        }
        setJobs(jobsData);
      } else {
        throw new Error('Failed to fetch jobs');
      }
    } catch (error) {
      console.error('Error fetching jobs:', error);
    }
  };

  const fetchCompanyJobs = async () => {
    try {
      const accessToken = sessionStorage.getItem("token");
      const companyId = userData.id;
      const url = `http://localhost:3001/jobs?companyId=${companyId}&query=${encodeURIComponent(searchQuery)}`;
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        },
      });

      if (response.ok) {
        const jobsData = await response.json();
        setJobs(jobsData);
      } else {
        throw new Error('Failed to fetch company jobs');
      }
    } catch (error) {
      console.error('Error fetching company jobs:', error);
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    if (searchQuery.trim().length > 0) {
      if (userType === 'company') {
        fetchCompanyJobs();
      } else {
        fetchJobs();
      }
    }
  }  

  const loadRecommendedJobs = async () => {
    try {
      const accessToken = sessionStorage.getItem("token");
      const response = await fetch('http://localhost:3001/jobs', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        },
      });

      if (response.ok) {
        const jobsData = await response.json();
        const randomJobIds = getRandomJobs(jobsData, 3);
        setRecommendedJobs(randomJobIds);
      } else {
        throw new Error('Failed to fetch recommended jobs');
      }
    } catch (error) {
      console.error('Error fetching recommended jobs:', error);
    }
  };

  const getRandomJobs = (jobList, count) => {
    const shuffledJobs = jobList.sort(() => 0.5 - Math.random());
    return shuffledJobs.slice(0, count);
  };

  const handlePostJob = () => {
    setShowJobForm(true);
  };

  const handleJobSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const accessToken = sessionStorage.getItem("token");
      const response = await fetch("http://localhost:3001/jobs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${accessToken}`
        },
        body: JSON.stringify({
          title,
          description
        }),
      });

      if (response.ok) {
        setShowJobForm(false);
        setTitle('');
        setDescription('');
        if (userType === 'company') {
          const newJob = await response.json();
          setCompanyJobs(prevJobs => [...prevJobs, newJob]);
          fetchCompanyJobs()
        } else {
          fetchJobs();
        }
      } else {
        throw new Error('Failed to post job');
      }
    } catch (error) {
      console.error('Error posting job:', error);
    } finally {
      setLoading(false);
    }
  };

  const removeFromFavorites = (jobId) => {
    setFavoriteJobs(prevFavorites => prevFavorites.filter(job => job.id !== jobId));
  };

  const handleAddToFavorites = (job) => {
    setFavoriteJobs((prevFavorites) => {
      if (!prevFavorites.some(favoriteJob => favoriteJob.id === job.id)) {
        return [...prevFavorites, job];
      } else {
        alert("Job already in favorites!");
        return prevFavorites;
      }
    });
  };

  const handleDeleteJob = async (jobId) => {
    if (window.confirm('Are you sure you want to delete this job?')) {
      try {
        const accessToken = sessionStorage.getItem("token");
        const response = await fetch(`http://localhost:3001/jobs/${jobId}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${accessToken}`
          },
        });

        if (response.ok) {
          if (userType === 'company') {
            fetchCompanyJobs();
            setCompanyJobs(prevJobs => prevJobs.filter(job => job.id !== jobId));
          } else {
            fetchJobs();
          }
        } else {
          throw new Error('Failed to delete job');
        }
      } catch (error) {
        console.error('Error deleting job:', error);
      }
    }
  };

  if (!userData) {
    return <div>Please log in to see this page.</div>;
  }

  return (
    <div className='HomePage'>
      <MyNavbar />
      {userType === 'company' ? (
        <img  src="company.png" alt="" />
      ) : (
        <img src="foto-sitoweb3.png" alt="" />
      )}
      <div className='MainContent'>
        <div className='UserDetails'>
          <UserDetails userData={userData} />
        </div>
        <div className='welcome-jobs'>
          <div className="welcome-message">
            <h1>
              WELCOME BACK, {userType === 'company' ? company.companyName : `${user.name}`}!
            </h1>
            {userType === 'company' ? (
              <h3>Find the workers that suits you.</h3>
            ) : (
              <h3>Find the job that suits you.</h3>
            )}
          </div>
          {userType === 'company' && (
            <div className="job-form-container">
              {!showJobForm && (
                <Button className='Post-job' onClick={handlePostJob} disabled={loading}>Post Job</Button>
              )}
              {showJobForm && (
                <Form onSubmit={handleJobSubmit}>
                  <Form.Group controlId="jobTitle" className="job-form-group">
                    <Form.Label className="job-form-label">Title</Form.Label>
                    <Form.Control 
                      className="job-form-control"
                      type="text" 
                      placeholder="Enter job title" 
                      value={title} 
                      onChange={(e) => setTitle(e.target.value)} 
                    />
                  </Form.Group>
                  <Form.Group controlId="jobDescription" className="job-form-group">
                    <Form.Label className="job-form-label">Description</Form.Label>
                    <Form.Control 
                      className="job-form-control job-textarea"
                      as="textarea" 
                      rows={3} 
                      placeholder="Enter job description" 
                      value={description} 
                      onChange={(e) => setDescription(e.target.value)} 
                    />
                  </Form.Group>
                  <div className="job-form-actions">
                    <Button variant="primary" type="submit" disabled={loading} className="job-submit-button" style={{ color: '#333'}}>
                      Submit
                    </Button>
                    <Button variant="secondary" onClick={() => setShowJobForm(false)} className="job-back-button" style={{ color: '#333'}}>
                      Go Back
                    </Button>
                  </div>
                </Form>
              )}
            </div>
          )}
          {userType !== 'company' && (
            <div className='recommended-jobs'> 
              <h2>RECOMMENDED FOR YOU:</h2>
              {recommendedJobs.map((job) => (
                <div className='RecommendedJob' key={job.id}>
                  <h3>{job.title}</h3>
                  <p>{job.description}</p>
                </div>
              ))}
            </div>
          )}
        </div>
        {userType !== 'company' && (
          <div className='favorite-jobs-container'>
            <h2>Your Favorites</h2>
            <div className='favorite-jobs' style={{ maxHeight: '300px', overflowY: 'auto' }}>
              {favoriteJobs.length === 0 && <p>No favorite jobs added.</p>}
              {favoriteJobs.map((job) => (
                <div className='AllJobs' key={job.id}>
                  <h3>{job.title}</h3>
                  <p>{job.description}</p>
                  {job.company && (
                    <div className='JobsIn'>
                      <h4>Company Details</h4>
                      <p><strong>Name:</strong> {job.company.companyName}</p>
                      <p><strong>Address:</strong> {job.company.address}</p>
                      <p><strong>Business Sector:</strong> {job.company.businessSector}</p>
                      <p><strong>Email:</strong> {job.company.email}</p>
                      <p><strong>Phone Number:</strong> {job.company.phoneNumber}</p>
                    </div>
                  )}
                    <FaTrash className='trash-can'
                    onClick={() => removeFromFavorites(job.id)} 
                    />
                </div>
              ))}
            </div>
          </div>
        )}
        {userType === 'company' && (
          <div className='company-jobs-container'>
            <h2>Your Jobs</h2>
            <div className='company-jobs' style={{ maxHeight: '300px', overflowY: 'auto' }}>
              {companyJobs.length === 0 && <p>No jobs posted yet.</p>}
              {companyJobs.map((job) => (
                <div className='company-job' key={job.id}>
                  <h3>{job.title}</h3>
                  <p>{job.description}</p>
                  <FaTrash className='trash-can'
                  onClick={() => handleDeleteJob(job.id)} 
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      <div className='SecondMain'>
        {userType === 'company' ? (
          <img className='second-image-company' src="company-2.png" alt="" />
        ) : (
          <img src="Find your job..png" alt="" />
        )}
        {userType !== 'company' && (
          <div className='search-container'>
            <h2>Search for Jobs:</h2>
            <form className='search-form' onSubmit={handleSearchSubmit}>
              <input
                type="text"
                placeholder="Job title or keyword"
                value={searchQuery}
                onChange={handleSearchChange}
              />
              <button type="submit">Search</button>
            </form>
            <div className='jobs search-results'> 
              <div className='results-notfound' >
                <h2>Search Results: </h2>
                {jobs.length === 0 && <p>No jobs found</p>}
              </div>
              {jobs.map((job) => (
                <div className='AllJobs' key={job.id}>
                  <h3>{job.title}</h3>
                  <p>{job.description}</p>
                  {job.company && (
                    <div className='JobsIn'>
                      <h4>Company Details</h4>
                      <p><strong>Name:</strong> {job.company.companyName}</p>
                      <p><strong>Address:</strong> {job.company.address}</p>
                      <p><strong>Business Sector:</strong> {job.company.businessSector}</p>
                      <p><strong>Email:</strong> {job.company.email}</p>
                      <p><strong>Phone Number:</strong> {job.company.phoneNumber}</p>
                    </div>
                  )}
                  <button className="favorite-button" onClick={() => handleAddToFavorites(job)}>
                    <FaHeart className="heart-icon" /> 
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
        <Footer />
      </div>
    </div>
  );
};

export default MainPage;