import React, { useEffect, useRef, useState } from "react";
import styles from "./styles.module.scss";
import ReactMarkdown from "react-markdown";
import { QueryChatbotAPI } from "./API";
import Tooltip from "rc-tooltip";
import { useColorMode } from "@docusaurus/theme-common";

interface IAgent {
  text: string;
  isBot: boolean;
  default?: boolean;
}

const Chatbot = () => {
  const { colorMode } = useColorMode();
  const [show, setShow] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [inputText, setInputText] = useState<string>("");
  const [isSessionExpired, setIsSessionExpired] = useState(false);
  const [messages, setMessages] = useState<IAgent[]>([
    {
      text: "Accelerate your software delivery with the powerful capabilities of Harness’s Platform.",
      isBot: true,
    },
    {
      text: "How can I help?",
      isBot: true,
    },
  ]);

  useEffect(() => {
    const cookies = document.cookie.split(";").map((cookie) => cookie.trim());
    const xChatbotKeyCookie = cookies.find((cookie) =>
      cookie.startsWith("x_chatbot_key=")
    );
    const accountIdCookie = cookies.find((cookie) =>
      cookie.startsWith("account_id=")
    );
    if (xChatbotKeyCookie && accountIdCookie) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

 

  useEffect(() => {
    if (isLoggedIn) {
      setMessages((prev) => [
        ...prev,
        {
          text: "Setting up a delegate?",
          isBot: false,
          default: true,
        },
        {
          text: "Learn about Continuous Delivery & GitOps",
          isBot: false,
          default: true,
        },
      ]);
    }
  }, [isLoggedIn]);

  async function handleQuerySubmit() {
    if (!isLoggedIn || isSessionExpired) {
      return;
    }
    if (inputText.trim() === "") {
      return;
    }
    const getXChatbotKeyCookie = () => {
      const cookies = document.cookie.split(";").map((cookie) => cookie.trim());
      const xChatbotKeyCookie = cookies.find((cookie) =>
        cookie.startsWith("x_chatbot_key=")
      );
      const accountIdCookie = cookies.find((cookie) =>
        cookie.startsWith("account_id=")
      );

      if (isLoggedIn && !xChatbotKeyCookie) {
        setIsSessionExpired(true);
      }

      if (xChatbotKeyCookie && accountIdCookie) {
        const [, token] = xChatbotKeyCookie.split("=");
        const [, id] = accountIdCookie.split("=");

        return { token, id };
      }
      return null;
    };

    const cookie = getXChatbotKeyCookie();

    if (!cookie) {
      return;
    }
    setMessages((prevMessages) => [
      ...prevMessages,
      { text: inputText, isBot: false },
    ]);

    setInputText("");

    try {
      setIsLoading(true);
      const response = await QueryChatbotAPI(
        inputText,
        cookie.id,
        cookie.token
      );

      setMessages((prevMessages) => [
        ...prevMessages,
        { text: response, isBot: true },
      ]);
    } catch (error) {
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: "Something went wrong !", isBot: true },
      ]);
      console.error("Error fetching response from API:", error);
    } finally {
      setIsLoading(false);
    }
  }

  function handleClearHistory() {
    if (!isLoggedIn) {
      return;
    }

    setMessages([
      {
        text: "Accelerate your software delivery with the powerful capabilities of Harness’s Platform.",
        isBot: true,
      },
      {
        text: "How can I help?",
        isBot: true,
      },
      {
        text: "Setting up a delegate?",
        isBot: false,
        default: true,
      },
      {
        text: "Learn about Continuous Delivery & GitOps",
        isBot: false,
        default: true,
      },
    ]);
  }
  useEffect(() => {
    if (chatboxRef.current) {
      chatboxRef.current.scrollTop = chatboxRef.current.scrollHeight;
    }
  }, [messages]);
  function toggleChatWindow() {
    setShow(!show);
  }

  const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (
    event
  ) => {
    if (event.key === "Enter") {
      handleQuerySubmit();
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(event.target.value);
  };

  function formatDate() {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const now = new Date();

    const month = months[now.getMonth()];
    const day = now.getDate();
    const hours = now.getHours();
    const minutes = now.getMinutes();

    const ampm = hours >= 12 ? "pm" : "am";
    const formattedHours = hours % 12 || 12;
    const formattedMinutes = minutes < 10 ? "0" + minutes : minutes;

    return `${month} ${day}, ${formattedHours}:${formattedMinutes}${ampm}`;
  }
  function handleSignIn() {
    window.location.href =
      "https://app.harness.io/sso.html?action=login&src=developerhub&return_to=https://developer.harness.io/";
  //     window.location.href =
  //       "http://localhost:5000/sso.html?action=login&src=developerhub&return_to=http://localhost:8888/";
  }
  const chatboxRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (isSessionExpired) {
      setInputText("");
      setIsLoggedIn(false);
      if (chatboxRef.current) {
        chatboxRef.current.scrollTop = chatboxRef.current.scrollHeight;
      }
    }
  }, [isSessionExpired]);

  return (
    <>
      <div onClick={toggleChatWindow} className={styles.AIDA_btn}>
        <img src="./img/AIDA_Logo.svg" alt="AIDA logo" />
      </div>
      <div
        className={`${!show && styles.active} ${styles["chatbot-container"]}`}
      >
        <div className={styles["chatbot-main"]}>
          <div className={styles["chatbot-heading"]}>
            <div className={styles["chatbot-heading-top"]}>
              <div className={styles.left}>
                <img src="./img/AIDA_Logo.svg" alt="AIDA logo" />
                <h1>Harness AIDA Chatbot</h1>
              </div>
              <div className={styles.right} onClick={toggleChatWindow}>
               <i class="fa-solid fa-xmark"></i>
              </div>
            </div>
            <p className={styles["chatbot-heading-text"]}>
              AI Development Assistant
            </p>
            <hr />
          </div>

          <div className={styles["chat-box"]} ref={chatboxRef}>
            <p className={styles["chatbot-heading-time"]}>
              Today, {formatDate()}
            </p>
            {messages.map((message, index) => (
              <div
                key={index}
                className={`${styles.textBubble} ${
                  !message.isBot ? styles["userBubble"] : styles["botBubble"]
                }`}
              >
                {message.isBot ? (
                  <img src="/img/AIDA_Logo.svg" alt="AIDA logor"></img>
                ) : null}
                <div
                  key={index}
                  className={`${styles.message} ${
                    message.isBot
                      ? styles["bot-message"]
                      : message.default
                      ? styles["user-message-default"]
                      : styles["user-message"]
                  }`}
                >
                  <ReactMarkdown className={styles.markdownContent}>
                    {message.text}
                  </ReactMarkdown>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className={`${styles.textBubble}`}>
                <img src="/img/AIDA_Logo.svg" alt="AIDA logor"></img>

                <div className={`${styles.message} ${styles["bot-loading"]}`}>
                  <div className={styles["dot-typing"]}></div>
                </div>
              </div>
            )}
            {!isLoggedIn && (
              <div className={styles.loginSection}>
                {isSessionExpired ? (
                  <h1>Session expired please log in again</h1>
                ) : (
                  <h1>Log into your Harness Account to access AIDA</h1>
                )}
                <button onClick={handleSignIn}>
                  Sign In
                  <i className="fa-solid fa-arrow-right-to-bracket"></i>
                </button>
              </div>
            )}
          </div>
        </div>
        <div className={styles["chatbot-input"]}>
          <Tooltip placement="top" overlay="Clear History">
            {colorMode === "light" ? (
              <img
                src="./img/Bars.svg"
                alt="Menu Icon "
                onClick={handleClearHistory}
              />
            ) : (
              <img
                src="./img/BarsDark.svg"
                alt="Menu Icon "
                onClick={handleClearHistory}
              />
            )}
          </Tooltip>

          <input
            onChange={handleChange}
            type="text"
            placeholder="e.g. help me create a policy that enforces fo.."
            onKeyDown={handleKeyDown}
            value={inputText}
            disabled={!isLoggedIn}
          />

          {colorMode === "light" ? (
            <img
              src="./img/SendIcon.svg"
              alt="Send Icon "
              onClick={handleQuerySubmit}
            />
          ) : (
            <img
              src="./img/SendIconDark.svg"
              alt="Send Icon "
              onClick={handleQuerySubmit}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default Chatbot;
