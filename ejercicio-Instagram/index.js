const express = require('express');
const cors = require('cors');
const app = express();
app.use( cors() );
app.use( express.json() );

let ID = 3;

const listaDePosteos = [
    {texto: 'sarasa', 
    imagen: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f4/Puente_Lusitania_sobre_el_r%C3%ADo_Guadiana%2C_M%C3%A9rida.jpg/1280px-Puente_Lusitania_sobre_el_r%C3%ADo_Guadiana%2C_M%C3%A9rida.jpg',
    cantLikes: 0,
    id: 1
    },
    {texto: 'amo los puentes',
    imagen: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/25_De_Abril_Bridge_%28226290561%29.jpeg/1280px-25_De_Abril_Bridge_%28226290561%29.jpeg',
    cantLikes: 0,
    id: 2
    }
]



app.get('/api/posteos', function (req, res) {
    res.json(listaDePosteos)
});

app.post('/api/posteos', function (req, res) {
    const nuevoPosteo = req.body;
    //aqui podríamos agregar una validación para que texto o img no esté vacíos
    nuevoPosteo.id = ID++;
    listaDePosteos.unshift(nuevoPosteo);
    //con este método agrego el nuevo post al principio de la lista
    //podríamos agregar 
    res.json(nuevoPosteo);
});

//una ruta o endpoint que sea un PUT
//es decir editando o agregando info sobre un elemento específico
//en la url agrgar el id
//si encontramos el post, incrementar en 1 la prop likes
//contestar


//restful apis: es una manera ordenada de llamar a la api api/qué tipo de objetos/id/qué acción específica
app.put('/api/posteos/:idDelPost/like', function (req, res) {
    const postID = req.params.idDelPost;
        for (let i = 0; i < listaDePosteos.length; i++) {
        if (listaDePosteos[i].id == postID) {
            listaDePosteos[i].cantLikes++;
            return res.json(listaDePosteos[i]); 
            //en este caso respondo no con la lista si no con el post que modifico, y agrego el return porque así hago q se corte la ejecución de la función
        }
    }
    
});

app.listen(4002);