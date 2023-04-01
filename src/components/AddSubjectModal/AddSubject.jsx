import { useForm } from "react-hook-form";
import s from "./AddSubject.module.scss";
export default function AddSubject({ close, onSubmit }) {
  const { register, handleSubmit } = useForm({
    mode: "all",
  });
  return (
    <div className={s.Modal} onClick={() => close(false)}>
      <div className={s.ModalContent} onClick={(e) => e.stopPropagation()}>
        <h2>Add Subject</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            {...register("name", {
              required: "The field is required!",
            })}
            type="text"
            placeholder="subject"
          />
          <div>
            <input
              {...register("start", {
                required: "The field is required!",
              })}
              type="text"
              placeholder="13 : 00"
            />
            -
            <input
              {...register("end", {
                required: "The field is required!",
              })}
              type="text"
              placeholder="14 : 00"
            />
          </div>
          <input
            {...register("teacher", {
              required: "The field is required!",
            })}
            type="text"
            placeholder="teacher"
          />
          <button type="submit">Add</button>
        </form>
      </div>
    </div>
  );
}
