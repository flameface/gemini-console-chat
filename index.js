const run = async () => {
    const { GoogleGenerativeAI } = require("@google/generative-ai");
    const fs = require("fs");
    const { default: chalk } = await import("chalk");

    const MODEL_NAME = "gemini-1.0-pro";
    const API_KEY = "YOUR_API_KEY"; // https://aistudio.google.com/app/

    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ model: MODEL_NAME });

    let history = [];

    if (fs.existsSync("history.json")) {
        const historyData = fs.readFileSync("history.json");
        history = JSON.parse(historyData);
    }

    console.log("Chat started. You can start typing.");

    const chat = model.startChat({
        history: history
    });

    process.stdin.setEncoding("utf-8");

    const loadingBar = () => {
        const frames = ['|', '/', '-', '\\'];
        let i = 0;
        return setInterval(() => {
            process.stdout.write("\r" + chalk.hex("#FF6161")("Bot: " + frames[i++ % frames.length]) + " Generating...");
        }, 250);
    };

    const promptUser = () => {
        process.stdout.write(chalk.hex("#3776FF")("You: "));
    };

    promptUser();

    process.stdin.on("data", async (input) => {
        input = input.trim();

        if (input.toLowerCase() === "exit") {
            console.log("Exiting chat.");
            if (fs.existsSync("history.json")) {
                fs.unlinkSync("history.json");
                console.log("History deleted.");
            }
            process.exit();
        }

        const loader = loadingBar();
        process.stdin.pause();
        await chat.sendMessage(input).then(async (x) => {
            clearInterval(loader);
            console.log("\r" + chalk.hex("#FF6161")("Bot:"), x.response.text());

            history.push(
                {
                    role: "user",
                    parts: [{ text: input }]
                },
                {
                    role: "model",
                    parts: [{ text: x.response.text() }]
                }
            );

            fs.writeFileSync("history.json", JSON.stringify(history));
            process.stdin.resume();
            promptUser();
        });
    });
}

run();