import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { postText } from "../utils/ValidationSchema";

const EditPostForm = ({ initialText, onCancel, onSave, isSaving }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(postText),
    defaultValues: { text: initialText || "" },
  });

  return (
    <form onSubmit={handleSubmit(onSave)} className="mb-2">
      <label htmlFor="edit-post-text" className="sr-only">
        Edit post text
      </label>
      <textarea
        id="edit-post-text"
        className="form-control rounded-2 mb-1"
        rows={3}
        {...register("text")}
      />
      {errors.text?.message && (
        <p className="text-danger fs-6 fw-bold mb-1">{errors.text.message}</p>
      )}
      <div className="d-flex gap-2 justify-content-end">
        <button
          type="button"
          className="btn btn-sm btn-outline-secondary rounded-pill px-3"
          onClick={onCancel}
          disabled={isSaving}
        >
          Cancel
        </button>
        <button type="submit" className="btn btn-sm btn-primary rounded-pill px-3" disabled={isSaving}>
          {isSaving ? "Saving…" : "Save"}
        </button>
      </div>
    </form>
  );
};

export default EditPostForm;
