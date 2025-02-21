---
title: "Error: \"type() argument 1 must be string, not unicode\""
sidebar_label: "Error: \"type() argument 1 must be string, not unicode\""
helpdocs_is_private: false
helpdocs_is_published: true
---

<p>
  <button hidden style={{borderRadius:'8px', border:'1px', fontFamily:'Courier New', fontWeight:'800', textAlign:'left'}}> help.split.io link: https://help.split.io/hc/en-us/articles/360016742831-What-is-the-Python-SDK-error-type-argument-1-must-be-string-not-unicode </button>
</p>

### Issue
When initializing the SDK factory object in Python, this exception occurs:
```
    from splitio import get_factory
  File "build/bdist.macosx-10.13-intel/egg/splitio/__init__.py", line 4, in <module>
  File "build/bdist.macosx-10.13-intel/egg/splitio/factories.py", line 4, in <module>
  File "build/bdist.macosx-10.13-intel/egg/splitio/clients.py", line 8, in <module>
  File "build/bdist.macosx-10.13-intel/egg/splitio/splitters.py", line 6, in <module>
  File "build/bdist.macosx-10.13-intel/egg/splitio/hashfns/__init__.py", line 9, in <module>
  File "build/bdist.macosx-10.13-intel/egg/splitio/splits.py", line 16, in <module>
  File "build/bdist.macosx-10.13-intel/egg/splitio/matchers.py", line 15, in <module>
  File "/Library/Python/2.7/site-packages/enum/__init__.py", line 326, in __call__
    return cls._create_(value, names, module=module, type=type)
  File "/Library/Python/2.7/site-packages/enum/__init__.py", line 434, in _create_
    enum_class = metacls.__new__(metacls, class_name, bases, classdict)
  File "/Library/Python/2.7/site-packages/enum/__init__.py", line 188, in __new__
    enum_class = super(EnumMeta, metacls).__new__(metacls, cls, bases, classdict)
TypeError: type() argument 1 must be string, not unicode
type() argument 1 must be string, not unicode
```

### Root cause
The Python Split SDK requires enum34 library version 1.1.5 or above, if a lower version of enum34 installed (for example 1.0.x), or the environment is forced to use this version, the exception above is thrown when initializing SDK factory object.

### Solution
Upgrade enum34 to 1.1.5 or above using pip command. As of this article publishing date, the latest version is 1.1.6.
```
sudo pip install enum34 --upgrade
```