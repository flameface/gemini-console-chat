<img src="https://ik.imagekit.io/unburn/gcc.svg">

<p align="center">Start an interactive chat on your terminal using Gemini.</p>

<p align="center">
    <a href="https://discord.gg/66uGX7t4ww"><b>Discord</b></a>
</p>

## Config
First of all, get your API key from https://aistudio.google.com/app/ and paste it in the index.js file.

```javascript
const API_KEY = "YOUR_API_KEY";
```

Install the required package by running:
```
npm install
```

All is done, to start the chat run:
```
node index.js
```

## Features
Your entire chat's stored in the `"history.json"` file.

To exit the chat and delete a conversation (history.json), type `"exit"` in terminal.