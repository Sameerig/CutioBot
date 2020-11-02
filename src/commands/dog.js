const axios = require('axios');
const config = require('../../config');


module.exports = (bot) => {
    bot.command('dog', ctx => {
        let input = ctx.message.text.split(' ');
        if (input.length != 2) {
            ctx.reply("You must give a dog breed as 2nd argument.");
            return;
        }
        let breedInput = input[1];

        let data = config.dogbreeds;
    
        if (data.includes(breedInput)){
            axios.get(`https://dog.ceo/api/breed/${breedInput}/images/random`).then(res => {
                ctx.replyWithPhoto(res.data.message);
            }).catch(e => ctx.reply(e.description));
        } else {
            let suggestion = data.filter(item => {
                return item.startsWith(breedInput);
            });
            let message = `Did you mean?\n`;
            suggestion.forEach(item => {
                message += `-${item}\n`
            });
    
            if (suggestion.length == 0) {
                ctx.reply("Cannot find the breed")
            }else{
                ctx.reply(message);
            }
        }
    });
}