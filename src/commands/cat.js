const axios = require('axios');

module.exports = (bot) => {
    bot.command('cat', async ctx => {
        let input = ctx.message.text;
        let inputArray = input.split(' ');
        if (inputArray.length == 1) {
            try {
                let res = await axios.get('http://aws.random.cat/meow');
                ctx.replyWithPhoto(res.data.file);
            }catch(err) {
                ctx.reply(err.message);
            }
        }else {
            inputArray.shift();
            input = inputArray.join(' ');
            ctx.replyWithPhoto(`https://cataas.com/cat/says/${input}`)
        }
    });
}