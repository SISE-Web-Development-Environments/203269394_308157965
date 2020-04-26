var context;
var shape = new Object();
var board;
var score;
var pac_color;
var start_time;
var time_elapsed;
var interval;
var up = 38;
var down = 40;
var left = 37;
var right = 39;
var food_remain = -1;
var num_of_monsters = -1;
var timeToPlay = -1;
var extra_food = 2;
var pacman_right = true;
var pacman_left = false;
var pacman_up = false;
var pacman_down = false;
var num_of_5_pt;
var num_of_15_pt;
var num_of_25_pt;
var scoreOfTotalBoard = 0;
var pacman_dead = false;

    /* $(document).ready(function () {
        let userScreenWidth = window.innerWidth;
        console.log(userScreenWidth);
        let userScreenHeigth = window.innerHeight;
        console.log(userScreenHeigth);
        if (userScreenHeigth < 768 || userScreenWidth < 1366) {
            window.resizeTo(1366 , 768);
            window.focus();
            console.log("working");
        }
    }); */

function myFunctionLogin() {
    $(document.getElementById("welcome")).hide();
    $(document.getElementById("about")).hide();
    $(document.getElementById("register")).hide();
    $(document.getElementById("login")).show();
}

$(document).ready(function () {
    $("#aboutBtn").click(function () {
        $('#welcome').css("display", "none");
        $(document.getElementById("register")).hide();
        $(document.getElementById("login")).hide();
        $("#about").show(300);

    });
});

$(document).ready(function () {
    $("#welcomeBtn").click(function () {
        $(document.getElementById("about")).hide();
        $(document.getElementById("register")).hide();
        $(document.getElementById("login")).hide();
        $('#welcome').css("display", "block");

    });
});

$(document).ready(function () {
    $("#loginBtn").click(function () {
        $(document.getElementById("welcome")).hide();
        $(document.getElementById("about")).hide();
        $(document.getElementById("register")).hide();
        $(document.getElementById("login")).show(300);

    });
});

$(document).ready(function () {
    $("#registerBtn").click(function () {
        $('#welcome').css("display", "none");
        $(document.getElementById("about")).hide();
        $(document.getElementById("login")).hide();
        $("#register").show(300);

    });
});
/* defult user */
$(document).ready(function () {

    let defUserName = {
        userName: "p",
        userPassword: "p",
        firstName: "p",
        lastName: "p",
        mail: "p",
        birthDay: Date.now()
    };
    let str = JSON.stringify(defUserName);
    localStorage.setItem("p", str);
});


function save_user() {
    let nameForKey = document.getElementById("user_name").value;
    if (localStorage.getItem(nameForKey) == null) {
        let data = {
            userName: document.getElementById("user_name").value,
            userPassword: document.getElementById("user_password").value,
            firstName: document.getElementById("userFirstName").value,
            lastName: document.getElementById("userLastName").value,
            mail: document.getElementById("userMail").value,
            birthDay: document.getElementById("birthday").value
        };
        document.forms[0].reset();
        let str = JSON.stringify(data);
        localStorage.setItem(nameForKey, str);
        $('#register').css('display', 'none');
        $('#setting').css('display', 'block');
    }
    alert("this user already exist");

}

function load_user() {
    let userName = document.getElementById("name").value;
    //console.log(userName);
    let userPassword = document.getElementById("userPassword").value;
    //console.log(userPassword);
    let originalData = localStorage.getItem(userName);
    if (originalData == null) {
        console.log(false);
        alert("You have to register in order to play");
    } else {

        //console.log(originalData); // just to check if good
        let dataObj = JSON.parse(originalData);
        // test to see the object
        //console.log(dataObj);
        let psd = dataObj.userPassword;
        //console.log(psd);
        let name = dataObj.userName;
        //console.log(name);
        if (userName == name && userPassword == psd) {

            console.log(true);
            console.log("welcome");
            $('#login').css('display', 'none');
            $('#setting').css('display', 'block');
        }

    }
}

function open_about() {
    // Get the modal
    var modal = document.getElementById("myModal");

    // Get the button that opens the modal
    var btn = document.getElementById("myBtn");

    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];

    // When the user clicks the button, open the modal
    btn.onclick = function () {
        modal.style.display = "block";
    }
    // When the user clicks on <span> (x), close the modal
    span.onclick = function () {
        modal.style.display = "none";
    }
    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
    // when user clicks on the Esc button, close it
    document.onkeydown = function (event) {
        var x = event.keyCode;
        if (x == 27) {
            modal.style.display = "none";
        }
    }
}

