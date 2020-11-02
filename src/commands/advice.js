const axios = require('axios');

module.exports = (bot) => {
    bot.command('advice', ctx =>{
        axios.get('https://api.adviceslip.com/advice').then(f = (res) => {
            ctx.reply(res.data.slip.advice);
        });
    
    });
}