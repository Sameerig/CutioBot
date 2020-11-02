module.exports = (bot => {
    bot.command("dice", f = (ctx) => {
        bot.telegram.sendDice(ctx.chat.id);
    });
})