function myFunction() {
    $('#welcome').css("display", "none");
    $(document.getElementById("about")).hide();
    $(document.getElementById("login")).hide();
    $(document.getElementById("register")).show();
    $("#register").show(300);
}


function startForNow(e) {
    e.preventDefault();
    context = canvas.getContext("2d");
    Start();
    return false;
}

function initNewGame() {
    pacman_dead = false;
    context.clearRect(0, 0, canvas.width, canvas.height);
    context = canvas.getContext("2d");
    food_remain =  food_remain = parseInt($(document.getElementById("food")).val());
    num_of_monsters = parseInt($(document.getElementById("monsters")).val());
    timeToPlay = parseInt($(document.getElementById("lbltime")).val());
    pacman_right = true;
    pacman_left = false;
    pacman_up = false;
    pacman_down = false;
    extra_food = 2;
    Start();
    Draw();
    return false;
}

$(document).ready(function () {
});

function Start() {
    board = new Array();
    score = 0;
    pac_color = "yellow";
    var cnt = 100;
    var pacman_remain = 1;
    if (food_remain == -1 && num_of_monsters == -1 && timeToPlay == -1) {
        food_remain = parseInt($(document.getElementById("food")).val());
        num_of_monsters = parseInt($(document.getElementById("monsters")).val());
        timeToPlay = parseInt($(document.getElementById("lbltime")).val());
    }
    num_of_5_pt = parseInt(0.6 * food_remain);
    num_of_15_pt = parseInt(0.3 * food_remain);
    num_of_25_pt = food_remain - num_of_5_pt - num_of_15_pt;
    scoreOfTotalBoard = (5*num_of_5_pt + 15*num_of_15_pt + 25*num_of_25_pt + 50*extra_food);
    start_time = new Date();
    for (var i = 0; i < 10; i++) {
        board[i] = new Array();
        //put obstacles in (i=3,j=3) and (i=3,j=4) and (i=3,j=5), (i=6,j=1) and (i=6,j=2)
        for (var j = 0; j < 10; j++) {
            if (
                (i == 3 && j == 3) ||
                (i == 3 && j == 4) ||
                (i == 3 && j == 5) ||
                (i == 6 && j == 1) ||
                (i == 6 && j == 2)
            ) {
                board[i][j] = 4;
            } else {
                var randomNum = Math.random();
                if (randomNum <= (1.0 * num_of_5_pt) / cnt) {
                    if (num_of_5_pt > 0) {
                        board[i][j] = 1;
                        num_of_5_pt--;
                        food_remain--;
                    }
                } else if (randomNum <= (1.0 * num_of_15_pt) / cnt) {
                    if (num_of_15_pt > 0) {
                        board[i][j] = 6;
                        num_of_15_pt--;
                        food_remain--;
                    }
                } else if (randomNum <= (1.0 * num_of_25_pt) / cnt) {
                    if (num_of_25_pt > 0) {
                        board[i][j] = 7;
                        num_of_25_pt--;
                        food_remain--;
                    }
                } else if ( randomNum < (1.0 * (pacman_remain + food_remain)) / cnt) {
                    shape.i = i;
                    shape.j = j;
                    pacman_remain--;
                    if (pacman_remain > 0) {
                    board[i][j] = 2;
                    }
				} else {
                    board[i][j] = 0;
                }
                cnt--;
            }
        }
    }
    while (extra_food > 0) {
        var emptyCell = findRandomEmptyCell(board);
        board[emptyCell[0]][emptyCell[1]] = 8;
        extra_food--;
    }

    while (num_of_monsters > 0) {
        var emptyCell = findRandomEmptyCell(board);
        board[emptyCell[0]][emptyCell[1]] = 9;
        num_of_monsters--;
    }


    while (num_of_5_pt > 0) {
        var emptyCell = findRandomEmptyCell(board);
        board[emptyCell[0]][emptyCell[1]] = 1;
        num_of_5_pt--;
        food_remain--;
    }
    while (num_of_15_pt > 0) {
        var emptyCell = findRandomEmptyCell(board);
        board[emptyCell[0]][emptyCell[1]] = 6;
        num_of_15_pt--;
        food_remain--;
    }
    while (num_of_25_pt > 0) {
        var emptyCell = findRandomEmptyCell(board);
        board[emptyCell[0]][emptyCell[1]] = 7;
        num_of_25_pt--;
        food_remain--;
    }

    keysDown = {};
    addEventListener(
        "keydown",
        function (e) {
            keysDown[e.keyCode] = true;
        },
        false
    );
    addEventListener(
        "keyup",
        function (e) {
            keysDown[e.keyCode] = false;
        },
        false
    );
    interval = setInterval(UpdatePosition, 100);

}

