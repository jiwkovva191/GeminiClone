import { createContext } from "react";
import { generateContent } from "../config/gemini";

export const Context = createContext();

const ContextProvider = (props) => {
  const onSent = async (contents) => {
    if (!contents || !contents.trim()) {
        console.error("Contents cannot be empty.");
        throw new Error("Contents cannot be empty.");
      }
    try {
      const response = await generateContent(contents);
      console.log("Generated content:", response);
      return response;
    } catch (error) {
      console.error("Error in onSent:", error);
      throw error;
    }
  };

  const contextValue = {
    onSent,
  };
  return (
    <Context.Provider value={contextValue}>{props.children}</Context.Provider>
  );
};

export default ContextProvider;
