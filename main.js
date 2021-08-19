var cell_Per_Line = 42;
var offsetY = 30;

var cell_width;
var grid;
var newGrid;
var run_flag;
var random_values;
var start_flag;
var startButton;
var check;

function setup() {
    createCanvas(1000, 1000 + offsetY);
    cell_width = floor(width / cell_Per_Line);
    grid = make_2D_Array();

    for (var i = 0; i < cell_Per_Line; i++) {
        for (var j = 0; j < cell_Per_Line; j++) {
            grid[i][j] = 0;
        }
    }

    run_flag = false;
    random_values = false;
    check = false;
    draw();
}

function draw() {

    start_flag = true;

    if (random_values && !run_flag) {
        create_Grid();
        write("Add or remove cells, as well as wipe the board. Once you're done press enter.");
    } else if (run_flag == false) {
        create_Grid();
        write("Press 'r' to create a random first generation or 'w' create your own. Once you're done press enter.");
        check = true;
    } else {
        create_Grid();
        write("Game is running. To pause press enter again . To wipe the board and restart it Press 'w' .");

        newGrid = make_2D_Array();

        for (var i = 0; i < cell_Per_Line; i++) {
            for (var j = 0; j < cell_Per_Line; j++) {

                var current = grid[i][j];
                var neighbours = countNearbyLives(i, j);

                if (current == 0 && neighbours == 3) {
                    newGrid[i][j] = 1;
                } else if (current == 1 && (neighbours < 2 || neighbours > 3)) {
                    newGrid[i][j] = 0;
                } else {
                    newGrid[i][j] = current;
                }
            }
        }

        grid = newGrid;
    }
}


function keyTyped() {

    if (key == 'r') {
        if (!run_flag && start_flag) {
            for (var i = 0; i < cell_Per_Line; i++) {
                for (var j = 0; j < cell_Per_Line; j++) {
                    grid[i][j] = floor(random(2));
                }
            }

            run_flag = false;
            random_values = true;
        }
    }

    if (key == 'w' && start_flag) {
        for (var i = 0; i < cell_Per_Line; i++) {
            for (var j = 0; j < cell_Per_Line; j++) {
                grid[i][j] = 0;
            }
        }

        random_values = false;
        run_flag = false;
    }

    // 13 represents the 'enter' key
    if (keyCode == 13 && start_flag) {
        if (!run_flag) {
            run_flag = true;
        } else if (run_flag) {
            run_flag = false;
        }
    }
}

function mousePressed() {

    for (var i = 0; i < cell_Per_Line; i++) {
        for (var j = 0; j < cell_Per_Line; j++) {
            if (check && mouseX > i * cell_width && mouseX < i * cell_width + cell_width && mouseY > j * cell_width + offsetY && mouseY < j * cell_width + cell_width + offsetY) {
                if (grid[i][j] == 0) {
                    grid[i][j] = 1;
                } else {
                    grid[i][j] = 0;
                }
                break;
            }
        }
    }
}

function write(words) {

    strokeWeight(2);
    stroke(255);
    fill(0);
    textSize(19);
    text(words, 1, 20);
}
function make_2D_Array() {

    var arr = new Array(cell_Per_Line);
    for (var i = 0; i < arr.length; i++) {
        arr[i] = new Array(cell_Per_Line);
    }

    return arr;
}
function create_Grid() {

    background(255);
    strokeWeight(2);
    stroke(0, 0, 0, 20);

    for (var i = 0; i < cell_Per_Line; i++) {
        for (var j = 0; j < cell_Per_Line; j++) {
            if (grid[i][j] == 1) {
                fill(0);
            } else {
                fill(255);
            }
            rect(i * cell_width, j * cell_width + 25, cell_width - 1, cell_width - 1);
        }
    }
}
function countNearbyLives(i, j) {

    var lives = 0;

    for (var x = -1; x <= 1; x++) {
        for (var y = -1; y <= 1; y++) {
            if (i + x >= 0 && i + x < cell_Per_Line && j + y >= 0 && j + y < cell_Per_Line) {
                if (!(x == 0 && y == 0)) {
                    lives += grid[i + x][j + y];
                }
            }
        }
    }

    return lives;
}




