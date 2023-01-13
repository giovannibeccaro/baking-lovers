import React, { useEffect } from "react";

type Props = {
  message: string;
  setMessage: React.Dispatch<React.SetStateAction<string>>;
};

const PopupMessage: React.FC<Props> = ({ message, setMessage }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      setMessage("");
    }, 5000);

    return () => {
      clearTimeout(timer);
    };
  }, [setMessage]);

  return (
    <div
      className={`popup-message-global ${
        message.indexOf("success") === -1 ? "fail" : "success"
      }`}
    >
      {message}
    </div>
  );
};

export default PopupMessage;
