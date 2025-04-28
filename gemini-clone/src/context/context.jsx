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

  const onSent = async (contents) => {
    setResultData("");
    setLoading(true);
    setShowResult(true);
    setRecentPrompt(input);
    if (!contents || !contents.trim()) {
      console.error("Contents cannot be empty.");
      throw new Error("Contents cannot be empty.");
    }
    try {
      const response = await generateContent(contents);
      setResultData(response);
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
