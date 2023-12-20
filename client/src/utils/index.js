import { ToastContainer, toast } from "react-toastify";

export const toggleCardExpansion = (cardId, setExpandedCard) => {
  setExpandedCard((prevExpanded) => (prevExpanded === cardId ? null : cardId));
};

export const handleLikeClick = (movieTitle) => {
  toast.success(`Liked "${movieTitle}"`, {
    position: "bottom-left",
    autoClose: 3000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    toastStyle: { background: "#E50914", color: "black" },
  });
};
