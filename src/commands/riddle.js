let fs = require('fs');

module.exports = (bot) => 
{
    let answer;
    let obj = JSON.parse(fs.readFileSync('./src/database/riddles.json', 'utf8'));
    bot.command('riddle', ctx => {
        let item = obj[Math.floor(Math.random() * obj.length)];
        answer = item.Answer;
        let msg = 
`
<b>${item.Heading}(<em>${item.Category}</em>)</b>

${item.Riddle}
`;
        bot.telegram.sendMessage(ctx.chat.id, msg, {
            parse_mode: "HTML",
            reply_markup: {
                inline_keyboard: [
                    [
                        {text: "Answer", callback_data: "answer"},
                    ]
                ]
            }
        });
        }, f = (err) => {
        ctx.reply("An Error is occured in getting riddle.");
    });

    bot.action('answer', async ctx => {
        let heading = ctx.update.callback_query.message.text.split('\n')[0].split("(")[0]
        let answer =  obj.filter(riddle => riddle.Heading === heading)[0].Answer;
        console.log(answer)
        ctx.reply(`Answer:\n\n${answer}`);
        ctx.answerCbQuery();
    });
}