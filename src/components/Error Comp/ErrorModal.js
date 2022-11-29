import "./ErrorModal.css";

const Modal = ({loadingError, setLoadingError}) => {

    return loadingError ? (
        <>
        <div className="overlay" />
        <div className="modal">
          <button
            onClick={() => {
              setLoadingError(false);
            }}
          >
            ❌
          </button>
          <h3>Oops!</h3>
          <h4>Something went wrong... Please try again</h4>
            </div>
            </>
    ) : null
}

export default Modal