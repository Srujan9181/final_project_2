import React from 'react';
import planCardStyles from '../styles/planCard.module.css';
import CheckIcon from '../assets/checkicon.svg';

function Plan({ plan }) {
  return (
    <div className={planCardStyles.planCard}>
      <h2 className={planCardStyles.planTitle}>{plan.title}</h2><br />
      <p className={planCardStyles.planDescription}>{plan.description}</p><br /><br />
      <div className={planCardStyles.priceContainer}>
        <h2 className={planCardStyles.planPrice}>{plan.price}</h2><p> /month</p>
      </div><br />
      <p>what's included</p>
      {
        plan.features.map((item, index) => {
          return (
            <div className={planCardStyles.featureItem} key={index}>
              <img src={CheckIcon} alt="Check Icon"/>
              <p>{item}</p>
            </div>
          );
        })
      }
      <br />
      <button className={planCardStyles.signUpButton}>SIGN UP FOR {plan.title}</button>
    </div>
  );
}

export default Plan;
