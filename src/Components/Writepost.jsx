import React, { useState } from 'react';
import JoditEditor from 'jodit-react';
import axios from "axios";
import config from "../config.jsx";
const Writepost = ({placeholder}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [content, setContent] = useState('');
  const [featuredPhoto, setFeaturedPhoto] = useState(null);

  const generateUniqueId = () => {
    // Generate a unique ID
    return '_' + Math.random().toString(36).substr(2, 9);
  };

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleContentChange = (value) => {
    setContent(value);
  };

  const handleFeaturedPhotoChange = (event) => {
    const file = event.target.files[0];
    setFeaturedPhoto(file)
  };

  const handleSubmit =async(event) => {
    console.log("Featured photo in state:", featuredPhoto);
    event.preventDefault();
    const formData = new FormData()
    formData.append('featuredPhoto', featuredPhoto)
    console.log("FormData:", formData)
    
    
  

    // const newPost = {
    //   id: generateUniqueId(),
    //   title,
    //   description,
    //   content,
    //   featuredPhoto: formData,
    //   created:new Date(),
    //   category:'post',
    //   selected:false
    // };

  

    // Once photo is uploaded, create the new post
   


  
    // setTitle('');
    // setDescription('');
    // setContent('');
    // setFeaturedPhoto(null);
    // console.log('New post:', newPost);




    // try {

    //   const responses = await axios.post(`${config.apiUrl}/upload`, {
    //     method: 'POST',
    //     body: formData
    //   });

    //   console.log("sdasdasdasd",responses)
    //   if (!responses.ok) {
    //     throw new Error('Failed to upload photo');
    //   }

    //   const newPost = {
    //     id: generateUniqueId(),
    //     title,
    //     description,
    //     content,
    //     featuredPhoto: await responses.json(), // Assuming the server returns some identifier for the uploaded photo
    //     created: new Date(),
    //     category: 'post',
    //     selected: false
    //   };

    //   const response = await axios.post(`${config.apiUrl}/getdata`, newPost);
    //   console.log('Response:', response);

  // } catch (error) {
  //     console.error('Error++++:', error);
  //     setLoginError(true)

  //     throw error;
  // }
  };

  return (
    <div className="post-blog-container">
      <div className="featured-photo-container">
        {featuredPhoto && (
          <img
            style={{ objectFit: 'cover' }}
            src={URL.createObjectURL(featuredPhoto)}
            alt="Featured"
            className="featured-photo-preview"
          />
        )}
      </div>
      <form onSubmit={handleSubmit} className="blog-form">
        <div className="form-group">
          <label htmlFor="featuredPhoto" className="featured-photo-label">
            Upload Featured Photo:
          </label>
          <input
            type="file"
            id="featuredPhoto"
            onChange={handleFeaturedPhotoChange}
          />
        </div>
        <div className="form-group">
          <label>Title:</label>
          <input
            type="text"
            value={title}
            onChange={handleTitleChange}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label>Description:</label>
          <input
            type="text"
            value={description}
            onChange={handleDescriptionChange}
            className="form-control"
          />
        </div>

        

        <div className="form-group">
          <label>Content:</label>
          <JoditEditor
            value={content}
            onChange={handleContentChange}
            className="content-editor"
          />
        </div>
        <button type="submit" className="submit-btn">
          Submit
        </button>
      </form>

      <style jsx>
        {`
          .post-blog-container {
            display: flex;
            flex-direction: column;
            align-items: center;
            width: 100%;
            height: 80vh;
          }

          .featured-photo-container {
            width: 90%;
            height: 100%;
            border: 1px solid black;
          }

          .featured-photo-label {
            display: block;
            margin-bottom: 10px;
          }

          .featured-photo-preview {
            width: 100%;
            height: 25rem;
            object-fit: cover;
          }

          .blog-form {
            width: 90%;
            margin-top: 20px;
          }

          .form-group {
            margin-bottom: 20px;
          }

          .form-control {
            width: 100%;
            padding: 10px;
            border: 1px solid #ccc;
            border-radius: 5px;
            font-size: 16px;
          }

          .content-editor {
            width: 100%;
            height: 100%;
            border: 1px solid #ccc;
            border-radius: 5px;
          }

          .submit-btn {
            padding: 10px 20px;
            background-color: #007bff;
            color: #fff;
            border: none;
            border-radius: 5px;
            cursor: pointer;
          }

          .submit-btn:hover {
            background-color: #0056b3;
          }
        `}
      </style>
    </div>
  );
};

export default Writepost;
