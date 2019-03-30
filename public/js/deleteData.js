const button = document.getElementById('deleteButton');
const postId = button.dataset.x;
button.addEventListener('click', deleting);


function deleting(){
    fetch(`/posts/${postId}`, {
        method: 'DELETE'
    })
    .then(result => console.log(result))
    .then(() => {window.location = window.location.origin})
    .catch(function(err){console.log(err)}); 
}




// var button = document.getElementById('deleteButton');
// const postId = button.dataset.postid;
// button.addEventListener('click', deleting);

