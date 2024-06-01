import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import galleryImg from "../assets/gallery.svg";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import roadImg from "../assets/Road-img.svg";
import cityImg from "../assets/city-img.svg";
import teaImg from "../assets/tea-img.svg";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { postTextImg } from "../utils/ValidationSchema";
function Post() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const {
    register,
    handleSubmit,
    formState: { errors,isSubmitting},
  } = useForm({
    resolver:yupResolver(postTextImg),
    defaultValues:{
      text:"",
      img: null 
    }
  });
console.log(errors);
  const handlePost = async(data)=>{
    console.log(12);


    try {
      
    } catch (error) {
      
    }

  }

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setValue('img', file, { shouldValidate: true });
  };

  return (
    <>
      <div className="d-flex align-items-center">
        <img src={galleryImg} alt="" onClick={handleShow} role="button" />{" "}
        <span>Image</span>
      </div>

      <Modal show={show} onHide={handleClose}>
        <form onSubmit={handleSubmit(handlePost)}>
          <Modal.Body>
            {/* write post input */}

            <FloatingLabel
              controlId="floatingTextarea"
              label="Write post"
              className="mb-3"
            >
              <Form.Control
                style={{ height: "15rem" }}
                as="textarea"
                placeholder="Leave a comment here"
                {...register("text")}

              />
              {errors.text && <p className="text-danger">{errors.text.message}</p>}

            </FloatingLabel>
            <Form.Group controlId="formFileLg" className="mb-3">
              <Form.Control type="file" size="lg" {...register("img")}/>
              {errors.img && <p className="text-danger">{errors.img.message}</p>}

            </Form.Group>
            

            {/* images */}
            <section className="d-flex  justify-content-between gap-3">
              {/* <div>
              <img src={roadImg} alt='' className='img-fluid' />
            </div>

            <div>
              <img src={cityImg} alt='' className='img-fluid' />
            </div>

            <div>
              <img src={teaImg} alt='' className='img-fluid' />
            </div> */}
            </section>
            <div className="text-end">
              <button
                type="submit"
                disabled={isSubmitting}

                className="btn mt-3  px-4 rounded-pill btn-primary btn-sm"
              >
                post
              </button>
            </div>
          </Modal.Body>
        </form>
      </Modal>
    </>
  );
}

export default Post;
