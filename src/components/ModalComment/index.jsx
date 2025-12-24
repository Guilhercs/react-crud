import { useRef, useState } from "react";
import { IconButton } from "../IconButton";
import { Modal } from "../Modal";
import { Textarea } from "../Textarea";
import { Subheading } from "../Subheading";
import { IconChat } from "../icons/IconChat";
import { IconArrowFoward } from "../icons/IconArrowFoward";
import { Spinner } from "../Spinner";
import styles from "./commentmodal.module.css";
import { Button } from "../Button";
import { http } from "../../api";

export const ModalComment = ({
  isEditing,
  onSuccess,
  postId,
  comment = "",
  commentId,
}) => {
  const modalRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("access_token");

  const onSubmit = async (formData) => {
    const text = formData.get("text");

    if (!text.trim()) return;

    try {
      setLoading(true);

      if (isEditing) {
        http
          .patch(`/comments/${commentId}`, {
            text: text,
          })
          .then((res) => {
            modalRef.current.closeModal();
            onSuccess(res.data);
            setLoading(false);
          });
      } else {
        http
          .post(`/comments/post/${postId}`, {
            text: text,
          })
          .then((res) => {
            modalRef.current.closeModal();
            onSuccess(res.data);
            setLoading(false);
          });
      }
    } catch (error) {
      console.error("Erro ao criar/atualizar comentário:", error);
    }
  };
  return (
    <>
      <Modal ref={modalRef}>
        <form action={onSubmit}>
          <Subheading>
            {isEditing
              ? "Editar comentário:"
              : "Deixe seu comentário sobre o post:"}
          </Subheading>
          <Textarea
            required
            rows={8}
            name="text"
            placeholder="Digite aqui..."
            defaultValue={comment}
          />
          <div className={styles.footer}>
            <Button disabled={loading} type="submit">
              {loading ? (
                <Spinner />
              ) : (
                <>
                  {isEditing ? "Atualizar" : "Comentar"} <IconArrowFoward />
                </>
              )}
            </Button>
          </div>
        </form>
      </Modal>
      <IconButton onClick={() => modalRef.current.openModal()}>
        <IconChat fill={isEditing ? "#000" : "#888888"} />
      </IconButton>
    </>
  );
};
