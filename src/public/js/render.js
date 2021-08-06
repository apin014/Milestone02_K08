class Render {
    constructor () {
        this.cardtotal = document.querySelectorAll('.infototal');
    }
    updateTotal(dat) {
        this.cardtotal.forEach(e => {
            e.innerHTML = `
            <button class="btn btn-positif">
            <span style="float: left;">positif</span>
            <span style="float: right;">${dat.positif}</span>
        </button>
        <button class="btn btn-sembuh">
            <span style="float: left;">sembuh</i></span>
            <span style="float: right;">${dat.sembuh}</span>
        </button>
        <button class="btn btn-meninggal">
            <span style="float: left;">Meninggal</span>
            <span style="float: right;">${dat.meninggal}</span>
        </button>
            `;
        });
    }
    updateProvinsi(dat) {
        this.cardtotal.forEach(e => {
            e.innerHTML = `
            <button class="btn btn-positif">
            <span style="float: left;">positif</span>
            <span style="float: right;">${dat.Kasus_Posi}</span>
        </button>
        <button class="btn btn-sembuh">
            <span style="float: left;">sembuh</i></span>
            <span style="float: right;">${dat.Kasus_Semb}</span>
        </button>
        <button class="btn btn-meninggal">
            <span style="float: left;">Meninggal</span>
            <span style="float: right;">${dat.Kasus_Meni}</span>
        </button>
            `;
        })
    }
}