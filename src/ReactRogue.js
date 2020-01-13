import React, { useRef, useEffect, useState } from 'react'
import InputManager from './InputManager'
import Player from './Player'
import World from './World'

const ReactRogue = ({ width, height, tilesize }) => {
	const canvasRef = useRef()
	let inputManager = new InputManager()
	const [player, setPlayer] = useState(new Player(1, 2, tilesize))
	const [world, setWorld] = useState(new World(width, height, tilesize))

	const handleInput = (action, data) => {
		let newPlayer = new Player()
		Object.assign(newPlayer, player)
		newPlayer.move(data.x, data.y)
		setPlayer(newPlayer)
	}

	useEffect(() => {
		console.log('Binding input')
		inputManager.bindKeys()
		inputManager.subscribe(handleInput)

		return () => {
			inputManager.unbindKeys()
			inputManager.unsubscribe(handleInput)
		}
	})

	useEffect(() => {
		console.log('Drawing to canvas')
		const ctx = canvasRef.current.getContext('2d')
		ctx.clearRect(0, 0, width * tilesize, height * tilesize)
		// ctx.fillStyle = '#000'
		// ctx.fillRect(player.x, player.y, 16, 16)
		world.draw(ctx)
		player.draw(ctx)
	})

	return (
		<canvas
			ref={canvasRef}
			width={width * tilesize}
			height={height * tilesize}
			style={{ border: '1px solid black' }}
		></canvas>
	)
}

export default ReactRogue
