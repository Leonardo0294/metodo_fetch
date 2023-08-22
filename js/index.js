// Referencia a los botones y contenedor de imagen
const btnGetData = document.querySelector('#ex1-btn');
const btnSendData = document.querySelector('#ex2-btn');
const btnDownloadImage = document.querySelector('#ex3-btn');
const imageContainer = document.querySelector('#image-container');

// URLs y constantes
const API_JSON_PLACEHOLDER = 'https://jsonplaceholder.typicode.com/posts';
const API_VIA_PLACEHOLDER = 'https://via.placeholder.com/150';
const CORS_ANYWHERE = 'https://cors-anywhere.herokuapp.com/';

// Función para obtener datos de la API
const getDataFromApi = () => {
    fetch(API_JSON_PLACEHOLDER)
        .then(response => response.json())
        .then(posts => {
            console.log(posts.slice(0, 3));
            displayResult('ex1-result', JSON.stringify(posts.slice(0, 3)));
        })
        .catch(error => {
            console.error(error);
            displayResult('ex1-result', 'Error al obtener los datos.');
        });
};

// Función para enviar datos al servidor
const sendDataToServer = newPost => {
    fetch(API_JSON_PLACEHOLDER, {
        method: 'POST',
        body: JSON.stringify(newPost),
        headers: {
            'Content-Type': 'application/json; charset=UTF-8'
        }
    })
        .then(response => response.json())
        .then(post => {
            console.log(post);
            displayResult('ex2-result', JSON.stringify(post));
        })
        .catch(error => {
            console.error(error);
            displayResult('ex2-result', 'Error al enviar los datos.');
        });
};

// Función para descargar una imagen
const downloadImage = () => {
    fetch(CORS_ANYWHERE + API_VIA_PLACEHOLDER)
        .then(response => response.blob())
        .then(image => {
            const imageUrl = URL.createObjectURL(image);
            imageContainer.innerHTML = renderImage(imageUrl);
        })
        .catch(error => {
            console.error(error);
            imageContainer.innerHTML = '<p>Error al descargar la imagen.</p>';
        });
};

// Función para renderizar la imagen
const renderImage = url => `<img src="${url}" alt="Imagen de muestra">`;

// Función para mostrar resultados
const displayResult = (resultElementId, content) => {
    const resultElement = document.getElementById(resultElementId);
    resultElement.innerHTML = `<pre>${content}</pre>`;
};

// Asignar eventos a los botones
btnGetData.addEventListener('click', getDataFromApi);
btnSendData.addEventListener('click', () => {
    const newPost = {
        title: 'Título',
        body: 'Cuerpo del post'
    };
    sendDataToServer(newPost);
});
btnDownloadImage.addEventListener('click', downloadImage);
