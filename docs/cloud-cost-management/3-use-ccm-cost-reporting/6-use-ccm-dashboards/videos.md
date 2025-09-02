---
title: Demo Videos for Dashboards  
description: Watch tutorial videos demonstrating how to create, customize, and use CCM dashboards for visualizing and analyzing your cloud costs across multiple providers.
sidebar_position: 20
sidebar_label:  Demo Videos for Dashboards  
---

These tutorial videos provide step-by-step guidance on creating and customizing CCM dashboards to visualize your cloud costs effectively. Each video focuses on a specific dashboard feature or technique to help you build comprehensive cost reports, analyze spending patterns, and share insights across your organization. Whether you're new to CCM dashboards or looking to enhance your existing visualizations, these tutorials will help you leverage the full power of Harness CCM's reporting capabilities.

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<style dangerouslySetInnerHTML={{__html: `
  .video-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 35px;
    margin: 0 -30px 50px -30px;
    padding: 0 30px;
    max-width: 1200px;
  }
  
  .video-card {
    border: 1px solid var(--ifm-color-emphasis-200);
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 3px 10px rgba(0, 0, 0, 0.08);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    background-color: #f8f9fa;
    transform: scale(1.02);
  }
  
  .video-card:nth-child(4n+1) {
    background-color: #f0f7ff; /* Light pastel blue */
  }
  
  .video-card:nth-child(4n+2) {
    background-color: #f0fff4; /* Light pastel green */
  }
  
  .video-card:nth-child(4n+3) {
    background-color: #fff5f5; /* Light pastel red/pink */
  }
  
  .video-card:nth-child(4n+4) {
    background-color: #faf5ff; /* Light pastel purple */
  }
  
  .video-card:hover {
    transform: translateY(-5px) scale(1.03);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.12);
  }
  
  .video-container {
    position: relative;
    padding-bottom: 60%; /* Slightly taller than 16:9 aspect ratio */
    height: 0;
    overflow: hidden;
    border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  }
  
  .video-container iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: 0;
  }
  
  .video-title {
    padding: 14px 16px;
    font-weight: 600;
    text-align: center;
    color: var(--ifm-color-emphasis-900);
    border-top: 2px solid rgba(0, 0, 0, 0.05);
    letter-spacing: 0.3px;
    font-size: 1.05rem;
    text-shadow: 0 1px 0 rgba(255, 255, 255, 0.8);
  }
  
  /* Dark mode adjustments */
  html[data-theme='dark'] .video-card {
    background-color: var(--ifm-color-emphasis-100);
    border-color: var(--ifm-color-emphasis-300);
  }
  
  html[data-theme='dark'] .video-card:nth-child(4n+1) {
    background-color: rgba(173, 216, 230, 0.1); /* Dark mode pastel blue */
  }
  
  html[data-theme='dark'] .video-card:nth-child(4n+2) {
    background-color: rgba(144, 238, 144, 0.1); /* Dark mode pastel green */
  }
  
  html[data-theme='dark'] .video-card:nth-child(4n+3) {
    background-color: rgba(255, 182, 193, 0.1); /* Dark mode pastel red/pink */
  }
  
  html[data-theme='dark'] .video-card:nth-child(4n+4) {
    background-color: rgba(221, 160, 221, 0.1); /* Dark mode pastel purple */
  }
`}} />

<div className="video-grid">
  <div className="video-card">
    <div className="video-container">
      <iframe src="https://www.youtube.com/embed/vg-mDhocV7o" allowFullScreen></iframe>
    </div>
    <div className="video-title">How to create a text widget</div>
  </div>
  
  <div className="video-card">
    <div className="video-container">
      <iframe src="https://www.youtube.com/embed/ebz827xF75k" allowFullScreen></iframe>
    </div>
    <div className="video-title">How to schedule dashboards to be emailed</div>
  </div>
  
  <div className="video-card">
    <div className="video-container">
      <iframe src="https://www.youtube.com/embed/4bUuDkIsZE0" allowFullScreen></iframe>
    </div>
    <div className="video-title">How to make Pie Charts</div>
  </div>
  
  <div className="video-card">
    <div className="video-container">
      <iframe src="https://www.youtube.com/embed/ZQroZOwv6F8" allowFullScreen></iframe>
    </div>
    <div className="video-title">Creating multi-value visualizations</div>
  </div>
  
  <div className="video-card">
    <div className="video-container">
      <iframe src="https://www.youtube.com/embed/Y2k8-WFJNIE" allowFullScreen></iframe>
    </div>
    <div className="video-title">Setting up forecasting in dashboard tiles</div>
  </div>
  
  <div className="video-card">
    <div className="video-container">
      <iframe src="https://www.youtube.com/embed/NEW0JwY9TfM" allowFullScreen></iframe>
    </div>
    <div className="video-title">Basic Dashboard Filters</div>
  </div>
  
  <div className="video-card">
    <div className="video-container">
      <iframe src="https://www.youtube.com/embed/MwQqRXOBbhw" allowFullScreen></iframe>
    </div>
    <div className="video-title">Basic usage of custom fields</div>
  </div>
  
  <div className="video-card">
    <div className="video-container">
      <iframe src="https://www.youtube.com/embed/JChWdPGGjXw" allowFullScreen></iframe>
    </div>
    <div className="video-title">Filtering with Cost Buckets and Categories</div>
  </div>
  
  <div className="video-card">
    <div className="video-container">
      <iframe src="https://www.youtube.com/embed/OF7ZDYEfHjw" allowFullScreen></iframe>
    </div>
    <div className="video-title">Advanced filtering techniques</div>
  </div>
  
  <div className="video-card">
    <div className="video-container">
      <iframe src="https://www.youtube.com/embed/2BkJjF2XMOE" allowFullScreen></iframe>
    </div>
    <div className="video-title">Filtering dashboards with month filters</div>
  </div>
  
  <div className="video-card">
    <div className="video-container">
      <iframe src="https://www.youtube.com/embed/QxkoEVDpRy0" allowFullScreen></iframe>
    </div>
    <div className="video-title">Entry level pivoting</div>
  </div>
  
  <div className="video-card">
    <div className="video-container">
      <iframe src="https://www.youtube.com/embed/89O6BblEQ" allowFullScreen></iframe>
    </div>
    <div className="video-title">Using 2 pivots in a dashboard widget</div>
  </div>
</div>