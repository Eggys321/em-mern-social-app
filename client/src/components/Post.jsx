import { useContext, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import galleryImg from '../assets/gallery.svg';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { postTextImg } from '../utils/ValidationSchema';
import toast from 'react-hot-toast';
import prevImg from '../assets/img-placeholder.jpg';
import UserContext from '../context/UserContext';
import { post as apiPost } from '../api/client';

function Post() {
  const [show, setShow] = useState(false);
  const [preview, setPreview] = useState(prevImg);
  const { getTimeLine } = useContext(UserContext);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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
      const result = await apiPost('/posts/create-post', formData);
      if (result) {
        toast.success(result.message);
        getTimeLine();
        reset();
        setPreview(prevImg);
      }
      handleClose();
    } catch (error) {
      console.error('Error creating post:', error.message);
      toast.error(error.message);
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];
    if (file && file.size > 2 * 1000 * 1000) {
      toast.error('File with maximum size of 2MB is allowed');
      return;
    }
    setValue('imagePath', file, { shouldValidate: true });
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(file);
    } else {
      setPreview(prevImg);
    }
  };

  return (
    <>
      <button
        type="button"
        className="d-flex align-items-center gap-1 btn p-0 border-0 bg-transparent"
        onClick={handleShow}
      >
        <img src={galleryImg} alt="" aria-hidden="true" /> <span>Image</span>
      </button>

      <Modal show={show} onHide={handleClose} aria-labelledby="add-post-image-title">
        <Modal.Header closeButton>
          <Modal.Title id="add-post-image-title" className="fs-6">
            Create a post
          </Modal.Title>
        </Modal.Header>
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
              <div style={{ width: '100%', minHeight: '3rem' }}>
                <img
                  style={{ height: '240px' }}
                  src={preview}
                  alt="Selected post image preview"
                  className="img-fluid rounded shadow my-3"
                  width={240}
                  height={240}
                />
              </div>
              <Form.Label className="sr-only">Attach an image to your post</Form.Label>
              <Form.Control type="file" accept="image/*" size="lg" onChange={handleFileChange} />
              {errors.imagePath && <p className="text-danger">{errors.imagePath.message}</p>}
            </Form.Group>

            <div className="d-flex justify-content-end gap-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn mt-3 px-4 rounded-pill btn-primary btn-sm"
              >
                Post
              </button>
              <button
                type="button"
                onClick={() => {
                  reset();
                  setPreview(prevImg);
                }}
                className="btn mt-3 px-4 rounded-pill btn-danger btn-sm"
              >
                Cancel
              </button>
            </div>
          </Modal.Body>
        </form>
      </Modal>
    </>
  );
}

export default Post;
