/* open-close menu mobile */
document.querySelector('.burger-icon').addEventListener('click',e=>{
    const menuMobile = document.querySelector('.box-menu');

    menuMobile.classList.toggle('open');
    if(menuMobile.classList.contains('open')) menuMobile.style = 'clip-path: polygon(0 0, 100% 0, 100% 100%, 0% 100%);';
    else menuMobile.style = 'clip-path: polygon(0 0, 100% 0, 100% 0, 0 0);';
});

/* shorten link */
const form   = document.getElementById('form'),
      link   = document.getElementById('link-input'),
      result = document.querySelector('.result-container');

async function peticion(){
    try{
        let request  = await fetch(`https://api.shrtco.de/v2/shorten?url=${link.value}`);
        let response = await request.json();

        function createElements(){
            document.querySelector('.error-message').style = "opacity: 0";
            const container = document.createElement('DIV'),
                span        = document.createElement('SPAN'),
                div         = document.createElement('DIV'),
                a           = document.createElement('A'),
                button      = document.createElement('BUTTON');

            container.classList.add('result');
            span.classList.add('last-url');
            a.classList.add('new-url');
            button.classList.add('btn-default');
            
            span.textContent   = response.result.original_link;
            a.textContent      = response.result.short_link;
            button.textContent = 'Copy!';

            a.setAttribute('href',response.result.original_link);
            a.setAttribute('target','e_blank');

            div.appendChild(a);
            div.appendChild(button);
 

            container.appendChild(span);
            container.appendChild(div);

            result.appendChild(container);

            button.addEventListener('click',e=>{
                e.target.textContent = 'Copied!';
                e.target.classList.add('copied');
                const time = setTimeout(()=>{
                    e.target.textContent = '(lie XD)';
                },2000);
                setTimeout(()=>{
                    clearTimeout(time);
                    e.target.textContent = 'Copied!';
                },4000);
            })
        }

        if(!response.ok) document.querySelector('.error-message').style = "opacity: 1";
        else{
            createElements();
        }
    }catch(e){
        console.log(e);    
    }
}

form.addEventListener('submit',e =>{
    e.preventDefault();
    peticion();
});