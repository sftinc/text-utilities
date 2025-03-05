const formatValue = (value) => {
	if (typeof value === 'function') {
		value = value.toString()
	}
	const stringified = JSON.stringify(value)
	return (stringified.startsWith('"') && stringified.endsWith('"') ? stringified.slice(1, -1) : stringified).replace(/\\"/g, '"')
}

const stringify = (input, level = 1, headings = true) => {
	let markdown = ''
	const spacer = '  '
	const indent = spacer.repeat(level)

	for (const key in input) {
		const value = input[key]

		if (Array.isArray(value)) {
			const objects = value.some((item) => typeof item === 'object' && item !== null)
			if (objects.length) {
				objects.forEach((item, index) => {
					if (index !== 0 && headings) markdown += '\n\n'
					markdown += `\n${indent}- ${key.slice(-1).toLowerCase() === 's' ? key.slice(0, -1) : key}`
					markdown += `${stringify(item, level + 1, headings)}`
				})
			}

			const primitives = value.filter((item) => typeof item !== 'object' || item === null)

			if (primitives.length) {
				markdown += `\n${indent}- ${key}`
				primitives.forEach((item) => {
					markdown += `\n${spacer + indent}- ${formatValue(item)}`
				})
			}
		} else if (value !== null && typeof value === 'object') {
			markdown += `\n${indent}- ${key}`
			markdown += `${stringify(value, level + 1, headings)}`
		} else if (typeof value === 'function') {
			markdown += `\n${indent}- ${key}`
			markdown += `\n${spacer + indent}- ${formatValue(value)}`
		} else {
			markdown += `\n${indent}- ${key}: ${formatValue(value)}`
		}
	}

	return markdown
}

const json2markdown = (input, options = {}) => {
	const { filter = [], headings = true } = options

	if (typeof input !== 'object' || Array.isArray(input) || input === null) {
		throw new Error('Input must be an object with keys')
	}

	if (!Array.isArray(filter)) {
		throw new Error('Filter must be an array of root level keys you want converted to markdown')
	}

	if (typeof headings !== 'boolean') {
		throw new Error('Headings must be a boolean')
	}

	let markdown = ''
	let headerLevel = 1

	for (const key in input) {
		if (filter.length && !filter.includes(key)) {
			continue
		}

		const value = input[key]

		if (Array.isArray(value)) {
			const objects = value.filter((item) => typeof item === 'object' && item !== null)
			if (objects.length) {
				objects.forEach((item, index) => {
					if (index !== 0 && headings) markdown += '\n\n'
					if (headings) markdown += `${'#'.repeat(headerLevel)} ${key.slice(-1).toLowerCase() === 's' ? key.slice(0, -1) : key}`
					markdown += `${stringify(item, headings ? 1 : 0, headings)}`
				})
			}

			const primitives = value.filter((item) => typeof item !== 'object' || item === null)
			if (primitives.length) {
				if (headings) markdown += `${'#'.repeat(headerLevel)} ${key}`
				primitives.forEach((item) => {
					markdown += `\n${headings ? '  ' : ''}- ${formatValue(item, headings ? 1 : 0)}`
				})
			}
		} else if (typeof value === 'object' && value !== null) {
			if (headings) markdown += `${'#'.repeat(headerLevel)} ${key}`
			markdown += `${stringify(value, headings ? 1 : 0, headings)}`
		} else {
			if (headings) {
				markdown += `${'#'.repeat(headerLevel)} ${key}: ${formatValue(value)}`
			} else {
				markdown += `\n- ${key}: ${formatValue(value)}`
			}
		}

		headerLevel++
		if (headings) markdown += '\n\n'
	}

	return markdown.trim()
}

export default json2markdown
