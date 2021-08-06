class Hoax {
    constructor() {
        this.issues = "https://api.detax.org/detax/v1/issue/search";
    }
    async getIssue(q, limit) {
        let query = `?query=${q}&limit=${limit}`;
        let resp  = await fetch(this.issues + query);
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