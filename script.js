let t = 61;
let ques = document.querySelector("#txt");
let words = ["Start"];
let score = -2;
let s = document.querySelector('#score');
let inp = document.querySelector("#inp");
let start = false;
s.style.display = 'none'
new_word();
try {
    fetch('./words.txt').then(response=>response.text()).then(data=>{
        words=[];
        words=data.split(',');
    });
} catch (e) {
    console.error(e);
}


inp.addEventListener("keypress",e=>{
    if(e.key==="Enter" && t>0){
        if(inp.value.toLowerCase()==ques.innerHTML.toLowerCase()){
            start = true;
            s.style.display='block';
            inp.placeholder = ' '
            new_word();
        }else{
            ques.animate({
                rotate: '75deg',
                color:'red'
            },{duration: 300, fill:"forwards"});
            ques.animate({
                rotate: '-75deg',
                color:'red'
            },{duration: 300, fill:"forwards"});
            ques.animate({
                rotate: '0deg',
                color:'white'
            },{duration: 300, fill:"forwards"});
        }
    }
});


timer= document.querySelector("#timer")

let x = setInterval(() => {
    if(start){
        if(t!==0){
            t--
            timer.innerHTML = "Time Left: "+t;
        }else{
            endgame();
            clearInterval(x);
        }
    }

}, 1000);

function new_word() {
    inp.value = '';
    let r = Math.floor(Math.random()*words.length);
    let w = words[r]
    ques.innerHTML=w
    score++;
    s.innerHTML = "Words: "+score;
}

let remarks;
let img;

function endgame(){
    if(score<30){
        remarks = "You Are Slow"
        img = 'https://images.squarespace-cdn.com/content/v1/5ec9fee58666115ae931c503/1622102207755-33041PMOE174GJEMZBSR/snail.gif'
    }else{
        if(score<50){
            remarks = "Good"
            img = "https://media.tenor.com/8ZDLU43omvcAAAAC/kid-thumbs-up.gif"
        }else{
            remarks = "You Are Fast as Cheetah !";
            img = "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/bf647a71-7b90-4b94-9bc7-0c4e8ba2ff1f/d9n3hvh-8cfd1c52-1749-4fc7-99fc-5538494dc61d.gif?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2JmNjQ3YTcxLTdiOTAtNGI5NC05YmM3LTBjNGU4YmEyZmYxZlwvZDluM2h2aC04Y2ZkMWM1Mi0xNzQ5LTRmYzctOTlmYy01NTM4NDk0ZGM2MWQuZ2lmIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.rU4qQxAqolktRY2Qa6SKtUTEW5tGXyWctKrxMisOjUM"
        }
    }
    console.log("Game Over");
    swal({
        title: score+" WPM",
        text: remarks,
        icon: img,
        closeOnClickOutside: false,
        buttons: false,
        timer: 7000
    }).then(v=>{
        document.location.reload();
    });
}