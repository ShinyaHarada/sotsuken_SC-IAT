/**
 * jspsych plugin for IAT with feedback
 * Josh de Leeuw
 *
 * documentation: docs.jspsych.org
 **/


jsPsych.plugins.IAT = (function() {

  var plugin = {};

  jsPsych.pluginAPI.registerPreload('animation', 'stimulus', 'image');

  plugin.trial = function(display_element, trial) {

    // default parameters
    trial.text_answer = (typeof trial.text_answer === 'undefined') ? "" : trial.text_answer;
    trial.correct_text = (typeof trial.correct_text === 'undefined') ? "<div class='iat-response'><span style='font-size: 144px; color: #008000;'>O</span></div>" : trial.correct_text;
    trial.incorrect_text = (typeof trial.incorrect_text === 'undefined') ? "<div class='iat-response'><span style='font-size: 144px; color: #ff0000;'>X</span></div>" : trial.incorrect_text;
    trial.show_stim_with_feedback = (typeof trial.show_stim_with_feedback === 'undefined') ? true : trial.show_stim_with_feedback;
    trial.is_html = (typeof trial.is_html === 'undefined') ? false : trial.is_html;
    trial.force_correct_button_press = (typeof trial.force_correct_button_press === 'undefined') ? false : trial.force_correct_button_press;
    trial.prompt = (typeof trial.prompt === 'undefined') ? '' : trial.prompt;
    trial.show_feedback_on_timeout = (typeof trial.show_feedback_on_timeout === 'undefined') ? false : trial.show_feedback_on_timeout;
    trial.timeout_message = trial.timeout_message || "<div class ='iat-response'>もっと速く押してください！</div>";
    // timing params
    trial.timing_stim = trial.timing_stim || -1; // default is to show image until response
    trial.timing_response = trial.timing_response || -1; // default is no max response time
    trial.timing_feedback_duration = trial.timing_feedback_duration || 2000;
	// new params for IAT
	trial.left_target = (typeof trial.left_target === 'undefined') ? "" : trial.left_target;
	trial.right_target = (typeof trial.right_target === 'undefined') ? "" : trial.right_target;
    
	// if any trial variables are functions
    // this evaluates the function and replaces
    // it with the output of the function
    trial = jsPsych.pluginAPI.evaluateFunctionParameters(trial);

    // this array holds handlers from setTimeout calls
    // that need to be cleared if the trial ends early
    var setTimeoutHandlers = [];

    if (!trial.is_html) {
      // add image to display
      display_element.append(jQuery('<img>', {
        "src": trial.stimulus,
        "class": 'jspsych-IAT-stimulus',
        "id": 'jspsych-IAT-stimulus'
      }));
    } else {
      display_element.append(jQuery('<div>', {
        "id": 'jspsych-IAT-stimulus',
        "class": 'jspsych-IAT-stimulus',
        "html": trial.stimulus
      }));
    }

    // hide image after time if the timing parameter is set
    if (trial.timing_stim > 0) {
      setTimeoutHandlers.push(setTimeout(function() {
        jQuery('#jspsych-IAT-stimulus').css('visibility', 'hidden');
      }, trial.timing_stim));
    }

    // if prompt is set, show prompt
    if (trial.prompt !== "") {
      display_element.append(trial.prompt);
    }

	// if left_target is set, show left_target
    if (trial.left_target !== "") {
		jQuery('div.left-side').empty();
		jQuery('body').before(jQuery('<div class = "left-side">'+trial.left_target+'</div>'));
   }
	
	// if right_target is set, show right_target
   if (trial.right_target !== "") {
		jQuery('div.right-side').empty();
		jQuery('body').before(jQuery('<div class = "right-side">'+trial.right_target+'</div>'));  
	}

    var trial_data = {};

    // create response function
    var after_response = function(info) {

      // kill any remaining setTimeout handlers
      for (var i = 0; i < setTimeoutHandlers.length; i++) {
        clearTimeout(setTimeoutHandlers[i]);
      }

      // clear keyboard listener
      jsPsych.pluginAPI.cancelAllKeyboardResponses();

      var correct = false;
      if (trial.key_answer == info.key) {
        correct = true;
      }

      // save data
      trial_data = {
        "rt": info.rt,
        "correct": correct,
        "stimulus": trial.stimulus,
        "key_press": info.key,
        "total_rt": info.rt
      };

      display_element.html('');

      var timeout = info.rt == -1;
      doFeedback(correct, timeout);
    }

    jsPsych.pluginAPI.getKeyboardResponse({
      callback_function: after_response,
      valid_responses: trial.choices,
      rt_method: 'date',
      persist: false,
      allow_held_key: false
    });

    if (trial.timing_response > 0) {
      setTimeoutHandlers.push(setTimeout(function() {
        after_response({
          key: -1,
          rt: -1
        });
      }, trial.timing_response));
    }

    function doFeedback(correct, timeout) {

      if (timeout && !trial.show_feedback_on_timeout) {
        display_element.append(trial.timeout_message);
        //setTimeout(function(){}, 350);
      } else {
        // show image during feedback if flag is set
        if (trial.show_stim_with_feedback) {
          if (!trial.is_html) {
            // add image to display
            display_element.append(jQuery('<img>', {
              "src": trial.stimulus,
              "class": 'jspsych-IAT-stimulus',
              "id": 'jspsych-IAT-stimulus'
            }));
          } else {
            display_element.append(jQuery('<div>', {
              "id": 'jspsych-IAT-stimulus',
              "class": 'jspsych-IAT-stimulus',
              "html": trial.stimulus
            }));
          }
        }

        // substitute answer in feedback string.
        var atext = "";
        if (correct) {
          atext = trial.correct_text.replace("%ANS%", trial.text_answer);
        } else {
          atext = trial.incorrect_text.replace("%ANS%", trial.text_answer);
        }

        // show the feedback
        display_element.append(atext);
      }
      // check if force correct button press is set
      if (trial.force_correct_button_press && correct === false && ((timeout && trial.show_feedback_on_timeout) || !timeout)) {

        var after_forced_response = function(info) {       
        
        // save data
      	trial_data.rt2 = info.rt;
	trial_data.key_press_2 = info.key;
	trial_data.total_rt = trial_data.rt + trial_data.rt2;

      
      endTrial();
          }

	  jsPsych.pluginAPI.getKeyboardResponse({
          callback_function: after_forced_response,
          valid_responses: [trial.key_answer],
          rt_method: 'date',
          persist: false,
          allow_held_key: false
        });

      } else {
        if (timeout && !trial.show_feedback_on_timeout) {
          setTimeout(function() {
            endTrial();
          }, 500);
        } else {
          setTimeout(function() {
            endTrial();
          }, trial.timing_feedback_duration);
        }
      }

    }

    function endTrial() {
      display_element.html("");
      jsPsych.finishTrial(trial_data);
    }

  };

  return plugin;
})();
