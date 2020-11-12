game.snake = {
    game: game,
    cells: [],
    moving: false,
    direction: false,
    directions: {
        up: {
            row: -1,
            col: 0,
            angle: 0
        },
        //0 -вверх
        //90 - вправо
        //180 - вниз
        //270 - влево
        down: {
            row: 1,
            col: 0,
            angle: 180
        },

        left: {
            row: 0,
            col: -1,
            angle: 270

        },

        right: {
            row: 0,
            col: 1,
            angle: 90
        }
    },
    create() {
        let startCells = [{
                row: 7,
                col: 7
            },
            {
                row: 8,
                col: 7
            }
        ];
        this.direction = this.directions.down;

        for (let startCell of startCells) {
            this.cells.push(this.game.board.getCell(startCell.row, startCell.col));
        }
    },

    renderHead() {
        // голова
        let head = this.cells[0];
        let halfSize = this.game.sprites.head.width / 2;

        //сщхранить исходное состояние контекста
        this.game.ctx.save();
        //перемещаем точку отсчета координат на голову
        this.game.ctx.translate(head.x, head.y);

        //перемещение точки в центр головы
        this.game.ctx.translate(halfSize, halfSize);
        let degree = this.direction.angle;
        //0 -вверх
        //90 - вправо
        //180 - вниз
        //270 - влево

        //вращение контекста относительно указанной точки
        this.game.ctx.rotate(degree * Math.PI / 180);

        //отрисовываем голову с поворотом контекста

        this.game.ctx.drawImage(this.game.sprites.head, -halfSize, -halfSize);
        this.game.ctx.restore();
    },
    renderBody() {
        for (let i = 1; i < this.cells.length; i++) {
            this.game.ctx.drawImage(this.game.sprites.body, this.cells[i].x, this.cells[i].y);
        }

    },
    render() {
        this.renderHead();
        this.renderBody();
    },
    // старт движения
    start(keyCode) {
        switch (keyCode) {
            case 38:
                this.direction = this.directions.up;
                break;
            case 37:
                this.direction = this.directions.left;
                break;
            case 39:
                this.direction = this.directions.right;
                break;
            case 40:
                this.direction = this.directions.down;
                break;
        }
        this.moving = true;
    },
    move() {
        let cell = this.getNextCell();
        if (!this.moving) {
            return;
        }


        if (cell) {
            //добавить ячейку
            this.cells.unshift(cell);
            // удалить хвост

            // если сожрала яблока хвост не удаляется
            if (!this.game.board.isFoodCell(cell)) {
                this.cells.pop();

            } else {
                //если съели яблоко
                this.game.board.createFood();
            }

        }

    },
    hasCell(cell) {
        return this.cells.find(part => part === cell);
    },

    getNextCell() {
        let head = this.cells[0];


        let row = head.row + this.direction.row;
        let col = head.col + this.direction.col;
        return this.game.board.getCell(row, col);


    }
};