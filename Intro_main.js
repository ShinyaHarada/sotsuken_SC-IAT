var inductive_text = {
    type: 'instructions',
    pages: [
        '<b>本課題の概要</b><br></br>'
        + 'この課題では、精神疾患のある人に対してどのようなイメージが保持されているかについて調べることを目的としています。 <br></br>'
        + '本課題を実施していただけるようでしたら、下のボタンを押して次に進んでください。<br></br>'

    ],
    show_clickable_nav: true
};

var person = prompt("あなたに付与されたIDを半角数字で入力してください。", "");

if (person == null){
    alert("実験を続けるなら、リロード(Windows；Ctrl+R、Mac；Command+R)をしてからもう一度入力してください。")
} 


let personVerified=false

//var length=person.length //入力された文字数を返す

if (person.length===5){
    if(person.match(/^\d+$/)){
        personVerified=true
    }		
}


//入力された文字数が5ならtrueを返す

while(!personVerified){
    person = prompt("入力に誤りがあります。あなたに付与されたIDを半角数字で入力してください。", "");
    console.log(person);
    if(person==null){
        alert("実験を続けるなら、リロード(Windows；Ctrl+R、Mac；Command+R)をしてからもう一度入力してください。")
    } else if (person.length==5){
        if(person.match(/^\d+$/)){
            personVerified=true
        }		
    } 
}


/*if (person == "") {
    var person = Math.floor(Math.random() * 1000) + 1  //idの管理
    }
if (person == null) {
    var person = Math.floor(Math.random() * 1000) + 1
    }*/
    
var timeline = [];
timeline.push(inductive_text);

var rand = Math.floor(Math.random() * 2) + 1

if (rand == 1) {
    var redirecter = "https://shinyaharada.github.io/sotsuken_SC-IAT/PoComFir_updated.html?subject="+person
    } else {
    var redirecter = "https://shinyaharada.github.io/sotsuken_SC-IAT/NeComFir_updated.html?subject="+person
    }