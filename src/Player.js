import Entity from './Entity'

class Player extends Entity {
	constructor(x, y, size) {
		super(x, y, size, {
			name: 'Player',
			ascii: '@',
			health: 10
		})
	}

	move(dx, dy) {
		this.x += dx
		this.y += dy
	}
}

export default Player
