import React, { useRef, useEffect, useState } from 'react'
import InputManager from './InputManager'
import World from './World'

const ReactRogue = ({ width, height, tilesize }) => {
	const canvasRef = useRef()
	let inputManager = new InputManager()
	const [world, setWorld] = useState(new World(width, height, tilesize))

	const handleInput = (action, data) => {
		let newWorld = new World()
		Object.assign(newWorld, world)
		newWorld.movePlayer(data.x, data.y)
		setWorld(newWorld)
	}

	useEffect(() => {
		console.log('Draw Map')
		let newWorld = new World()
		Object.assign(newWorld, world)
		newWorld.createCellularMap()
		setWorld(newWorld)
	}, [])

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
		world.draw(ctx)
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
