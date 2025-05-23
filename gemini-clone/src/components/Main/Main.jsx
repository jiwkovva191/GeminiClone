import { useContext, useState } from "react";
import { assets } from "../../assets/assets";
import "./Main.css";
import { Context } from "../../context/context";
export default function Main() {
  const {
    onSent,
    recentPrompt,
    showResult,
    loading,
    resultData,
    setInput,
    input,
  } = useContext(Context);

  const handleSend = async () => {
    if (!input.trim()) {
      console.error("Input is empty. Please enter a query.");
      return;
    }
    console.log("sending input:", input);
    try {
      const response = await onSent(input);
      console.log("AI response: ", response);
    } catch (error) {
      console.error("Error while sending: ", error);
    }
  };

  const handleCardClick = (text) =>{
    setInput(text);
    handleSend();
  }
  return (
    <div className="main">
      <div className="nav">
        <p>Gemini</p>
      </div>
      <div className="main-container">
        {!showResult ? (
          <>
            <div className="greet">
              <p>
                <span>Hello, Dev</span>
              </p>
              <p>How can I help you today?</p>
            </div>
            <div className="cards">
              <div className="card" onClick={()=>handleCardClick("Suggest some beautiful places around Varna")}>
                <p>Suggest some beautiful places around Varna</p>
                <img src={assets.compass_icon} alt="" />
              </div>
              <div className="card" onClick={()=>handleCardClick("Give me the greatest way to cook pasta")}>
                <p>Give me the greatest way to cook pasta</p>
                <img src={assets.bulb_icon} alt="" />
              </div>
              <div className="card" onClick={()=>handleCardClick("I want to plan my day including the following tasks...")}>
                <p>I want to plan my day including the following tasks...</p>
                <img src={assets.message_icon} alt="" />
              </div>
              <div className="card" onClick={()=>handleCardClick("Improve the readability of the following code")}>
                <p>Improve the readability of the following code</p>
                <img src={assets.code_icon} alt="" />
              </div>
            </div>
          </>
        ) : (
          <div className="result">
            <div className="result-title">
              <img src={assets.message_icon} alt="" />
              <p>{recentPrompt}</p>
            </div>
            <div className="result-data">
              <img src={assets.gemini_icon} alt="" />
              {loading ? (
                <div className="loader">
                  <hr />
                  <hr />
                  <hr />
                </div>
              ) : (
                <p dangerouslySetInnerHTML={{ __html: resultData }}></p>
              )}
            </div>
          </div>
        )}

        
        </div>
        <div className="main-bottom">
          <div className="search-box">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e)=>{
                if(e.key ==="Enter") handleSend()
              }}
              placeholder="Ask something..."
            />
            <div>
              <img src={assets.gallery_icon} alt="" />
              <img src={assets.mic_icon} alt="" />{" "}
              {input?<img src={assets.send_icon} alt="" onClick={handleSend} />:null}
            </div>
          </div>
          <p className="bottom-info">
            Gemini may display inaccurate info, so double-check its responses.
          </p>
      </div>
    </div>
  );
}
