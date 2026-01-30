

document.addEventListener('click',function(e){
    if(e.target.parentNode.className === "blog-item"){
        location.href = "./blog-content.html";
    }else if(e.target.className === "view-more"){
        const hiddenDiv = document.getElementById("hidden-blog-items")
        const viewMoreBtn = document.getElementById("view-more")
        console.log(hiddenDiv)
        hiddenDiv.style.display = "block";
        viewMoreBtn.style.display = "none";

    }
})