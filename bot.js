require('dotenv').config();

const Telegraf = require('telegraf');

const bot = new Telegraf(process.env.TOKEN)

const askCommand = require('./src/commands/ask');
askCommand(bot);

const storyCommand = require('./src/commands/story');
storyCommand(bot);

const riddleCommand = require('./src/commands/riddle');
riddleCommand(bot);

const catCommand = require('./src/commands/cat');
catCommand(bot);

const lyricsCommand = require('./src/commands/inlineHandlers/lyrics');
lyricsCommand(bot);

const wikiCommand = require('./src/commands/inlineHandlers/wiki');
wikiCommand(bot);

const pixabayCommand = require('./src/commands/inlineHandlers/pixabayimages');
pixabayCommand(bot);

const startCommand = require('./src/commands/start');
startCommand(bot);

const adviceCommand = require('./src/commands/advice');
adviceCommand(bot);

const dogbreedsCommand = require('./src/commands/dogbreeds');
dogbreedsCommand(bot);

const dogCommand = require('./src/commands/dog');
dogCommand(bot);

const factNumberCommand = require('./src/commands/numberfact');
factNumberCommand(bot);

const diceCommand = require('./src/commands/dice');
diceCommand(bot);

const jokeCommand = require('./src/commands/jokes/joke');
jokeCommand(bot);

const jokeofthedayCommand = require('./src/commands/jokes/jokeoftheday');
jokeofthedayCommand(bot);

const chuckNorrisJokeCommand = require('./src/commands/jokes/chucknorrisjoke');
chuckNorrisJokeCommand(bot);

bot.launch()