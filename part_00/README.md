## Exercise


### 0.4: New note

browser:
- User enters a new note into the form
- User clicks submit button

browser-->server: HTTP POST https://studies.cs.helsinki.fi/exampleapp/new_note

server:
- Server saves the new note and current date into its variable `notes` (not database as denoted in part0's lecture)

server-->browser: 302 response - redirect -> https://studies.cs.helsinki.fi/exampleapp/notes
browser-->server: HTTP GET https://studies.cs.helsinki.fi/exampleapp/notes

browser:
- New added note is now added to the list


### 0.5: Single page app

browser-->server: HTTP GET https://studies.cs.helsinki.fi/exampleapp/spa
server-->browser: 200 response - success - HTML content

browser:
- browser goes through HTML content which finds a stylesheet and a js files are needed

browser-->server: HTTP GET https://studies.cs.helsinki.fi/exampleapp/main.css
server-->browser: 200 response - success - main.css
browser-->server: HTTP GET https://studies.cs.helsinki.fi/exampleapp/spa.js
server-->browser: 200 response - success - spa.js

browser:
- browser executes js code which finds a need for JSON data

browser-->server: HTTP GET https://studies.cs.helsinki.fi/exampleapp/data.json
server-->browser: 200 response - success - data.json


### 0.6: New note

browser:
- User enters a new note into the form
- User clicks submit button
- A new note is added to the list

browser-->server: HTTP POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa

server:
- Server saves the new note and current date into its variable `notes` (not database as denoted in part0's lecture)

server-->browser: 201 response - created - repsonse payload of new note's content and created date

browser:
- Browser check response status to match readyState of 4 and response status of 200 and print log to the console