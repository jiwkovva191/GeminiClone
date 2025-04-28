import { useContext, useState } from "react";
import { assets } from "../../assets/assets";
import "./Main.css";
import { Context } from "../../context/context";
export default function Main() {
  const {onSent} = useContext(Context);
  const [input, setInput] = useState("")

const handleSend = async ()=>{
  if (!input.trim()) {
    console.error("Input is empty. Please enter a query.");
    return;
  }
  console.log("sending input:", input);
  try{
    const response = await onSent(input);
    console.log("AI response: ", response);
  }catch(error){
    console.error("Error while sending: ",error);
  }
}
  return (
    <div className="main">
      <div className="nav">
        <p>Gemini</p>
      </div>
      <div className="main-container">
        <div className="greet">
          <p>
            <span>Hello, Dev</span>
          </p>
          <p>How can I help you today?</p>
        </div>
        <div className="cards">
          <div className="card">
            <p>Suggest some beautiful places around Varna</p>
            <img src={assets.compass_icon} alt="" />
          </div>
          <div className="card">
            <p>Give me the greatest way to cook pasta</p>
            <img src={assets.bulb_icon} alt="" />
          </div>
          <div className="card">
            <p>I want to plan my day including the following tasks...</p>
            <img src={assets.message_icon} alt="" />
          </div>
          <div className="card">
            <p>Improve the readability of the following code</p>
            <img src={assets.code_icon} alt="" />
          </div>
        </div>
        <div className="main-bottom">
            <div className="search-box">
                <input type="text" value={input} onChange={(e)=>setInput(e.target.value)} placeholder="Ask something..." />
                <div>
                    <img src={assets.gallery_icon} alt="" />
                    <img src={assets.mic_icon} alt="" />
                    <button onClick={handleSend}> <img src={assets.send_icon} alt="" /></button>
                </div>
            </div>
            <p className="bottom-info">
                Gemini may display inaccurate info, so double-check its responses.
            </p>
        </div>
      </div>
    </div>
  );
}
