
function dispTime() {
  var time = new Date();
  var hour = time.getHours();
  var minute = time.getMinutes();
  var temp = '' + ((hour > 12) ? hour - 12 : hour);

  if (hour == 0) {
    temp = '12';
  }

  temp += ((minute < 10) ? ':0' : ':') + minute;

  // temp += ((second < 10) ? ':0' : ':') + second;
  // temp += (hour >= 12) ? ' P.M.' : ' A.M.';
  
  return temp;
}

function dispGreet() {
  var time = new Date();
  var hour = time.getHours();
  var greeting = '';
  
  if(hour >= 6 && hour <=11)
    greeting += 'Good Morning';
  else if(hour >= 12 && hour <= 17)
    greeting += 'Good Afternoon';
  else if(hour >= 18 && hour <=5)
    greeting += 'Good Evening';
  
    
  return greeting;
}

setInterval(function () {
	$('.time').html(dispTime());
}, 1000);

setInterval(function () {
  $('.greet').html(dispGreet());
}, 1000);

$(document).ready(dispTime);
$(document).ready(dispGreet);




function clickTodo() {
$('.wrapper').hide();
$('#add').on('click', function() {
  $('.wrapper').show();
});
}

$(document).ready(clickTodo);