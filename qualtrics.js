Qualtrics.SurveyEngine.addOnload(function()
{
    /*Place your JavaScript here to run when the page is fully displayed*/
    var qthis = this;
    qthis.hideNextButton();
 
    var task_github = "https://shinyaharada.github.io/sotsuken_SC-IAT/"; 
 
    var requiredResources = [
        task_github + "https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js",
        task_github + "jsPsych/jspsych-5.0.3/jspsych.js",
        task_github + "jsPsych/jspsych-5.0.3/jspsych7.js",
        task_github + "jsPsych/jspsych-5.0.3/css/jspsych.css",
        task_github + "jsPsych/jspsych-5.0.3/plugins/jspsych-text.js",
        task_github + "jsPsych/jspsych-5.0.3/plugins/jspsych-IATs.js",
        task_github + "jsPsych/jspsych-5.0.3/plugins/jspsych-survey-text.js",
        task_github + "jsPsych/jspsych-5.0.3/plugins/jspsych-instructions.js",
        task_github + "jsPsych/jspsych-5.0.3/plugins/jspsych-call-function.js",
        task_github + "PoComFir_main.js",
        task_github + "jquery-3.6.1.min.js"
    ];

    function loadScript(idx) {
        console.log("Loading ", requiredResources[idx]);
        jQuery.getScript(requiredResources[idx], function () {
            if ((idx + 1) < requiredResources.length) {
                loadScript(idx + 1);
            } else {
                initExp();
            }
        });
    }
 
    if (window.Qualtrics && (!window.frameElement || window.frameElement.id !== "mobile-preview-view")) {
        loadScript(0);
    }
 
    jQuery("<div id = 'display_stage_background'></div>").appendTo('body');
    jQuery("<div id = 'display_stage'></div>").appendTo('body');
     
    function initExp() {
        jsPsych.init({
            timeline: timeline,
            display_element: 'display_stage',
            on_finish: function (data) {
       
                  var datajs = jsPsych.data.get().json();
                 
                Qualtrics.SurveyEngine.setEmbeddedData("datajs", datajs);
         
                jQuery('display_stage').remove();
                jQuery('display_stage_background').remove();
         
                qthis.clickNextButton();
            }
        });
      };
});
 
Qualtrics.SurveyEngine.addOnReady(function()
{
    /*Place your JavaScript here to run when the page is fully displayed*/
 
});
 
Qualtrics.SurveyEngine.addOnUnload(function()
{
    /*Place your JavaScript here to run when the page is unloaded*/
 
});