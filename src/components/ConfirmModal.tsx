import React from 'react';
import { MdClose } from 'react-icons/md';

interface Props {
  movie: { name: string } | null;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmModal: React.FC<Props> = ({ movie, onConfirm, onCancel }) => {
  if (!movie) return null;

  return (
    <div className="modal-overlay" onClick={onCancel}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal__close" onClick={onCancel}>
          <MdClose size={20} />
        </button>
        <h3>Добавить в избранное?</h3>
        <p>«{movie.name}» будет добавлен в ваш список избранных фильмов.</p>
        <div className="modal__actions">
          <button className="modal__btn modal__btn--cancel" onClick={onCancel}>
            Отмена
          </button>
          <button className="modal__btn modal__btn--confirm" onClick={onConfirm}>
            Добавить
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
