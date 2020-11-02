const fs = require('fs');
const config = require('../../config');


module.exports = (bot) => {

    bot.command('dogbreeds', ctx => {
        let data = config.dogbreeds;
        let message = "Dog Breeds: \n";
        data.forEach(item => {
            message += `${item}\n`;
        });
    
        ctx.reply(message);
    });
}
