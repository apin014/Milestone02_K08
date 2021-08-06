const apiKey = "f98c8f02410842caa1c905749bfdf167";
class News {
    constructor() {
        this.trend = "https://newsapi.org/v2/top-headlines"
    }
    async getTrend(q, country) {
        let query = `?country=${country}&apiKey=${apiKey}&sortBy=popularity&q=${q}`;
        let resp  = await fetch(this.trend + query);
        let dat = await resp.json();
        if (resp.status === 200) {
            if (dat.length === 0) {
                throw new Error("Data is Empty");
            }
            else {
                return dat;
            }
        } else {
            throw new Error(`Something went Wrong, Error Code: ${resp.status}`);
        }
    }
}