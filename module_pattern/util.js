// scroll to page section
function gotoPageSection(page) {
    let pageid = document.getElementById(page+'page');
    console.log(pageid);
    if (pageid !== null) {
        pageid.scrollIntoView({ behavior: 'smooth'});
    }
}

// create menu dynamically
function createMenu(menunid, menuname) {
    let id = document.getElementById('sitemenu');
    let aSec = document.createElement('a');
    aSec.setAttribute('href', 'javascript:void(0)');
    aSec.setAttribute('id', menunid);
    var node = document.createTextNode(menuname);
    aSec.appendChild(node);
    id.appendChild(aSec);
    
}

// create a section dynamically to insert content of that section
function setSiteContent(pageinfo) {
    let page_id = pageinfo.id;
    let page_heading = pageinfo.id;
    let page_content = pageinfo.content;

    let section = document.createElement('section');
    section.setAttribute('id', page_id + 'page');
    document.body.appendChild(section);

    if(pageinfo !== null && (pageinfo.hasOwnProperty('heading')) === true) {
        let createH1 = document.createElement('h1');
        section.insertBefore(createH1, section.childNodes[0]);
        section.querySelector('h1').innerHTML = page_heading;
    }
    if(pageinfo !== null && (pageinfo.hasOwnProperty('content')) === true) {
        let createDiv = document.createElement('div');
        createDiv.setAttribute('class', 'content');
        section.appendChild(createDiv);
        section.querySelector('.content').innerHTML = page_content;
    }
}

export {gotoPageSection, createMenu, setSiteContent}