
const navbar = document.querySelector('.navbar-nav');
const nvcolor = document.querySelector('.navbar');
const refbtn = document.querySelector('.btn-refresh');
const newscard = document.querySelectorAll('.newscard');
const hoaxcard = document.querySelectorAll('.hoaxcard');
// load data
const corona = new Corona();
const render = new Render();
const hoax = new Hoax();
const getnews = new News();
// initializer
const maxalphnav = 0.7;
if (scrollY !== 0) {
    let aval = scrollY/640 * maxalphnav;
    nvcolor.setAttribute('style', `background: rgba(0,0,0,${aval < maxalphnav ? aval : maxalphnav});`)
}
let infopr = document.querySelector('#info').getBoundingClientRect().y;
let berandapr = document.querySelector('#beranda').getBoundingClientRect().y;
let tautanpr = document.querySelector('#tautan').getBoundingClientRect().y;
let adjust = -1*berandapr;
infopr+=adjust;
berandapr+=adjust;
tautanpr+=adjust;
if (scrollY >= infopr && scrollY < tautanpr) {
    document.querySelector('#infonav').parentElement.classList.add('activelink');
} else if(scrollY >= berandapr && scrollY < infopr) {
    document.querySelector('#nav').parentElement.classList.add('activelink');
} else {
    document.querySelector('#tautannav').parentElement.classList.add('activelink');
}
const listprovinsi = document.querySelectorAll('.listprovinsi');
let allProvincedate = null;
let lastProvince = null;

function getTotalData() {
    corona.getTotal().then(dat=>render.updateTotal(dat[0])).catch(e=>console.log(e));
}

function getProvinceData(val) {
    if (val) {
        corona.getAllProvince().then(dat=>{
            allProvincedate = dat;
            updateProvinceData(val);
        }).catch(e=>console.log(e));
    } else {
        corona.getAllProvince().then(dat=>{
            allProvincedate = dat;
            updateProvinceSelect();
        }).catch(e=>console.log(e));
    }
}

function updateProvinceSelect() {
    listprovinsi.forEach(el => {
        allProvincedate.forEach(e => {
            el.innerHTML += `<option value="${e.attributes.Kode_Provi}">${e.attributes.Provinsi}</option>`;
        })
    });
}

function updateProvinceData(val) {
    allProvincedate.forEach(elm => {
        if (elm.attributes.Kode_Provi == val) {
            render.updateProvinsi(elm.attributes);
        }
    })
}

// Initialization
getTotalData();
getProvinceData();

// initialize news
getnews.getTrend('covid', 'id').then(dat => {
    let i = 0
    // img
    newscard.forEach(e => {
        // img
        e.childNodes[1].childNodes[1].childNodes[1].setAttribute("src", dat.articles[i%3].urlToImage);
        // title
        e.childNodes[1].childNodes[3].childNodes[1].childNodes[1].innerText = dat.articles[i%3].title;
        // desc
        let descstr = dat.articles[i%3].description;
        descstr = descstr.substr(0, descstr.lastIndexOf('.')).trim();
        descstr = descstr.substr(descstr.lastIndexOf('\n') === -1 ? 0 : descstr.lastIndexOf('\n'), descstr.length).trim() + '.';
        e.childNodes[1].childNodes[3].childNodes[1].childNodes[3].innerText = descstr;
        // from by
        e.childNodes[1].childNodes[3].childNodes[1].childNodes[5].firstChild.innerText = `from ${dat.articles[i%3].source.name} by ${dat.articles[i%3].author}`;
        e.childNodes[1].childNodes[3].childNodes[1].childNodes[7].childNodes[1].setAttribute("href", dat.articles[i%3].url);
        i++;
    })
}).catch(err=>console.log(err));

hoax.getIssue('covid', 3).then(dat => {
    let i = 0;
    hoaxcard.forEach(e => {
        // img
        e.childNodes[1].childNodes[1].childNodes[1].setAttribute("src", dat.result.entries[i%3].primary_image);
        // title
        e.childNodes[1].childNodes[3].childNodes[1].childNodes[1].innerText =  dat.result.entries[i%3].name;
        // desc
        let descstr = dat.result.entries[i%3].desc;
        descstr = descstr.substr(0, descstr.indexOf('.')).trim() + '.';
        e.childNodes[1].childNodes[3].childNodes[1].childNodes[3].innerText = descstr;
        // from by
        e.childNodes[1].childNodes[3].childNodes[1].childNodes[5].firstChild.innerText = `by ${dat.result.entries[i%3].creator_name}`;
        i++;
    });

}).catch(err=>console.log(err));

listprovinsi.forEach(e => {
    e.addEventListener('change', el => {
        render.updateTotal({
            positif: "refreshing",
            sembuh: "refreshing",
            meninggal: "refreshing"
        })
        if (e.value == "69420") {
            lastProvince = null;
            getTotalData();
        }
        else if (e.value !== "Pilih Provinsi") {
            lastProvince = e.value;
        }
        updateProvinceData(lastProvince);
    })
})

refbtn.addEventListener('click', e => {
    e.preventDefault();
    render.updateTotal({
        positif: "refreshing",
        sembuh: "refreshing",
        meninggal: "refreshing"
    })
    if (lastProvince) {
        getProvinceData(lastProvince); 
    } else {
        getTotalData();
    }
});


window.addEventListener('scroll', () => {
    if (scrollY !== 0) {
        let aval = scrollY/640 * maxalphnav;
        nvcolor.setAttribute('style', `background: rgba(0,0,0,${aval < maxalphnav ? aval : maxalphnav});`)
    } else {
        nvcolor.setAttribute('style', 'background: rgba(0,0,0,0);')
    }
    if (scrollY >= infopr && scrollY < tautanpr) {
        const activelink = document.querySelector('.activelink');
        activelink.classList.remove('activelink');
        document.querySelector('#infonav').parentElement.classList.add('activelink');
    } else if(scrollY >= berandapr && scrollY < infopr) {
        const activelink = document.querySelector('.activelink');
        activelink.classList.remove('activelink');
        document.querySelector('#nav').parentElement.classList.add('activelink');
    } else {
        const activelink = document.querySelector('.activelink');
        activelink.classList.remove('activelink');
        document.querySelector('#tautannav').parentElement.classList.add('activelink');
    }
});