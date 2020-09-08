export function isValid(param) {
    return param.length >= 10
}

export function createModal(title, content) {
    const modal = document.createElement('div');
    modal.classList.add('modal'); 
    const html = `<h1>${title} </h1> 
    <div> ${content} </div>`;
    modal.innerHTML = html;
    mui.overlay('on', modal)
}