var five = require("johnny-five");
var board = new five.Board();

var stdin = process.stdin;
stdin.setRawMode(true);
stdin.resume();

board.on("ready", function () {
    var wheels = {
        left: new five.Servo({ pin: 9, type: 'standard' }),
        right: new five.Servo({ pin: 10, type: 'standard' }),
        stop: function () {
            wheels.left.stop();
            wheels.right.stop();
        },
        forward: function () {
            wheels.left.ccw(1);
            wheels.right.cw(1);
            console.log("goForward");
        },
        pivotLeft: function () {
            wheels.left.cw(1);
            wheels.right.cw(1);
            console.log("turnLeft");
        },
        pivotRight: function () {
            wheels.left.ccw(1);
            wheels.right.ccw(1);
            console.log("turnRight");
        },
        back: function () {
            wheels.left.cw(1);
            wheels.right.ccw(1);
        },
		quick0: function (){
			var servo = new five.Servo(10);
			servo.sweep(0,180);
			// wheels.left.to(0,250);
		},
		quick180: function (){
			wheels.left.to(180,250);
		}
    };
    
    wheels.stop();
    console.log("Use the cursor keys or ASWD to move your bot. Hit escape or the spacebar to stop.");
    
    stdin.on("keypress", function(chunk, key) {
        if (!key) return;
        
        switch (key.name) {
        case 'up':
        case 'w':
            wheels.forward();
            break;
            
        case 'down':
        case 's':
            wheels.back();
            break;
            
        case 'left':
        case 'a':
            wheels.pivotLeft();
            break;
            
        case 'right':
        case 'd':
            wheels.pivotRight();
            break;
            
        case 'space':
        case 'escape':
            wheels.stop();
            break;
		case 'g':
			wheels.quick0();
            break;
		case 'h':
			wheels.quick180();
            break;
        }
    });
});