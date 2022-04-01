function $(id) {return document.getElementById(id);}

var canvas = $("canvas");
canvas.width = window.innerWidth;
var graph = canvas.getContext("2d");

var selected = 0; // 0 = NONE, 1 = UP, -1 = DOWN
var upOffset = 0;
var downOffset = 0;

let n = 13;
let g = 2;

let order = [];
checkVals();

function checkVals() {
  let tempN = parseInt($("input-n").value);
  let tempG = parseInt($("input-g").value);

  if (tempN <= 1 || tempG <= 1 || tempG >= tempN) {
    $("invalidvalswarn").style.display = "block";
    return;
  } else {
    $("invalidvalswarn").style.display = "none";
  }

  let x = tempG;
  let k = 1;
  let tempOrder = [1];
  while (x != 1 && k < tempN) {
    tempOrder.push(x);
    x = x*tempG % tempN;
    k++;
    //console.log(k + " - " + x);
  }
  if (k == tempN-1) {
    n = tempN;
    g = tempG;
    order = tempOrder;
    update();
    $("badvalswarn").style.display = "none";
  } else {
    $("badvalswarn").style.display = "block";
  }
}

$("input-n").value = n;
$("input-g").value = g;

$("input-n").addEventListener("change", checkVals);
$("input-g").addEventListener("change", checkVals);

document.addEventListener("mousedown", function(e) {
  let y = e.y - canvas.getBoundingClientRect().top;
  selected = y < 50 ? 1 : -1;
});
document.addEventListener("mouseup", function() {selected = 0;});
canvas.addEventListener("mousemove", function(e) {
  if (selected == 1) upOffset += e.movementX;
  else if (selected == -1) downOffset += e.movementX;

  if (downOffset > 0) downOffset = 0;

  update();
});

function update() {
  graph.fillStyle = "#FFF";
  graph.fillRect(0, 0, canvas.width, canvas.height);

  //graph.fillStyle = "#F00";
  //graph.fillRect(upOffset, downOffset, 10, 10);

  for (let i = 1; i < n; i++) {
    graph.strokeStyle = "#000";
    line(i*50 + upOffset + downOffset,50,i*50 + upOffset + downOffset,30);
    line((i+n-1)*50 + upOffset + downOffset,50,(i+n-1)*50 + upOffset + downOffset,30);
    line(i*50 + downOffset,50,i*50 + downOffset,70);
    line((i+n-1)*50 + downOffset,50,(i+n-1)*50 + downOffset,70);
    if (order[i-1] <= 10) {
      graph.font = "15px Arial";
      graph.fillStyle = "#F00";
    } else {
      graph.font = "10px Arial";
      graph.fillStyle = "#000";
    }
    graph.fillText(order[i-1], i*50 + upOffset + downOffset - 5, 20);
    graph.fillText(order[i-1], (i+n-1)*50 + upOffset + downOffset - 5, 20);
    graph.fillText(order[i-1], i*50 + downOffset - 5, 85);
    graph.fillText(order[i-1], (i+n-1)*50 + downOffset - 5, 85);
    graph.strokeStyle = "#FFF";
    line(0,50,canvas.width,50);
  }
}

function line(x1, y1, x2, y2) {
  graph.beginPath();
  graph.moveTo(x1,y1);
  graph.lineTo(x2,y2);
  graph.stroke();
}
