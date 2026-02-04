

document.addEventListener('click',function(e){
    if(e.target.parentNode.className === "blog-item"){
        location.href = "./blog-content.html";
    }else if(e.target.className === "view-more"){
        const blog4 = document.getElementById("blog-4")
        const blog5 = document.getElementById("blog-5")
        const blog6 = document.getElementById("blog-6")
        const viewMoreBtn = document.getElementById("view-more")

        blog4.style.display = "block";
        blog5.style.display = "block";
        blog6.style.display = "block";
        viewMoreBtn.style.display = "none";

    }
})