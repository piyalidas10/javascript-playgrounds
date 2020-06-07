import {pages} from './constants.js';
import {gotoPageSection, createMenu, setSiteContent} from './util.js';

document.getElementById('sitemenu').addEventListener('click',function(e) {
    console.log(e);
    if (e.target.hasAttribute('id')) {
        let idValue = e.target.getAttribute('id');
        gotoPageSection(idValue);
    }
});

pages.forEach(ele => {
    createMenu(ele.id, ele.heading);
    setSiteContent(ele);
});