
function dispTime() {
  var time = new Date();
  var hour = time.getHours();
  var minute = time.getMinutes();
  var second = time.getSeconds();
  var temp = '' + ((hour > 12) ? hour - 12 : hour);

  if (hour == 0) {
    temp = '12';
  }

  temp += ((minute < 10) ? ':0' : ':') + minute;

  // temp += '\n';
  // temp += ((second < 10) ? ':0' : ':') + second;
  // temp += (hour >= 12) ? ' P.M.' : ' A.M.';
  // temp += (hour <= 12) ? 'Good Morning' : 'Good Afternoon';

  return temp;
}


// document.getElementById('date').value = temp;
setInterval(function () {
	$('.box').html(dispTime());
}, 1000);

$(document).ready(dispTime);