function findRandomEmptyCell(board) {
    var i = Math.floor(Math.random() * 9 + 1);
    var j = Math.floor(Math.random() * 9 + 1);
    while (board[i][j] != 0) {
        i = Math.floor(Math.random() * 9 + 1);
        j = Math.floor(Math.random() * 9 + 1);
    }
    return [i, j];
}

function GetKeyPressed() {
    if (keysDown[up]) {
        return 1;
    }
    if (keysDown[down]) {
        return 2;
    }
    if (keysDown[left]) {
        return 3;
    }
    if (keysDown[right]) {
        return 4;
    }
}

function changeValueToKey(event) {
    //set key from event's id
    if (event.target.id == "upId") {
        up = event.keyCode;
    }
    if (event.target.id == "downId") {
        down = event.keyCode;
    }
    if (event.target.id == "leftId") {
        left = event.keyCode;
    }
    if (event.target.id == "rightId") {
        right = event.keyCode;
    }
}

function randomSetting() {
    while (food_remain < 50 || food_remain > 90) {
        food_remain = parseInt(100 * Math.random());
    }
    while (num_of_monsters < 1 || num_of_monsters > 4) {
        num_of_monsters = parseInt(10 * Math.random());
    }
    while (timeToPlay < 60) {
        timeToPlay = parseInt(100 * Math.random());
    }
    food.value = food_remain;
    monsters.value = num_of_monsters;
    lblTimeSetting.value = timeToPlay;
}

function Draw() {
    canvas.width = canvas.width; //clean board
    lblScore.value = score;
    lblTime.value = time_elapsed;
    var sprite = new Image();
    sprite.src = "image/monster.png";
    var burger = new Image();
    burger.src = "image/burger.png"
    for (var i = 0; i < 10; i++) {
        for (var j = 0; j < 10; j++) {
            var center = new Object();
            center.x = i * 60 + 30;
            center.y = j * 60 + 30;
            if (board[i][j] == 8) {
                context.drawImage(burger, center.x - 25, center.y - 25);
            } else if (board[i][j] == 9) {
                context.drawImage(sprite, center.x - 20, center.y - 20);
            } else if (board[i][j] == 2 && pacman_left && pacman_dead == false) {
                context.beginPath();
                context.arc(center.x, center.y, 30, -0.85 * Math.PI, 0.85 * Math.PI); // half circle
                context.lineTo(center.x, center.y);
                context.fillStyle = pac_color; //color
                context.fill();
                context.beginPath();
                context.arc(center.x + 5, center.y - 15, 5, 0, 2 * Math.PI); // circle
                context.fillStyle = "black"; //color
                context.fill();
            } else if (board[i][j] == 2 && pacman_up && pacman_dead == false) {
                context.beginPath();
                context.arc(center.x, center.y, 30, 1.7 * Math.PI, 1.35 * Math.PI); // half circle
                context.lineTo(center.x, center.y);
                context.fillStyle = pac_color; //color
                context.fill();
                context.beginPath();
                context.arc(center.x + 15, center.y + 5, 5, 0, 2 * Math.PI); // circle
                context.fillStyle = "black"; //color
                context.fill();
            } else if (board[i][j] == 2 && pacman_right && pacman_dead == false) {
                context.beginPath();
                context.arc(center.x, center.y, 30, 0.15 * Math.PI, 1.85 * Math.PI); // half circle
                context.lineTo(center.x, center.y);
                context.fillStyle = pac_color; //color
                context.fill();
                context.beginPath();
                context.arc(center.x + 5, center.y - 15, 5, 0, 2 * Math.PI); // circle
                context.fillStyle = "black"; //color
                context.fill();
            } else if (board[i][j] == 2 && pacman_down && pacman_dead == false) {
                context.beginPath();
                context.arc(center.x, center.y, 30, 0.75 * Math.PI, 0.35 * Math.PI); // half circle
                context.lineTo(center.x, center.y);
                context.fillStyle = pac_color; //color
                context.fill();
                context.beginPath();
                context.arc(center.x + 15   , center.y - 10, 5, 0, 2 * Math.PI); // circle
                context.fillStyle = "black"; //color
                context.fill();
            } else if (board[i][j] == 1) {
                context.beginPath();
                context.arc(center.x, center.y, 15, 0, 2 * Math.PI); // circle
                context.fillStyle = favcolor5.value; //color
                context.fill();
                context.fillStyle = "white"; //color
                context.font = "bold 10px Arial";
                context.fillText("5", center.x - 5, center.y);
            } else if (board[i][j] == 6) {
                context.beginPath();
                context.arc(center.x, center.y, 15, 0, 2 * Math.PI); // circle
                context.fillStyle = favcolor15.value; //color
                context.fill();
                context.fillStyle = "white"; //color
                context.font = "bold 10px Arial";
                context.fillText("15", center.x - 5, center.y);
            } else if (board[i][j] == 7) {
                context.beginPath();
                context.arc(center.x, center.y, 15, 0, 2 * Math.PI); // circle
                context.fillStyle = favcolor25.value; //color
                context.fill();
                context.fillStyle = "black"; //color
                context.font = "bold 10px Arial";
                context.fillText("25", center.x - 5, center.y);
            } else if (board[i][j] == 4) {
                context.beginPath();
                context.rect(center.x - 30, center.y - 30, 60, 60);
                context.fillStyle = "grey"; //color
                context.fill();
            }
        }
    }
}

