// React Imports
// import { useState } from "react";

// Stylesheet
import styles from './aboutUs.module.css';

// Other Imports
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';

// Components
import Header from "../../components/Header/Header";
import Logo from "../../components/Logo/Logo";
import BoxText from "../../components/aboutUsComponents/BoxText/BoxText";
import CoderCard from "../../components/aboutUsComponents/CoderCard/CoderCard";
import BasicCard from "../../components/featurePages/BasicCard/BasicCard";

export default function AboutUs() {
  // const [checkedItems, setCheckedItems] = useState({
  //   interface: false,
  //   filtering: false,
  //   ai: false,
  //   politics: false
  // });

  // const toggleItem = (key) => {
  //   setCheckedItems(prev => ({
  //     ...prev,
  //     [key]: !prev[key]
  //   }));
  // };

  const CodersInfo = [
    {
      coderImg: "",
      coderName: "",
      coderDetails: ""
    }
  ]

  return (
    <>
      <Header userAuth={false} />
      <div className={styles.container}>
        <BoxText text="It took four coders."/>
        <div className={styles.coderCardsContainer}>
          <CoderCard
            coderImg="/images/old_car_and_me.jpeg"
            coderName="Aarav Thilop"
            coderDetails="He was a frontend coder."
          />
          <CoderCard
            coderImg="/images/old_car_and_me.jpeg"
            coderName="Aarav Thilop"
            coderDetails="He was a frontend coder."
          />
          <CoderCard
            coderImg="/images/old_car_and_me.jpeg"
            coderName="Aarav Thilop"
            coderDetails="He was a frontend coder."
          />
          <CoderCard
            coderImg="/images/old_car_and_me.jpeg"
            coderName="Aarav Thilop"
            coderDetails="He was a frontend coder."
          />
        </div>
        <div className={styles.coderCardsContainer}>
          
        </div>
        <BoxText text="An Idea, And A Lot of Hours of Coding! To Create..." />
        <div className={styles.logoContainer}>
          <div className={styles.featuresContainer}>
            <BasicCard
              heading="Simple explanations"
              body="No unnecessary jargon, fluff, and legistative talk; only simple and direct information."
            />
            <BasicCard
              heading="Real-time bill sourcing"
              body="The bill information comes directly from congress, live, so you don't have to worry about misinterpretation and obsoleteness."
            />
            <BasicCard
              heading="Information checks"
              body="Everything is fact-checked by a neutral AI, meaning that there will be very little bias in the information you receive."
            />
          </div>
          <Logo classNameText={styles.logo}/>
          <div className={styles.featuresContainer}>
            <BasicCard
              heading="Summarization"
              body="We use novel artificial intelligence technologies and models in order to concisely summarize information that the user needs."
            />
            <BasicCard
              heading="Universality"
              body="Unlike other bill information sources, we tailor the content to the needs of the user, and what they want to learn about."
            />
            <BasicCard
              heading="Inclusion of AI"
              body="Top of the line artificial intelligence is injected throughout the application, optimizing nearly every aspect of it, in order to benefit the user in many ways."
            />
          </div>
        </div>
      </div>
    </>
  );
}


{/* <div>
        <Header userAuth={false} />
        <p>You are in the About Us page.</p>
      </div>

      <div className={styles.container}>
        <div className={styles.section}>
          <h1>It took four coders...</h1>
          <div className={styles.codersGrid}>
            <div className={styles.coderCard}>
              <img className={styles.photo} src="/images/old_car_and_me.jpeg" alt="Aarav Thilop" />
              <div>Aarav Thilop</div>
              <div>him</div>
            </div>
            <div className={styles.coderCard}>
              <img className={styles.photo} src="/images/youngadit_drawing.jpeg" alt="Adit Rajaram" />
              <div>Adit Rajaram</div>
              <div>bruh</div>
            </div>
            <div className={styles.coderCard}>
              <img className={styles.photo} src="/images/arnav_arora_maga.jpeg" alt="Arnav Arora" />
              <div>Arnav Arora</div>
              <div>far right conservative</div>
            </div>
            <div className={styles.coderCard}>
              <img className={styles.photo} src="#" alt="Harshith Gade" />
              <div>Harshith Gade</div>
              <div>coder</div>
            </div>
          </div>
        </div>

        <div className={styles.section}>
          <h1>And an idea</h1>
          <p style={{ fontSize: "0.4rem" }}>And 600 hours of coding..</p>
          <h1>To Create</h1>

          <Logo link={false} shortLogo={false} className={styles.logo}/>

          <div className={styles.features + ' ' + styles.checklist}>
            {[
                { key: "interface", label: "Easy to Use Interface", note: "You love clicking buttons." },
                { key: "filtering", label: "Personalized Bill Filtering", note: "No more scrolling through trash bills." },
                { key: "ai", label: "AI Cross-Checking", note: "Let the bots double-check your reps." },
                { key: "politics", label: "Political Understanding", note: "Suddenly, the news makes sense." }
            ].map(({ key, label, note }) => (
                <label
                    key={key}
                    className={
                      styles.checkItem +
                      (checkedItems[key] ? ' ' + styles.checked : '')
                    }
                    onClick={() => toggleItem(key)}
                >
                    <span className={styles.checkboxWrapper}>
                        <input
                            type="checkbox"
                            checked={checkedItems[key]}
                            onChange={() => toggleItem(key)}
                        />
                        <span className={styles.customCheckmark} />
                    </span>
                    <div className={styles.checkText}>
                        <span className={styles.checkLabel}>{label}</span>
                        {checkedItems[key] && (
                          <span className={styles.checkNote}>— {note}</span>
                        )}
                    </div>
                </label>
                ))}
        </div>

        </div>
      </div>
    </> */}