(function(window){
	// General Utilities
	var doc = window.document,
			$ = function(selector){
				var result = doc.querySelectorAll(selector);
				return (result.length > 1) ? result : result[0];
			};

	Node.prototype.on = Node.prototype.addEventListener;
	NodeList.prototype.on = function(type, func, async) {
		[].forEach.call(this, function(node, index) {
			node.on(type, func, async);
		});
	};

	// App related code
  var startBtn = $('#startBtn'),
  		stopBtn = $('#stopBtn'),
  		resetBtn = $('#resetBtn');

  // Canvas
	var canvas = document.getElementById('stage');

	// 2d Drawing Context.
	var ctx = canvas.getContext('2d');

	// Set the fill style for the drawing context.
	ctx.fillStyle = '#2ecc71';

	// A variable to store the requestID.
	var requestID;

	// Variables to for the drawing position and object.
	var posX = 0;
	var boxWidth = 50;
	var pixelsPerFrame = 5; // How many pixels the box should move per frame.

	// Draw the initial box on the canvas.
	ctx.fillRect(posX, 0, boxWidth, canvas.height);

	// Animate
	function animate() {
	  requestID = requestAnimationFrame(animate);

	  // If the box has not reached the end draw on the canvas. Otherwise stop the animation
	  if (posX <= (canvas.width - boxWidth)) {
	    ctx.clearRect((posX - pixelsPerFrame), 0, boxWidth, canvas.height);
	    ctx.fillRect(posX, 0, boxWidth, canvas.height);
	    posX += pixelsPerFrame;
	  } else {
	    cancelAnimationFrame(requestID);
	  }
	}

	// Event listener for the start button.
	startBtn.addEventListener('click', function(e) {
	  e.preventDefault();

	  // Start the animation.
	  requestID = requestAnimationFrame(animate);
	});

	// Event listener for the stop button.
	stopBtn.addEventListener('click', function(e) {
	  e.preventDefault();

	  // Stop the animation;
	  cancelAnimationFrame(requestID);
	});

	// Event listener for the reset button.
	resetBtn.addEventListener('click', function(e) {
	  e.preventDefault();

	  // Reset the X position to 0.
	  posX = 0;

	  // Clear the canvas.
	  ctx.clearRect(0, 0, canvas.width, canvas.height);

	  // Draw the initial box on the canvas.
	  ctx.fillRect(posX, 0, boxWidth, canvas.height);
	});

}(this));