function UpdatePosition() {
    board[shape.i][shape.j] = 0;
    var x = GetKeyPressed();
    if (x == 1) {
        pacman_up = true;
        pacman_right = false;
        pacman_left = false;
        pacman_down = false;
        if (shape.j > 0 && board[shape.i][shape.j - 1] != 4) {
            shape.j--;
        }
    }
    if (x == 2) {
        pacman_down = true;
        pacman_left = false;
        pacman_up = false;
        pacman_right = false;
        if (shape.j < 9 && board[shape.i][shape.j + 1] != 4) {
            shape.j++;
        }
    }
    if (x == 3) {
        pacman_left = true;
        pacman_right = false;
        pacman_up = false;
        pacman_down = false;
        if (shape.i > 0 && board[shape.i - 1][shape.j] != 4) {
            shape.i--;
        }
    }
    if (x == 4) {
        pacman_right = true;
        pacman_left = false;
        pacman_up = false;
        pacman_down = false;
        if (shape.i < 9 && board[shape.i + 1][shape.j] != 4) {
            shape.i++;
        }
    }
    /*same cell with monster - dead*/
    if (board[shape.i][shape.j] == 9) {
        var audio = new Audio('audio/death.mp3');
        audio.play();
        pacman_dead = true;
        Draw();
        if(confirmNote("So sad... your Pacman dead")) {
            pacman_dead = false;
            initNewGame();
        }

    }
    /*same cell with ball - score up */
    if (board[shape.i][shape.j] == 1 || board[shape.i][shape.j] == 6 || board[shape.i][shape.j] == 7 ) {
        var audio = new Audio('audio/pacman_eatfruit.wav');
        audio.play();
        if(board[shape.i][shape.j] == 1){
            score = score + 5;
        }
        if(board[shape.i][shape.j] == 6){
            score = score + 15;
        }
        if(board[shape.i][shape.j] == 7){
            score = score + 25;
        }
    }
    /*same cell with burger - score up*/
    if (board[shape.i][shape.j] == 8) {
        var audio = new Audio('audio/pacman_eatghost.wav');
        audio.play();
        score = score + 50;
    }

    board[shape.i][shape.j] = 2;
    var currentTime = new Date();
    time_elapsed = (currentTime - start_time) / 1000;

    if (score >= 20 && time_elapsed <= 10) {
        pac_color = "green";
    }
    if(score < 100 && time_elapsed >= timeToPlay){
        let note = "You better than " + score + " points!";
        time_elapsed = timeToPlay;
        lblTime.value = time_elapsed;
        window.clearInterval(interval);
        alertNote(note,1000)
    }else if(score >= 100 && time_elapsed >= timeToPlay){
        time_elapsed = timeToPlay;
        lblTime.value = time_elapsed;
        window.clearInterval(interval);
        alertNote("Winner!",1000)
    }
    if (score == scoreOfTotalBoard) {
        window.clearInterval(interval);
        alertNote("Game completed - You got the total score - Winner!",1000);
    // } else if (time_elapsed >= timeToPlay) {
    //     time_elapsed = timeToPlay;
    //     lblTime.value = time_elapsed;
    //     window.clearInterval(interval);
    //     alertNote("Time Passed",timeToPlay);
    } else {
        Draw();
    }
}

function alertNote(note,timeToAlert) {
    setTimeout(function () {
        alert(note);
    }, timeToAlert);
}

function confirmNote(note) {
    window.clearInterval(interval);
    if(confirm(note)){
        return true;
    }
    else{
        return false;
    }
}


function open_login_window() {
    document.getElementById("Welcom_buttons").hidden = true;
    var x = document.getElementById("Login_button");
    if (x.style.display == "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
}

