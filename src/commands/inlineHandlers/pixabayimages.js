const axios = require('axios');

const apikey=process.env.PIXABAYAPIKEY

module.exports = (bot) => {
    bot.inlineQuery(/^p\s.+$/, async ctx => {
        let query = ctx.inlineQuery.query.split(" ")
        let per_page = 20;
        let n = parseInt(query[query.length-1]);
        if (n){
            per_page = n;
            query.pop();
        }
        query.shift();
        query = query.join(' ');
        console.log(query, per_page);
        if (!query){
            return
        }
        let link = `https://pixabay.com/api/?key=${apikey}&q=${query}&image_type=photo&per_page=${per_page}`
        try{
            let res = await axios.get(link);

            let data = res.data.hits
    
            let results = data.map((item, index) => {
                return {
                    type: 'photo',
                    id: String(index),
                    photo_url: item.webformatURL,
                    thumb_url: item.previewURL,
                    photo_width: 300,
                    photo_height: 200,
                    caption: `Source: ${item.webformatURL}\nLarge: ${item.largeImageURL}`
                }
            });
            
            ctx.answerInlineQuery(results);
        }
        catch{
           
        }
    });
}