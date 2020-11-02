const apikey = process.env.MUSIXMATCH_APIKEY;

const axios = require('axios');

module.exports = (bot) => {
    bot.inlineQuery(/^s\s.+$/, async ctx => {
        let q = ctx.inlineQuery.query.split(" ");
        q.shift();
        let n = isNaN(q[q.length-1]) ? true: q[q.length-1]
        if (n===true) {
            n = "5"
        }else {
            q = q.slice(0, q.length-1);    
        }
        q = q.join(" ");
        console.log(q)
        let link = `http://api.musixmatch.com/ws/1.1/track.search?q=${q}&page=1&s_track_rating=desc&page_size=${n}&apikey=${apikey}`
        try {
            let res = await axios.get(link);
            let data = res.data.message.body.track_list;
        let results = data.map((item, index) => {
            return {
                type: "article",
                id: String(index),
                title: `${item.track.track_name}`,
                input_message_content: {
                    message_text: `${item.track.track_name}\n${item.track.track_share_url}`
                },
                description: `By: ${item.track.artist_name}`,
                reply_markup: {
                    inline_keyboard: [
                        [
                            {text: `Get Lyrics`, callback_data: `${item.track.track_id}`}
                        ]
                    ]
                }
            }
        });
        ctx.answerInlineQuery(results);
        } catch (error) {
            ctx.reply("An error occured")
        }    
    });

    bot.action(/^([0-9]*)$/, ctx => {
        ctx.answerCbQuery();
        track_id = ctx.match[0];
        axios.get(`http://api.musixmatch.com/ws/1.1/track.lyrics.get?track_id=${track_id}&apikey=${apikey}`).then(res => {
            let data = res.data.message.body.lyrics.lyrics_body.replace("******* This Lyrics is NOT for Commercial use *******", "").replace("(1409619818589)", "");
            if(!data) {
                data = "Sorry Lyrics not Found!";
            }
            bot.telegram.sendMessage(ctx.update.callback_query.from.id, data);
        }, err => {
            console.log(err);
        });
    })
}