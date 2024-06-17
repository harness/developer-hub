import React, { useEffect, useRef, useState } from "react";
import styles from "./styles.module.scss";
import ReactMarkdown from "react-markdown";
import { QueryChatbotAPI, formatDate, getXChatbotKeyCookie } from "./helpers";
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
  const [name, setName] = useState<string | null>(null);
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
    const cookie = getXChatbotKeyCookie();

    if (cookie) {
      setIsLoggedIn(true);
      setName(cookie.name.replace("-", " "));
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

  async function handleQuerySubmit(inputText: string) {
    if (!isLoggedIn || isSessionExpired || inputText.trim() === "") {
      return;
    }

    const cookie = getXChatbotKeyCookie();

    if (isLoggedIn && !cookie) {
      setIsSessionExpired(true);
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
      console.error(error);
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

  function toggleChatWindow() {
    setShow(!show);
  }

  const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (
    event
  ) => {
    if (event.key === "Enter") {
      handleQuerySubmit(inputText);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(event.target.value);
  };

  function handleSignIn() {
    window.location.href =
      "https://app.harness.io/sso.html?action=login&src=developerhub&return_to=https://developer.harness.io/";
  }

  useEffect(() => {
    if (isSessionExpired) {
      setInputText("");
      setIsLoggedIn(false);
      scrollingTop();
    }
  }, [isSessionExpired]);

  useEffect(() => {
    if (chatboxRef.current) {
      chatboxRef.current.scrollTop = chatboxRef.current.scrollHeight;
    }
  }, [messages]);

  const scrollingTop = () => {
    if (sessionExpiredElement.current) {
      sessionExpiredElement.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "start",
      });
    }
  };
  const chatboxRef = useRef<HTMLDivElement | null>(null);
  const sessionExpiredElement = useRef<HTMLButtonElement | null>(null);

  return (
    <>
      <Tooltip placement="left" overlay="Ask AIDA">
        <div onClick={toggleChatWindow} className={styles.AIDA_btn}>
          <img src="./img/AIDA_Logo.svg" alt="AIDA logo" />
        </div>
      </Tooltip>

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
                <i className="fa-solid fa-chevron-down"></i>
              </div>
            </div>
            <p className={styles["chatbot-heading-text"]}>
              {name ? `Welcome back, ${name}!` : "AI Development Assistant"}{" "}
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
                  <img src="/img/AIDA_Logo.svg" alt="AIDA logo"></img>
                ) : null}
                <div
                  onClick={
                    message.default
                      ? () => handleQuerySubmit(message.text)
                      : undefined
                  }
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
                <button onClick={handleSignIn} ref={sessionExpiredElement}>
                  Sign In
                  <i className="fa-solid fa-arrow-right-to-bracket"></i>
                </button>
              </div>
            )}
          </div>
        </div>
        <div className={styles["chatbot-input"]}>
          <Tooltip placement="top" overlay="Clear History">
            <img
              src={
                colorMode === "light" ? "./img/Bars.svg" : "./img/BarsDark.svg"
              }
              alt="Menu Icon "
              onClick={handleClearHistory}
            />
          </Tooltip>

          <input
            onChange={handleChange}
            type="text"
            placeholder="e.g. help me create a policy that enforces fo.."
            onKeyDown={handleKeyDown}
            value={inputText}
            disabled={!isLoggedIn}
          />

          <img
            src={
              colorMode === "light"
                ? "./img/SendIcon.svg"
                : "./img/SendIconDark.svg"
            }
            alt="Send Icon"
            onClick={() => handleQuerySubmit(inputText)}
          />
        </div>
      </div>
    </>
  );
};

export default Chatbot;
