    var diam;
    var cx;
    var cy;
    var sm_diam;
    var sm_rad;
    var cx1;
    var cy1;
    var cx2;
    var cy2;
    var theta = 0;
    var frms = 180;
    var yinAnim = false;
    var yangAnim = false;
    var playYinMovie = false;
    var playYangMovie = false;
    var hoverYin = false;
    var hoverYang = false;
    
    var movies = [];
    var whichVideo=0;
    var josefin;

    function preload() {
        movies[0] = createVideo('assets/Yin.mp4');
        movies[1] = createVideo('assets/Yang.mp4');
        josefin = loadFont('assets/JosefinSans-Regular.ttf');
    }

    function setup() {

        createCanvas(512, 512);
        smooth();
        background(0);

        diam = width * 0.9;
        cx = width / 2;
        cy = height / 2;
        sm_diam = diam / 2.0;
        sm_rad = sm_diam / 2;
        cx1 = cx;
        cy1 = cy + sm_rad;
        cx2 = cx;
        cy2 = cy - sm_rad;
        movies[0].hide();
        movies[1].hide();
        textFont(josefin);
    }



    function draw() {

        
        translate(width / 2, height / 2);

        rotate(theta);

        var t = map(sin(theta), -1, 1, 0.15, 0.85);
        var y0 = -1 * sm_diam + sm_diam * t;
        var r0 = diam * t;
        var y1 = sm_diam - sm_diam * (1 - t);
        var r1 = diam * (1 - t);

        var yinHoverColour = 60;
        var yangHoverColour = 200;
        

        stroke(96, 94, 67);
        strokeWeight(10);
        ellipse(0, 0, diam, diam);


        //background circle 
        
        
        if((InsideYang(cx, cy, diam, sm_diam)&&!(yangAnim||yinAnim)) || yangAnim) {
            fill(96, 94, 67);
        }
        else {
            fill(238);
        }
        noStroke();
        ellipse(0, 0, diam, diam);
        // black part  
        if((InsideYin(cx, cy, diam, sm_diam)&&!(yangAnim||yinAnim)) || yinAnim) {
            fill(96, 94, 67);
        }
        else {
            fill(34);
        }
        arc(0, 0, diam, diam, PI / 2, TWO_PI - PI / 2);
        if (yangAnim) {
            arc(0, -y1, r1, r1, -PI / 2, PI / 2);
        } else {
            arc(0, y0, r0, r0, -PI / 2, PI / 2);
        }
        // white part
        push();
        if (yangAnim) {
            translate(0, diam - r0);
        } else {
            translate(0, diam - r1);
        }
        rotate(PI);
        if((InsideYang(cx, cy, diam, sm_diam)&&!(yangAnim||yinAnim)) || yangAnim) {
            fill(96, 94, 67);
        }
        else {
            fill(238);
        }
        if (yangAnim) {
            arc(0, -y0, r0, r0, -PI / 2, PI / 2);
        } else {
            arc(0, y1, r1, r1, -PI / 2, PI / 2);
        }
        pop();
        // white dot in black part
        fill(238);
        if (yangAnim) {
            ellipse(0, -y1, r1 * 0.3, r1 * 0.3);
        } else {
            ellipse(0, y0, r0 * 0.3, r0 * 0.3);
        }
        // black dot in white part
        fill(34);
        if (yangAnim) {
            ellipse(0, -y0, r0 * 0.3, r0 * 0.3);
        } else {
            ellipse(0, y1, r1 * 0.3, r1 * 0.3);
        }

        if (theta < TWO_PI && (yinAnim || yangAnim)) {
            theta += TWO_PI / frms;
        } else {
            if(yinAnim || yangAnim) {
                playTheVideo();
            }
            yinAnim = false;
            yangAnim = false;
            theta = 0;
        }
        rotate(-theta);
        if(InsideYin(cx, cy, diam, sm_diam)&&!(yangAnim||yinAnim)) {
            textSize(60);
            fill(96, 94, 67);
            text('Yin', 100, 0);
        }
        else if(InsideYang(cx, cy, diam, sm_diam)&&!(yangAnim||yinAnim)) {
            textSize(60);
            fill(96, 94, 67);
            text('Yang', -200, 0);
        }
    }

    function playTheVideo() {   
        movies[whichVideo].pause();
        movies[whichVideo].time(0);
        movies[whichVideo].show();
        movies[whichVideo].showControls();
        movies[whichVideo].onended(videoOver); //when video ends, call videoOver to return to first screen
    }

    function videoOver() {
        movies[whichVideo].pause();
        //videos[whichVideo].rewind();
        movies[whichVideo].hide();
    }

    function InsideYang(cx, cy, big_diam, small_diam) {
        if (dist(mouseX, mouseY, cx,(cy + small_diam / 2)) < small_diam / 2) {
            return true;
        } else if (dist(mouseX, mouseY, cx,cy) < big_diam / 2 && mouseX - cx > 0 && !(dist(mouseX, mouseY,cx,(cy - small_diam / 2)) < small_diam / 2)) {
            return true;
        } else {
            return false;
        }
    }

    function InsideYin(cx, cy, big_diam, small_diam) {
        if (dist(mouseX, mouseY, cx,(cy - small_diam / 2)) < small_diam / 2) {
            console.log(mouseX);
            return true;
        } else if (dist(mouseX, mouseY, cx,cy) < big_diam / 2 && mouseX - cx < 0 && !(dist(mouseX, mouseY,cx,(cy + small_diam / 2)) < small_diam / 2)) {
            return true;
        } else {
            return false;
        }
    }


    function mousePressed() {
        if (yinAnim || yangAnim) {
            return;
        }
        if (InsideYin(cx, cy, diam, sm_diam)) {
            yinAnim = true;
            playYinMovie = true;
            whichVideo = 0;
            movies[0].pause();
            movies[1].pause();
            movies[0].hide();
            movies[1].hide();
        } else if (InsideYang(cx, cy, diam, sm_diam)) {
            yangAnim = true;
            playYangMovie = true;
            whichVideo = 1;
            movies[0].pause();
            movies[1].pause();
            movies[0].hide();
            movies[1].hide();
        }
    }

