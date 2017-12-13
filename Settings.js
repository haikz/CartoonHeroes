var testOptions = {
    monitorDpi: 87, // 1 inch on 2,54 cm, how to calc monitor DPI (dots per inch): http://dpi.lv/
    level: 1,
    aligment: {
        spaceBetwPicAndDrawing: 6, // mm, space between cartoon pic and symbol top end
        symbolsDistance: 16 // mm, space wetween symbol center point and drawning center point
    },
    cartoonPic: {
        width: 28, //mm
        height: 32, // mm
        pictures: [ // in pic folder
            "DonaldDuck.jpg", 
            "Gena.jpg",  
            "Lotte.jpg",
            "MickeyMouse.jpg",
            "NuPogodi.jpg",
            "Spiderman.jpg"
        ]
    },
    symbol: {
        noOfSymbols: 6,  // no of symbols displayed, 0 - no symbols, 1 - only symbol x or n, 2 .. x or n and rest are 0
        color: "#bfbfbf", // symbol color http://www.w3schools.com/colors/colors_picker.asp
        symbols: [
             {    
                code: "0",   // code is just for info, not used in logic
                width: 1.5,
                height: 1.2,
                line: 0.5
            },
            {
                code: "n", //n täht klaviatuuril on koodiga 110, 2-klahv on 50
                width: 4,
                height: 6,
                line: 0.5,
                keyCode: 110  // user answer keycode associated to this symbol, see http://www.w3schools.com/jsref/tryit.asp?filename=tryjsref_event_key_keycode for codes
            },
            {
                code: "x", // v täht klaviatuuril on koodiga 118, 0-klahv on 48
                width: 4,
                height: 6,
                line: 0.5,
                keyCode: 118
            },
        ],
        fixGross: {
            widthHeight: 6,
            lineThickness: 0.5
        }
    },
    timing: {  // in millisec
        screenOne: 500,  // cross is displayed
        screenTwo: 100, // test stimuli
        screenThree: 2000 // window for user answer
    },
    timingExampleSlow: {  // in millisec
        screenOne: 1000,  // cross is displayed
        screenTwo: 800, // test stimuli
        screenThree: 2000 // window for user answer
    },
	timingExampleFast: {  // in millisec
        screenOne: 500,  // cross is displayed
        screenTwo: 100, // test stimuli
        screenThree: 2000 // window for user answer
    }
};