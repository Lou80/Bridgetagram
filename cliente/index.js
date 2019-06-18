const baseURL = 'http://localhost:4002';

fetch(`${baseURL}/api/instagram`)
  .then(function (res) {
    return res.json()
  })

  .then(function (listaDePosts) {
    listaDePosts.forEach(p => {
      const postHTML = `
        <div class="post" id="${p.id}">
          <img src="${p.imagen}">
          <div class="puente">
            <img src='./png/001-tower-bridge-1.png'><span> ${p.cantLikes} me gusta</span>
          </div>
          <div>${p.texto}</div>
       </div>`;

       document.querySelector('.post-container').innerHTML += postHTML;
       console.log(p)

       const botonesLike = document.querySelectorAll('.puente');
        for (let index = 0; index < botonesLike.length; index++) {
          const bridge = botonesLike[index];
          bridge.addEventListener('click', function (e) {
            const idDelPost = e.target.parentNode.id;

          //en este endpoint puedo sumar este like y aclaro la acción específica que voy a editar
          fetch(`${baseURL}/api/instagram/${idDelPost}/like`, {
                  method:'put'
                })
                //.then (res => res.json())
                .then (p => {
                  bridge.innerHTML = `<img src='./png/002-tower-bridge.png'><span> ${p.cantLikes} me gusta</span>`;
                  console.log(p);
        
                })
              
          })
        }
          } )

    });



/////

document.getElementById('nuevo-post').onsubmit = function (e) {
  e.preventDefault();
  //en el caso de los formularios es que la página no se refresque con cada click
  const texto = document.querySelector('#nuevo-post input[name="texto"]').value;
  //entre corchetes puedo identificar un atributo del input
  const imagen = document.querySelector('#nuevo-post input[name="imagen"]').value;

  const posteo = {
    texto: texto,
    imagen: imagen,
    cantLikes: 0
  }
  
  fetch(`${baseURL}/api/instagram`, {
    method: 'post',
    body: JSON.stringify(posteo),
    //pasa un objeto a un string y puedo volver atrás
    headers: {
      'Content-Type': 'application/json'
    }
  })
  
    .then( res => res.json() )
    .then (p => {
      const postHTML = document.createElement('div');
      postHTML.classList.add('post');
      postHTML.setAttribute('id', `${p.id}`);
      postHTML.innerHTML = `
          <img src="${p.imagen}">
          <div class="puente">
            <img src='./png/001-tower-bridge-1.png'><span> ${p.cantLikes} me gusta</span>
          </div>
          <div>${p.texto}</div>`;

      const container = document.querySelector('.post-container');
      container.insertBefore(postHTML, container.firstChild);
      //se inserta antes(qué post, antes de qué)
      //document.querySelector('ul').innerHTML += nuevoPosteo;
    })
}


      

//agregar boton megusta
//al boton agrgar el onclick
//cuando onclick, con fetch pedir al server que agregue u like
//fetch (dir, {method: put})
//si salió todo bien, modificamos el dom para ir cambiando el num de likes
