//calculates the days until graduation
var deadline = new Date("May 25, 2024").getTime(); //change this to set the graduation date
var now = new Date().getTime();
var t = deadline - now;
var days = Math.ceil(t / (1000 * 60 * 60 * 24)); // round up on the date b/c it counts the time by millis (ex. Sept 30, 11:59:59 = 1000 millis until Oct, but displays 1 full day)
if (days < 0) days += 365; //after graduation, start counting down to next year (dont display negative)
document.getElementById("counterdays").innerHTML = days + " Days Left!";