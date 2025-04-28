import { assets } from "../../assets/assets";
import "./Main.css";
export default function Main() {
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
                <input type="text" name="" id="" placeholder="Ask something..." />
                <div>
                    <img src={assets.gallery_icon} alt="" />
                    <img src={assets.mic_icon} alt="" />
                    <img src={assets.send_icon} alt="" />
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
