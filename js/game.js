let game = {
    canvas: null,
    ctx: null,
    board: null,
    width: 0,
    height: 0,
    minMaxWin: {
        max: {
            width: 640,
            height: 360
        },
        min: {
            width: 300,
            height: 300
        }
    },

    sprites: {
        background: null,
        cell: null,
        body: null,
        food: null,
        head: null
    },
random(min,max){ 
    return Math.floor(Math.random() * (max + 1 - min)+min);
     
},
    start() {
        this.init();

        this.preload(() => {
            this.run();
        });
    },
    init() {
        this.canvas = document.getElementById("mycanvas");
        this.ctx = this.canvas.getContext("2d");
        this.initMinMaxWin();
    },
    initMinMaxWin() {
        let data = {
            maxWidth: this.minMaxWin.max.width,
            maxHeight: this.minMaxWin.max.height,
            minWidth: this.minMaxWin.min.width,
            minHeight: this.minMaxWin.min.height,
            realWidth: window.innerWidth,
            realHeight: window.innerHeight
        };
        if (data.realWidth / data.realHeight > data.maxWidth / data.maxHeight) {
            this.fitWidth(data);
        } else {
            this.fitHeight(data);
        }


        this.fitHeight(data);
        this.canvas.width = this.width;
        this.canvas.height = this.height;
    },
    fitWidth(data) {
        this.width = data.maxWidth;
        this.canvas.style.width = "100%";
        this.height = Math.round(this.width * data.realHeight / data.realWidth);
        this.height = Math.min(this.height, data.maxHeight);
        this.height = Math.max(this.height, data.minHeight);
        this.width = Math.round(data.realWidth * this.height / data.realHeight);

    },
    fitHeight(data) {

        this.width = Math.round(data.realWidth * data.maxHeight / data.realHeight);
        this.width = Math.min(this.width, data.maxWidth);
        this.width = Math.max(this.width, data.minWidth);
        this.height = Math.round(this.width * data.realHeight / data.realWidth);
        this.canvas.style.height = "100%";
    },

    preload(callback) {
        let load = 0;
        let required = Object.keys(this.sprites).length;
        let onAssed = () => {
            ++load;

            if (load >= required) {
                callback();
            }
        };
        for (let key in this.sprites) {
            this.sprites[key] = new Image();
            this.sprites[key].src = "img/" + key + ".png";
            this.sprites[key].addEventListener("load", onAssed);
        }
    },

    create() {
        //создание игровых объектов
        this.board.create();
        this.snake.create();
        this.board.createFood();
        //установка игровых событий
        window.addEventListener("keydown", e => this.snake.start(e.keyCode));

    },
    

    render() {
        // отрисовка игровых объектов
        window.requestAnimationFrame(() => {
            this.ctx.clearRect(0, 0, this.width, this.height);
            this.ctx.drawImage(this.sprites.background, (this.width - this.sprites.background.width) / 2, (this.height - this.sprites.background.height) / 2);
            this.board.render();
            this.snake.render();

        });
    },
    update() {
        // Двигать змею
        this.snake.move();
        //новый кадр
        this.render();
    },
    run() {
        this.create();
        setInterval(() => {
            this.update();

        }, 350);

    }


};

game.start();