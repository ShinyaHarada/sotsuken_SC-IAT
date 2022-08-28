/* randomize time between each trial */  
var post_trial_gap = function()
{
    return Math.floor(250)
}

/* get participant ID and condition*/
var urlvar = jsPsych.data.urlVariables();
    
/* ===============INSTRUCTION BLOCKS==================*/

var intro =
{
    type:"text"
    ,data:{trial_name: 'introduction'}
    ,text:         '<p class ="instructions">教示文:<br></br>画面が最大画面になっていない場合は、「F11」のキーを押して画面を最大画面にしてください。'
            +'<br></br>この課題では、いくつかの単語が画面中央に提示されるので、キーの操作によって分類していただきます。'
            +'<br></br>この課題では、できるだけ速く、できるだけ正確に、提示された単語を分類することが求められます。'
            +'<br></br>より速く回答するために、課題中は左手の人差し指を<b>F</b>キーに、右手の人差し指を<b>J</b>キーに置いておいてください。'
            +'<br></br>提示された単語は必ず画面右上と左上に表示されるカテゴリーに分類でき、それぞれのキーは画面上部のカテゴリーに対応しています。'
            +'<br></br><b>できるだけ速く、できるだけ正確に</b>分類してください。 '
            +'FキーまたはJキーを押して、次のページに進んでください。</p>'
    
    ,cont_key: ['f','j']
    ,on_trial_start: function()
        {
            jQuery('div.left-side').empty();
            jQuery('div.right-side').empty();
        }
}


/* define instructions block */

var instructions = 
{
    type: "text"
    ,data:{trial_name: 'instructions'}
    ,text: '<p class ="left-side-begin">ポジティブ語<br>or</br>精神疾患のある人</p>'
            +'<p class ="right-side-begin">ネガティブ語</p>'
            + '<p class="instructions"><br></br><br></br>この画面上部のように、3つのカテゴリーが同時に表示されます。提示される単語はどれか1つのカテゴリーに必ず属します。'
            + '<br></br> 画面中央には上部のカテゴリーのいずれかに属する単語が次々と提示されます。左上のいずれかのカテゴリーに属する場合はFキー、右上のカテゴリーに属する場合はJキーを押してください。単語は1つのカテゴリーにしか属しません。分類に正解すると◯印、間違えると画面に✕印が表示されます。'
            + '<br></br><b>できるだけ速く、できるだけ正確に</b>分類してください。'
            + '<br></br>スペースバーを押すと、課題が開始します。</p>'
    ,timing_post_trial: 2000
    ,cont_key: ['space']
    ,on_trial_start: function()
    {
        jQuery('div.left-side').empty();
        jQuery('div.right-side').empty();
    }
};
    
/* define instructions2 block */
var instructions2 = 
{
    type: "text"
    ,data:{trial_name: 'instructions2'}
    ,text: '<p class="instructions"><br></br><br></br>もう一度、同じ3つのカテゴリーに単語を分類します。'
            + '<br></br>画面中央には上部のカテゴリーのいずれかに属する単語が次々と提示されます。左上のカテゴリーに属する場合はFキー、右上のいずれかのカテゴリーに属する場合はJキーを押してください。'
            + '<br></br>単語は1つのカテゴリーにしか属しません。分類に正解すると◯印、間違えると画面に✕印が表示されます。'
            + '<br></br><b>できるだけ速く、できるだけ正確に</b>分類してください。'
            +'<br></br>スペースバーを押すと、課題が開始します。</p>'
    ,timing_post_trial: 2000
    ,cont_key: ['space']
    
};

/* define rev_instructions block */
var rev_instructions = 
{
    type: "text"
    ,data:{trial_name: 'rev_instructions'}
    ,text: 	'<p class ="left-side-begin">ポジティブ語</p>'
            +'<p class ="right-side-begin">ネガティブ語<br>or</br>精神疾患のある人</p>'
            +'<p class ="instructions"><br></br>この画面上部のように、3つのカテゴリーが同時に表示されます。提示される単語はどれか1つのカテゴリーに必ず属します。'
            + '<br></br>画面中央には上部のカテゴリーのいずれかに属する単語が次々と提示されます。左上のカテゴリーに属する場合はFキー、右上のいずれかのカテゴリーに属する場合はJキーを押してください。単語は1つのカテゴリーにしか属しません。分類に正解すると◯印、間違えると画面に✕印が表示されます。'
            + '<br></br><b>できるだけ速く、できるだけ正確に</b>分類してください。'
            +'<br></br>スペースバーを押すと、課題が開始します。</p>'
    ,timing_post_trial: 2000
    ,cont_key: ['space']
    ,on_trial_start: function()
        {
            jQuery('div.left-side').empty();
            jQuery('div.right-side').empty();
        }
};


