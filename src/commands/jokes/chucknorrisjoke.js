const axios = require('axios');

module.exports = (bot) => {
    bot.command('cnj', ctx => {
        axios.get('https://api.chucknorris.io/jokes/random').then(f = (res) => {
            let data = res.data.value;
            let msg =`<b>${data}</b>`;
            ctx.reply(msg, {parse_mode: "HTML"});
        }, f = (err) => {
            ctx.reply("An error is occured in getting the joke.");
        });
    });
    
}