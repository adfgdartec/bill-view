// React Imports
// import { useState } from "react";

// Stylesheet
import styles from './aboutUs.module.css';

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
            <BasicCard />
            <BasicCard />
            <BasicCard />
          </div>
          <Logo className={styles.logo}/>
          <div className={styles.featuresContainer}>
            <BasicCard />
            <BasicCard />
            <BasicCard />
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