/* ============IMAGE AND WORDS FOR BLOCKS===============*/

/* block 1 and 2 images and/or words */
var images_and_words1 =
[
    {stimulus: '<p class="IAT-stimuli"; style="font-size: 35px">うつ病</p>', is_html:true, key_answer: 70}
    ,{stimulus: '<p class="IAT-stimuli"; style="font-size: 35px">恐怖症</p>', is_html:true, key_answer: 70}
    ,{stimulus: '<p class="IAT-stimuli"; style="font-size: 35px">拒食症</p>', is_html:true, key_answer: 70}
    ,{stimulus: '<p class="IAT-stimuli"; style="font-size: 35px">依存症</p>', is_html:true, key_answer: 70}
];
var im1 = jsPsych.randomization.sample(images_and_words1,7,true);

var images_and_words2 =
[	
    {stimulus: '<p class="IAT-stimuli"; style=" font-size: 35px">努力</p>', is_html:true, key_answer: 70}
    ,{stimulus: '<p class="IAT-stimuli"; style=" font-size: 35px">支援</p>', is_html:true, key_answer: 70}
    ,{stimulus: '<p class="IAT-stimuli"; style=" font-size: 35px">健康</p>', is_html:true, key_answer: 70}
    ,{stimulus: '<p class="IAT-stimuli"; style=" font-size: 35px">復帰</p>', is_html:true, key_answer: 70}
];
var im2 = jsPsych.randomization.sample(images_and_words2,7,true);

var images_and_words3 =
[
    {stimulus: '<p class="IAT-stimuli"; style=" font-size: 35px">困難</p>', is_html:true, key_answer: 74}
    ,{stimulus: '<p class="IAT-stimuli"; style=" font-size: 35px">絶望</p>', is_html:true, key_answer: 74}
    ,{stimulus: '<p class="IAT-stimuli"; style=" font-size: 35px">差別</p>', is_html:true, key_answer: 74}
    ,{stimulus: '<p class="IAT-stimuli"; style=" font-size: 35px">心配</p>', is_html:true, key_answer: 74}
];
var im3 = jsPsych.randomization.sample(images_and_words3,10,true);
    
/* block 3 and 4 images and/or words change */
var images_and_words4 =
[
    {stimulus: '<p class="IAT-stimuli"; style="font-size: 35px">うつ病</p>', is_html:true, key_answer: 74}
    ,{stimulus: '<p class="IAT-stimuli"; style="font-size: 35px">恐怖症</p>', is_html:true, key_answer: 74}
    ,{stimulus: '<p class="IAT-stimuli"; style="font-size: 35px">拒食症</p>', is_html:true, key_answer: 74}
    ,{stimulus: '<p class="IAT-stimuli"; style="font-size: 35px">依存症</p>', is_html:true, key_answer: 74}
];


var im4 = jsPsych.randomization.sample(images_and_words4,7,true);
var im5 = jsPsych.randomization.sample(images_and_words2,10,true);
var im6 = jsPsych.randomization.sample(images_and_words3,7,true);

/* =============RANDOMIZATION OF STIMULI IN BLOCKS================== */

/* practice trial stimuli randomization */

var block1and2 = im1.concat(im2,im3);
var practice_trial_stimuli = jsPsych.randomization.repeat(block1and2,1);
//var practice_trial_stimuli = jsPsych.randomization.repeat(im1,1);//最後にこの行を消す

/* full trial stimuli randomization */

var full_trial_stimuli = jsPsych.randomization.repeat(block1and2,3);
//var full_trial_stimuli = jsPsych.randomization.repeat(im1,1);//最後にこの行を消す

