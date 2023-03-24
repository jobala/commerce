document.addEventListener('DOMContentLoaded', (event) => {
    let query = document.querySelectorAll('img.with-fallback')
    for(let img of query){
        img.addEventListener('error', () => {
            if(img.src != '/static/images/crankwheel_main_logo_square_512.png'){
                img.src = '/static/images/crankwheel_main_logo_square_512.png'
            }
        })
    }
})
