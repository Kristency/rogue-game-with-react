class World {
	constructor(width, height, tilesize) {
		this.width = width
		this.height = height
		this.tilesize = tilesize
		this.worldmap = new Array(this.width)

		for (let i = 0; i < width; i++) {
			this.worldmap[i] = new Array(this.height)
		}

		this.createRandomMap()
	}

	createRandomMap() {
		for (let i = 0; i < this.width; i++) {
			for (let j = 0; j < this.height; j++) {
				this.worldmap[i][j] = Math.round(Math.random())
			}
		}
	}

	draw(context) {
		for (let i = 0; i < this.width; i++) {
			for (let j = 0; j < this.height; j++) {
				if (this.worldmap[i][j] === 1) {
					this.drawWall(i, j, context)
				}
			}
		}
	}

	drawWall(x, y, context) {
		context.fillStyle = '#000'
		context.fillRect(x * this.tilesize, y * this.tilesize, this.tilesize, this.tilesize)
	}
}

export default World
