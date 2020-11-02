const axios = require('axios');

module.exports = (bot) => {
    bot.command("jokeoftheday", ctx => {
        axios.get('https://api.jokes.one/jod').then(f = (res) => {
            let data = res.data.contents.jokes[0].joke;
            let title = data.title;
            let text = data.text
            let msg = 
`
<b>${title}</b>
  
${text}
`;
            ctx.reply(msg, {
                parse_mode: "HTML",
            });
        }, f = (err) => {
            ctx.reply("An Error is occured in getting joke.");
        });
    });
}