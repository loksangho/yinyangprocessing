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
    
    var yinMovie;
    var yangMovie;

    function setup() {

        createCanvas(1024, 1024);
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
        yinMovie = createVideo(['assets/Yin.mp4']);
        yangMovie = createVideo(['assets/Yang.mp4']);
    }



    function draw() {

        if(!yinAnim && playYinMovie) {
            background(0);
            yinMovie.play();
            playYinMovie = false;
        }
        else if(!yangAnim && playYangMovie) {
            background(0);
            yangMovie.play();
            playYangMovie = false;
        }
        
        translate(width / 2, height / 2);

        rotate(theta);

        var t = map(sin(theta), -1, 1, 0.15, 0.85);
        var y0 = -1 * sm_diam + sm_diam * t;
        var r0 = diam * t;
        var y1 = sm_diam - sm_diam * (1 - t);
        var r1 = diam * (1 - t);


        stroke(96, 94, 67);
        strokeWeight(10);
        ellipse(0, 0, diam, diam);


        //background circle  
        fill(238);
        noStroke();
        ellipse(0, 0, diam, diam);
        // black part  
        fill(34);
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
        fill(238);
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
            yinAnim = false;
            yangAnim = false;
            theta = 0;
        }
    }

    function InsideYang(cx, cy, big_diam, small_diam) {
        if (abs(mouseX - cx) < small_diam / 2 && abs(mouseY - (cy + small_diam / 2)) < small_diam / 2) {
            return true;
        } else if (abs(mouseX - cx) < big_diam / 2 && abs(mouseY - cy) < big_diam / 2 && mouseX - cx > 0 && !(abs(mouseX - cx) < small_diam / 2 && abs(mouseY - (cy - small_diam / 2)) < small_diam / 2)) {

            return true;
        } else {
            return false;
        }
    }

    function InsideYin(cx, cy, big_diam, small_diam) {
        if (abs(mouseX - cx) < small_diam / 2 && abs(mouseY - (cy - small_diam / 2)) < small_diam / 2) {
            return true;
        } else if (abs(mouseX - cx) < big_diam / 2 && abs(mouseY - cy) < big_diam / 2 && mouseX - cx < 0 && !(abs(mouseX - cx) < small_diam / 2 && abs(mouseY - (cy + small_diam / 2)) < small_diam / 2)) {

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
        } else if (InsideYang(cx, cy, diam, sm_diam)) {
            yangAnim = true;
            playYangMovie = true;
        }
    }
