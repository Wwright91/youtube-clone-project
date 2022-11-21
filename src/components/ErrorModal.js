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
            <img className="red-x" src="https://www.kindpng.com/picc/m/503-5036239_red-x-mark-icon-good-mark-hd-png.png" alt="red-x"/>
          </button>
          <h3>Oops!</h3>
          <h4>Something went wrong... Please try again</h4>
            </div>
            </>
    ) : null
}

export default Modal