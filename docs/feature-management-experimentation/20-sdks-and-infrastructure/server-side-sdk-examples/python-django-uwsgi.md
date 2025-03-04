---
title: Python Django App with uWSGI using Split SDK example
sidebar_label: Python Django App with uWSGI using Split SDK example
helpdocs_is_private: false
helpdocs_is_published: true
sidebar_position: 6
---

<p>
  <button hidden style={{borderRadius:'8px', border:'1px', fontFamily:'Courier New', fontWeight:'800', textAlign:'left'}}> help.split.io link: https://help.split.io/hc/en-us/articles/360028611051-Python-Django-App-with-uWSGI-using-Split-SDK-example <br /> ✘ download file does not exist </button>
</p>

Example: Basic code to use Python Split SDK `8.0.0` in Django and uWSGI environment

Environment:

* Python 2.7.15
* uWSGI 2.0.18

* uwsgidecorators 1.1.0

* Django 1.8.11

How to use:

* Class wrapper for SplitSDK is:
         mysite/splitSample/MySplit.py

* Update your relevant Split API Key, Track type and Split names in:
         mysite/splitSample/views.py

* Update the Split API key for spool service in
         mysite/sdk_spool.py 

* Update the project and spool directories under parameters "chdir" and "spooler" in file:
         mysite/mysite_uwsgi.ini 

* Run the following command to start the uwsgi web server:
         uwsgi --ini mysite_uwsgi.ini --import sdk_spool.py

* Access the web page using the following URL:
         http://localhost:8000/splitSample

 

[Download Link](https://drive.google.com/a/split.io/file/d/17zqwfkwlX4Y0dED8gzhxk1p21YbIaX-8/view?usp=sharing)