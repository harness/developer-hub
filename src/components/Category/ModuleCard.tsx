import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.scss';

function Feature({title, ribbon, description, type, time, module, featureCard}: FeatureItem) {
  return (
    <div className={`${styles.tutorialCard} ${featureCard? styles.featureCard : styles[module]}`}>
        <h6>{time}</h6>
        { ribbon && <div className={styles.ribbon}>
          <img src="/img/new.svg"/>
        </div>}
        <h4>{title}</h4>
        <p>{description}</p>
        <div>
        <ul className={styles.docTypes}>
          {type.map((props, idx) => (
              <li><img src={`/img/icon_doctype_${props}.svg`} alt={props} /></li>
            ))}          
        </ul>
      </div>
    </div>
  );
}

export default function ModuleCard(props): JSX.Element {
  return (
      <div className={styles.spaceBetween}>        
          {props.featureCard ? props.FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} featureCard={true}/>
          )) :
          props.FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} featureCard={false}/>
          ))
          }
      </div>
  );
}
