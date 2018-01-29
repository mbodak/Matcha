class Coordinate {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}
class Point {
    constructor(parent) {
        this.canvas = parent.canvas;
        this.ctx = parent.ctx;
        this.x = Math.random() * this.canvas.width;
        this.y = Math.random() * this.canvas.height;
        this.particleColor = parent.options.particleColor;
        let x = (Math.random() - .5) * parent.options.velocity;
        let y = (Math.random() - .5) * parent.options.velocity;
        this.velocity = new Coordinate(x, y);
    }
    update() {
        if (this.x > this.canvas.width + 20 || this.x < -20) {
            this.velocity.x = -this.velocity.x;
        }
        if (this.y > this.canvas.height + 20 || this.y < -20) {
            this.velocity.y = -this.velocity.y;
        }
        this.x += this.velocity.x;
        this.y += this.velocity.y;
    }
    draw() {
        this.ctx.beginPath();
        this.ctx.fillStyle = this.particleColor;
        this.ctx.globalAlpha = .7;
        this.ctx.arc(this.x, this.y, 1.5, 0, 2 * Math.PI);
        this.ctx.fill();
    }
}
class Options {
    constructor(obj) {
        if (!obj) {
            return;
        }
        this.particleColor = obj["particleColor"];
        this.background = obj["background"];
        this.interactive = obj["interactive"];
        this.velocity = obj["velocity"];
        this.speed = obj["speed"];
        this.density = obj["density"];
    }
    get particleColor() {
        return this._particleColor;
    }
    get background() {
        return this._background;
    }
    get interactive() {
        return this._interactive;
    }
    get velocity() {
        return this._velocity;
    }
    get density() {
        return this._density;
    }
    set particleColor(particleColor) {
        if (particleColor) {
            this._particleColor = particleColor;
        }
        else {
            this._particleColor = "#fff";
        }
    }
    set background(background) {
        if (background) {
            this._background = background;
        }
        else {
            this._background = "#1a252f";
        }
    }
    set interactive(interactive) {
        if (interactive) {
            this._interactive = interactive;
        }
        else {
            this._interactive = true;
        }
    }
    set velocity(velocity) {
        if (velocity) {
            this._velocity = velocity;
        }
    }
    set speed(speed) {
        if ("fast" === speed) {
            this._velocity = 1;
        }
        else if ("slow" === speed) {
            this._velocity = .33;
        }
        else if ("none" === speed) {
            this._velocity = 0;
        }
        else {
            this._velocity = .66;
        }
    }
    set density(density) {
        if (density) {
            this._density = density;
        }
    }
}
class Size {
}
class Network {
    constructor(div, options) {
        this.canvasDiv = div;
        this.size = {
            width: this.canvasDiv.offsetWidth,
            height: this.canvasDiv.offsetHeight
        };
        this.options = new Options(options);
        this.bgDiv = document.createElement('div');
        this.canvasDiv.appendChild(this.bgDiv);
        Network.setStyles(this.bgDiv, {
            'position': 'absolute',
            'top': 0,
            'left': 0,
            'bottom': 0,
            'right': 0,
            'z-index': 1
        });
        // Check if valid background hex color
        if ((/(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i).test(this.options.background)) {
            Network.setStyles(this.bgDiv, {
                'background': this.options.background
            });
        }
        else if ((/\.(gif|jpg|jpeg|tiff|png)$/i).test(this.options.background)) {
            Network.setStyles(this.bgDiv, {
                'background': 'url("' + this.options.background + '") no-repeat center',
                'background-size': 'cover'
            });
        }
        else {
            console.error('Please specify a valid background image or hexadecimal color');
            return this;
        }
        // Check if valid particleColor
        if (!(/(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i).test(this.options.particleColor)) {
            console.error('Please specify a valid particleColor hexadecimal color');
            return this;
        }
        // Create canvas & context
        this.canvas = document.createElement('canvas');
        this.canvasDiv.appendChild(this.canvas);
        this.ctx = this.canvas.getContext('2d');
        this.canvas.width = this.size.width;
        this.canvas.height = this.size.height;
        Network.setStyles(this.canvasDiv, { 'position': 'relative' });
        Network.setStyles(this.canvas, {
            'z-index': '20',
            'position': 'relative'
        });
        // Add resize listener to canvas
        window.addEventListener('resize', function () {
            // Check if div has changed size
            if (this.canvasDiv.offsetWidth === this.size.width && this.canvasDiv.offsetHeight === this.size.height) {
                return false;
            }
            // Scale canvas
            this.canvas.width = this.size.width = this.canvasDiv.offsetWidth;
            this.canvas.height = this.size.height = this.canvasDiv.offsetHeight;
            // Set timeout to wait until end of resize event
            clearTimeout(this.resetTimer);
            this.resetTimer = setTimeout(function () {
                // Reset particles
                this.particles = [];
                for (let i = 0; i < this.canvas.width * this.canvas.height / this.options.density; i++) {
                    this.particles.push(new Point(this));
                }
                if (this.options.interactive) {
                    this.particles.push(this.mousePoint);
                }
                // Update canvas
                requestAnimationFrame(this.update.bind(this));
            }.bind(this), 500);
        }.bind(this));
        // Initialise particles
        this.particles = [];
        for (let i = 0; i < this.canvas.width * this.canvas.height / this.options.density; i++) {
            this.particles.push(new Point(this));
            console.log(i);
        }
        if (this.options.interactive) {
            // Add mouse particle if interactive
            this.mousePoint = new Point(this);
            this.mousePoint.velocity = {
                x: 0,
                y: 0
            };
            this.particles.push(this.mousePoint);
            // Mouse event listeners
            this.canvas.addEventListener('mousemove', function (e) {
                this.mousePoint.x = e.clientX - this.canvas.offsetLeft;
                this.mousePoint.y = e.clientY - this.canvas.offsetTop;
            }.bind(this));
            this.canvas.addEventListener('mouseup', function (e) {
                this.mousePoint.velocity = {
                    x: (Math.random() - 0.5) * this.options.velocity,
                    y: (Math.random() - 0.5) * this.options.velocity
                };
                this.mousePoint = new Point(this);
                this.mousePoint.velocity = {
                    x: 0,
                    y: 0
                };
                this.particles.push(this.mousePoint);
            }.bind(this));
        }
        requestAnimationFrame(this.update.bind(this));
    }
    update() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.globalAlpha = 1;
        // Draw particles
        for (let i = 0; i < this.particles.length; i++) {
            this.particles[i].update();
            this.particles[i].draw();
            // Draw connections
            for (let j = this.particles.length - 1; j > i; j--) {
                let distance = Math.sqrt(Math.pow(this.particles[i].x - this.particles[j].x, 2)
                    + Math.pow(this.particles[i].y - this.particles[j].y, 2));
                if (distance > 120) {
                    continue;
                }
                this.ctx.beginPath();
                this.ctx.strokeStyle = this.options.particleColor;
                this.ctx.globalAlpha = (120 - distance) / 120;
                this.ctx.lineWidth = 0.7;
                this.ctx.moveTo(this.particles[i].x, this.particles[i].y);
                this.ctx.lineTo(this.particles[j].x, this.particles[j].y);
                this.ctx.stroke();
            }
        }
        if (this.options.velocity !== 0) {
            requestAnimationFrame(this.update.bind(this));
        }
    }
    static setStyles(div, styles) {
        for (let property in styles) {
            if (styles.hasOwnProperty(property)) {
                div.style[property] = styles[property];
            }
        }
    }
}
let canvasDiv = document.getElementById('particle-canvas');
let options = {
    particleColor: '#AAA',
    background: "#303030",
    interactive: true,
    speed: 'fast',
    density: 10000
};
let particleCanvas = new Network(canvasDiv, options);
