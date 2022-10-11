import React from 'react';
// import clsx from 'clsx';
import { Tooltip } from 'antd';
import 'antd/lib/tooltip/style/index.css'
import styles from './ModuleCard.module.scss';
import Link from '@docusaurus/Link';

function Feature({title, ribbon, description, Svg, type, time, module, featureCard, link = "#"}: FeatureItem) {
  return (
    <div className={`${styles.tutorialCard} ${featureCard? styles.featureCard : styles[module]}`}>
        <h6>{ Svg && 
          <img src={Svg}/>
        }{time}</h6>
        { ribbon && <div className={styles.ribbon}>
          <img src="/img/new.svg"/>
        </div>}
        <h4><Link to={link}>{title}</Link></h4>
        <p>{description}</p>
        <div>
        <ul className={styles.docTypes}>
          {type.map((props, idx) => (
              <li>
                <Tooltip title={props} mouseLeaveDelay={0}>
                  <img src={`/img/icon_doctype_${props}.svg`} alt={props} />
                </Tooltip>
              </li>
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
