const config = require('../../config');

module.exports = (bot) => {

    let helpMsg = config.helpMsg;
    
    bot.command(["start", "help"], ctx => {
        ctx.reply(helpMsg, {
            parse_mode: "HTML",
            reply_markup: {
                inline_keyboard: [
                    [
                        {text: "Search Pixabay Image", switch_inline_query_current_chat: 'p'}
                    ],
                    [
                        {text: "Search Wiki", switch_inline_query_current_chat: 'w'}
                    ],
                    [
                        {text: "Search Songs", switch_inline_query_current_chat: 's'}
                    ],
                ]
            }
        });
    })
    
}