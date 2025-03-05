import { json2markdown } from '@sftinc/text-utilities'

const data = {
	user: { name: 'John', age: 30, email: 'john@example.com' },
	pets: [
		{ name: 'Fluffy', type: 'cat' },
		{ name: 'Rex', type: 'dog' },
	],
	other: {
		array: [50, 20, 30],
		quote: '"The cate ate what?"',
	},
	test: ['a', 'b', 'c'],
	greet: (name) => `Hello ${name}!`,
	hello: 'world',
	lorem: `ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum

dolor sit amet consectetur adipisicing elit.`,
}

console.log(json2markdown(data, { filter: [], headings: true }))
