import express from "express";
import axios from "axios";

const app = express();
const port = 3000;

app.get('/', async(req, res)=>{
    try{
        const result = await axios.get("https://pro-api.coinmarketcap.com/v2/cryptocurrency/quotes/latest?slug=bitcoin&CMC_PRO_API_KEY=30b58093-1e83-4a15-a576-11b7a48e2b48");
        // Extract the JSON data
        const data = result.data.data;
        
        // Assuming you want to access Bitcoin's data (ID 1 in this example)
        const bitcoinData = data["1"];
        
        // Access percentage changes
        const percentChange1h = parseFloat(bitcoinData.quote.USD.percent_change_1h);
        const percentChange24h = parseFloat(bitcoinData.quote.USD.percent_change_24h);
        const percentChange7d = parseFloat(bitcoinData.quote.USD.percent_change_7d);

        // Send the JSON response to the client
        res.render("test.ejs", {
            percentOne: percentChange1h,
            percentTwo: percentChange24h,
            percentThree: percentChange7d
        });
    }catch(error) {
        console.log(error.response);
        res.status(500);
    }
});

app.listen(port, ()=>{
    console.log(`Example app listening on port ${port}`);
})