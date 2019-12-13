
export default function showDialog(dialogEl) {
    $(dialogEl).modal("show");
    return new Promise((res, rej) => {
       dialogEl.addEventListener('click', e => {
           let target = e.target;
           if(target.classList.contains("yes")) {
               res();
           } else if (target.classList.contains("no")) {
               rej()
           }
       })
        
    });
}
