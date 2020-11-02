const WolframAlphaAPI = require('wolfram-alpha-api');
const waApi = WolframAlphaAPI(process.env.WOLFRAMALPHA_APPID);

module.exports = (bot) => {

    bot.command('ask', ctx => {
        let q = ctx.message.text.split(" ");
        q.shift();
        q = q.join(" ");
        if (q) {
            waApi.getFull(q).then(res => {
                if (res.success) {
                    let data = res.pods;
                    let msg = "";
                if (Array.isArray(data)) {
                    for (item of data) {
                        let title = "<b>"+item.title+"</b>";
                        let plaintext = item.subpods[0].plaintext;
                        if (!plaintext) {
                            plaintext = `<a href="${item.subpods[0].img.src}">Go to ${item.title} result.</a>`;
                        }
                        msg += `${title}\n${plaintext}\n\n`;
                    }
                }else{
                    msg+= `${data}`;
                }
                ctx.reply(msg, {
                    parse_mode: "HTML"
                });
                }else if(res.didyoumeans) {
                    let data = res.didyoumeans;
                    let msg = "<b>Did you mean ?</b>\n\n"
                    if (Array.isArray(data)) {
                        for(item of data) {
                            msg += `-${item.val}\n`;
                        }
                    }else {
                        msg += `-${data.val}`;
                    }
                    ctx.reply(msg, 
                        {
                            parse_mode: "HTML"
                        })
                }else if(res.tips){
                    data = res.tips;
                    msg = "";
                    if (Array.isArray(data)) {
                        for(item of data) {
                            msg += `-${item.text}\n`;
                        }
                    }else {
                        msg += `-${data.text}`;
                    }
                    ctx.reply(msg, 
                        {
                            parse_mode: "HTML"
                        })
                }else {
                    ctx.reply("Sorry can't help you with that");
                }
            }
            ).catch(err => {
                ctx.reply(err.message);
            });
        }else {
            ctx.reply("Please ask by only /ask (question)");
        };
    });
}