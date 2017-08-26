
function dispTime() {
  let time = new Date();
  let hour = time.getHours();
  let minute = time.getMinutes();
  let temp = '' + ((hour > 12) ? hour - 12 : hour);

  if (hour == 0) {
    temp = '12';
  }

  temp += ((minute < 10) ? ':0' : ':') + minute;

  // temp += ((second < 10) ? ':0' : ':') + second;
  // temp += (hour >= 12) ? ' P.M.' : ' A.M.';

  return temp;
}

function dispGreet() {
  let time1 = new Date();
  let hour = time1.getHours();
  let greeting = '';
  
  if(hour >= 6 && hour <=11)
    greeting += 'Good Morning';
  
  else if(hour >= 12 && hour <= 17)
    greeting += 'Good Afternoon';
  
  else
    greeting += 'Good Evening';

  return greeting;
}

// $('.time').html(dispTime());
// $('.greet').html(dispGreet());

setInterval(function () {
	$('.time').html(dispTime());
}, 1000);

setInterval(function () {
  $('.greet').html(dispGreet());
}, 1000);



function clickTodo() {
$('.wrapper').hide();
$('#add').on('click', function() {
  $('.wrapper').show();
});
}

$(document).ready(clickTodo);
$(document).ready(dispTime);
$(document).ready(dispGreet);