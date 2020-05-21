function cartoonHeroesTest(options) {
    this.options = options;
    this.conv = new MmToPxConverter(this.options.monitorDpi);
    this.drawer = null;   
    this.canvasHeight = 0;
    this.canvasWidth = 0;
    this.setCanvasDim();   
    this.centerX = Math.round(this.canvasWidth / 2);
    this.centerY = Math.round(this.canvasHeight / 2);
    this.convertSymbolDim();
    this.locations = this.getSymbolsLoc();    
    this.crrntTestCaseNo = 0;
    this.testCases = [];
    this.screenThreePrinted = new Date();
    this.waitinguserInput = false;
    this.testResult = "";
    this.isTestRunSlow = false;
	this.isTestRunFast = false;
}

cartoonHeroesTest.prototype = {
    constructor: cartoonHeroesTest,
    run: function () {
        $('.picture').css({ 'height': this.conv.getCssDimInPx(this.options.cartoonPic.height), 'width': this.conv.getCssDimInPx(this.options.cartoonPic.width) });
        $('.spanner').css('height', this.conv.getCssDimInPx(this.options.aligment.spaceBetwPicAndDrawing));
        $("#beforeStimuls").after('<canvas id="stimuls" width="' + this.canvasWidth + '" height="' + this.canvasHeight + '" class="drawingContainer"></canvas>');
        this.drawer = new Drawer("stimuls", this.options.symbol.color);
        this.crrntTestCaseNo = 0;
        this.testResult = "";
        if (this.isTestRunSlow) {
            this.testCases = this.getExampleTestCases();
            this.options.timing.screenOne = this.options.timingExampleSlow.screenOne;
            this.options.timing.screenTwo = this.options.timingExampleSlow.screenTwo;
            this.options.timing.screenThree = this.options.timingExampleSlow.screenThree;
        }
		else if (this.isTestRunFast) {
            this.testCases = this.getExampleTestCases();
            this.options.timing.screenOne = this.options.timingExampleFast.screenOne;
            this.options.timing.screenTwo = this.options.timingExampleFast.screenTwo;
            this.options.timing.screenThree = this.options.timingExampleFast.screenThree;
        }
        else {
            this.testCases = this.getTestCases();
        }
        test = this;
        $(document).keypress(function (e) {
            test.OnUserAnswer(e.keyCode || e.which);
        });
        this.showScreenOne();
    },
    setCanvasDim: function () {
        _maxSymbolHeight = 0;
        _maxSymbolWidth = 0;
        for (_i = 0; _i < this.options.symbol.symbols.length; _i++) {
            _maxSymbolHeight = this.options.symbol.symbols[_i].height > _maxSymbolHeight ? this.options.symbol.symbols[_i].height : _maxSymbolHeight;
            _maxSymbolWidth = this.options.symbol.symbols[_i].width > _maxSymbolWidth ? this.options.symbol.symbols[_i].width : _maxSymbolWidth;
        }
        _height = (this.options.aligment.symbolsDistance *2) + _maxSymbolHeight;
        this.canvasHeight = (this.conv.mmToPx(_height));
        _width = (this.options.aligment.symbolsDistance*2) + _maxSymbolWidth;
        this.canvasWidth = (this.conv.mmToPx(_width));
    },
    getSymbolsLoc: function ()
    {        
        _distance = this.conv.mmToPx(this.options.aligment.symbolsDistance);
        _locations = [];
        _loc = { "x": Math.round(this.centerX + _distance * Math.sin(0)), "y": Math.round(this.centerY - _distance * Math.cos(0))};
        _locations.push(_loc);
        for (var i = 1; i <= this.options.symbol.noOfSymbols - 1; i += 1) {
            _loc = { "x": Math.round(this.centerX + _distance * Math.sin(i * 2 * Math.PI / this.options.symbol.noOfSymbols)), "y": Math.round(this.centerY - _distance * Math.cos(i * 2 * Math.PI / this.options.symbol.noOfSymbols)) };
            _locations.push(_loc);
        }
        return _locations;
    },
    getExampleTestCases: function(){
        _testCases = [];
        _testCases.push({ "symbol": 1, "loc": 1, "picLoc": 0, "picture": null });
        _testCases.push({ "symbol": 2, "loc": 3, "picLoc": 0, "picture": null });
        _testCases.push({ "symbol": 1, "loc": 2, "picLoc": 1, "picture": 0});
        _testCases.push({ "symbol": 2, "loc": 1, "picLoc": 2, "picture": 1});
        return _testCases;
    },
    getTestCases: function () {
        // generate XN cases
        _testCases = [];
        _xn = [1, 2]
        for (k = 0; k < 3; k++) {
            for (_i = 0; _i < this.options.symbol.noOfSymbols ; _i++) {
                for (_j = 0; _j < 2; _j++) {
                    _testCases.push({ "symbol": _xn[_j], "loc": _i, "picLoc": 0, "picture": null});
                }
            }
        }
        // generate pic cases
        for (_i = 1; _i < 3; _i++) {
            for (var _j = 0; _j < this.options.cartoonPic.pictures.length; _j++) {
                _symbol = _xn[Math.round(Math.random())]
                _loc = Math.round(Math.random() * (this.options.symbol.noOfSymbols-1));
                _testCases.push({ "symbol": _symbol, "loc": _loc, "picLoc": _i, "picture": _j });
            }
        }
        // randomize cases array (Fisher-Yates shuffle)
        _temp = null;
        for (_i = _testCases.length - 1; _i > 0; _i -= 1) {
            _j = Math.floor(Math.random() * (_i + 1))
            _temp = _testCases[_i]
            _testCases[_i] = _testCases[_j]
            _testCases[_j] = _temp
        }
        return _testCases;
    },
    convertSymbolDim: function () {
        for (_i = 0; _i < this.options.symbol.symbols.length; _i++) {
            this.options.symbol.symbols[_i].width = this.conv.mmToPx(this.options.symbol.symbols[_i].width);
            this.options.symbol.symbols[_i].height = this.conv.mmToPx(this.options.symbol.symbols[_i].height);
            this.options.symbol.symbols[_i].line = this.conv.mmToPx(this.options.symbol.symbols[_i].line);
        }
        this.options.symbol.fixGross.widthHeight = this.conv.mmToPx(this.options.symbol.fixGross.widthHeight);
        this.options.symbol.fixGross.lineThickness = this.conv.mmToPx(this.options.symbol.fixGross.lineThickness);
    },
    peep: function () {
        var _snd = new Audio("data:audio/wav;base64,//uQRAAAAWMSLwUIYAAsYkXgoQwAEaYLWfkWgAI0wWs/ItAAAGDgYtAgAyN+QWaAAihwMWm4G8QQRDiMcCBcH3Cc+CDv/7xA4Tvh9Rz/y8QADBwMWgQAZG/ILNAARQ4GLTcDeIIIhxGOBAuD7hOfBB3/94gcJ3w+o5/5eIAIAAAVwWgQAVQ2ORaIQwEMAJiDg95G4nQL7mQVWI6GwRcfsZAcsKkJvxgxEjzFUgfHoSQ9Qq7KNwqHwuB13MA4a1q/DmBrHgPcmjiGoh//EwC5nGPEmS4RcfkVKOhJf+WOgoxJclFz3kgn//dBA+ya1GhurNn8zb//9NNutNuhz31f////9vt///z+IdAEAAAK4LQIAKobHItEIYCGAExBwe8jcToF9zIKrEdDYIuP2MgOWFSE34wYiR5iqQPj0JIeoVdlG4VD4XA67mAcNa1fhzA1jwHuTRxDUQ//iYBczjHiTJcIuPyKlHQkv/LHQUYkuSi57yQT//uggfZNajQ3Vmz+Zt//+mm3Wm3Q576v////+32///5/EOgAAADVghQAAAAA//uQZAUAB1WI0PZugAAAAAoQwAAAEk3nRd2qAAAAACiDgAAAAAAABCqEEQRLCgwpBGMlJkIz8jKhGvj4k6jzRnqasNKIeoh5gI7BJaC1A1AoNBjJgbyApVS4IDlZgDU5WUAxEKDNmmALHzZp0Fkz1FMTmGFl1FMEyodIavcCAUHDWrKAIA4aa2oCgILEBupZgHvAhEBcZ6joQBxS76AgccrFlczBvKLC0QI2cBoCFvfTDAo7eoOQInqDPBtvrDEZBNYN5xwNwxQRfw8ZQ5wQVLvO8OYU+mHvFLlDh05Mdg7BT6YrRPpCBznMB2r//xKJjyyOh+cImr2/4doscwD6neZjuZR4AgAABYAAAABy1xcdQtxYBYYZdifkUDgzzXaXn98Z0oi9ILU5mBjFANmRwlVJ3/6jYDAmxaiDG3/6xjQQCCKkRb/6kg/wW+kSJ5//rLobkLSiKmqP/0ikJuDaSaSf/6JiLYLEYnW/+kXg1WRVJL/9EmQ1YZIsv/6Qzwy5qk7/+tEU0nkls3/zIUMPKNX/6yZLf+kFgAfgGyLFAUwY//uQZAUABcd5UiNPVXAAAApAAAAAE0VZQKw9ISAAACgAAAAAVQIygIElVrFkBS+Jhi+EAuu+lKAkYUEIsmEAEoMeDmCETMvfSHTGkF5RWH7kz/ESHWPAq/kcCRhqBtMdokPdM7vil7RG98A2sc7zO6ZvTdM7pmOUAZTnJW+NXxqmd41dqJ6mLTXxrPpnV8avaIf5SvL7pndPvPpndJR9Kuu8fePvuiuhorgWjp7Mf/PRjxcFCPDkW31srioCExivv9lcwKEaHsf/7ow2Fl1T/9RkXgEhYElAoCLFtMArxwivDJJ+bR1HTKJdlEoTELCIqgEwVGSQ+hIm0NbK8WXcTEI0UPoa2NbG4y2K00JEWbZavJXkYaqo9CRHS55FcZTjKEk3NKoCYUnSQ0rWxrZbFKbKIhOKPZe1cJKzZSaQrIyULHDZmV5K4xySsDRKWOruanGtjLJXFEmwaIbDLX0hIPBUQPVFVkQkDoUNfSoDgQGKPekoxeGzA4DUvnn4bxzcZrtJyipKfPNy5w+9lnXwgqsiyHNeSVpemw4bWb9psYeq//uQZBoABQt4yMVxYAIAAAkQoAAAHvYpL5m6AAgAACXDAAAAD59jblTirQe9upFsmZbpMudy7Lz1X1DYsxOOSWpfPqNX2WqktK0DMvuGwlbNj44TleLPQ+Gsfb+GOWOKJoIrWb3cIMeeON6lz2umTqMXV8Mj30yWPpjoSa9ujK8SyeJP5y5mOW1D6hvLepeveEAEDo0mgCRClOEgANv3B9a6fikgUSu/DmAMATrGx7nng5p5iimPNZsfQLYB2sDLIkzRKZOHGAaUyDcpFBSLG9MCQALgAIgQs2YunOszLSAyQYPVC2YdGGeHD2dTdJk1pAHGAWDjnkcLKFymS3RQZTInzySoBwMG0QueC3gMsCEYxUqlrcxK6k1LQQcsmyYeQPdC2YfuGPASCBkcVMQQqpVJshui1tkXQJQV0OXGAZMXSOEEBRirXbVRQW7ugq7IM7rPWSZyDlM3IuNEkxzCOJ0ny2ThNkyRai1b6ev//3dzNGzNb//4uAvHT5sURcZCFcuKLhOFs8mLAAEAt4UWAAIABAAAAAB4qbHo0tIjVkUU//uQZAwABfSFz3ZqQAAAAAngwAAAE1HjMp2qAAAAACZDgAAAD5UkTE1UgZEUExqYynN1qZvqIOREEFmBcJQkwdxiFtw0qEOkGYfRDifBui9MQg4QAHAqWtAWHoCxu1Yf4VfWLPIM2mHDFsbQEVGwyqQoQcwnfHeIkNt9YnkiaS1oizycqJrx4KOQjahZxWbcZgztj2c49nKmkId44S71j0c8eV9yDK6uPRzx5X18eDvjvQ6yKo9ZSS6l//8elePK/Lf//IInrOF/FvDoADYAGBMGb7FtErm5MXMlmPAJQVgWta7Zx2go+8xJ0UiCb8LHHdftWyLJE0QIAIsI+UbXu67dZMjmgDGCGl1H+vpF4NSDckSIkk7Vd+sxEhBQMRU8j/12UIRhzSaUdQ+rQU5kGeFxm+hb1oh6pWWmv3uvmReDl0UnvtapVaIzo1jZbf/pD6ElLqSX+rUmOQNpJFa/r+sa4e/pBlAABoAAAAA3CUgShLdGIxsY7AUABPRrgCABdDuQ5GC7DqPQCgbbJUAoRSUj+NIEig0YfyWUho1VBBBA//uQZB4ABZx5zfMakeAAAAmwAAAAF5F3P0w9GtAAACfAAAAAwLhMDmAYWMgVEG1U0FIGCBgXBXAtfMH10000EEEEEECUBYln03TTTdNBDZopopYvrTTdNa325mImNg3TTPV9q3pmY0xoO6bv3r00y+IDGid/9aaaZTGMuj9mpu9Mpio1dXrr5HERTZSmqU36A3CumzN/9Robv/Xx4v9ijkSRSNLQhAWumap82WRSBUqXStV/YcS+XVLnSS+WLDroqArFkMEsAS+eWmrUzrO0oEmE40RlMZ5+ODIkAyKAGUwZ3mVKmcamcJnMW26MRPgUw6j+LkhyHGVGYjSUUKNpuJUQoOIAyDvEyG8S5yfK6dhZc0Tx1KI/gviKL6qvvFs1+bWtaz58uUNnryq6kt5RzOCkPWlVqVX2a/EEBUdU1KrXLf40GoiiFXK///qpoiDXrOgqDR38JB0bw7SoL+ZB9o1RCkQjQ2CBYZKd/+VJxZRRZlqSkKiws0WFxUyCwsKiMy7hUVFhIaCrNQsKkTIsLivwKKigsj8XYlwt/WKi2N4d//uQRCSAAjURNIHpMZBGYiaQPSYyAAABLAAAAAAAACWAAAAApUF/Mg+0aohSIRobBAsMlO//Kk4soosy1JSFRYWaLC4qZBYWFRGZdwqKiwkNBVmoWFSJkWFxX4FFRQWR+LsS4W/rFRb/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////VEFHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAU291bmRib3kuZGUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMjAwNGh0dHA6Ly93d3cuc291bmRib3kuZGUAAAAAAAAAACU=");
        _snd.play();        
    },
    showScreenOne: function () {
        this.CheckMissingAnswer();     
        this.drawer.drawGross(this.centerX, this.centerY, this.options.symbol.fixGross.widthHeight, this.options.symbol.fixGross.lineThickness);
        _test = this;
        setTimeout(function () { _test.showScreenTwo() }, this.options.timing.screenOne);
    },
    showScreenTwo: function () {
        this.drawer.clearCanvas();
        _testCase = this.testCases[this.crrntTestCaseNo];
        for (_i = 0; _i < this.options.symbol.noOfSymbols; _i++) {
            _loc = this.locations[_i];
            if (_testCase.loc == _i) {
                if (_testCase.symbol == 1) {
                    this.drawer.drawN(_loc.x, _loc.y, this.options.symbol.symbols[1].height, this.options.symbol.symbols[1].width, this.options.symbol.symbols[1].line);
                }
                else {
                    this.drawer.drawX(_loc.x, _loc.y, this.options.symbol.symbols[2].height, this.options.symbol.symbols[2].width, this.options.symbol.symbols[2].line);
                }
            }
            else {
                this.drawer.drawOval(_loc.x, _loc.y, this.options.symbol.symbols[0].height, this.options.symbol.symbols[0].width, this.options.symbol.symbols[0].line)                
            }
        }
        if (_testCase.picLoc > 0) {
            $("#picLoc" + _testCase.picLoc).append('<img src="Pics/'+this.options.cartoonPic.pictures[_testCase.picture]+'" />');
        }
        _test = this;
        setTimeout(function () { _test.showScreenThree() }, this.options.timing.screenTwo);
    },
    showScreenThree: function () {
        this.drawer.clearCanvas();
        if (this.testCases[this.crrntTestCaseNo].picLoc > 0) {
            $("#picLoc" +this.testCases[this.crrntTestCaseNo].picLoc).empty();
        }
        if (this.crrntTestCaseNo > 0) {
            this.testResult += "\n";
        }
        _testCase = this.testCases[this.crrntTestCaseNo];
        this.testResult += (this.crrntTestCaseNo + 1).toString() + ";";
        this.testResult += _testCase.loc.toString() + ";";
        this.testResult += _testCase.picLoc.toString() + ";";
        this.testResult += (_testCase.picLoc > 0 ? this.options.cartoonPic.pictures[_testCase.picture] : "") + ";";
        this.testResult += this.options.level.toString() + ";";
        this.testResult += this.options.symbol.symbols[_testCase.symbol].keyCode.toString() + ";";
        this.screenThreePrinted = new Date();
        this.waitinguserInput = true;
        this.crrntTestCaseNo += 1;
        _test = this;
        if (this.crrntTestCaseNo < this.testCases.length) {
            setTimeout(function () { _test.showScreenOne() }, this.options.timing.screenThree);
        }
        else {
            setTimeout(function () { _test.showResultScreen() }, this.options.timing.screenThree);
        }
    },
    showResultScreen: function () {
        if (this.isTestRunSlow) {
            location.reload();
        }
		else if (this.isTestRunFast) {
            location.reload();
        }
        this.CheckMissingAnswer();
        $("#testRunSlow").remove();
		$("#testRunFast").remove();
        $("#testResult").css("display", "block");
    },
    OnUserAnswer: function (_keyCode) {       
        if (this.waitinguserInput && ((_keyCode == this.options.symbol.symbols[1].keyCode) || (_keyCode == this.options.symbol.symbols[2].keyCode))) {
            var _timePressed = new Date();
            var _timellapsed = new Date();
            _timellapsed.setTime(_timePressed.getTime() - this.screenThreePrinted.getTime());
            this.testResult += _keyCode.toString() + ";";
            this.testResult += _timellapsed.getTime();
            this.waitinguserInput = false;
            _testCase = this.testCases[this.crrntTestCaseNo - 1];
            if (this.options.symbol.symbols[_testCase.symbol].keyCode.toString() != _keyCode.toString()) {
                this.peep();
            }            
        }
    },
    CheckMissingAnswer: function () {
        if (this.waitinguserInput) {
            this.waitinguserInput = false;
            this.testResult += "0;0";
            this.peep();
        }
    }
}
