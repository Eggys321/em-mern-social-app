import React, { useContext, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import galleryImg from '../assets/gallery.svg';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { postTextImg } from '../utils/ValidationSchema';
import toast from 'react-hot-toast';
import prevImg from '../assets/img-placeholder.jpg'
import UserContext from '../context/UserContext';

function Post() {
  const [show, setShow] = useState(false);
  const [preview, setPreview] = useState(prevImg); 
  const {getTimeLine} = useContext(UserContext)


  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const token = localStorage.getItem('clientToken');

  const {
    register,
    handleSubmit,
    setValue,
    reset,

    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(postTextImg),
    defaultValues: {
      text: '',
      imagePath: null,
    },
  });

  const handlePost = async (data) => {
    const formData = new FormData();
    formData.append('text', data.text);
    if (data.imagePath) {
      formData.append('imagePath', data.imagePath);
    }

  

    try {
      const response = await fetch('https://em-mern-social-app.onrender.com/api/v1/posts/create-post', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });
      const result = await response.json();

      if(result){
        toast.success(result.message)
        getTimeLine()
        reset()
      }
      handleClose();
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setValue('imagePath', file, { shouldValidate: true });
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setPreview(prevImg);
    }
  };

  return (
    <>
      <div className="d-flex align-items-center">
        <img src={galleryImg} alt="gallery" onClick={handleShow} role="button" /> <span>Image</span>
      </div>

      <Modal show={show} onHide={handleClose}>
        <form onSubmit={handleSubmit(handlePost)}>
          <Modal.Body>
            <FloatingLabel controlId="floatingTextarea" label="Write post" className="mb-3">
              <Form.Control
                style={{ height: '15rem' }}
                as="textarea"
                placeholder="Leave a comment here"
                {...register('text')}
              />
              {errors.text && <p className="text-danger">{errors.text.message}</p>}
            </FloatingLabel>

            <Form.Group controlId="formFileLg" className="mb-3">
              <img
                   src={preview}
                   alt=""
                   className="w-75 rounded shadow my-3 "
                 />
              <Form.Control
                type="file"
                size="lg"
                onChange={handleFileChange}
              />
              {errors.imagePath && <p className="text-danger">{errors.imagePath.message}</p>}
            </Form.Group>

            <div className="text-end">
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn mt-3 px-4 rounded-pill btn-primary btn-sm"
              >
                Post
              </button>
            </div>
          </Modal.Body>
        </form>
      </Modal>
    </>
  );
}

export default Post;
