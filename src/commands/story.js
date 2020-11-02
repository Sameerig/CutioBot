let fs = require('fs');

module.exports = (bot) => 
{
    bot.command('story', ctx => {
        let obj = JSON.parse(fs.readFileSync('./src/database/stories.json', 'utf8'));
        let item = obj[Math.floor(Math.random() * obj.length)];
        let msg = 
`
<b>${item.Heading}</b>

${item.Story}
`;
        ctx.reply(msg, {
            parse_mode: "HTML",
        });
        }, f = (err) => {
        ctx.reply("An Error is occured in getting story.");
    });
}