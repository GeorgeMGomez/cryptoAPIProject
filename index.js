import express from "express";
import axios from "axios";

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/', async(req, res) => {
    try{
        const bitcoin = await axios.get("https://pro-api.coinmarketcap.com/v2/cryptocurrency/quotes/latest?slug=bitcoin&CMC_PRO_API_KEY=30b58093-1e83-4a15-a576-11b7a48e2b48");
        const ethereum = await axios.get("https://pro-api.coinmarketcap.com/v2/cryptocurrency/quotes/latest?slug=ethereum&CMC_PRO_API_KEY=30b58093-1e83-4a15-a576-11b7a48e2b48");
        const solana = await axios.get("https://pro-api.coinmarketcap.com/v2/cryptocurrency/quotes/latest?slug=solana&CMC_PRO_API_KEY=30b58093-1e83-4a15-a576-11b7a48e2b48");
        const cardano = await axios.get("https://pro-api.coinmarketcap.com/v2/cryptocurrency/quotes/latest?slug=cardano&CMC_PRO_API_KEY=30b58093-1e83-4a15-a576-11b7a48e2b48");

        const data1 = bitcoin.data.data;
        const data2 = ethereum.data.data;
        const data3 = solana.data.data;
        const data4 = cardano.data.data;

        const bitcoinData = data1["1"];
        const ethereumData = data2["1027"];
        const solanaData = data3["5426"];
        const cardanoData = data4["2010"];

        res.render("index.ejs", {
            bitcoinPrice: parseFloat(bitcoinData.quote.USD.price).toFixed(2),
            bitcoinPercentOne: parseFloat(bitcoinData.quote.USD.percent_change_1h).toFixed(2),
            bitcoinPercentTwo: parseFloat(bitcoinData.quote.USD.percent_change_24h).toFixed(2),
            bitcoinPercentThree: parseFloat(bitcoinData.quote.USD.percent_change_7d).toFixed(2),

            ethereumPrice: parseFloat(ethereumData.quote.USD.price).toFixed(2),
            ethereumPercentOne: parseFloat(ethereumData.quote.USD.percent_change_1h).toFixed(2),
            ethereumPercentTwo: parseFloat(ethereumData.quote.USD.percent_change_24h).toFixed(2),
            ethereumPercentThree: parseFloat(ethereumData.quote.USD.percent_change_7d).toFixed(2),

            solanaPrice: parseFloat(solanaData.quote.USD.price).toFixed(2),
            solanaPercentOne: parseFloat(solanaData.quote.USD.percent_change_1h).toFixed(2),
            solanaPercentTwo: parseFloat(solanaData.quote.USD.percent_change_24h).toFixed(2),
            solanaPercentThree: parseFloat(solanaData.quote.USD.percent_change_7d).toFixed(2),

            cardanoPrice: parseFloat(cardanoData.quote.USD.price).toFixed(2),
            cardanoPercentOne: parseFloat(cardanoData.quote.USD.percent_change_1h).toFixed(2),
            cardanoPercentTwo: parseFloat(cardanoData.quote.USD.percent_change_24h).toFixed(2),
            cardanoPercentThree: parseFloat(cardanoData.quote.USD.percent_change_7d).toFixed(2)
        });
    }catch(error){
        console.log(error.response);
        res.status(500);
    }
})

app.listen(port, ()=>{
    console.log(`Example app listening on port ${port}`);
})