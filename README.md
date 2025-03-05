# text-utilities

A collection of text processing utilities for Node.js applications.

## Installation

```bash
npm install @sftinc/text-utilities
```

## Available Utilities

### json2markdown

Converts JSON objects into a hierarchical markdown structure. This is particularly useful for creating documentation or displaying complex data structures in a readable format.

#### Usage

```javascript
import { json2markdown } from '@sftinc/text-utilities'

const data = {
	user: {
		name: 'John',
		age: 30,
		email: 'john@example.com',
	},
	pets: [
		{ name: 'Fluffy', type: 'cat' },
		{ name: 'Rex', type: 'dog' },
	],
}

const markdown = json2markdown(data, {
	filter: [], // Array of keys to display
	headings: true, // Show root keys as headings
})
```

#### Output Example

```markdown
# user

-   name: John
-   age: 30
-   email: john@example.com

## pet

-   name: Fluffy
-   type: cat

## pet

-   name: Rex
-   type: dog
```

#### Options

-   `filter`: Array of keys to exclude from the output
-   `headings`: Boolean to toggle between using markdown headings (true) or bullet points (false) for hierarchy

## MIT License

Copyright (c) 2025 See Fusion Technologies, Inc.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
