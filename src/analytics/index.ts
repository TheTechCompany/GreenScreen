export default `
(() => {
	const links = Array.from(document.querySelectorAll('a'));

	links.forEach(link => {
		link.addEventListener('click', (e) => {
			const href = e.target.href;
			const properties = Array.from(link.attributes).map((x) => ({name: x.name, value: x.value})).reduce((prev, curr) => ({
				...prev,
				[curr.name]: curr.value
			}), {})

			fetch('http://localhost:3000/api/telemetry', {
				method: 'POST',
				headers: {
					'Content-Type': "application/json",
					'Accept': 'application/json'
				},
				body: JSON.stringify({
					event: 'campaign-interaction',
					properties: properties
				})
			}).then(() => {

			})
		})
	})

})()

`