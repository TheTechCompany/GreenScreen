export default `
(() => {
	const links = Array.from(document.querySelectorAll('a'));

	links.forEach(link => {
		link.addEventListener('click', (e) => {
			const href = e.target.href;
			

			fetch('http://localhost:3000/api/telemetry', {
				method: 'POST',
				headers: {
					'Content-Type': "application/json",
					'Accept': 'application/json'
				},
				body: JSON.stringify({
					event: 'campaign-interaction',
					properties: {href}
				})
			}).then(() => {

			})
		})
	})

})()

`