/* reverse practice trial stimuli randomization */
var block3and4 = im4.concat(im5,im6);
var rev_practice_trial_stimuli = jsPsych.randomization.repeat(block3and4,1);
//var rev_practice_trial_stimuli = jsPsych.randomization.repeat(im1,1);//最後にこの行を消す

/* reverse full trial stimuli randomization */
var rev_full_trial_stimuli = jsPsych.randomization.repeat(block3and4,3);
//gitvar rev_full_trial_stimuli = jsPsych.randomization.repeat(im1,1);//最後にこの行を消す
 

/* =================DEFINE BLOCKS================= */

/* define practice trial block */
    

var practice_trial =
{
    type: 'IAT'
    ,choices: ['F','J']
    ,data:{trial_name: 'practice'}
    ,timing_post_trial: post_trial_gap
    ,timing_feedback_duration: 150
    ,force_correct_button_press: false
    ,timing_response: 1500
    ,timeline: practice_trial_stimuli
    ,left_target: '<p>ポジティブ語<br>or</br>精神疾患のある人</p>'
    ,right_target: '<p>ネガティブ語</p>'

};
    
/* define full trial block */
var full_trial =
{
    type: 'IAT'
    ,choices: ['F','J']
    ,data:{trial_name: 'full_trial'}
    ,timing_post_trial: post_trial_gap
    ,timing_feedback_duration: 150
    ,timing_response: 1500
    ,force_correct_button_press: false
    ,timeline: full_trial_stimuli
    ,left_target: '<p>ポジティブ語<br>or</br>精神疾患のある人</p>'
    ,right_target: '<p>ネガティブ語</p>'
};

/* define reverse practice trial block */
var rev_practice_trial =
{
    type: 'IAT'
    ,choices: ['F','J']
    ,data:{trial_name: 'reverse_practice'}
    ,timing_post_trial: post_trial_gap
    ,timing_feedback_duration: 150
    ,timing_response: 1500
    ,force_correct_button_press: false
    ,timeline: rev_practice_trial_stimuli
    ,left_target: '<p>ポジティブ語</p>'
    ,right_target: '<p>ネガティブ語<br>or</br>精神疾患のある人</p>'
};

/* define reverse full trial block */
var rev_full_trial =
{
    type: 'IAT'
    ,choices: ['F','J']
    ,data:{trial_name: 'rev_full_trial'}
    ,timing_post_trial: post_trial_gap
    ,timing_feedback_duration: 150
    ,timing_response: 1500
    ,force_correct_button_press: false
    ,timeline: rev_full_trial_stimuli
    ,left_target: '<p>ポジティブ語</p>'
    ,right_target: '<p>ネガティブ語<br>or</br>精神疾患のある人</p>'

};

var debrief =
{
    type: "text"
    ,data:{trial_name: 'debrief'}
    ,text:'<p class = "instructions">お疲れ様でした。'
        +'<br></br>スペースバーを押して次の課題に取り組んでください。</p>'
    ,on_trial_start: function()
        {
            jQuery('div.left-side').empty();
            jQuery('div.right-side').empty();
        }
    ,cont_key: ['space']
    //,on_finish: function()
    //{
    //	window.close();
    //}
}

/* ====================CREATE EXPERIMENT TIMELINE AND START IT================= */

jsPsych.data.addProperties({
    subject: urlvar.subject
});

/* create experiment timeline array */
var timeline = [];
timeline.push(intro)

timeline.push(rev_instructions);
timeline.push(rev_practice_trial);
timeline.push(instructions2);
timeline.push(rev_full_trial);
timeline.push(instructions);
timeline.push(practice_trial);
timeline.push(instructions2);
timeline.push(full_trial);



/* write to server */
function saveData(filename, filedata)
{
  jQuery.ajax({
  type:'post',
  cache: false,
  url: 'iatphp.php', // this is the path to the above PHP script
  data: {filename: filename, filedata: filedata}
});
}

    
/* grab data before the end of the experiment */
var save_data = {
type: 'call-function'
,func: function()
    {
        saveData("AffectiveSnackIAT1_"+urlvar.subject+".csv", jsPsych.data.dataAsCSV())
    }
,timing_post_trial: 0
}



/* save data and debrief */
timeline.push(save_data);
timeline.push(debrief);