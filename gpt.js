require('dotenv').config()
const { Configuration, OpenAIApi } = require('openai')
const chalkAnimation = require('chalk-animation')

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

async function modelos() {
    const modelos = await openai.listModels();
    console.log(modelos.data)
}

async function preguntar(pregunta) {
    if (typeof pregunta === "string") {
        let respuesta;
        const animacion = chalkAnimation.karaoke('Preguntando a GPT')
        try {
            animacion.start()
            const completion = await openai.createCompletion({
                model: "text-davinci-003",
                prompt: pregunta,
                max_tokens: 1024,
                n: 1,
                temperature: 0.5,
            });
            animacion.stop()
            console.log(completion.data.choices[0].text);
            respuesta = completion.data.choices[0].text
        }
        catch (err) {
            console.error(err);
            return;
        }

        return respuesta

    }
    else {
        console.error("argumanto no es string")
    }

}

async function imagen(argumento) {

    if (typeof argumento === "string") {
        let respuesta;
        const animacion = chalkAnimation.karaoke('GENERANDO IMAGEN')
        try {
            animacion.start()
            respuesta = await openai.createImage({
                prompt: argumento,
                n: 1,
                size: "1024x1024",
            });
            animacion.stop()
        } catch (error) {
            return;
        }
        return respuesta.data

    }
    else {
        console.error("mete un string animal")
    }

}

module.exports = {
    preguntar,
    imagen
};
