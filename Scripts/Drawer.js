function Drawer(canvasId,color) {
    canvas = document.getElementById(canvasId);
    this.ctx = canvas.getContext("2d");
    this.canvasWidth = canvas.scrollWidth;
    this.canvasHeight = canvas.scrollHeight;
    this.color = color;   
}

Drawer.prototype = {
    constructor: Drawer,
    drawRec: function () {
        this.ctx.fillStyle = this.color;
        this.ctx.fillRect(0, 0, 150, 75);
        
    },
    clearCanvas: function(){
        this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
    },
    drawGross: function (_centerX, _centerY, _width, _line) {
        _withHalf = Math.round(_width / 2);

        this.ctx.beginPath();
        this.ctx.strokeStyle = this.color;
        this.ctx.lineWidth = _line;
        this.ctx.moveTo(_centerX - _withHalf, _centerY);
        this.ctx.lineTo(_centerX + _withHalf, _centerY);        
        this.ctx.moveTo(_centerX, _centerY - _withHalf);
        this.ctx.lineTo(_centerX, _centerY + _withHalf);
        this.ctx.stroke();
    },
    drawOval: function (_centerX, _centerY, _height, _width, _line) {        
        this.ctx.beginPath();
        this.ctx.strokeStyle = this.color;
        this.ctx.lineWidth = _line;
        this.ctx.strokeStyle = this.color;
        for (var i = 0 * Math.PI; i < 2 * Math.PI; i += 0.01) {
            xPos = _centerX - (_height * Math.sin(i)) * Math.sin(0 * Math.PI) + (_width * Math.cos(i)) * Math.cos(0 * Math.PI);
            yPos = _centerY + (_width * Math.cos(i)) * Math.sin(0 * Math.PI) + (_height * Math.sin(i)) * Math.cos(0 * Math.PI);

            if (i == 0) {
                this.ctx.moveTo(xPos, yPos);
            } else {
                this.ctx.lineTo(xPos, yPos);
            }
        }
        this.ctx.stroke();
        this.ctx.closePath();
    },
    drawX: function (_centerX, _centerY, _height, _width, _line) {
        _withHalf = Math.round(_width / 2);
        _heightHalf = Math.round(_height / 2);

        this.ctx.beginPath();
        this.ctx.strokeStyle = this.color;
        this.ctx.lineWidth = _line;
        this.ctx.moveTo(_centerX - _withHalf, _centerY-_heightHalf);
        this.ctx.lineTo(_centerX + _withHalf, _centerY + _heightHalf);

        this.ctx.moveTo(_centerX + _withHalf, _centerY - _heightHalf);
        this.ctx.lineTo(_centerX - _withHalf, _centerY + _heightHalf);
        this.ctx.stroke();
        this.ctx.closePath();
    },
    drawN: function (_centerX, _centerY, _height, _width, _line) {
        _withHalf = Math.round(_width / 2);
        _heightHalf = Math.round(_height / 2);

        this.ctx.beginPath();
        this.ctx.strokeStyle = this.color;
        this.ctx.lineWidth = _line;
        this.ctx.moveTo(_centerX - _withHalf, _centerY + _heightHalf);
        this.ctx.lineTo(_centerX - _withHalf, _centerY - _heightHalf);
        this.ctx.lineTo(_centerX + _withHalf, _centerY + _heightHalf);
        this.ctx.lineTo(_centerX + _withHalf, _centerY - _heightHalf);
        this.ctx.stroke();
        this.ctx.closePath();
    },
    drawHelperLines: function () {
        _centerX = Math.round(this.canvasWidth / 2);
        _centerY = Math.round(this.canvasHeight / 2);
        this.ctx.beginPath();
        this.ctx.strokeStyle = "#ff0066";
        this.ctx.lineWidth = 1;
        this.ctx.moveTo(0, _centerY);
        this.ctx.lineTo(this.canvasWidth, _centerY);
        this.ctx.moveTo(_centerX, 0);
        this.ctx.lineTo(_centerX, this.canvasHeight);
        this.ctx.stroke();
        
        //this.ctx.beginPath();
        //this.ctx.strokeStyle = "#e5ed57";
        //this.ctx.lineWidth = 1;
        //this.ctx.moveTo(0, Math.round(_centerY / 2));
        //this.ctx.lineTo(this.canvasWidth, Math.round(_centerY / 2));
        //this.ctx.moveTo(0, _centerY + Math.round(_centerY / 2));
        //this.ctx.lineTo(this.canvasWidth, _centerY + Math.round(_centerY / 2));
        //this.ctx.stroke();


    }
}