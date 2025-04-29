import { createContext, useState } from "react";
import { generateContent } from "../config/gemini";

export const Context = createContext();

const ContextProvider = (props) => {
  const [input, setInput] = useState("");
  const [recentPrompt, setRecentPrompt] = useState("");
  const [prevPrompts, setPrevPrompts] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resultData, setResultData] = useState("");
  const [newChat, setNewChat] = useState("");

  const delayParagraph = (index, nextWord) => {
    setTimeout(function () {
      setResultData((prev) => prev + nextWord);
    }, 75 * index);
  };

  const onSent = async (contents) => {
    setResultData("");
    setLoading(true);
    setShowResult(true);
    let response;
    if (contents !== undefined) {
      response = await generateContent(contents);
      setRecentPrompt(contents);
    } else {
      setPrevPrompts((prev) => [...prev, input]);
      setRecentPrompt(input);
      response = await generateContent(input);
    }
    setRecentPrompt(input);
    setPrevPrompts((prev) => [...prev, input]);
    if (!contents || !contents.trim()) {
      console.error("Contents cannot be empty.");
      throw new Error("Contents cannot be empty.");
    }
    try {
      const response = await generateContent(contents);
      let responseArray = response.split("**");
      let newResponse = "";
      for (let i = 0; i < responseArray.length; i++) {
        if (i === 0 || i % 2 !== 1) {
          newResponse += responseArray[i];
        } else {
          newResponse += "<b>" + responseArray[i] + "</b>";
        }
      }
      let newResponse2 = newResponse.split("*").join("</br>");
      var newResponseArray = newResponse2.split(" ");
      for (let i = 0; i < newResponseArray.length; i++) {
        const nextWord = newResponseArray[i];
        delayParagraph(i, nextWord + " ");
      }
      setLoading(false);
      setInput("");
      console.log("Generated content:", response);
      return response;
    } catch (error) {
      console.error("Error in onSent:", error);
      throw error;
    }
  };

  const contextValue = {
    prevPrompts,
    setPrevPrompts,
    onSent,
    setRecentPrompt,
    recentPrompt,
    showResult,
    loading,
    resultData,
    input,
    setInput,
    newChat,
  };
  return (
    <Context.Provider value={contextValue}>{props.children}</Context.Provider>
  );
};

export default ContextProvider;
