const axios = require('axios');

module.exports = (bot) => {
    
bot.command('f', ctx => {
    msg = ctx.message.text.split(" ")
    msg.shift()
    if (msg.length > 1) {
        return ctx.reply("Please enter only 1 number.");
    }
    else if (isNaN(msg[0])) {
        return ctx.reply("Please enter a valid number.");
    }
    else {
        axios.get(`http://numbersapi.com/${msg[0]}`).then(f = (res) => {
            ctx.reply(res.data);
        }, f = (err) => {
            ctx.reply(err.message);
        })
    }
});
}