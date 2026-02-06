const colorContainersDiv = document.getElementById("color-containers")
const form = document.getElementById("header-form")

form.addEventListener('submit',function(e){
    e.preventDefault()
    const seed = document.getElementById("seed").value.slice(1)
    const mode = document.getElementById("mode").value
    console.log(seed,mode)

    fetch(`https://www.thecolorapi.com/scheme?hex=${seed}&mode=${mode}`)
    .then(response => response.json())
    .then(data => {
        let html = ''
        const colors = data.colors
        console.log(data.colors)
        colors.forEach(color => {
        html += `
        <div id="color-item">
            <img src="${color.image.bare}" alt="${color.name.value}">
            <p>${color.hex.value}</p>
        </div>
        `
    });
    //console.log(html)
    colorContainersDiv.innerHTML = html
    })
})