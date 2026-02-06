const colorContainersDiv = document.getElementById("color-containers")
const form = document.getElementById("header-form")

form.addEventListener('submit',function(e){
    e.preventDefault()
    const seed = document.getElementById("seed").value.slice(1)
    const mode = document.getElementById("mode").value
    fetchColorScheme(seed,mode)
})

async function fetchColorScheme(seed, mode) {
  fetch(`https://www.thecolorapi.com/scheme?hex=${seed}&mode=${mode}`)
    .then(response => response.json())
    .then(data => {
        let html = ''
        const colors = data.colors
        colors.forEach(color => {
        html += `
        <div id="color-item">
            <img src="${color.image.bare}" alt="${color.name.value}">
            <p class="hex" data-copy="${color.hex.value}" onclick="copyData(this)">${color.hex.value}</p>
        </div>
        `
    });
    colorContainersDiv.innerHTML = html
    })
}

function copyData(element) {
  const textToCopy = element.dataset.copy;
  navigator.clipboard.writeText(textToCopy).then(() => {
   const confirmation = document.getElementById('copy-confirmation');
    confirmation.textContent = 'Copied!';
    setTimeout(() => {
      confirmation.textContent = '';
    }, 2000);
  }).catch(err => {
    console.error('Failed to copy text: ', err);
  });
}
