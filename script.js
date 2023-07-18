const btn = document.querySelector('.share')
const form = document.querySelector('.fact-form')

btn.addEventListener('click', () => {
    if(form.classList.contains('hidden')){
        form.classList.remove('hidden')
        btn.textContent = "Close..."    
    }else{
        form.classList.add('hidden')
    }
})



