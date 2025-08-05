import { useState } from "react";
import Header from "../components/Header/Header";
import './AboutUs.css';

export default function AboutUs() {
  const [checkedItems, setCheckedItems] = useState({
    interface: false,
    filtering: false,
    ai: false,
    politics: false
  });

  const toggleItem = (key) => {
    setCheckedItems(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  return (
    <>
      <div>
        <Header userAuth={false} />
        <p>You are in the About Us page.</p>
      </div>

      <div className="container">
        <div className="section">
          <h1>It took four coders...</h1>
          <div className="coders-grid">
            <div className="coder-card">
              <img className="photo" src="old_car_and_me.jpeg" alt="Aarav Thilop" />
              <div>Aarav Thilop</div>
              <div>him</div>
            </div>
            <div className="coder-card">
              <img className="photo" src="youngadit_drawing.jpeg" alt="Adit Rajaram" />
              <div>Adit Rajaram</div>
              <div>bruh</div>
            </div>
            <div className="coder-card">
              <img className="photo" src="arnav_arora_maga.jpeg" alt="Arnav Arora" />
              <div>Arnav Arora</div>
              <div>far right conservative</div>
            </div>
            <div className="coder-card">
              <img className="photo" src="#" alt="Harshith Gade" />
              <div>Harshith Gade</div>
              <div>coder</div>
            </div>
          </div>
        </div>

        <div className="section">
          <h1>And an idea</h1>
          <p style={{ fontSize: "0.4rem" }}>And 600 hours of coding..</p>
          <h1>To Create</h1>
          <button className="button"><span id="black-text">Bill</span> View</button>

          <div className="features checklist">
            {[
                { key: "interface", label: "Easy to Use Interface", note: "You love clicking buttons." },
                { key: "filtering", label: "Personalized Bill Filtering", note: "No more scrolling through trash bills." },
                { key: "ai", label: "AI Cross-Checking", note: "Let the bots double-check your reps." },
                { key: "politics", label: "Political Understanding", note: "Suddenly, the news makes sense." }
            ].map(({ key, label, note }) => (
                <label
                    key={key}
                    className={`check-item ${checkedItems[key] ? "checked" : ""}`}
                    onClick={() => toggleItem(key)}
                >
                    <span className="checkbox-wrapper">
                        <input
                            type="checkbox"
                            checked={checkedItems[key]}
                            onChange={() => toggleItem(key)}
                        />
                        <span className="custom-checkmark" />
                    </span>
                    <div className="check-text">
                        <span className="check-label">{label}</span>
                        {checkedItems[key] && <span className="check-note">— {note}</span>}
                    </div>
                </label>
                ))}
        </div>

        </div>
      </div>
    </>
  );
}
