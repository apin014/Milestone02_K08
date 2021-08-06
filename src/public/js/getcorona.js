class Corona {
    constructor () {
        this.total = 'https://api.kawalcorona.com/indonesia';
        this.province = 'https://api.kawalcorona.com/indonesia/provinsi/';
    }
    async getTotal() {
        const resp = await fetch(this.total);
        const dat = await resp.json();
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
    async getAllProvince() {
        const resp = await fetch(this.province);
        const dat = await resp.json();
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