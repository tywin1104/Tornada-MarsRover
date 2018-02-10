var grid = {
    x:undefined,y:undefined
}

direction = {
  0:'N',1:'W',2:'S',3:'E'
}

function Rover(x,y,head) {
	this.x = x;
    this.y = y;
    this.head = head;
  
  this.turn = (direction) => {
      if(direction==="L") {
       this.head = (this.head+1) % 4
      }else if(direction==="R") {
       this.head = ((this.head-1)+4) % 4
     }
   }

  this.move = () => {
    switch(this.head){
      case 0:
        if(this.y < grid.y) {
          this.y ++
        }
        break;
      case 2:
        if(this.y > 0) {
          this.y --
        }
        break;
      case 1:
        if(this.x > 0) {
          this.x --;
        }
        break;
      case 3:
        if(this.x < grid.x) {
          this.x ++;
        }
        break;
    }
  }

  this.exec = function (instructions) {
  for(var i=0;i<instructions.length;i++) {
    var letter = instructions.charAt(i)
    if(letter === "L" || letter ==="R") {
      this.turn(letter)
    }else if(letter === "M") {
      this.move() 
    }
  }
}

}

var parseRover = function(initStr) {
  var strs = initStr.split(" ")
  var rover = new Rover()
  rover.x = parseInt(strs[0])
  rover.y = parseInt(strs[1])
  var head = strs[2]
  switch(head) {
    case "N":
      rover.head = 0
      break
    case "W":
      rover.head = 1
      break
    case "S":
      rover.head = 2
      break
    case "E":
      rover.head = 3
      break
  } 
  return rover  
}



  
var button = document.getElementsByTagName('button')[0]
var errorText = document.getElementById('error')
var errorDiv = document.getElementsByClassName('alert-danger')[0]
var resultDiv = document.getElementsByClassName('alert-success')[0] 

processData = function (e) { 
  e.preventDefault()

  var gridSize = document.getElementById('grid').value
  var initOne = document.getElementById('init1').value
  var initTwo = document.getElementById('init2').value
  var instructOne = document.getElementById('instruct1').value
  var instructTwo = document.getElementById('instruct2').value 
 
  var errorMsg = []
  grid.x= parseInt(gridSize.split(" ")[0])
  grid.y = parseInt(gridSize.split(" ")[1])

  if(! Number.isInteger(grid.x) || ! Number.isInteger(grid.y) ||grid.x <=0 || grid.y <=0) {
    errorMsg.push("invalid input for gridSize")
  }

  r1 = parseRover(initOne)
  r2 = parseRover(initTwo)
  rovers= [r1,r2]

  rovers.forEach((r,i)=>{ 
    if(! Number.isInteger(r.x) || ! Number.isInteger(r.y) || ! Number.isInteger(r.head)) {
      errorMsg.push(`invalid input for Rover ${i+1} initilization`) 
    }
  })
  if (/[^LMR]+/.test(instructOne) || /[^LRM]+/.test(instructTwo) || !instructOne || !instructTwo){
    errorMsg.push("invalid input for Rover Moving instructions") 
  }

  r1.exec(instructOne)
  r2.exec(instructTwo)

  if (errorMsg.length >0) {
    resultDiv.style.display ="none"
    showError(errorMsg)
    return 
  }else {
    errorDiv.style.display = "none"
    resultDiv.style.display="block"
    resultDiv.innerHTML = r1.x + " "+ r1.y + " "+ direction[r1.head]+ "<br>" + r2.x + " "+ r2.y + " "+ direction[r2.head] 
  }
}   


button.addEventListener('click',processData);

var showError = function(msg) {
  errorDiv.style.display = "block"
  str = ""
  for(var text of msg){
    str +=  text +"<br>"
    errorDiv.innerHTML = str
  }
} 

