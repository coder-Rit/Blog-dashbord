const  toastit =(msg,type)=>{
    const toast  = document.getElementById("toast")
    toast.innerText = msg
    toast.style.top = "10%"
    toast.style.transform = "translate(-50%, -10%)"
    if (type ==="s") {
        toast.style.background = "#b5ffc9"
    }else if (type==="w") {
        toast.style.background = "#fdffd9"
    }else{
        toast.style.background = "#fcaba2"
        
    }

    setTimeout(() => {
        toast.style.top = "-30px"
        toast.style.transform = "translate(-50%, 0%)"
    }, 5000);
}