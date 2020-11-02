const axios = require('axios');

module.exports = (bot) => {
    bot.command('joke', ctx => {
        axios.get('https://icanhazdadjoke.com/', {
            headers: {
                'Accept': 'application/json'
            }
        }).then(f = (res) => {
            ctx.reply(`
            
    ${res.data.joke}
            `)
        }, f = (err) => {
            ctx.reply("An error is occured in getting the joke.");
        }
        );
    });
}