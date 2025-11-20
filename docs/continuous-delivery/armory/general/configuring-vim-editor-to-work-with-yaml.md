---
title: Configuring VIM editor to work with YAML
---

## Introduction
Spinnaker configs are in YAML. It is best to set up VIM to auto-indent properly so that there are less syntax errors due to tab insertion and/or spacing problems.

## Prerequisites
VIM

## Instructions
## For files that end with .yaml or .yml
Create or update ```~/.vimrc``` file with the following:
syntax enable
filetype on
autocmd FileType yaml,yml setlocal ts=2 sts=2 sw=2 expandtab indentkeys-=0# indentkeys-=
## For arbitrary files
The following comment can be added to the top of any file to let VIM know what configuration it should use
```# vim: set shiftwidth=2 tabstop=2 softtabstop=2 expandtab:```
## Fix files that have a mix of tabs and spaces to all spaces
In VIM's command mode enter the following
# to go to command mode hit the Esc key
:set shiftwidth=2 tabstop=2 softtabstop=2 expandtab
:retab

